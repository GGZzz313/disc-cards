export interface ProfilePattern {
  label: string;
  description: string;
  communicate: string;
  lead: string;
  stress: string;
  worksWith: string;
}

export const PROFILE_PATTERNS: Record<string, ProfilePattern> = {
  'D/I': {
    label: 'The Driver',
    description: 'Pushes hard, brings people with them. High energy and results-focused.',
    communicate: "Be direct and keep it moving. They respond to energy and outcomes — skip the detail, lead with the goal.",
    lead: "Give them big challenges and visibility. They thrive on competition and moving fast. Avoid micromanaging.",
    stress: "Can become impatient or dismissive of others when under pressure. May steamroll team members.",
    worksWith: "Works well with S and C styles who can balance their pace with steadiness and detail.",
  },
  'D/S': {
    label: 'The Steady Commander',
    description: 'Firm decisions with consistent follow-through. Reliable and results-driven.',
    communicate: "Direct and concise. They respect efficiency and follow-through — tell them what's needed and by when.",
    lead: "Give them clear accountability and trust them to deliver. They don't need hand-holding — just remove blockers.",
    stress: "May become stubborn or resistant to input from others when stressed. Can take on too much alone.",
    worksWith: "Works well with I styles who bring energy and relationship-building they may not prioritise.",
  },
  'D/C': {
    label: 'The Project Controller',
    description: 'Decisive and detail-driven. Combines strong direction with a commitment to getting it right.',
    communicate: "Be direct and structured. Lead with facts. Give them time to review information before decisions.",
    lead: "Set clear goals with defined standards. They'll drive themselves — your job is to remove blockers.",
    stress: "May become overly critical or perfectionistic when the programme is slipping.",
    worksWith: "Works well with I and S styles who balance their drive with energy and warmth.",
  },
  'I/D': {
    label: 'The Energiser',
    description: 'High energy, action-oriented, and competitive. Leads by inspiring others to move fast.',
    communicate: "Keep it enthusiastic and collaborative. They like being involved in decisions and hearing the big picture.",
    lead: "Give them variety, autonomy, and public recognition. Keep them engaged or they'll disengage quickly.",
    stress: "Becomes impulsive and over-commits when under pressure. Can lose focus on detail.",
    worksWith: "Works well with C and S styles who bring structure and steadiness to their energy.",
  },
  'I/S': {
    label: 'The Site Culture Builder',
    description: 'Morale, relationships, and consistency. The person who holds the crew together.',
    communicate: "Conversational and warm. They want to feel included and valued — take time for the relationship.",
    lead: "Recognise their contribution to team culture. Give them stable, people-focused responsibilities.",
    stress: "Avoids conflict even when they shouldn't. May absorb stress quietly rather than raising issues.",
    worksWith: "Works well with D and C styles who provide direction and structure they may lack.",
  },
  'I/C': {
    label: 'The Communicator',
    description: 'Enthusiastic but thorough. Brings people along while keeping a close eye on the detail.',
    communicate: "Engage them in discussion. They respond well to being consulted and given context.",
    lead: "Give them work that involves both people and process. They like to explain, present, and persuade.",
    stress: "Can overthink and over-communicate when stressed. May struggle to make a call under pressure.",
    worksWith: "Works well with D and S styles who provide decisiveness and calm.",
  },
  'S/D': {
    label: 'The Loyal Executor',
    description: "Dependable and gets things done without fuss. Reliable under pressure.",
    communicate: "Clear and direct. They appreciate knowing exactly what's expected and having the support to deliver.",
    lead: "Give them consistency and clear goals. They'll deliver reliably — reward that with trust and stability.",
    stress: "May become passive-aggressive or withdrawn when pushed too hard or treated unfairly.",
    worksWith: "Works well with I styles who bring energy and people skills they tend to keep quiet.",
  },
  'S/I': {
    label: 'The Team Anchor',
    description: 'Warm, reliable, and the glue of the crew. Everyone feels supported around them.',
    communicate: "Friendly and genuine. They respond to relationships first — build trust before directing.",
    lead: "Create stability and inclusion. They thrive when the team is functioning well and morale is high.",
    stress: "Struggles with conflict and will avoid it even when it needs to happen.",
    worksWith: "Works well with D and C styles who provide direction and structure.",
  },
  'S/C': {
    label: 'The Finisher',
    description: "Steady, precise, and gets it done right. Doesn't rush, doesn't cut corners.",
    communicate: "Patient and structured. Give them time to process and avoid springing things on them last minute.",
    lead: "Provide clear expectations and quality standards. They'll deliver consistently — give them ownership of detail.",
    stress: "Becomes passive or over-cautious when stressed. May not raise issues until it's too late.",
    worksWith: "Works well with D and I styles who bring pace and energy to their methodical approach.",
  },
  'C/D': {
    label: 'The Standards Keeper',
    description: "Quality-driven and not afraid to push back. Holds the line on how things should be done.",
    communicate: "Structured and factual. Back up requests with data and reasoning — they won't act on gut alone.",
    lead: "Give them authority over quality and process. Trust their judgement on standards — it's usually right.",
    stress: "Can become inflexible or overcritical when quality is threatened. May slow things down.",
    worksWith: "Works well with I and S styles who soften their directness and keep relationships warm.",
  },
  'C/I': {
    label: 'The Analyst',
    description: 'Detail-first but can read the room. Brings precision without losing the human element.',
    communicate: "Give them data and context upfront. They like to be prepared and will ask good questions.",
    lead: "Pair them on work that needs both rigour and communication. They bridge the gap between technical and people.",
    stress: "Can become withdrawn and over-analytical when stressed. May struggle to act without certainty.",
    worksWith: "Works well with D and S styles who can move things forward while they perfect the plan.",
  },
  'C/S': {
    label: 'The Safe Pair of Hands',
    description: "Methodical, low-risk, and dependable. If it's in their scope, it's done right.",
    communicate: "Structured and patient. Give them written information and avoid sudden changes without explanation.",
    lead: "Give them defined scope and clear standards. They'll deliver — but need time and clarity to do so.",
    stress: "Becomes paralysed by uncertainty or change. May need reassurance during ambiguous periods.",
    worksWith: "Works well with D and I styles who bring decisiveness and energy they don't naturally have.",
  },
  'D': {
    label: 'The Frontrunner',
    description: "Pure drive, moves fast, leads from the front. Results above everything.",
    communicate: "Bottom line first, always. No small talk — what's needed and by when.",
    lead: "Challenge them constantly. Give autonomy and accountability. They need to feel like they're winning.",
    stress: "Becomes controlling and dismissive of others' input under pressure.",
    worksWith: "Needs I, S, and C around them to bring energy, steadiness, and rigour.",
  },
  'I': {
    label: 'The Connector',
    description: "All about people and energy. Can build a crew's culture single-handedly.",
    communicate: "Warm and enthusiastic. Make them feel included and valued in every interaction.",
    lead: "Public recognition, variety, and involvement in decisions. Isolation kills their motivation.",
    stress: "Becomes impulsive and scattered when stressed. Over-talks and under-delivers.",
    worksWith: "Needs D and C styles to add structure and follow-through to their energy.",
  },
  'S': {
    label: 'The Foundation',
    description: "Calm, consistent, and always there. The bedrock of a high-performing crew.",
    communicate: "Patient and genuine. Give them time to process — never rush or surprise them.",
    lead: "Stability and appreciation. They don't seek the spotlight but notice when they're overlooked.",
    stress: "Withdraws and goes passive. Won't raise concerns even when they should.",
    worksWith: "Needs D and I styles to provide direction and bring energy to their steadiness.",
  },
  'C': {
    label: 'The Technician',
    description: "Precision above all else. If it's worth doing, it's worth doing right.",
    communicate: "Fact-based and structured. Give them data, time to prepare, and written follow-up.",
    lead: "Clear standards, quality expectations, and the authority to uphold them.",
    stress: "Becomes over-analytical and critical under pressure. Can slow the team with perfectionism.",
    worksWith: "Needs D, I, and S styles to bring pace, people skills, and warmth.",
  },
};