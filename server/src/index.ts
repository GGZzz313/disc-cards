import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { GameRoom, Player, CreateSessionPayload, JoinSessionPayload, SubmitRankingPayload } from '../../shared/types';
import { CARDS } from './cards';
import { buildProfile, computeScores } from './scoring';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' },
});

// In-memory room store
const rooms = new Map<string, GameRoom>();

function generateCode(): string {
  let code: string;
  do {
    code = Math.floor(1000 + Math.random() * 9000).toString();
  } while (rooms.has(code));
  return code;
}

function shuffleCards() {
  return [...CARDS].sort(() => Math.random() - 0.5);
}

function broadcastLiveScores(room: GameRoom) {
  const liveScores: Record<string, ReturnType<typeof computeScores>> = {};
  for (const player of Object.values(room.players)) {
    liveScores[player.id] = computeScores(player);
  }
  return liveScores;
}

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Manager creates a session
  socket.on('create_session', (payload: CreateSessionPayload, cb) => {
    const code = generateCode();
    const room: GameRoom = {
      code,
      sessionName: payload.sessionName,
      managerId: socket.id,
      players: {},
      status: 'lobby',
      currentCardIndex: 0,
      cards: shuffleCards(),
    };
    rooms.set(code, room);
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.isManager = true;
    console.log(`Room ${code} created by ${socket.id}`);
    cb({ success: true, code });
  });

  // Player joins a session
  socket.on('join_session', (payload: JoinSessionPayload, cb) => {
    const room = rooms.get(payload.code);
    if (!room) return cb({ success: false, error: 'Room not found' });
    if (room.status !== 'lobby') return cb({ success: false, error: 'Game already in progress' });

    const player: Player = {
      id: socket.id,
      name: payload.playerName.trim(),
      submissions: {},
      scores: { D: 0, I: 0, S: 0, C: 0 },
    };
    room.players[socket.id] = player;
    socket.join(payload.code);
    socket.data.roomCode = payload.code;
    socket.data.isManager = false;

    // Notify everyone in the room of the updated player list
    io.to(payload.code).emit('lobby_update', {
      players: Object.values(room.players).map((p) => ({ id: p.id, name: p.name })),
    });

    console.log(`${payload.playerName} joined room ${payload.code}`);
    cb({ success: true, sessionName: room.sessionName });
  });

  // Manager re-connects to their room (e.g. page refresh)
  socket.on('rejoin_manager', (code: string, cb) => {
    const room = rooms.get(code);
    if (!room) return cb({ success: false, error: 'Room not found' });
    room.managerId = socket.id;
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.isManager = true;
    cb({ success: true });
  });

  // Manager starts the game
  socket.on('start_game', (cb) => {
    const code = socket.data.roomCode as string;
    const room = rooms.get(code);
    if (!room || room.managerId !== socket.id) return cb?.({ success: false });
    if (Object.keys(room.players).length < 1) return cb?.({ success: false, error: 'Need at least one player' });

    room.status = 'playing';
    room.currentCardIndex = 0;

    const card = room.cards[0];
    io.to(code).emit('game_started', {
      card,
      cardIndex: 0,
      totalCards: room.cards.length,
    });

    cb?.({ success: true });
  });

  // Player submits their ranking for the current card
  socket.on('submit_ranking', (payload: SubmitRankingPayload) => {
    const code = socket.data.roomCode as string;
    const room = rooms.get(code);
    if (!room || room.status !== 'playing') return;

    const player = room.players[socket.id];
    if (!player) return;

    player.submissions[payload.cardId] = payload.ranking;

    const submittedIds = Object.values(room.players)
      .filter((p) => p.submissions[payload.cardId])
      .map((p) => p.id);

    const liveScores = broadcastLiveScores(room);

    // Notify manager of submission progress
    io.to(room.managerId).emit('submission_update', {
      submittedPlayerIds: submittedIds,
      totalPlayers: Object.keys(room.players).length,
      liveScores,
    });
  });

  // Manager advances to the next card (or ends the game)
  socket.on('next_card', (cb) => {
    const code = socket.data.roomCode as string;
    const room = rooms.get(code);
    if (!room || room.managerId !== socket.id) return cb?.({ success: false });

    room.currentCardIndex += 1;

    if (room.currentCardIndex >= room.cards.length) {
      // Game over — compute results
      room.status = 'results';
      const profiles = Object.values(room.players).map(buildProfile);
      io.to(code).emit('game_over', { profiles });
      cb?.({ success: true, done: true });
    } else {
      const card = room.cards[room.currentCardIndex];
      io.to(code).emit('next_card', {
        card,
        cardIndex: room.currentCardIndex,
        totalCards: room.cards.length,
      });
      cb?.({ success: true, done: false });
    }
  });

  // Manager removes a player from lobby
  socket.on('remove_player', (playerId: string) => {
    const code = socket.data.roomCode as string;
    const room = rooms.get(code);
    if (!room || room.managerId !== socket.id) return;
    delete room.players[playerId];
    io.to(playerId).emit('kicked');
    io.to(code).emit('lobby_update', {
      players: Object.values(room.players).map((p) => ({ id: p.id, name: p.name })),
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    const code = socket.data.roomCode as string;
    if (!code) return;
    const room = rooms.get(code);
    if (!room) return;

    if (room.players[socket.id]) {
      delete room.players[socket.id];
      if (room.status === 'lobby') {
        io.to(code).emit('lobby_update', {
          players: Object.values(room.players).map((p) => ({ id: p.id, name: p.name })),
        });
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`DISC-Cards server running on port ${PORT}`);
});
