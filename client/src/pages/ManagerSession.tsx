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
  const [managerName, setManagerName] = useState('');
  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [submissionUpdate, setSubmissionUpdate] = useState<SubmissionUpdatePayload | null>(null);
  const [profiles, setProfiles] = useState<DiscProfile[]>([]);
  const [managerProfile, setManagerProfile] = useState<DiscProfile | null>(null);

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

    socket.on('game_over', ({ profiles, managerProfile }: { profiles: DiscProfile[]; managerProfile: DiscProfile | null }) => {
      setProfiles(profiles);
      setManagerProfile(managerProfile);
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

  function handleCreate(sessionName: string, managerName: string) {
    setSessionName(sessionName);
    setManagerName(managerName);
    socket.emit('create_session', { sessionName, managerName }, (res: { success: boolean; code: string }) => {
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

  function handleManagerRanking(cardId: string, ranking: string[]) {
    socket.emit('submit_manager_ranking', { cardId, ranking });
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
      managerName={managerName}
      onNextCard={handleNextCard}
      onManagerRanking={handleManagerRanking}
    />
  );
  if (stage === 'results') return (
    <ManagerResults
      profiles={profiles}
      managerProfile={managerProfile}
      sessionName={sessionName}
    />
  );

  return null;
}
