# DISC-Cards — Game Design Document
**Date:** 2026-03-12
**Context:** Civil Construction business

---

## Overview

A web-based multiplayer card game that helps managers identify where each team member sits on the DISC behavioural model (Dominance, Influence, Steadiness, Conscientiousness). Designed to approximate ~80% of the value of a formal DISC profile assessment in a ~15-minute team session.

---

## Session Structure

### Roles
- **Manager (Host)** — creates the session, controls card progression, monitors live results
- **Team Members (Players)** — join via room code, respond to cards on their own devices

### Flow
1. Manager creates a game → receives a 4-digit room code
2. Team members open the web app, enter room code + their name → join lobby
3. Manager sees lobby fill with named players, starts when ready
4. Cards presented one at a time to all players simultaneously — manager controls pace
5. Each card shows a civil construction scenario with 4 responses — players drag to rank 1–4
6. Once all players submit, manager advances to next card
7. After all 24 cards, results screen shows individual profiles + team overview
8. Manager downloads PDF/CSV report

### Card Pacing
- Players can only see the current card (no skipping ahead)
- Submission indicator shows manager how many players have answered (e.g. "4/6 submitted") without revealing responses
- Players who haven't submitted receive a gentle nudge after 60 seconds

---

## Core Mechanic

**Rank All Four (Ipsative Scoring)**

Each card presents a workplace scenario with 4 response options — one per DISC dimension. Players drag to rank them 1–4 (1 = most like me, 4 = least like me).

This mechanic replicates the ipsative structure of real DISC assessments — forcing relative comparison between traits rather than absolute ratings — which reduces social desirability bias and produces more accurate profiles.

**24 cards across 5 categories:**

| Category | Cards | Example Triggers |
|---|---|---|
| Site Pressure | 4–5 | Tight programme, weather delays, rework, inspections |
| People & Crew | 4–5 | Briefings, conflict between workers, new starters |
| Clients & Stakeholders | 4–5 | RFIs, scope changes, difficult client meetings |
| Safety & Compliance | 4–5 | Near misses, toolbox talks, non-conformances |
| Planning & Problem Solving | 3–4 | Design changes, procurement issues, equipment breakdown |

**Example Card:**
> *"A subcontractor turns up on site and the scope of their work hasn't been clearly defined. What do you do first?"*
> - "Sort it out yourself on the spot — you know what needs doing" *(D)*
> - "Pull everyone together for a quick huddle to get on the same page" *(I)*
> - "Check in with the subcontractor to understand what they were told and make sure they feel clear" *(S)*
> - "Go back to the contract documents and get the scope in writing before anyone starts work" *(C)*

Note: DISC labels are not shown to players during gameplay to prevent gaming the system. Response options are colour-coded subtly — colours are only fully revealed on the results screen.

---

## Scoring & Profile Calculation

### Raw Scoring
Each card position awards points per dimension:
- 1st = 4pts, 2nd = 3pts, 3rd = 2pts, 4th = 1pt

Across 24 cards: max 96pts per dimension.

### Profile Output
Raw scores normalised to percentages, then mapped to:
- **Primary style** — highest scoring dimension (e.g. "High D")
- **Secondary style** — second highest (e.g. "with strong C tendencies")
- **Profile pattern** — combination label with plain-english description

### 16 Named Profile Patterns (Civil Construction Framed)

| Pattern | Label | Description |
|---|---|---|
| D/I | The Driver | Pushes hard, brings people with them |
| D/S | The Steady Commander | Firm decisions, consistent follow-through |
| D/C | The Project Controller | Decisive and detail-driven |
| I/D | The Energiser | High energy, action-oriented, competitive |
| I/S | The Site Culture Builder | Morale, relationships, consistency |
| I/C | The Communicator | Enthusiastic but thorough |
| S/D | The Loyal Executor | Dependable, gets things done without fuss |
| S/I | The Team Anchor | Warm, reliable, the glue of the crew |
| S/C | The Finisher | Steady, precise, gets it done right |
| C/D | The Standards Keeper | Quality-driven, not afraid to push back |
| C/I | The Analyst | Detail-first, but can read the room |
| C/S | The Safe Pair of Hands | Methodical, low-risk, dependable |
| D | The Frontrunner | Pure drive, moves fast, leads from the front |
| I | The Connector | All about people and energy |
| S | The Foundation | Calm, consistent, always there |
| C | The Technician | Precision above all else |

### Confidence Indicator
If top two dimensions are within 5% of each other, profile is flagged as "blended" — manager is shown a note that this person sits genuinely between two styles.

---

## Profile Detail — Per Pattern

Each profile result includes four sections tailored to civil construction context:

