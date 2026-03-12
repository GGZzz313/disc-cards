import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Card, CardOption } from '../../../../shared/types';

interface Props {
  card: Card;
  cardIndex: number;
  totalCards: number;
  onSubmit: (cardId: string, ranking: string[]) => void;
}

function SortableOption({ option, rank }: { option: CardOption; rank: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 bg-slate-800 border rounded-xl px-4 py-4 select-none ${
        isDragging ? 'border-[#ffd700]/50 shadow-lg shadow-[#ffd700]/10' : 'border-slate-700'
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex flex-col gap-0.5 cursor-grab active:cursor-grabbing px-1 py-1 touch-none"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-4 h-0.5 bg-slate-600 rounded" />
        ))}
      </div>

      {/* Rank badge */}
      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-black text-slate-300 shrink-0">
        {rank}
      </div>

      {/* Text */}
      <p className="text-white text-sm leading-snug flex-1">{option.text}</p>
    </div>
  );
}

export default function PlayerCard({ card, cardIndex, totalCards, onSubmit }: Props) {
  const [items, setItems] = useState<CardOption[]>(() => {
    // Shuffle options so they don't always appear in D/I/S/C order
    return [...card.options].sort(() => Math.random() - 0.5);
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  function handleSubmit() {
    onSubmit(card.id, items.map((i) => i.id));
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-400 text-sm">Card {cardIndex + 1} of {totalCards}</p>
        <p className="text-[#ffd700] text-xs font-medium uppercase tracking-wider">{card.category}</p>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-6">
        <div
          className="bg-[#ffd700] h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((cardIndex + 1) / totalCards) * 100}%` }}
        />
      </div>

      {/* Scenario */}
      <div className="bg-slate-800 rounded-2xl p-5 mb-6">
        <p className="text-white font-medium leading-relaxed">{card.scenario}</p>
      </div>

      {/* Instruction */}
      <p className="text-slate-400 text-sm mb-3 text-center">
        Drag to rank — <span className="text-white font-medium">1st = most like you</span>
      </p>

      {/* Sortable options */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2 mb-6">
            {items.map((option, index) => (
              <SortableOption key={option.id} option={option} rank={index + 1} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-[#ffd700] text-[#0f172a] font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors"
      >
        Submit →
      </button>
    </div>
  );
}
