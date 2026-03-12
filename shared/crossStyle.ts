// Cross-style insights: how a manager's primary style interacts with each team member's primary style
// Key format: `${managerPrimary}-${memberPrimary}`

export const CROSS_STYLE_INSIGHTS: Record<string, { dynamic: string; watchFor: string; bridgeTip: string }> = {
  'D-D': {
    dynamic: 'Two high-D styles — fast-moving, results-driven, and direct. Natural alignment on pace and accountability.',
    watchFor: 'Competing for control. Two Ds can clash on who has the final say, especially under pressure.',
    bridgeTip: 'Be explicit about who owns what. Give them clear territory and let them run — don\'t fight over the wheel.',
  },
  'D-I': {
    dynamic: 'You move fast and decide quickly. They bring energy, enthusiasm, and pull people with them.',
    watchFor: 'You may see them as unfocused; they may see you as dismissive of the relationship side of the job.',
    bridgeTip: 'Involve them early in decisions and let them communicate outcomes to the team — they\'ll run with it.',
  },
  'D-S': {
    dynamic: 'You\'re direct and decisive; they\'re steady and supportive. Complementary but easy to misread each other.',
    watchFor: 'Your pace and directness can feel overwhelming to an S. They\'ll absorb pressure quietly rather than push back.',
    bridgeTip: 'Slow down long enough to check in. They need to feel steady — brief them early and give them time to adjust.',
  },
  'D-C': {
    dynamic: 'You want to move; they want to get it right first. Natural tension between speed and quality.',
    watchFor: 'You\'ll frustrate them by deciding before they\'ve analysed. They\'ll frustrate you by not being ready.',
    bridgeTip: 'Give them time to prepare before key decisions. Trust their data — it\'ll save you rework downstream.',
  },
  'I-D': {
    dynamic: 'You bring energy and people focus; they bring drive and accountability. Strong combination on site.',
    watchFor: 'They may see your relationship-first approach as soft. You may find their directness blunt.',
    bridgeTip: 'Let them own delivery and results — they\'ll respect that. Keep the team culture side as your lane.',
  },
  'I-I': {
    dynamic: 'High energy, collaborative, enthusiastic. Sessions will be lively and buy-in will come easily.',
    watchFor: 'Both of you can over-commit, under-follow-through, and avoid difficult conversations.',
    bridgeTip: 'Build in structured accountability — who owns what and by when. The energy is there, the process needs work.',
  },
  'I-S': {
    dynamic: 'You bring the spark; they bring the steadiness. A natural complement — they\'ll follow your lead warmly.',
    watchFor: 'They won\'t always tell you when something\'s wrong. They\'ll absorb stress rather than raise it.',
    bridgeTip: 'Create safe check-in moments. Ask specific questions, not just "all good?" — they need an invitation to open up.',
  },
  'I-C': {
    dynamic: 'You\'re people-first and spontaneous; they\'re detail-first and measured. Different operating speeds.',
    watchFor: 'They\'ll disengage from enthusiasm without substance. They need to trust the process before they trust the person.',
    bridgeTip: 'Back up your energy with facts. Show them you\'ve thought it through — then they\'ll commit fully.',
  },
  'S-D': {
    dynamic: 'You lead with patience and support; they lead with pace and results. They\'ll push harder than feels comfortable.',
    watchFor: 'They may read your steadiness as a lack of urgency. You may find their directness comes across as aggressive.',
    bridgeTip: 'Be clear on your decisions, even if your style is gentle. D styles respond to clarity and follow-through.',
  },
  'S-I': {
    dynamic: 'Warm, collaborative, people-centred. You\'ll build a great team culture together naturally.',
    watchFor: 'Neither of you will naturally push for hard accountability. Conflict will get avoided until it\'s unavoidable.',
    bridgeTip: 'Hold each other to commitments. The relationship is solid — use it to have the hard conversations earlier.',
  },
  'S-S': {
    dynamic: 'Calm, consistent, and low-friction. The team will feel well-supported and psychologically safe.',
    watchFor: 'Decisions may be slow. Change will be resisted. Difficult conversations will be avoided by both of you.',
    bridgeTip: 'Push yourself to decide and act faster than feels natural. Stability is a strength, but it can become stagnation.',
  },
  'S-C': {
    dynamic: 'Both of you value doing things right and avoiding risk. Methodical and dependable combination.',
    watchFor: 'You may be too accommodating of their need for more time and information. Deadlines will suffer.',
    bridgeTip: 'Set clear timeboxes for analysis. Support their process but hold the line on when decisions need to be made.',
  },
  'C-D': {
    dynamic: 'You focus on quality and process; they focus on results and speed. Productive tension if managed well.',
    watchFor: 'They\'ll see your standards as slowing things down. You\'ll see their speed as reckless.',
    bridgeTip: 'Pick your battles on quality. Not everything needs to be perfect — align on what does and give ground on the rest.',
  },
  'C-I': {
    dynamic: 'You bring rigour; they bring energy. A strong pairing if you lean on each other\'s strengths.',
    watchFor: 'You may find their enthusiasm light on substance. They\'ll find your detail-focus deflating.',
    bridgeTip: 'Validate their ideas before you analyse them. They need to feel heard first — then they\'ll welcome the detail.',
  },
  'C-S': {
    dynamic: 'Both careful, both reliable, both quality-focused. A dependable and low-drama combination.',
    watchFor: 'Neither of you naturally drives urgency or challenges the status quo. Things can drift.',
    bridgeTip: 'Set explicit timelines and review points. The quality is there — build in the cadence to keep things moving.',
  },
  'C-C': {
    dynamic: 'High standards, rigorous process, minimal errors. When it\'s right, it\'s right.',
    watchFor: 'Analysis paralysis. Over-engineering. Slow decisions. Neither of you will move without certainty.',
    bridgeTip: 'Agree on a "good enough to proceed" standard upfront. Perfect can be the enemy of done on a live site.',
  },
};
