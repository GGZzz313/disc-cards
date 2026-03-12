import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onCreate: (sessionName: string) => void;
}

export default function CreateSession({ onCreate }: Props) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-300 text-sm mb-8 flex items-center gap-1">
          ← Back
        </button>
        <h1 className="text-3xl font-black text-white mb-1">Create Session</h1>
        <p className="text-slate-400 mb-8">Give your session a name so the team knows what it's for.</p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g. Site Leadership Team — March"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && name.trim() && onCreate(name.trim())}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700] text-lg"
            autoFocus
          />
          <button
            onClick={() => onCreate(name.trim())}
            disabled={!name.trim()}
            className="w-full py-4 bg-[#ffd700] text-[#0f172a] font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create Game
          </button>
        </div>
      </div>
    </div>
  );
}
