import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import type { GameRoom, Player, CreateSessionPayload, JoinSessionPayload, SubmitRankingPayload } from '../../shared/types';
import { CARDS } from './cards';
import { buildProfile, computeScores } from './scoring';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const MAX_NAME_LEN = 50;
const MAX_ROOMS = 200;
// Simple rate limit: max events per socket per window
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 10_000;

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ALLOWED_ORIGIN },
});

// In-memory room store
const rooms = new Map<string, GameRoom>();
// Per-socket event counts for rate limiting
const rateCounts = new Map<string, { count: number; resetAt: number }>();
// Room cleanup timers (fires when manager disconnects)
const roomCleanupTimers = new Map<string, ReturnType<typeof setTimeout>>();

function rateCheck(socketId: string): boolean {
  const now = Date.now();
  const entry = rateCounts.get(socketId);
  if (!entry || now > entry.resetAt) {
    rateCounts.set(socketId, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= RATE_LIMIT;
}

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

function scheduleRoomCleanup(code: string, delayMs = 10 * 60 * 1000) {
  cancelRoomCleanup(code);
  const timer = setTimeout(() => {
    rooms.delete(code);
    roomCleanupTimers.delete(code);
    console.log(`Room ${code} cleaned up after manager disconnect`);
  }, delayMs);
  roomCleanupTimers.set(code, timer);
}

function cancelRoomCleanup(code: string) {
  const existing = roomCleanupTimers.get(code);
  if (existing) {
    clearTimeout(existing);
    roomCleanupTimers.delete(code);
  }
}

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Manager creates a session
  socket.on('create_session', (payload: CreateSessionPayload & { managerName: string }, cb) => {
    if (!rateCheck(socket.id)) return cb?.({ success: false, error: 'Too many requests' });
    if (rooms.size >= MAX_ROOMS) return cb?.({ success: false, error: 'Server at capacity' });

    const sessionName = String(payload.sessionName ?? '').trim().slice(0, MAX_NAME_LEN);
    const managerName = String(payload.managerName ?? '').trim().slice(0, MAX_NAME_LEN) || 'Manager';
    if (!sessionName) return cb?.({ success: false, error: 'Session name required' });

    const code = generateCode();
    const room: GameRoom = {
      code,
      sessionName,
      managerId: socket.id,
      managerName,
      managerPlayer: {
        id: socket.id,
        name: managerName,
        submissions: {},
        scores: { D: 0, I: 0, S: 0, C: 0 },
      },
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
    if (!rateCheck(socket.id)) return cb?.({ success: false, error: 'Too many requests' });

    const code = String(payload.code ?? '').trim();
    const playerName = String(payload.playerName ?? '').trim().slice(0, MAX_NAME_LEN);
    if (!code || !playerName) return cb?.({ success: false, error: 'Invalid request' });

    const room = rooms.get(code);
    if (!room) return cb({ success: false, error: 'Room not found' });
    if (room.status !== 'lobby') return cb({ success: false, error: 'Game already in progress' });

    const player: Player = {
      id: socket.id,
      name: playerName,
      submissions: {},
      scores: { D: 0, I: 0, S: 0, C: 0 },
    };
    room.players[socket.id] = player;
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.isManager = false;

    io.to(code).emit('lobby_update', {
      players: Object.values(room.players).map((p) => ({ id: p.id, name: p.name })),
    });

    console.log(`${playerName} joined room ${code}`);
    cb({ success: true, sessionName: room.sessionName });
  });

  // Manager re-connects to their room (e.g. page refresh)
  socket.on('rejoin_manager', (code: string, cb) => {
    if (!rateCheck(socket.id)) return cb?.({ success: false, error: 'Too many requests' });
    const room = rooms.get(code);
    if (!room) return cb({ success: false, error: 'Room not found' });
    cancelRoomCleanup(code);
    room.managerId = socket.id;
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.isManager = true;
    cb({ success: true });
  });

  // Manager starts the game
  socket.on('start_game', (cb) => {
    if (!rateCheck(socket.id)) return cb?.({ success: false });
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
    if (!rateCheck(socket.id)) return;
    const code = socket.data.roomCode as string;
    const room = rooms.get(code);
    if (!room || room.status !== 'playing') return;

    const player = room.players[socket.id];
    if (!player) return;

    // Validate cardId matches the current card
    const currentCard = room.cards[room.currentCardIndex];
    if (!currentCard || payload.cardId !== currentCard.id) return;

    // Validate ranking: must be exactly 4 option IDs from this card
    const validOptionIds = new Set(currentCard.options.map((o) => o.id));
    const ranking = payload.ranking;
    if (
      !Array.isArray(ranking) ||
      ranking.length !== 4 ||
      !ranking.every((id) => typeof id === 'string' && validOptionIds.has(id)) ||
      new Set(ranking).size !== 4
    ) return;

    player.submissions[payload.cardId] = ranking;

    const submittedIds = Object.values(room.players)
      .filter((p) => p.submissions[payload.cardId])
      .map((p) => p.id);

    const liveScores = broadcastLiveScores(room);

    io.to(room.managerId).emit('submission_update', {
      submittedPlayerIds: submittedIds,
      totalPlayers: Object.keys(room.players).length,
      liveScores,
    });
  });

  // Manager submits their own ranking for the current card
  socket.on('submit_manager_ranking', (payload: SubmitRankingPayload) => {
    if (!rateCheck(socket.id)) return;
    const code = socket.data.roomCode as string;
    const room = rooms.get(code);
    if (!room || room.status !== 'playing' || room.managerId !== socket.id) return;
    if (!room.managerPlayer) return;

    const currentCard = room.cards[room.currentCardIndex];
    if (!currentCard || payload.cardId !== currentCard.id) return;

    const validOptionIds = new Set(currentCard.options.map((o) => o.id));
    const ranking = payload.ranking;
    if (
      !Array.isArray(ranking) ||
      ranking.length !== 4 ||
      !ranking.every((id) => typeof id === 'string' && validOptionIds.has(id)) ||
      new Set(ranking).size !== 4
    ) return;

    room.managerPlayer.submissions[payload.cardId] = ranking;
  });

  // Manager advances to the next card (or ends the game)
  socket.on('next_card', (cb) => {
    if (!rateCheck(socket.id)) return cb?.({ success: false });
    const code = socket.data.roomCode as string;
    const room = rooms.get(code);
    if (!room || room.managerId !== socket.id) return cb?.({ success: false });

    room.currentCardIndex += 1;

    if (room.currentCardIndex >= room.cards.length) {
      room.status = 'results';
      const profiles = Object.values(room.players).map(buildProfile);
      const managerProfile = room.managerPlayer ? buildProfile(room.managerPlayer) : null;
      io.to(code).emit('game_over', { profiles, managerProfile });
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
    if (!rateCheck(socket.id)) return;
    const code = socket.data.roomCode as string;
    const room = rooms.get(code);
    if (!room || room.managerId !== socket.id) return;
    if (typeof playerId !== 'string') return;
    delete room.players[playerId];
    io.to(playerId).emit('kicked');
    io.to(code).emit('lobby_update', {
      players: Object.values(room.players).map((p) => ({ id: p.id, name: p.name })),
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    rateCounts.delete(socket.id);
    const code = socket.data.roomCode as string;
    if (!code) return;
    const room = rooms.get(code);
    if (!room) return;

    if (room.managerId === socket.id) {
      // Schedule room cleanup — gives manager time to reconnect
      scheduleRoomCleanup(code);
    } else if (room.players[socket.id]) {
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
