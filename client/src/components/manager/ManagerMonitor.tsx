import type { Card, DiscDimension, SubmissionUpdatePayload } from '../../../../shared/types';
import { DISC_COLORS } from '../../lib/constants';

interface Player { id: string; name: string; }

interface Props {
  card: Card;
  cardIndex: number;
  totalCards: number;
  players: Player[];
  submissionUpdate: SubmissionUpdatePayload | null;
  onNextCard: () => void;
}

const DIMS: DiscDimension[] = ['D', 'I', 'S', 'C'];

export default function ManagerMonitor({ card, cardIndex, totalCards, players, submissionUpdate, onNextCard }: Props) {
  const submittedIds = submissionUpdate?.submittedPlayerIds ?? [];
  const allSubmitted = players.length > 0 && submittedIds.length >= players.length;

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-slate-400 text-sm">Card {cardIndex + 1} of {totalCards}</p>
          <p className="text-[#ffd700] text-xs font-medium uppercase tracking-wider">{card.category}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-lg">{submittedIds.length}/{players.length}</p>
          <p className="text-slate-400 text-xs">submitted</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-8">
        <div
          className="bg-[#ffd700] h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((cardIndex + 1) / totalCards) * 100}%` }}
        />
      </div>

      {/* Scenario */}
      <div className="bg-slate-800 rounded-2xl p-6 mb-6">
        <p className="text-white text-lg font-medium leading-relaxed">{card.scenario}</p>
      </div>

      {/* Player submission chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {players.map((p) => {
          const submitted = submittedIds.includes(p.id);
          return (
            <div
              key={p.id}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                submitted ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${submitted ? 'bg-green-400' : 'bg-slate-600'}`} />
              {p.name}
            </div>
          );
        })}
      </div>

      {/* Live DISC bars per player */}
      {submissionUpdate && Object.keys(submissionUpdate.liveScores).length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {players.map((p) => {
            const scores = submissionUpdate.liveScores[p.id];
            if (!scores) return null;
            const maxScore = Math.max(...DIMS.map((d) => scores[d]), 1);
            return (
              <div key={p.id} className="bg-slate-800 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-3">{p.name}</p>
                <div className="flex flex-col gap-1.5">
                  {DIMS.map((d) => (
                    <div key={d} className="flex items-center gap-2">
                      <span className="text-xs font-bold w-3" style={{ color: DISC_COLORS[d] }}>{d}</span>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(scores[d] / maxScore) * 100}%`,
                            backgroundColor: DISC_COLORS[d],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Next card button */}
      <button
        onClick={onNextCard}
        className={`w-full py-4 font-bold text-lg rounded-xl transition-all ${
          allSubmitted
            ? 'bg-[#ffd700] text-[#0f172a] hover:bg-[#e6c200]'
            : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
        }`}
      >
        {cardIndex + 1 >= totalCards
          ? 'Finish & See Results →'
          : allSubmitted
          ? 'Next Card →'
          : `Next Card (${submittedIds.length}/${players.length} submitted)`}
      </button>
    </div>
  );
}
