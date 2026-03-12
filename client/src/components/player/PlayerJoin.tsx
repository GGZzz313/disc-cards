import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onJoin: (code: string, name: string) => void;
  error?: string;
  loading?: boolean;
}

export default function PlayerJoin({ onJoin, error, loading }: Props) {
  const [step, setStep] = useState<'code' | 'name'>('code');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-300 text-sm mb-8 flex items-center gap-1">
          ← Back
        </button>

        <h1 className="text-3xl font-black text-white mb-1">Join Session</h1>

        {step === 'code' ? (
          <>
            <p className="text-slate-400 mb-8">Enter the 4-digit room code from your manager.</p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="0000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && code.length === 4 && setStep('name')}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white text-4xl font-black text-center tracking-widest placeholder-slate-700 focus:outline-none focus:border-[#ffd700] mb-4"
              autoFocus
            />
            <button
              onClick={() => setStep('name')}
              disabled={code.length !== 4}
              className="w-full py-4 bg-[#ffd700] text-[#0f172a] font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          </>
        ) : (
          <>
            <p className="text-slate-400 mb-8">What's your name?</p>
            <input
              type="text"
              placeholder="Your name"
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && name.trim() && !loading && onJoin(code, name.trim())}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700] text-lg mb-4"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-sm mb-3 px-1">{error}</p>
            )}
            <button
              onClick={() => onJoin(code, name.trim())}
              disabled={!name.trim() || loading}
              className="w-full py-4 bg-[#ffd700] text-[#0f172a] font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Joining…' : 'Join Game →'}
            </button>
            <button onClick={() => setStep('code')} className="w-full mt-3 text-slate-500 hover:text-slate-300 text-sm">
              ← Change code
            </button>
          </>
        )}
      </div>
    </div>
  );
}
