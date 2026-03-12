import { useConnectionStatus } from '../../hooks/useConnectionStatus';

export default function ConnectionIndicator() {
  const connected = useConnectionStatus();

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-full px-3 py-1.5 text-xs z-50">
      <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400 animate-pulse'}`} />
      <span className={connected ? 'text-slate-400' : 'text-red-400 font-medium'}>
        {connected ? 'Connected' : 'Reconnecting...'}
      </span>
    </div>
  );
}
