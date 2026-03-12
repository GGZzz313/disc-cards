import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-black tracking-tight text-white mb-2">
          DISC<span className="text-[#ffd700]">Cards</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Behavioural assessment for civil construction teams
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => navigate('/manager')}
          className="w-full py-4 px-6 bg-[#ffd700] text-[#0f172a] font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors"
        >
          I'm a Manager
        </button>
        <button
          onClick={() => navigate('/play')}
          className="w-full py-4 px-6 bg-slate-700 text-white font-bold text-lg rounded-xl hover:bg-slate-600 transition-colors"
        >
          I'm a Team Member
        </button>
      </div>

      <p className="mt-10 text-slate-600 text-sm text-center max-w-xs">
        Managers create and host a session. Team members join with a 4-digit room code.
      </p>
    </div>
  );
}
