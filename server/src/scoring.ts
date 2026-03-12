import type { DiscDimension, DiscProfile, Player } from '../../shared/types';
import { PROFILE_PATTERNS } from '../../shared/profiles';

export { PROFILE_PATTERNS };

const DIMENSIONS: DiscDimension[] = ['D', 'I', 'S', 'C'];

// Points per rank position (1st = 4, 2nd = 3, 3rd = 2, 4th = 1)
const RANK_POINTS = [4, 3, 2, 1];

export function computeScores(player: Player): Record<DiscDimension, number> {
  const scores: Record<DiscDimension, number> = { D: 0, I: 0, S: 0, C: 0 };

  for (const [, ranking] of Object.entries(player.submissions)) {
    ranking.forEach((optionId, rankIndex) => {
      // Option ids are formatted as `${cardId}-${dimension}`
      const dimension = optionId.split('-').pop() as DiscDimension;
      if (DIMENSIONS.includes(dimension)) {
        scores[dimension] += RANK_POINTS[rankIndex];
      }
    });
  }

  return scores;
}

export function buildProfile(player: Player): DiscProfile {
  const scores = computeScores(player);
  const totalCards = Object.keys(player.submissions).length;
  const maxPossible = totalCards * 4;

  const percentages = {} as Record<DiscDimension, number>;
  for (const dim of DIMENSIONS) {
    percentages[dim] = maxPossible > 0 ? Math.round((scores[dim] / maxPossible) * 100) : 0;
  }

  const sorted = [...DIMENSIONS].sort((a, b) => scores[b] - scores[a]);
  const primary = sorted[0];
  const secondary = sorted[1];

  const diff = percentages[primary] - percentages[secondary];
  const isBlended = diff <= 5;

  // Build pattern key — try two-dimension first, fall back to single
  const twoKey = `${primary}/${secondary}`;
  const oneKey = primary;
  const patternKey = PROFILE_PATTERNS[twoKey] ? twoKey : oneKey;
  const pattern = PROFILE_PATTERNS[patternKey] ?? PROFILE_PATTERNS['D'];

  return {
    playerId: player.id,
    playerName: player.name,
    scores,
    percentages,
    primary,
    secondary,
    patternKey,
    patternLabel: pattern.label,
    isBlended,
  };
}
