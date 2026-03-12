import type { DiscProfile, DiscDimension } from '../../../../shared/types';
import { DISC_COLORS, DISC_LABELS } from '../../lib/constants';

interface Props {
  profile: DiscProfile;
}

const DIMS: DiscDimension[] = ['D', 'I', 'S', 'C'];

export default function PlayerResults({ profile }: Props) {
  return (
    <div className="min-h-screen px-4 py-10 max-w-lg mx-auto">
      <p className="text-slate-400 text-sm uppercase tracking-widest mb-1">Your DISC Profile</p>
      <h1 className="text-3xl font-black text-white mb-1">{profile.playerName}</h1>
      <p className="text-[#ffd700] font-bold text-xl mb-6">
        {profile.patternKey} — {profile.patternLabel}
      </p>
      {profile.isBlended && (
        <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full mb-6 inline-block">
          Blended style — you sit between two dimensions
        </span>
      )}

      {/* DISC bars */}
      <div className="bg-slate-800 rounded-2xl p-5 mb-5">
        <div className="flex flex-col gap-3">
          {DIMS.map((d) => (
            <div key={d} className="flex items-center gap-3">
              <div className="w-28 flex items-center gap-1.5">
                <span className="text-xs font-black" style={{ color: DISC_COLORS[d] }}>{d}</span>
                <span className="text-slate-500 text-xs">{DISC_LABELS[d]}</span>
              </div>
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
      </div>

      <div className="bg-slate-800 rounded-2xl p-5 text-sm text-slate-300">
        <p className="text-white font-bold mb-2">What this means</p>
        <p>
          Your primary style is <strong style={{ color: DISC_COLORS[profile.primary] }}>{DISC_LABELS[profile.primary]}</strong>
          {profile.secondary && (
            <> with a strong <strong style={{ color: DISC_COLORS[profile.secondary] }}>{DISC_LABELS[profile.secondary]}</strong> tendency</>
          )}
          . Your manager will receive a full breakdown of how to communicate with you and get the best out of you on site.
        </p>
      </div>
    </div>
  );
}
