import { useEffect, useState } from 'react';

interface Props {
  submittedCount: number;
  totalPlayers: number;
  cardIndex: number;
  totalCards: number;
}

export default function PlayerWaiting({ submittedCount, totalPlayers, cardIndex, totalCards }: Props) {
  const isLastCard = cardIndex + 1 >= totalCards;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [cardIndex]);

  const slowMsg = elapsed >= 60 ? 'The manager may be having connection issues.' : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-sm">
        <div className="w-16 h-16 rounded-full bg-[#ffd700]/10 flex items-center justify-center mx-auto mb-6">
          <div className="w-3 h-3 rounded-full bg-[#ffd700] animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Submitted!</h2>
        <p className="text-slate-400 mb-6">
          {isLastCard ? 'Waiting for results...' : 'Waiting for the next card...'}
        </p>
        {totalPlayers > 0 && (
          <div className="bg-slate-800 rounded-xl px-6 py-4 inline-block mb-4">
            <p className="text-[#ffd700] font-black text-3xl">{submittedCount}/{totalPlayers}</p>
            <p className="text-slate-400 text-sm">submitted</p>
          </div>
        )}
        {slowMsg && (
          <p className="text-slate-500 text-sm mt-2">{slowMsg}</p>
        )}
      </div>
    </div>
  );
}
