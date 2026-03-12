// Shared types between client and server

export type DiscDimension = 'D' | 'I' | 'S' | 'C';

export interface CardOption {
  id: string;
  text: string;
  dimension: DiscDimension;
}

export interface Card {
  id: string;
  category: string;
  scenario: string;
  options: CardOption[]; // always 4, one per dimension
}

// Ranking submitted by a player for one card
// rank[0] = option id ranked 1st (most like me), rank[3] = 4th
export type CardRanking = string[]; // array of option ids in ranked order

export interface Player {
  id: string; // socket id
  name: string;
  submissions: Record<string, CardRanking>; // cardId -> ranking
  scores: Record<DiscDimension, number>;
}

export interface GameRoom {
  code: string;
  sessionName: string;
  managerId: string;
  players: Record<string, Player>;
  status: 'lobby' | 'playing' | 'results';
  currentCardIndex: number;
  cards: Card[];
}

// Profile result computed from scores
export interface DiscProfile {
  playerId: string;
  playerName: string;
  scores: Record<DiscDimension, number>;
  percentages: Record<DiscDimension, number>;
  primary: DiscDimension;
  secondary: DiscDimension;
  patternKey: string; // e.g. "D/C"
  patternLabel: string; // e.g. "The Project Controller"
  isBlended: boolean;
}

// Socket event payloads — client to server
export interface CreateSessionPayload {
  sessionName: string;
}

export interface JoinSessionPayload {
  code: string;
  playerName: string;
}

export interface SubmitRankingPayload {
  cardId: string;
  ranking: CardRanking;
}

// Socket event payloads — server to client
export interface RoomStatePayload {
  room: Omit<GameRoom, 'cards'> & { cards: Omit<Card, 'options'>[] };
}

export interface CardPayload {
  card: Card;
  cardIndex: number;
  totalCards: number;
}

export interface SubmissionUpdatePayload {
  submittedPlayerIds: string[];
  totalPlayers: number;
  liveScores: Record<string, Record<DiscDimension, number>>;
}

export interface ResultsPayload {
  profiles: DiscProfile[];
}
