interface Player { id: string; name: string; }

interface Props {
  roomCode: string;
  sessionName: string;
  players: Player[];
  onStart: () => void;
  onRemovePlayer: (id: string) => void;
}

export default function ManagerLobby({ roomCode, sessionName, players, onStart, onRemovePlayer }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <p className="text-slate-400 text-sm uppercase tracking-widest mb-1">Session</p>
        <h1 className="text-2xl font-black text-white mb-8">{sessionName}</h1>

        {/* Room code */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6 text-center">
          <p className="text-slate-400 text-sm mb-2">Team members join at <span className="text-white font-medium">disc-cards.app</span> and enter:</p>
          <p className="text-7xl font-black text-[#ffd700] tracking-widest my-3">{roomCode}</p>
          <button
            onClick={() => navigator.clipboard.writeText(roomCode)}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Copy code
          </button>
        </div>

        {/* Players */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">{players.length} {players.length === 1 ? 'person' : 'people'} joined</p>
          </div>
          {players.length === 0 ? (
            <div className="bg-slate-800/50 rounded-xl p-6 text-center text-slate-500 text-sm">
              Waiting for team members to join...
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {players.map((p) => (
                <div key={p.id} className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-[#ffd700]" />
                  <span className="text-white font-medium text-sm">{p.name}</span>
                  <button
                    onClick={() => onRemovePlayer(p.id)}
                    className="text-slate-600 hover:text-red-400 ml-1 text-xs transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onStart}
          disabled={players.length < 1}
          className="w-full py-4 bg-[#ffd700] text-[#0f172a] font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Game →
        </button>
        {players.length < 1 && (
          <p className="text-center text-slate-500 text-sm mt-2">Need at least 1 player to start</p>
        )}
      </div>
    </div>
  );
}
