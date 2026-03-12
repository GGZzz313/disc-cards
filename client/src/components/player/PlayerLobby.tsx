interface Props {
  sessionName: string;
  playerName: string;
}

export default function PlayerLobby({ sessionName, playerName }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-sm">
        <div className="w-16 h-16 rounded-full bg-[#ffd700]/20 flex items-center justify-center mx-auto mb-6">
          <div className="w-3 h-3 rounded-full bg-[#ffd700] animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">You're in!</h2>
        <p className="text-slate-400 mb-1">{sessionName}</p>
        <p className="text-[#ffd700] font-bold mb-8">{playerName}</p>
        <p className="text-slate-500 text-sm">Waiting for the manager to start the game...</p>
      </div>
    </div>
  );
}
