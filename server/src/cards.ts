import { Card } from '../../shared/types';

export const CARDS: Card[] = [
  // --- SITE PRESSURE (5 cards) ---
  {
    id: 'c01',
    category: 'Site Pressure',
    scenario: 'A subcontractor turns up on site and the scope of their work hasn\'t been clearly defined. What do you do first?',
    options: [
      { id: 'c01-D', text: 'Sort it out yourself on the spot — you know what needs doing', dimension: 'D' },
      { id: 'c01-I', text: 'Pull everyone together for a quick huddle to get on the same page', dimension: 'I' },
      { id: 'c01-S', text: 'Check in with the subcontractor to understand what they were told and make sure they feel clear', dimension: 'S' },
      { id: 'c01-C', text: 'Go back to the contract documents and get the scope in writing before anyone starts work', dimension: 'C' },
    ],
  },
  {
    id: 'c02',
    category: 'Site Pressure',
    scenario: 'The programme is three days behind and the client is coming for a site visit tomorrow. How do you respond?',
    options: [
      { id: 'c02-D', text: 'Put a recovery plan together and present it confidently — focus on what you\'re doing to fix it', dimension: 'D' },
      { id: 'c02-I', text: 'Talk to the team, get everyone rallied, and make the site look its best for the visit', dimension: 'I' },
      { id: 'c02-S', text: 'Make sure everyone knows their role for tomorrow so no one is caught off guard', dimension: 'S' },
      { id: 'c02-C', text: 'Prepare a detailed programme update with root cause analysis and revised milestones', dimension: 'C' },
    ],
  },
  {
    id: 'c03',
    category: 'Site Pressure',
    scenario: 'Unexpected ground conditions have been discovered mid-excavation. Work has stopped. What\'s your first move?',
    options: [
      { id: 'c03-D', text: 'Make a call on how to proceed — waiting costs money and time', dimension: 'D' },
      { id: 'c03-I', text: 'Get the key people in a room and work through it together', dimension: 'I' },
      { id: 'c03-S', text: 'Make sure the crew is safe and comfortable while you work out the next steps', dimension: 'S' },
      { id: 'c03-C', text: 'Document everything, raise an RFI, and get a geotechnical engineer\'s advice before proceeding', dimension: 'C' },
    ],
  },
  {
    id: 'c04',
    category: 'Site Pressure',
    scenario: 'A piece of plant breaks down on a critical path activity. The repair will take two days. What do you do?',
    options: [
      { id: 'c04-D', text: 'Source a replacement immediately and keep the programme moving — downtime isn\'t an option', dimension: 'D' },
      { id: 'c04-I', text: 'Get the team together to brainstorm how to work around it and keep morale up', dimension: 'I' },
      { id: 'c04-S', text: 'Reassign the crew to other tasks so no one is standing around frustrated', dimension: 'S' },
      { id: 'c04-C', text: 'Update the programme, assess the knock-on impacts, and notify the relevant parties in writing', dimension: 'C' },
    ],
  },
  {
    id: 'c05',
    category: 'Site Pressure',
    scenario: 'It\'s Friday afternoon and you realise a key material delivery won\'t arrive until Monday, stalling Monday\'s work. What do you do?',
    options: [
      { id: 'c05-D', text: 'Call the supplier directly and push hard to get it sorted before end of day', dimension: 'D' },
      { id: 'c05-I', text: 'Loop in the team, keep the mood light, and work together to find an alternative', dimension: 'I' },
      { id: 'c05-S', text: 'Let the crew know early so they\'re not turning up Monday expecting work that isn\'t there', dimension: 'S' },
      { id: 'c05-C', text: 'Review the programme to see what can be resequenced and document the delay formally', dimension: 'C' },
    ],
  },

  // --- PEOPLE & CREW (5 cards) ---
  {
    id: 'c06',
    category: 'People & Crew',
    scenario: 'Two experienced workers on your crew have a falling out and the tension is affecting the whole team. How do you handle it?',
    options: [
      { id: 'c06-D', text: 'Pull them both aside separately, tell them to sort it out or you\'ll move one of them', dimension: 'D' },
      { id: 'c06-I', text: 'Bring them together in a relaxed setting and help them talk it through', dimension: 'I' },
      { id: 'c06-S', text: 'Check in with each of them privately to understand how they\'re feeling before doing anything', dimension: 'S' },
      { id: 'c06-C', text: 'Observe the situation carefully before acting to make sure you have the full picture', dimension: 'C' },
    ],
  },
  {
    id: 'c07',
    category: 'People & Crew',
    scenario: 'A new site worker starts Monday. They\'re skilled but haven\'t worked on this type of project before. How do you set them up?',
    options: [
      { id: 'c07-D', text: 'Give them a clear brief on what\'s expected and let them get on with it', dimension: 'D' },
      { id: 'c07-I', text: 'Introduce them to the whole crew and make sure they feel like part of the team from day one', dimension: 'I' },
      { id: 'c07-S', text: 'Pair them with someone experienced to ease them in steadily', dimension: 'S' },
      { id: 'c07-C', text: 'Walk them through the site-specific procedures, drawings, and what\'s expected in detail', dimension: 'C' },
    ],
  },
  {
    id: 'c08',
    category: 'People & Crew',
    scenario: 'You notice a crew member has been quieter than usual and their output has dropped. What do you do?',
    options: [
      { id: 'c08-D', text: 'Address it directly — ask them what\'s going on and what they need to lift their performance', dimension: 'D' },
      { id: 'c08-I', text: 'Find a moment to have a casual chat and see if you can lift their spirits', dimension: 'I' },
      { id: 'c08-S', text: 'Check in gently and let them know you\'ve noticed and that you\'re there if they need support', dimension: 'S' },
      { id: 'c08-C', text: 'Monitor it for a few more days and document before raising it formally', dimension: 'C' },
    ],
  },
  {
    id: 'c09',
    category: 'People & Crew',
    scenario: 'You need to run the morning toolbox talk. What does that look like for you?',
    options: [
      { id: 'c09-D', text: 'Quick, to the point — cover the priority tasks and hazards and get everyone moving', dimension: 'D' },
      { id: 'c09-I', text: 'Energetic and engaging — get the crew switched on and fired up for the day', dimension: 'I' },
      { id: 'c09-S', text: 'Thorough and calm — make sure everyone understands what\'s happening and has a chance to raise concerns', dimension: 'S' },
      { id: 'c09-C', text: 'Structured and detailed — cover all hazards methodically and ensure signoffs are completed', dimension: 'C' },
    ],
  },
  {
    id: 'c10',
    category: 'People & Crew',
    scenario: 'A crew member pushes back on how you\'ve asked them to do a task and suggests a different method. How do you respond?',
    options: [
      { id: 'c10-D', text: 'Hear it quickly — if it\'s better, use it. If not, move on and stick with your approach', dimension: 'D' },
      { id: 'c10-I', text: 'Encourage it — you want people speaking up, and it\'s good for morale when ideas are welcomed', dimension: 'I' },
      { id: 'c10-S', text: 'Listen carefully and make sure they feel heard before deciding either way', dimension: 'S' },
      { id: 'c10-C', text: 'Assess their method against the spec and best practice before making a call', dimension: 'C' },
    ],
  },

  // --- CLIENTS & STAKEHOLDERS (5 cards) ---
  {
    id: 'c11',
    category: 'Clients & Stakeholders',
    scenario: 'The client requests a scope change mid-project that will add cost and time. How do you handle the conversation?',
    options: [
      { id: 'c11-D', text: 'Be direct — tell them it\'s a variation, here\'s the cost, here\'s the time impact', dimension: 'D' },
      { id: 'c11-I', text: 'Have a collaborative conversation — work through the impact together and keep the relationship positive', dimension: 'I' },
      { id: 'c11-S', text: 'Make sure they understand the full impact and feel comfortable before any decisions are made', dimension: 'S' },
      { id: 'c11-C', text: 'Prepare a formal variation notice with full cost and programme breakdown before the conversation', dimension: 'C' },
    ],
  },
  {
    id: 'c12',
    category: 'Clients & Stakeholders',
    scenario: 'A client is calling you daily asking for updates and it\'s starting to impact your ability to get work done. What do you do?',
    options: [
      { id: 'c12-D', text: 'Set a boundary — tell them you\'ll send a weekly update and calls should be for urgent issues only', dimension: 'D' },
      { id: 'c12-I', text: 'Build a better relationship with them so they feel confident enough not to need to call every day', dimension: 'I' },
      { id: 'c12-S', text: 'Keep taking the calls — they\'re clearly anxious and making them feel heard is part of the job', dimension: 'S' },
      { id: 'c12-C', text: 'Set up a structured reporting framework with regular written updates to reduce ad hoc contact', dimension: 'C' },
    ],
  },
  {
    id: 'c13',
    category: 'Clients & Stakeholders',
    scenario: 'An RFI has been sitting with the designer for two weeks and it\'s about to hold up a critical activity. What do you do?',
    options: [
      { id: 'c13-D', text: 'Escalate immediately — go above the designer if needed to get an answer', dimension: 'D' },
      { id: 'c13-I', text: 'Call the designer, build rapport, and motivate them to prioritise your RFI', dimension: 'I' },
      { id: 'c13-S', text: 'Follow up politely and try to understand what\'s causing the delay on their end', dimension: 'S' },
      { id: 'c13-C', text: 'Send a formal written notice linking the RFI to the delay and request a response date', dimension: 'C' },
    ],
  },
  {
    id: 'c14',
    category: 'Clients & Stakeholders',
    scenario: 'A council inspector arrives unannounced for a site inspection. How do you approach it?',
    options: [
      { id: 'c14-D', text: 'Take charge of the inspection — lead them around confidently and don\'t let them wander unsupervised', dimension: 'D' },
      { id: 'c14-I', text: 'Welcome them warmly and make the visit a positive, collaborative experience', dimension: 'I' },
      { id: 'c14-S', text: 'Make sure the team is aware they\'re on site so no one is caught off guard', dimension: 'S' },
      { id: 'c14-C', text: 'Ensure all documentation, signage, and compliance records are accessible and correct before accompanying them', dimension: 'C' },
    ],
  },
  {
    id: 'c15',
    category: 'Clients & Stakeholders',
    scenario: 'A neighbour of the project site is complaining about noise and dust. The client expects you to manage it. What do you do?',
    options: [
      { id: 'c15-D', text: 'Assess if the complaint is valid. If it is, fix it. If not, document your compliance and move on', dimension: 'D' },
      { id: 'c15-I', text: 'Go and introduce yourself personally to the neighbour and hear them out — relationships matter', dimension: 'I' },
      { id: 'c15-S', text: 'Make sure the neighbour feels listened to and that their concerns are taken seriously', dimension: 'S' },
      { id: 'c15-C', text: 'Review your Construction Management Plan obligations and ensure you\'re fully compliant before responding', dimension: 'C' },
    ],
  },

  // --- SAFETY & COMPLIANCE (5 cards) ---
  {
    id: 'c16',
    category: 'Safety & Compliance',
    scenario: 'A near-miss incident occurs on site — no one is hurt but it could have been serious. What\'s your first response?',
    options: [
      { id: 'c16-D', text: 'Stop the relevant work immediately and deal with the hazard — investigate after', dimension: 'D' },
      { id: 'c16-I', text: 'Gather the team, talk it through openly, and make sure everyone learns from it together', dimension: 'I' },
      { id: 'c16-S', text: 'Check in with the workers involved to make sure they\'re okay before anything else', dimension: 'S' },
      { id: 'c16-C', text: 'Secure the scene, start the incident report, and initiate a formal investigation process', dimension: 'C' },
    ],
  },
  {
    id: 'c17',
    category: 'Safety & Compliance',
    scenario: 'You observe a worker not wearing the correct PPE. It\'s not the first time. How do you address it?',
    options: [
      { id: 'c17-D', text: 'Stop them on the spot — make it clear this isn\'t negotiable and there will be consequences if it happens again', dimension: 'D' },
      { id: 'c17-I', text: 'Pull them aside in a friendly way and help them understand why it matters', dimension: 'I' },
      { id: 'c17-S', text: 'Have a private conversation to understand why it keeps happening and see if there\'s an underlying issue', dimension: 'S' },
      { id: 'c17-C', text: 'Issue a formal written warning and document the incident per your HSMS procedures', dimension: 'C' },
    ],
  },
  {
    id: 'c18',
    category: 'Safety & Compliance',
    scenario: 'A worker raises a safety concern about a method statement they feel is inadequate. How do you respond?',
    options: [
      { id: 'c18-D', text: 'Make a judgement call on whether the concern is valid and act accordingly', dimension: 'D' },
      { id: 'c18-I', text: 'Bring the relevant people together to talk it through and find a better way as a group', dimension: 'I' },
      { id: 'c18-S', text: 'Thank them for raising it, listen carefully, and make sure they know their voice matters', dimension: 'S' },
      { id: 'c18-C', text: 'Review the method statement against the relevant standards before deciding if it needs updating', dimension: 'C' },
    ],
  },
  {
    id: 'c19',
    category: 'Safety & Compliance',
    scenario: 'An audit is scheduled for next week and you know one area of the site won\'t be fully compliant in time. What do you do?',
    options: [
      { id: 'c19-D', text: 'Prioritise the non-compliant area and get it sorted before the audit — no excuses', dimension: 'D' },
      { id: 'c19-I', text: 'Rally the team to help get it across the line and treat it as a shared goal', dimension: 'I' },
      { id: 'c19-S', text: 'Make sure the team isn\'t stressed about it — work through it steadily and calmly', dimension: 'S' },
      { id: 'c19-C', text: 'Prepare a corrective action plan and disclose the gap to the auditor proactively with a timeline', dimension: 'C' },
    ],
  },
  {
    id: 'c20',
    category: 'Safety & Compliance',
    scenario: 'You need to introduce a new safety procedure that the crew think is overly bureaucratic. How do you get buy-in?',
    options: [
      { id: 'c20-D', text: 'It\'s not optional — tell them it\'s happening and why, and expect compliance', dimension: 'D' },
      { id: 'c20-I', text: 'Sell it to them — frame it in a way that gets them excited about why it matters', dimension: 'I' },
      { id: 'c20-S', text: 'Take time to explain the reasoning behind it and address each concern patiently', dimension: 'S' },
      { id: 'c20-C', text: 'Show them the evidence, standards, or incident data that drove the change', dimension: 'C' },
    ],
  },

  // --- PLANNING & PROBLEM SOLVING (4 cards) ---
  {
    id: 'c21',
    category: 'Planning & Problem Solving',
    scenario: 'A design change arrives mid-pour and the engineer says the current approach is no longer suitable. What do you do?',
    options: [
      { id: 'c21-D', text: 'Stop work, make the call on the revised approach, and keep moving with minimal delay', dimension: 'D' },
      { id: 'c21-I', text: 'Get the team and engineer together to work through the revised approach collaboratively', dimension: 'I' },
      { id: 'c21-S', text: 'Make sure the crew understands the change and feels confident before restarting', dimension: 'S' },
      { id: 'c21-C', text: 'Get the revised design instruction in writing before proceeding and update the SWMS', dimension: 'C' },
    ],
  },
  {
    id: 'c22',
    category: 'Planning & Problem Solving',
    scenario: 'You\'re planning next week\'s programme and have three competing priorities with the same deadline. How do you approach it?',
    options: [
      { id: 'c22-D', text: 'Decide what\'s most critical, assign resources to it, and push everything else', dimension: 'D' },
      { id: 'c22-I', text: 'Get the team involved in the planning — more heads make for better solutions', dimension: 'I' },
      { id: 'c22-S', text: 'Work through it steadily and make sure the team isn\'t overwhelmed by the competing demands', dimension: 'S' },
      { id: 'c22-C', text: 'Map it out in detail — programme, resources, dependencies — before committing to a sequence', dimension: 'C' },
    ],
  },
  {
    id: 'c23',
    category: 'Planning & Problem Solving',
    scenario: 'Procurement has fallen behind and a key material won\'t be available for three weeks. The programme doesn\'t allow for it. How do you respond?',
    options: [
      { id: 'c23-D', text: 'Escalate to get the delivery accelerated and look for alternative suppliers in parallel', dimension: 'D' },
      { id: 'c23-I', text: 'Get the right people together and brainstorm how to resequence work to fill the gap', dimension: 'I' },
      { id: 'c23-S', text: 'Keep the team informed so expectations are managed and no one is left in the dark', dimension: 'S' },
      { id: 'c23-C', text: 'Update the programme formally, document the delay, and notify the client with a revised schedule', dimension: 'C' },
    ],
  },
  {
    id: 'c24',
    category: 'Planning & Problem Solving',
    scenario: 'You\'re handed a project that has been poorly set up by the previous manager. Records are incomplete and the programme is unrealistic. Where do you start?',
    options: [
      { id: 'c24-D', text: 'Take stock quickly, reset expectations with the client, and start driving a new way forward', dimension: 'D' },
      { id: 'c24-I', text: 'Get the team together, acknowledge the situation honestly, and build a shared plan to recover', dimension: 'I' },
      { id: 'c24-S', text: 'Make sure the team feels supported through the transition — change like this can be unsettling', dimension: 'S' },
      { id: 'c24-C', text: 'Do a full audit of the existing records, identify the gaps, and build a proper baseline before moving', dimension: 'C' },
    ],
  },
];
