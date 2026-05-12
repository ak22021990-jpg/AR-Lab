# Day 3: Education & Eligibility Foundations — Implementation Plan

## Overview

**Audience:** Complete beginners with no recruitment/screening background  
**Theme:** "Can this candidate's education and basic details be verified?"  
**Goal:** Teach how education eligibility works in screening — what to check, what's valid, what's not  
**Tone:** Light, approachable, Amazon-flavored generic  
**Teaching Style:** Context cards before each game + rich feedback after decisions  
**Decisions:** Proceed / Reject only (current code uses Escalate — simplify to binary)  
**Timer:** Progressive — 120s → 100s → 90s → 80s → 60s  

---

## SOP Sections Covered

| Section | What Players Learn (Beginner-Friendly) |
|---------|---------------------------------------|
| 1. Initial Eligibility | Is the candidate's stream valid? Is their grad year in range? Can they be processed? |
| 6. Education Eligibility | What degree types are accepted? Does graduation fall in the required window? |
| 7. CS Degree Rules | When is a degree "close enough" to CS? Combined specializations, edge cases |
| 10. Graduation Date Verification | What if resume says one date and application says another? |
| 13. University Verification | Is the university in the right region? Satellite campuses, community colleges, exchange programs |

---

## Current State (What Exists)

The current build has:
- 5 mini-games (Degree Sorter, Graduation Gate, and 3 others) using the AuditGame format (resume/portal panels + evidence tokens + risk tags + decision + justification)
- 1 main game (Education Audit Challenge) with full scenarios
- Scoring system with XP and ranks
- Dark theme UI with game cards

### What Needs to Change

1. **Simplify decisions** — Remove "Escalate" option, keep only Proceed/Reject
2. **Add context cards** — Brief intro before each game explaining the concept
3. **Restructure games** — Current games focus too narrowly. Reorganize to cover ALL 5 SOP sections
4. **Add Game 4 (University Validator)** — Not adequately covered currently
5. **Lighten the tone** — Less "investigation" language, more "learning" language
6. **Progressive timer** — Add configurable timers
7. **Better feedback** — Current feedback is minimal; needs rich explanations of WHY

---

## Revised Game Structure (5 Mini Games + Main Game)

### Game 1: Eligibility Basics

- **Phase:** Understand  
- **Teaches:** What makes a candidate eligible to proceed at the most basic level  
- **Format:** MCQ quiz — quick questions about eligibility fundamentals  
- **Timer:** 120s (generous)  
- **Resume Viewer:** Not needed  
- **Context Card:** "Before diving into details, let's learn what 'eligible' means in screening. A candidate needs the right degree, from the right time, in the right field..."  

**Sample questions:**
- A candidate graduated in 2019 but the role requires graduation between 2022-2025. What do you do?
- What does "academic stream" mean in eligibility? (Answer: The field of study, like CS, IT, ECE)
- A candidate's CGPA is below the minimum threshold. Can they proceed?
- What's the first thing you check when a new application comes in?

---

### Game 2: Degree Detective

- **Phase:** Spot  
- **Teaches:** Which degree types are valid for a CS/tech role — and the tricky edge cases  
- **Format:** Candidate cards showing degree info — decide if valid or invalid  
- **Timer:** 100s (moderate)  
- **Resume Viewer:** Not needed (simple data cards)  
- **Context Card:** "Not every degree qualifies for every role. CS roles need CS or closely related degrees — but what counts as 'closely related'?"  

**Sample scenarios:**
- B.Tech Computer Science → Valid (straightforward)
- B.Tech Electronics & Communication with CS minor → Valid (formal minor)
- BCA (Computer Applications) → Valid (it IS a CS degree)
- B.Tech Mechanical Engineering → Invalid
- B.Sc Computer & Information Science → Edge case (≠ Computer Science)
- B.Tech CSE + Mechanical combined specialization → Valid (contains CS)

**Key teaching moment:** "Computer Science" ≠ "Computer & Information Science" — looks similar but is different

---

### Game 3: Graduation Date Check

