import { useState, useEffect } from 'react';
import type { Card, CardOption, DiscDimension, SubmissionUpdatePayload } from '../../../../shared/types';
import { DISC_COLORS } from '../../lib/constants';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Player { id: string; name: string; }

interface Props {
  card: Card;
  cardIndex: number;
  totalCards: number;
  players: Player[];
  submissionUpdate: SubmissionUpdatePayload | null;
  managerName: string;
  onNextCard: () => void;
  onManagerRanking: (cardId: string, ranking: string[]) => void;
}

const DIMS: DiscDimension[] = ['D', 'I', 'S', 'C'];

function SortableOption({ option, rank }: { option: CardOption; rank: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: option.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className={`flex items-center gap-3 bg-slate-700 border rounded-xl px-3 py-3 select-none ${isDragging ? 'border-[#ffd700]/50' : 'border-slate-600'}`}
    >
      <div {...attributes} {...listeners} className="flex flex-col gap-0.5 cursor-grab active:cursor-grabbing px-1 touch-none">
        {[0,1,2].map(i => <div key={i} className="w-3 h-0.5 bg-slate-500 rounded" />)}
      </div>
      <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-black text-slate-300 shrink-0">{rank}</div>
      <p className="text-white text-xs leading-snug flex-1">{option.text}</p>
    </div>
  );
}

export default function ManagerMonitor({ card, cardIndex, totalCards, players, submissionUpdate, managerName, onNextCard, onManagerRanking }: Props) {
  const [items, setItems] = useState<CardOption[]>(() => [...card.options].sort(() => Math.random() - 0.5));
  const [submitted, setSubmitted] = useState(false);

  // Reset when card changes
  useEffect(() => {
    setItems([...card.options].sort(() => Math.random() - 0.5));
    setSubmitted(false);
  }, [card.id]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  function handleSubmit() {
    onManagerRanking(card.id, items.map(i => i.id));
    setSubmitted(true);
  }

  const submittedIds = submissionUpdate?.submittedPlayerIds ?? [];
  const allSubmitted = players.length > 0 && submittedIds.length >= players.length;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-0 max-w-6xl mx-auto">

      {/* Left — Monitor panel */}
      <div className="flex-1 px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-sm">Card {cardIndex + 1} of {totalCards}</p>
            <p className="text-[#ffd700] text-xs font-medium uppercase tracking-wider">{card.category}</p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-lg">{submittedIds.length}/{players.length}</p>
            <p className="text-slate-400 text-xs">submitted</p>
          </div>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-6">
          <div className="bg-[#ffd700] h-1.5 rounded-full transition-all duration-500" style={{ width: `${((cardIndex + 1) / totalCards) * 100}%` }} />
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 mb-5">
          <p className="text-white font-medium leading-relaxed">{card.scenario}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {players.map((p) => {
            const done = submittedIds.includes(p.id);
            return (
              <div key={p.id} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${done ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                <div className={`w-2 h-2 rounded-full ${done ? 'bg-green-400' : 'bg-slate-600'}`} />
                {p.name}
              </div>
            );
          })}
        </div>

        {submissionUpdate && Object.keys(submissionUpdate.liveScores).length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {players.map((p) => {
              const scores = submissionUpdate.liveScores[p.id];
              if (!scores) return null;
              const maxScore = Math.max(...DIMS.map(d => scores[d]), 1);
              return (
                <div key={p.id} className="bg-slate-800 rounded-xl p-3">
                  <p className="text-white font-medium text-xs mb-2">{p.name}</p>
                  <div className="flex flex-col gap-1">
                    {DIMS.map(d => (
                      <div key={d} className="flex items-center gap-2">
                        <span className="text-xs font-bold w-3" style={{ color: DISC_COLORS[d] }}>{d}</span>
                        <div className="flex-1 bg-slate-700 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${(scores[d] / maxScore) * 100}%`, backgroundColor: DISC_COLORS[d] }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={onNextCard}
          className={`w-full py-4 font-bold text-lg rounded-xl transition-all ${allSubmitted ? 'bg-[#ffd700] text-[#0f172a] hover:bg-[#e6c200]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'}`}
        >
          {cardIndex + 1 >= totalCards ? 'Finish & See Results →' : allSubmitted ? 'Next Card →' : `Next Card (${submittedIds.length}/${players.length} submitted)`}
        </button>
      </div>

      {/* Right — Manager's own card */}
      <div className="w-full lg:w-80 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 px-4 py-8 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#ffd700]" />
          <p className="text-[#ffd700] text-xs font-bold uppercase tracking-wider">Your ranking — {managerName}</p>
        </div>
        <p className="text-slate-400 text-xs mb-4">Drag to rank 1st (most like you) to 4th</p>

        {submitted ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400 text-lg">✓</span>
              </div>
              <p className="text-green-400 text-sm font-medium">Submitted</p>
            </div>
          </div>
        ) : (
          <>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2 mb-4 flex-1">
                  {items.map((option, index) => (
                    <SortableOption key={option.id} option={option} rank={index + 1} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <button onClick={handleSubmit} className="w-full py-3 bg-[#ffd700] text-[#0f172a] font-bold rounded-xl hover:bg-[#e6c200] transition-colors text-sm">
              Submit my ranking →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
