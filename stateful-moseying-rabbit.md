# AMZ3 Upgrade: Full Resumes, Role-Aware Screening & Visual Overhaul

## Context

The AMZ3 training app currently uses hardcoded key-value snippets ("Degree: B.Tech CS") as candidate data. Real screeners work with actual resumes that have varied formats, missing fields, and require role-aware rule application. This upgrade makes the training realistic by:

1. Rendering full resume documents (not snippets) using data from the AMZ5 dataset
2. Adding role-aware screening (CS roles vs warehouse/inventory roles have different rules)
3. Overhauling visuals with a corporate-playful style (mascot, illustrations, animations)

**Source dataset:** `C:\Users\anoop\OneDrive\Desktop\AMZ5\dataset\filtered_resumes.csv` (2,225 resumes, 35 fields)
**Eligibility SOP reference:** `C:\Users\anoop\Downloads\Candidate Screening & Eligibility S (1).txt` (foundation-level, not full process)

---

## Decisions Made

| Decision | Choice |
|----------|--------|
| Resume presentation | Realistic document layout (looks like an actual resume) |
| Data sourcing | Hand-curate ~25 scenarios from AMZ5 CSV |
| Role types | CS roles (CS degree required) + Warehouse (any bachelor's accepted) |
| SOP scope | Education only (Day 3): degree, graduation, university, CGPA, mismatches |
| Missing data | Train "best judgment" per SOP Section 16, not flag/escalate |
| Visual style | Corporate-playful (Duolingo meets corporate training) |
| Assets needed | Game illustrations + animated mascot + backgrounds + micro-animations |
| Resume templates | 2-3 visual variations (modern, traditional, creative) |
| Scenario count | ~25 total (same count, upgraded quality) |

---

## Implementation Phases

### Phase 1: Data Layer (do first, everything depends on this)

**1A. Create `src/data/resumeScenarios.js`**
- Hand-curate 25 scenario objects from `filtered_resumes.csv`
- Parse CSV Python-style arrays (`['B.Tech']`) into clean JSON
- Each scenario has structured `resume` object:
  ```js
  resume: {
    name, email, phone, address, careerObjective,
    education: [{ institution, degree, field, graduationYear, result, resultType }],
    experience: [{ company, position, startDate, endDate, responsibilities }],
    skills: [], certifications: [], languages: []
  }
  ```
- Each scenario has `portal` object (application system data for comparison)
- Each scenario has `targetRole: 'sde' | 'warehouse-manager'`
- Each scenario has `templateStyle: 'modern' | 'traditional' | 'creative'`
- 4-5 scenarios deliberately have `null` fields (no CGPA, no grad year, vague degree)
- Distribution: 5 MCQ + 3+3+3+2 audit games + 9 final audit = 25

**1B. Update `src/data/eligibilityRules.js`**
- Add role-based rule sets:
  - `sde`: CS or closely related degree required (existing rules)
  - `warehouse-manager`: Any bachelor's degree accepted, no stream restriction
- Add `missingData` guidance: "Use best judgment with available information"

**1C. Update `src/data/games.js`**
- Replace `visibleData: { resume: string[], portal: string[] }` with structured `resume`/`portal` objects
- Add `targetRole` to each scenario
- Game 1 (MCQ): Add role-context to questions
- Games 2-5: Full resume objects per scenario

**1D. Update `src/data/audit.js`**
- Same transformation as games.js for all 10 final audit scenarios
- Include 3-4 warehouse-role scenarios and 2-3 missing-data scenarios

**1E. Update `src/data/contextCards.js`**
- Add role-awareness tips ("For warehouse roles, ANY bachelor's degree is valid")
- Add missing-data tip ("Real resumes often have gaps. Use best judgment.")

---

### Phase 2: ResumeView Component

**Create `src/components/ResumeView.jsx`**
- Props: `resumeData`, `templateStyle`, `highlightFields`
- Sections: Header (name/contact) > Career Objective > Education > Experience > Skills > Certifications > Languages
- **3 CSS template variations:**
  - `modern`: Left-aligned, sans-serif, cyan accents, skill pills
  - `traditional`: Centered header, serif headings, horizontal rules, dense layout
  - `creative`: Two-column (sidebar for skills/contact, main for education/experience), orange accent
- **Missing data rendering:** `null` fields show as "-- Not provided --" with `opacity-40 italic` + dashed left border
- White background (`bg-white text-gray-900`) to look like a document embedded in dark UI
- Scrollable: `max-h-[600px] overflow-y-auto`
- Mobile: Stack vertically instead of side-by-side

---

### Phase 3: Game Component Integration

**3A. Role Badge (inline in AuditGame or small component)**
- Shows target role prominently: "SDE Role" (blue) or "Warehouse Manager" (purple)
- Appears above resume view in every scenario

**3B. Modify `src/components/AuditGame.jsx`** (largest change)
- Replace bullet-list data panels with `<ResumeView>` (left, 2/3 width) + Portal Panel (right, 1/3 width)
- Add RoleBadge in scenario header
- Feedback modal references role-specific rules ("This was a WAREHOUSE role...")
- Keep ComparisonPanel for graduation-gate but layer over ResumeView

**3C. Modify `src/components/MiniGame.jsx`**
- Add `targetRole` indicator in MCQ question context (small badge, no ResumeView needed)

**3D. Modify `src/components/ComparisonPanel.jsx`**
- Accept structured data objects instead of simple `{ label, value }` pairs

**3E. Modify `src/utils/scoring.js`**
- Pass `targetRole` through scoring pipeline
- Track role-confusion errors (applying CS rules to warehouse roles)
- Add "Role Accuracy" metric to results

---

### Phase 4: Visual Upgrade & Mascot (can parallel Phase 3)

**4A. Animation approach**
- Use CSS animations (no new dependency) — extend `src/index.css`
- New keyframes: `card-flip`, `slide-up-bounce`, `celebration-burst`, `shake`, `pulse-glow`
- Evidence cards flip instead of fade; wrong answers shake; correct answers burst

**4B. Create `src/components/Mascot.jsx`**
- Props: `state` (neutral/happy/thinking/concerned/excited), `message`, `size`, `position`
- Renders image from `src/assets/mascot/` with speech bubble
- **Placeholder mode:** FontAwesome icon + emoji until real assets arrive

**4C. Create `src/assets/` directory**
```
src/assets/
  mascot/       (5 expression PNGs, 400x400px)
  illustrations/ (6 game illustrations, 800x600px)
```

**4D. Mascot integration points:**
- `ContextCard.jsx`: Thinking state with hint message
- `AuditGame.jsx` feedback: Happy (correct) / Concerned (wrong) / Thinking (timeout)
- `Results.jsx`: Excited (Expert) / Thinking (Over-Cautious) / Concerned (Risk-Prone)
- `Hero.jsx`: Neutral with "Ready to learn?"

**4E. Illustration slots:**
- `GameHub.jsx`: Each game card gets illustration above icon
- `Hero.jsx`: Replace FontAwesome icon with hero illustration
- `ContextCard.jsx`: Illustration in header area
- Add `illustration` field to game definitions in `games.js`

**4F. Component visual upgrades:**
- `Hero.jsx`: Gradient mesh background, mascot, illustration-backed objective cards
- `Header.jsx`: Role context indicator ("Screening for: SDE"), branding slot
- `Results.jsx`: Animated score counter, mascot reaction, "Role Accuracy" section
- `GameHub.jsx`: Card hover animations, progress celebration

---

### Phase 5: Wiring & Testing

- Verify App.jsx still receives correct result shapes from updated components
- Test all 25 scenarios render correctly with ResumeView
- Test missing-data scenarios display gracefully
- Test role-aware feedback messages are accurate
- Test scoring tracks role confusion correctly
- Test mobile responsiveness (resume stacks above portal)
- Test all 3 resume template styles

---

## Asset Request Specification

**For the user to create via Freepik/Canva/ChatGPT:**

### Mascot (5 transparent PNGs, 400x400px)
| State | Expression | Gesture |
|-------|-----------|---------|
| Neutral | Friendly, attentive | Standing, slight smile |
| Happy | Celebrating | Thumbs up or confetti |
| Thinking | Curious, questioning | Chin touch, magnifying glass |
| Concerned | Worried | Caution gesture |
| Excited | Wide-eyed, energetic | Arms up, sparkles |

**Style:** Flat illustration, rounded/friendly proportions, Amazon-orange accents. Could be an owl (like Duolingo), a robot, or an abstract character.

### Game Illustrations (6 transparent PNGs, 800x600px)
1. **Hero screen**: Graduation cap + magnifying glass + resume document collage
2. **Eligibility Basics**: Lightbulb with checklist
3. **Degree Detective**: Magnifying glass on a diploma
4. **Graduation Gate**: Calendar with checkmarks and X marks
5. **University Validator**: University building with verification badge
6. **Education Audit**: Multi-item checklist being reviewed

**Style:** Flat illustration, bright colors, corporate-playful, no text in images.

---

## Files Summary

### New Files
| File | Purpose |
|------|---------|
| `src/components/ResumeView.jsx` | Realistic resume renderer (3 templates) |
| `src/components/Mascot.jsx` | Animated guide character |
| `src/data/resumeScenarios.js` | 25 curated scenarios from AMZ5 data |
| `src/assets/mascot/*.png` | 5 mascot expression images |
| `src/assets/illustrations/*.png` | 6 game illustrations |

### Modified Files
| File | Changes |
|------|---------|
| `src/data/games.js` | Replace snippets with structured resume objects, add targetRole |
| `src/data/audit.js` | Same restructuring for final audit scenarios |
| `src/data/eligibilityRules.js` | Add role-based rules (SDE vs warehouse) |
| `src/data/contextCards.js` | Add role-awareness and missing-data tips |
| `src/components/AuditGame.jsx` | ResumeView integration, RoleBadge, mascot, animations |
| `src/components/MiniGame.jsx` | Add role-context badge to MCQ questions |
| `src/components/ComparisonPanel.jsx` | Accept structured data objects |
| `src/components/GameHub.jsx` | Illustration slots, card animations |
| `src/components/Hero.jsx` | Visual overhaul with mascot and illustrations |
| `src/components/Header.jsx` | Role context indicator, branding slot |
| `src/components/Results.jsx` | Mascot, score animation, role accuracy section |
| `src/utils/scoring.js` | Role-awareness in scoring, role confusion tracking |
| `src/index.css` | Resume template CSS, new animation keyframes |

---

## Verification

1. `npm run dev` — app loads without errors
2. Navigate through all 5 mini-games — each shows ResumeView with correct template style
3. Verify RoleBadge displays correctly for both SDE and warehouse scenarios
4. Check 4-5 scenarios with missing data render "Not provided" gracefully
5. Complete final audit — Results page shows role accuracy and mascot reaction
6. Test all 3 resume template styles appear across different scenarios
7. Verify mobile layout stacks resume above portal panel
8. Check animations: card-flip on evidence, shake on wrong, celebration on correct
9. Verify scoring tracks role confusion (applying CS rules to warehouse role)
