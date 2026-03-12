import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onCreate: (sessionName: string, managerName: string) => void;
}

export default function CreateSession({ onCreate }: Props) {
  const [step, setStep] = useState<'session' | 'name'>('session');
  const [sessionName, setSessionName] = useState('');
  const [managerName, setManagerName] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-300 text-sm mb-8 flex items-center gap-1">
          ← Back
        </button>
        <h1 className="text-3xl font-black text-white mb-1">Create Session</h1>

        {step === 'session' ? (
          <>
            <p className="text-slate-400 mb-8">Give your session a name so the team knows what it's for.</p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="e.g. Site Leadership Team — March"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sessionName.trim() && setStep('name')}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700] text-lg"
                autoFocus
              />
              <button
                onClick={() => setStep('name')}
                disabled={!sessionName.trim()}
                className="w-full py-4 bg-[#ffd700] text-[#0f172a] font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-slate-400 mb-8">What's your name? You'll also complete the cards and get your own DISC profile.</p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your name"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && managerName.trim() && onCreate(sessionName.trim(), managerName.trim())}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700] text-lg"
                autoFocus
              />
              <button
                onClick={() => onCreate(sessionName.trim(), managerName.trim())}
                disabled={!managerName.trim()}
                className="w-full py-4 bg-[#ffd700] text-[#0f172a] font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Game →
              </button>
              <button onClick={() => setStep('session')} className="text-slate-500 hover:text-slate-300 text-sm">
                ← Change session name
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
