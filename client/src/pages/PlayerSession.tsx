import { useEffect, useState } from 'react';
import { socket } from '../lib/socket';
import type { Card, DiscProfile } from '../../../shared/types';
import PlayerJoin from '../components/player/PlayerJoin';
import PlayerLobby from '../components/player/PlayerLobby';
import PlayerCard from '../components/player/PlayerCard';
import PlayerWaiting from '../components/player/PlayerWaiting';
import PlayerResults from '../components/player/PlayerResults';

type Stage = 'join' | 'lobby' | 'card' | 'waiting' | 'results';

export default function PlayerSession() {
  const [stage, setStage] = useState<Stage>('join');
  const [sessionName, setSessionName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [myProfile, setMyProfile] = useState<DiscProfile | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [joinError, setJoinError] = useState('');
  const [joining, setJoining] = useState(false);
  const [kickedMsg, setKickedMsg] = useState('');

  useEffect(() => {
    socket.connect();

    socket.on('game_started', ({ card, cardIndex, totalCards }) => {
      setCurrentCard(card);
      setCardIndex(cardIndex);
      setTotalCards(totalCards);
      setStage('card');
    });

    socket.on('next_card', ({ card, cardIndex, totalCards }) => {
      setCurrentCard(card);
      setCardIndex(cardIndex);
      setTotalCards(totalCards);
      setCountdown(null);
      setStage('card');
    });

    socket.on('submission_update', ({ submittedPlayerIds, totalPlayers }) => {
      setSubmittedCount(submittedPlayerIds.length);
      setTotalPlayers(totalPlayers);
    });

    socket.on('game_over', ({ profiles }: { profiles: DiscProfile[] }) => {
      const me = profiles.find((p) => p.playerId === socket.id);
      setMyProfile(me ?? null);
      setStage('results');
    });

    socket.on('kicked', () => {
      setKickedMsg('You were removed from the session by the manager.');
      setStage('join');
    });

    return () => {
      socket.off('game_started');
      socket.off('next_card');
      socket.off('submission_update');
      socket.off('game_over');
      socket.off('kicked');
      socket.disconnect();
    };
  }, []);

  function handleJoin(code: string, name: string) {
    setJoining(true);
    setJoinError('');
    socket.emit('join_session', { code, playerName: name }, (res: { success: boolean; sessionName?: string; error?: string }) => {
      setJoining(false);
      if (res.success) {
        setKickedMsg('');
        setPlayerName(name);
        setSessionName(res.sessionName ?? '');
        setStage('lobby');
      } else {
        setJoinError(res.error ?? 'Could not join session');
      }
    });
  }

  function handleSubmit(cardId: string, ranking: string[]) {
    socket.emit('submit_ranking', { cardId, ranking });
    setStage('waiting');
  }

  // Countdown between cards
  useEffect(() => {
    if (stage === 'card' && countdown === null) return;
    if (countdown === null) return;
    if (countdown <= 0) { setCountdown(null); return; }
    const t = setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(t);
  }, [countdown, stage]);

  if (stage === 'join') return <PlayerJoin onJoin={handleJoin} error={joinError || kickedMsg} loading={joining} />;
  if (stage === 'lobby') return <PlayerLobby sessionName={sessionName} playerName={playerName} />;
  if (stage === 'card' && currentCard) return (
    <PlayerCard
      card={currentCard}
      cardIndex={cardIndex}
      totalCards={totalCards}
      onSubmit={handleSubmit}
    />
  );
  if (stage === 'waiting') return (
    <PlayerWaiting
      submittedCount={submittedCount}
      totalPlayers={totalPlayers}
      cardIndex={cardIndex}
      totalCards={totalCards}
    />
  );
  if (stage === 'results' && myProfile) return <PlayerResults profile={myProfile} />;

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Connecting...
    </div>
  );
}
