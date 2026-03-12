import { useState } from 'react';
import type { DiscProfile, DiscDimension } from '../../../../shared/types';
import { DISC_COLORS, DISC_LABELS } from '../../lib/constants';
import { PROFILE_PATTERNS } from '../../../../shared/profiles';

interface Props {
  profiles: DiscProfile[];
  sessionName: string;
}

const DIMS: DiscDimension[] = ['D', 'I', 'S', 'C'];

function ProfileCard({ profile }: { profile: DiscProfile }) {
  const pattern = PROFILE_PATTERNS[profile.patternKey];

  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-black text-xl">{profile.playerName}</h3>
          <p className="text-[#ffd700] font-bold">{profile.patternKey} — {profile.patternLabel}</p>
          {profile.isBlended && (
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full mt-1 inline-block">Blended style</span>
          )}
        </div>
      </div>

      {/* DISC bars */}
      <div className="flex flex-col gap-2 mb-5">
        {DIMS.map((d) => (
          <div key={d} className="flex items-center gap-3">
            <span className="text-xs font-black w-3" style={{ color: DISC_COLORS[d] }}>{d}</span>
            <div className="flex-1 bg-slate-700 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-700"
                style={{ width: `${profile.percentages[d]}%`, backgroundColor: DISC_COLORS[d] }}
              />
            </div>
            <span className="text-slate-300 text-xs font-bold w-8 text-right">{profile.percentages[d]}%</span>
          </div>
        ))}
      </div>

      {pattern && (
        <div className="flex flex-col gap-3 text-sm">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <p className="text-[#ffd700] font-bold text-xs uppercase tracking-wider mb-1">⚡ Communicate with {profile.playerName.split(' ')[0]}</p>
            <p className="text-slate-300">{pattern.communicate}</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3">
            <p className="text-[#ffd700] font-bold text-xs uppercase tracking-wider mb-1">🎯 Leading {profile.playerName.split(' ')[0]}</p>
            <p className="text-slate-300">{pattern.lead}</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3">
            <p className="text-[#ffd700] font-bold text-xs uppercase tracking-wider mb-1">⚠️ Watch for under pressure</p>
            <p className="text-slate-300">{pattern.stress}</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3">
            <p className="text-[#ffd700] font-bold text-xs uppercase tracking-wider mb-1">🤝 Works well with</p>
            <p className="text-slate-300">{pattern.worksWith}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TeamOverview({ profiles }: { profiles: DiscProfile[] }) {
  // Calculate team average per dimension
  const totals = { D: 0, I: 0, S: 0, C: 0 } as Record<DiscDimension, number>;
  profiles.forEach((p) => DIMS.forEach((d) => (totals[d] += p.percentages[d])));
  const avg = {} as Record<DiscDimension, number>;
  DIMS.forEach((d) => (avg[d] = profiles.length > 0 ? Math.round(totals[d] / profiles.length) : 0));

  const dominantDim = DIMS.reduce((a, b) => (avg[a] >= avg[b] ? a : b));
  const weakestDim = DIMS.reduce((a, b) => (avg[a] <= avg[b] ? a : b));

  return (
    <div className="bg-slate-800 rounded-2xl p-6 mb-6">
      <h3 className="text-white font-black text-xl mb-4">Team Overview</h3>
      <div className="flex flex-col gap-2 mb-5">
        {DIMS.map((d) => (
          <div key={d} className="flex items-center gap-3">
            <div className="w-20 text-xs" style={{ color: DISC_COLORS[d] }}>
              <span className="font-black">{d}</span>
              <span className="text-slate-500 ml-1">{DISC_LABELS[d]}</span>
            </div>
            <div className="flex-1 bg-slate-700 rounded-full h-4">
              <div
                className="h-4 rounded-full"
                style={{ width: `${avg[d]}%`, backgroundColor: DISC_COLORS[d] }}
              />
            </div>
            <span className="text-slate-300 text-sm font-bold w-10 text-right">{avg[d]}%</span>
          </div>
        ))}
      </div>
      <div className="bg-slate-900/50 rounded-xl p-4 text-sm text-slate-300">
        <p>
          Your team skews <strong style={{ color: DISC_COLORS[dominantDim] }}>{DISC_LABELS[dominantDim]}</strong> — strong on{' '}
          {dominantDim === 'D' && 'results and decisiveness'}
          {dominantDim === 'I' && 'energy and relationships'}
          {dominantDim === 'S' && 'consistency and reliability'}
          {dominantDim === 'C' && 'precision and quality'}
          . Consider consciously investing in{' '}
          <strong style={{ color: DISC_COLORS[weakestDim] }}>{DISC_LABELS[weakestDim]}</strong> behaviours.
        </p>
      </div>
    </div>
  );
}

export default function ManagerResults({ profiles, sessionName }: Props) {
  const [view, setView] = useState<'team' | 'individual'>('team');

  function downloadCSV() {
    const header = ['Name', 'Pattern', 'Label', 'D%', 'I%', 'S%', 'C%', 'Blended'];
    const rows = profiles.map((p) => [
      p.playerName, p.patternKey, p.patternLabel,
      p.percentages.D, p.percentages.I, p.percentages.S, p.percentages.C,
      p.isBlended ? 'Yes' : 'No',
    ]);
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sessionName.replace(/\s+/g, '-')}-DISC-results.csv`;
    a.click();
  }

  return (
    <div className="min-h-screen px-4 py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-black text-white">Results</h1>
        <button
          onClick={downloadCSV}
          className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Export CSV
        </button>
      </div>
      <p className="text-slate-400 mb-6">{sessionName}</p>

      {/* Tab toggle */}
      <div className="flex bg-slate-800 rounded-xl p-1 mb-6 w-fit">
        {(['team', 'individual'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all capitalize ${
              view === v ? 'bg-[#ffd700] text-[#0f172a]' : 'text-slate-400 hover:text-white'
            }`}
          >
            {v === 'team' ? 'Team Overview' : 'Individual Profiles'}
          </button>
        ))}
      </div>

      {view === 'team' && <TeamOverview profiles={profiles} />}

      {view === 'individual' && (
        <div className="flex flex-col gap-6">
          {profiles.map((p) => (
            <ProfileCard key={p.playerId} profile={p} />
          ))}
        </div>
      )}
    </div>
  );
}