- **Phase:** Spot + Decide  
- **Teaches:** How to handle graduation date conflicts and rules  
- **Format:** Side-by-side data (resume vs portal) — spot conflicts and decide  
- **Timer:** 90s (moderate)  
- **Resume Viewer:** Not needed (data panels sufficient)  
- **Context Card:** "Candidates report their graduation date in multiple places. When those dates don't match, you need to figure out which is correct — or if there's a problem..."  

**Sample scenarios:**
- Resume says June 2023, Portal says June 2023 → No conflict, proceed
- Resume says June 2023, Portal says December 2024 → Conflict! Which is true?
- Graduation date is in the future (candidate hasn't graduated yet) → Reject
- Only resume has the date, portal is blank → Use resume date
- Date is outside the required range → Reject
- Date recently changed multiple times in portal → Suspicious

**Key teaching moment:** Future graduation = not yet graduated = cannot proceed as graduate

---

### Game 4: University Validator

- **Phase:** Decide  
- **Teaches:** University verification — region, legitimacy, satellite campuses, community colleges  
- **Format:** University + candidate details shown — decide if valid  
- **Timer:** 80s (tighter)  
- **Resume Viewer:** Yes (education section) — for complex scenarios  
- **Context Card:** "The university matters as much as the degree. Is it in the right country? Is it accredited? What about online campuses or study abroad programs?"  

**Sample scenarios:**
- Well-known university in required region → Proceed
- University not found in accreditation database → Reject
- Satellite campus in a different country than main campus → Check actual location
- Community college pursuing bachelor's → Proceed (valid)
- Community college with associate degree only → Reject
- Exchange program / study abroad (flag terms found) → Needs review
- University in required country but candidate studied at overseas branch → Check resume for actual campus

**Key teaching moments:**
- Satellite campus location ≠ main campus location
- Community colleges: bachelor's OK, diplomas/associates NOT OK
- "Exchange Program", "Study Abroad", "Dual Program" = flag for review

---

### Game 5: Education Audit (Combined)

- **Phase:** Apply  
- **Teaches:** Putting it all together — full education profile review  
- **Format:** Full candidate education profile with potential issues from Games 1-4  
- **Timer:** 60s (strict)  
- **Resume Viewer:** Yes (full education section)  
- **Context Card:** "Time to use everything you've learned. Review the full education profile and make your call."  

**Sample scenarios:**
- Clean profile, everything matches → Proceed (tests that players don't over-reject)
- Valid degree + unrecognized university → Reject
- CS degree + future graduation date → Reject
- ECE with no CS minor + good CGPA → Reject (degree matters, not grades)
- Valid everything but graduation outside required range → Reject

---

### Main Game: Education Screening Simulation

- **Unlocks after:** All 5 mini-games completed  
- **Tests:** All Day 3 concepts combined in realistic scenarios  
- **Format:** Multiple candidate profiles in sequence, full AuditGame style  
- **Timer:** 60-90s per candidate  
- **Context Card:** None  
- **Scoring:** Decision accuracy (50%) + Speed (20%) + Consistency (30%)  

**10 scenarios mixing all concepts:**
- Degree validity issues
- Graduation date conflicts
- University verification failures
- Clean profiles (must correctly approve)
- Combined issues (bad degree + bad university)
- Edge cases (CS vs Computer & Information Science)

---

## Design Changes from Current Build

### Remove
- "Escalate" decision option → Binary Proceed/Reject only
- Heavy "investigation" language → Replace with learning-oriented tone
- `ruleApplied` and `misleadingClue` as visible fields → Move to feedback only

### Add
- `ContextCard.jsx` component — shows before each game
- `ProgressiveTimer.jsx` — configurable per game
- Rich feedback panel after each decision (explains the concept, not just right/wrong)
- Context cards data file

### Modify
- `games.js` → Restructure scenarios to cover all 5 SOP sections cleanly
- `audit.js` → Simplify to Proceed/Reject, add more scenarios
- Scoring → Remove justification requirement from mini-games (keep for main game only)
- Dashboard → Add context card triggers, show learning progress

---

## Data Files

### Existing (Modify)
```
src/data/games.js    — Restructure: 5 games covering all SOP sections
src/data/audit.js    — Simplify decisions, add more scenarios for main game
```

### New
```
src/data/contextCards.js  — Intro text for each game
src/data/eligibilityRules.js  — Degree types, graduation ranges, university lists
```

---

## Components

### Existing (Modify)
- `GameHub.jsx` → Add context card trigger before game starts
- `MiniGame.jsx` → Already MCQ-based; keep for Game 1, adapt for others
- `Hero.jsx` → Update language to be lighter/friendlier
- `Results.jsx` → Enhance feedback explanations

### New
- `ContextCard.jsx` — Pre-game concept intro (icon + short text + "Start" button)
- `ProgressiveTimer.jsx` — Countdown with configurable duration
- `DataCompare.jsx` — Side-by-side resume vs portal view (for Game 3)
- `UniversityCard.jsx` — University info display (for Game 4)

### Reuse As-Is
- `Header.jsx`
- `scoring.js` (minor updates)

---

## Scoring

| Component | Weight | Games |
|-----------|--------|-------|
| Decision Accuracy | 60% | All |
| Speed (within timer) | 20% | All |
| Justification Quality | 20% | Main game only |

Mini-games: No justification required — just Proceed/Reject  
Main game: Requires brief justification (keyword matching)

---

## Phased Implementation Plan

### Phase 1: Data Architecture & Rules
**Goal:** Establish the knowledge base and scenario data.
- **[ ] Task 1.1:** Create `src/data/contextCards.js` - Define intro text, icons, and learning objectives.
- **[ ] Task 1.2:** Create `src/data/eligibilityRules.js` - Centralize degree, graduation, and university rules.
- **[ ] Task 1.3:** Restructure `src/data/day3Games.js` - Define scenarios for all 5 mini-games.
- **[ ] Task 1.4:** Update `src/utils/scoring.js` - Support binary decisions and speed/accuracy weights.

### Phase 2: Core UI Components
**Goal:** Build reusable components for the new gameplay loop.
- **[ ] Task 2.1:** Build `ContextCard.jsx` - Pre-game learning overlay.
- **[ ] Task 2.2:** Build `ProgressiveTimer.jsx` - Configurable countdown timer.
- **[ ] Task 2.3:** Build `ComparisonPanel.jsx` - Side-by-side data comparison view.
- **[ ] Task 2.4:** Update `AuditGame.jsx` - Integrate context cards and simplify decisions.

### Phase 3: Mini-Game Implementation (Part 1)
**Goal:** Implement games 1, 2, and 3.
- **[ ] Task 3.1:** Implement **Game 1: Eligibility Basics** (MCQ format).
- **[ ] Task 3.2:** Implement **Game 2: Degree Detective** (Card-based).
- **[ ] Task 3.3:** Implement **Game 3: Graduation Date Check** (Conflict detection).

### Phase 4: Mini-Game Implementation (Part 2)
**Goal:** Implement games 4, 5, and the Main Simulation.
- **[ ] Task 4.1:** Implement **Game 4: University Validator** (Location/Accreditation).
- **[ ] Task 4.2:** Implement **Game 5: Education Audit** (Combined scenarios).
- **[ ] Task 4.3:** Update **Main Game** - 10 complex scenarios with Proceed/Reject only.
- **[ ] Task 4.4:** Update **Dashboard** - Progress tracking for all Day 3 activities.

### Phase 5: Feedback & Polish
**Goal:** Refine the user experience and educational tone.
- **[ ] Task 5.1:** Enhance `Results.jsx` - Add rich, SOP-based feedback explanations.
- **[ ] Task 5.2:** UI/UX Polish - Animations, theme consistency, and mobile responsiveness.
- **[ ] Task 5.3:** Final Audit - Verify full coverage of all 5 SOP sections.

---

## Key Principle

This should feel like a friendly tutorial that happens to be gamified — NOT a test. Players should finish each game feeling like they LEARNED something, not like they were quizzed on something they didn't know.
