import { useState } from 'react';
import type { DiscProfile, DiscDimension } from '../../../../shared/types';
import { DISC_COLORS, DISC_LABELS } from '../../lib/constants';
import { PROFILE_PATTERNS } from '../../../../shared/profiles';
import { CROSS_STYLE_INSIGHTS } from '../../../../shared/crossStyle';

interface Props {
  profiles: DiscProfile[];
  managerProfile: DiscProfile | null;
  sessionName: string;
}

const DIMS: DiscDimension[] = ['D', 'I', 'S', 'C'];

function DiscBars({ percentages }: { percentages: Record<DiscDimension, number> }) {
  return (
    <div className="flex flex-col gap-2 mb-5">
      {DIMS.map((d) => (
        <div key={d} className="flex items-center gap-3">
          <span className="text-xs font-black w-3" style={{ color: DISC_COLORS[d] }}>{d}</span>
          <div className="flex-1 bg-slate-700 rounded-full h-3">
            <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${percentages[d]}%`, backgroundColor: DISC_COLORS[d] }} />
          </div>
          <span className="text-slate-300 text-xs font-bold w-8 text-right">{percentages[d]}%</span>
        </div>
      ))}
    </div>
  );
}

function ProfileCard({ profile, managerPrimary }: { profile: DiscProfile; managerPrimary?: DiscDimension }) {
  const pattern = PROFILE_PATTERNS[profile.patternKey];
  const crossKey = managerPrimary ? `${managerPrimary}-${profile.primary}` : null;
  const crossInsight = crossKey ? CROSS_STYLE_INSIGHTS[crossKey] : null;

  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-white font-black text-xl">{profile.playerName}</h3>
        <p className="text-[#ffd700] font-bold">{profile.patternKey} — {profile.patternLabel}</p>
        {profile.isBlended && <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full mt-1 inline-block">Blended style</span>}
      </div>

      <DiscBars percentages={profile.percentages} />

      {pattern && (
        <div className="flex flex-col gap-3 text-sm mb-4">
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

      {crossInsight && (
        <div className="border-t border-slate-700 pt-4">
          <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-3">You & {profile.playerName.split(' ')[0]}</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="bg-slate-900/50 rounded-xl p-3">
              <p className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">🔗 Dynamic</p>
              <p className="text-slate-300">{crossInsight.dynamic}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-3">
              <p className="text-orange-400 font-bold text-xs uppercase tracking-wider mb-1">👁 Watch for</p>
              <p className="text-slate-300">{crossInsight.watchFor}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-3">
              <p className="text-green-400 font-bold text-xs uppercase tracking-wider mb-1">💡 Bridge tip</p>
              <p className="text-slate-300">{crossInsight.bridgeTip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ManagerProfileCard({ profile }: { profile: DiscProfile }) {
  const pattern = PROFILE_PATTERNS[profile.patternKey];
  return (
    <div className="bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-[#ffd700]" />
        <p className="text-[#ffd700] text-xs font-bold uppercase tracking-wider">Your Profile</p>
      </div>
      <h3 className="text-white font-black text-xl mb-1">{profile.playerName}</h3>
      <p className="text-[#ffd700] font-bold mb-1">{profile.patternKey} — {profile.patternLabel}</p>
      {profile.isBlended && <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full mb-3 inline-block">Blended style</span>}
      <DiscBars percentages={profile.percentages} />
      {pattern && (
        <div className="bg-slate-900/50 rounded-xl p-3 text-sm">
          <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">About your style</p>
          <p className="text-slate-300">{pattern.description}</p>
        </div>
      )}
    </div>
  );
}

function TeamOverview({ profiles }: { profiles: DiscProfile[] }) {
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
              <div className="h-4 rounded-full" style={{ width: `${avg[d]}%`, backgroundColor: DISC_COLORS[d] }} />
            </div>
            <span className="text-slate-300 text-sm font-bold w-10 text-right">{avg[d]}%</span>
          </div>
        ))}
      </div>
      <div className="bg-slate-900/50 rounded-xl p-4 text-sm text-slate-300">
        Your team skews <strong style={{ color: DISC_COLORS[dominantDim] }}>{DISC_LABELS[dominantDim]}</strong> — strong on{' '}
        {dominantDim === 'D' && 'results and decisiveness'}
        {dominantDim === 'I' && 'energy and relationships'}
        {dominantDim === 'S' && 'consistency and reliability'}
        {dominantDim === 'C' && 'precision and quality'}
        . Consider consciously investing in <strong style={{ color: DISC_COLORS[weakestDim] }}>{DISC_LABELS[weakestDim]}</strong> behaviours.
      </div>
    </div>
  );
}

export default function ManagerResults({ profiles, managerProfile, sessionName }: Props) {
  const [view, setView] = useState<'team' | 'individual' | 'manager'>('team');

  function downloadCSV() {
    const header = ['Name', 'Role', 'Pattern', 'Label', 'D%', 'I%', 'S%', 'C%', 'Blended'];
    const rows = [
      ...(managerProfile ? [[managerProfile.playerName, 'Manager', managerProfile.patternKey, managerProfile.patternLabel, managerProfile.percentages.D, managerProfile.percentages.I, managerProfile.percentages.S, managerProfile.percentages.C, managerProfile.isBlended ? 'Yes' : 'No']] : []),
      ...profiles.map((p) => [p.playerName, 'Team Member', p.patternKey, p.patternLabel, p.percentages.D, p.percentages.I, p.percentages.S, p.percentages.C, p.isBlended ? 'Yes' : 'No']),
    ];
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sessionName.replace(/\s+/g, '-')}-DISC-results.csv`;
    a.click();
  }

  const tabs = [
    { id: 'team', label: 'Team Overview' },
    { id: 'individual', label: 'Team Profiles' },
    ...(managerProfile ? [{ id: 'manager', label: 'Your Profile' }] : []),
  ] as const;

  return (
    <div className="min-h-screen px-4 py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-black text-white">Results</h1>
        <button onClick={downloadCSV} className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
          Export CSV
        </button>
      </div>
      <p className="text-slate-400 mb-6">{sessionName}</p>

      <div className="flex bg-slate-800 rounded-xl p-1 mb-6 w-fit gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setView(t.id as typeof view)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === t.id ? 'bg-[#ffd700] text-[#0f172a]' : 'text-slate-400 hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {view === 'team' && <TeamOverview profiles={profiles} />}

      {view === 'individual' && (
        <div className="flex flex-col gap-6">
          {profiles.map((p) => (
            <ProfileCard key={p.playerId} profile={p} managerPrimary={managerProfile?.primary} />
          ))}
        </div>
      )}

      {view === 'manager' && managerProfile && (
        <div>
          <ManagerProfileCard profile={managerProfile} />
          <h3 className="text-white font-black text-lg mb-4">You & Your Team</h3>
          <div className="flex flex-col gap-6">
            {profiles.map((p) => {
              const crossKey = `${managerProfile.primary}-${p.primary}`;
              const insight = CROSS_STYLE_INSIGHTS[crossKey];
              if (!insight) return null;
              return (
                <div key={p.playerId} className="bg-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <p className="text-white font-bold">{p.playerName}</p>
                      <p className="text-slate-400 text-sm">{p.patternKey} — {p.patternLabel}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="bg-slate-900/50 rounded-xl p-3">
                      <p className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">🔗 Dynamic</p>
                      <p className="text-slate-300">{insight.dynamic}</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-3">
                      <p className="text-orange-400 font-bold text-xs uppercase tracking-wider mb-1">👁 Watch for</p>
                      <p className="text-slate-300">{insight.watchFor}</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-3">
                      <p className="text-green-400 font-bold text-xs uppercase tracking-wider mb-1">💡 Bridge tip</p>
                      <p className="text-slate-300">{insight.bridgeTip}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
