import { useEffect, useState } from 'react';
import { socket } from '../lib/socket';
import type { DiscProfile, Card, SubmissionUpdatePayload } from '../../../shared/types';
import ManagerLobby from '../components/manager/ManagerLobby';
import ManagerMonitor from '../components/manager/ManagerMonitor';
import ManagerResults from '../components/manager/ManagerResults';
import CreateSession from '../components/manager/CreateSession';

type Stage = 'create' | 'lobby' | 'playing' | 'results';

interface LobbyPlayer { id: string; name: string; }

export default function ManagerSession() {
  const [stage, setStage] = useState<Stage>('create');
  const [roomCode, setRoomCode] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [submissionUpdate, setSubmissionUpdate] = useState<SubmissionUpdatePayload | null>(null);
  const [profiles, setProfiles] = useState<DiscProfile[]>([]);

  useEffect(() => {
    socket.connect();

    socket.on('lobby_update', ({ players }: { players: LobbyPlayer[] }) => {
      setPlayers(players);
    });

    socket.on('game_started', ({ card, cardIndex, totalCards }) => {
      setCurrentCard(card);
      setCardIndex(cardIndex);
      setTotalCards(totalCards);
      setStage('playing');
    });

    socket.on('next_card', ({ card, cardIndex, totalCards }) => {
      setCurrentCard(card);
      setCardIndex(cardIndex);
      setTotalCards(totalCards);
      setSubmissionUpdate(null);
    });

    socket.on('submission_update', (update: SubmissionUpdatePayload) => {
      setSubmissionUpdate(update);
    });

    socket.on('game_over', ({ profiles }: { profiles: DiscProfile[] }) => {
      setProfiles(profiles);
      setStage('results');
    });

    return () => {
      socket.off('lobby_update');
      socket.off('game_started');
      socket.off('next_card');
      socket.off('submission_update');
      socket.off('game_over');
      socket.disconnect();
    };
  }, []);

  function handleCreate(name: string) {
    setSessionName(name);
    socket.emit('create_session', { sessionName: name }, (res: { success: boolean; code: string }) => {
      if (res.success) {
        setRoomCode(res.code);
        setStage('lobby');
      }
    });
  }

  function handleStart() {
    socket.emit('start_game', (res: { success: boolean }) => {
      if (!res.success) alert('Could not start game. Make sure at least one player has joined.');
    });
  }

  function handleNextCard() {
    socket.emit('next_card');
  }

  function handleRemovePlayer(id: string) {
    socket.emit('remove_player', id);
  }

  if (stage === 'create') return <CreateSession onCreate={handleCreate} />;
  if (stage === 'lobby') return (
    <ManagerLobby
      roomCode={roomCode}
      sessionName={sessionName}
      players={players}
      onStart={handleStart}
      onRemovePlayer={handleRemovePlayer}
    />
  );
  if (stage === 'playing' && currentCard) return (
    <ManagerMonitor
      card={currentCard}
      cardIndex={cardIndex}
      totalCards={totalCards}
      players={players}
      submissionUpdate={submissionUpdate}
      onNextCard={handleNextCard}
    />
  );
  if (stage === 'results') return <ManagerResults profiles={profiles} sessionName={sessionName} />;

  return null;
}