### 1. Communication Preferences
How to deliver information, give feedback, and have difficult conversations.
- **High D:** Direct, bottom-line first, skip the small talk. "What and by when", not "why and how we feel"
- **High I:** Conversational, enthusiastic framing. Involve them early, make them feel heard
- **High S:** Give time to process, avoid surprises, frame change gradually. They won't always speak up
- **High C:** Structured, fact-based. Give them time to prepare before decisions

### 2. Leadership & Motivation
What energises them, what recognition looks like, how to get the best out of them.
- **High D:** Autonomy, challenge, clear accountability. Don't micromanage
- **High I:** Public recognition, variety, involvement in decisions
- **High S:** Stability, appreciation, being part of a reliable team
- **High C:** Clear expectations, quality standards, time to do it properly

### 3. Stress Signals
How this profile behaves under pressure — useful for reading the room on site.
- **High D under stress:** Becomes controlling, dismisses others' input
- **High I under stress:** Becomes impulsive, over-talks, loses focus
- **High S under stress:** Withdraws, becomes passive, avoids conflict even when they shouldn't
- **High C under stress:** Becomes over-analytical, paralysed by detail, overly critical

### 4. Working With Other Styles
Where this profile naturally gels or clashes with other DISC types.

---

## Visual Design

### Aesthetic: "Site-Ready Professional"
- Dark navy/charcoal base
- Hi-vis yellow (`#FFD700`) as primary accent
- DISC dimension colours:
  - D — Red
  - I — Amber
  - S — Green
  - C — Blue
- Heavy sans-serif typography (Inter or DM Sans)
- Tactile card UI — subtle shadows, visible drag handles

---

## Screen Map

### Manager Screens

**Create Session**
- Enter session name → generate 4-digit room code
- Room code displayed large with copy button + QR code for projector use

**Lobby**
- Room code prominent
- Live list of player name chips appearing as they join
- "Start Game" button (disabled until 2+ players joined)
- Ability to remove a player

**Monitor View (during game)**
- Current card number + scenario text (read-only)
- Submission tracker — player chips go green on submit (e.g. "4/6 submitted")
- Side panel: live DISC bars per player, updating after each card
- "Next Card" button — activates when all submit or manager forces advance

**Results — Individual Profile Card**
```
┌─────────────────────────────────────────┐
│  SARAH MITCHELL                         │
│  D/C — The Project Controller           │
│                                         │
│  D ████████████████░░  78%             │
│  I ████░░░░░░░░░░░░░░  32%             │
│  S ██████░░░░░░░░░░░░  41%             │
│  C ███████████████░░░  72%             │
│                                         │
│  ⚡ COMMUNICATE WITH SARAH             │
│  Be direct and structured. Lead with    │
│  facts, not feelings. Give her time     │
│  to review before decisions.            │
│                                         │
│  🎯 LEADING SARAH                      │
│  Set clear goals with defined           │
│  standards. She'll drive herself —      │
│  your job is to remove blockers.        │
│                                         │
│  ⚠️ WATCH FOR UNDER PRESSURE           │
│  May become overly critical or          │
│  perfectionistic when the programme     │
│  is slipping.                           │
│                                         │
│  🤝 WORKS WELL WITH                    │
│  I and S styles — they balance          │
│  her drive with energy and warmth.      │
└─────────────────────────────────────────┘
```

**Results — Team Overview**
- DISC bar chart per person in grid layout
- All players plotted on a DISC quadrant map
- Team insight panel: e.g. "Your team skews D/C — strong on delivery and precision, may need to consciously invest in team relationships"

**Export**
- PDF: one page per player + one team overview page
- CSV: raw scores + profile labels per player

### Player Screens

**Join Screen**
- Enter 4-digit room code → enter name → confirmed entry
- Single focused input per step

**Lobby Wait**
- Game name + their confirmed name
- List of other joined players
- Subtle animated waiting indicator

**Card Screen**
- Card number + category label (e.g. "Card 7 of 24 — Site Pressure")
- Scenario text in large, readable type
- 4 draggable response cards with drag handles + rank indicators (1–4)
- Submit button activates only once all 4 are ordered
- Post-submit: "Waiting for others..." with X/X progress indicator

**Between Cards**
- "Get ready for the next one" with 3-second countdown

---

## Tech Considerations (TBD)

- Real-time sync between manager and players (WebSockets recommended — e.g. Socket.io or Supabase Realtime)
- Room state management on server
- PDF generation for export (e.g. react-pdf or puppeteer)
- No auth required — room codes are the access mechanism
- Mobile-friendly drag-and-drop for card ranking

---

## Out of Scope (v1)

- Account/login system
- Saving past sessions
- Comparing results over time
- Full 28-page DISC report
- Physical card printing
