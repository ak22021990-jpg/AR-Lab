# Plan: Enrich Resume Scenarios + Add SOP Rules + Full Duolingo-Style UI Redesign

## Context
The current AMZ3 app has 25 resume scenarios with basic fields (name, email, phone, education, experience, skills, certifications, languages). The Generic Resume template and the AMZ5 dataset show that real resumes include additional sections like LinkedIn, portfolio/GitHub, projects, volunteer work, extra-curricular activities, and richer certification/language data. The profiles are mostly India-based and need US/Canada representation. Additionally, each game's intro (ContextCard) should include fully specific SOP screening rules so players know the exact criteria before playing.

---

## Step 1: Add SOP Rules to ContextCard Data
**File:** `src/data/contextCards.js`

Add a new `sopRules` array to each context card with fully specific screening criteria drawn from `eligibilityRules.js`:

- **eligibility-basics**: General SOP covering both roles
  - SDE: B.Tech CS, B.E. CS, B.Tech IT, BCA, MCA, M.Sc CS, BS CS required
  - Warehouse Manager: Any Bachelor's degree (B.Tech, B.E., B.Sc, B.Com, B.A., BBA, BMS)
  - Graduation Year: 2022-2025 window
  - University must be UGC/AICTE (India) or regionally accredited (US/Canada)

- **degree-detective**: Degree-specific rules
  - Valid SDE degrees list, edge cases (ECE with CS minor only), invalid degrees
  - Warehouse: any bachelor's valid, diploma/associate invalid

- **graduation-gate**: Date verification rules
  - Required range: 2022-2025
  - Future dates = not graduated, backlog dates shift effective graduation
  - Always compare resume vs portal dates

- **university-validator**: Accreditation rules
  - UGC/AICTE for India, Regional accreditation for US
  - Community college bachelor's OK, associate's NOT
  - Online/satellite campus verification rules

- **education-audit**: Combined checklist
  - All rules from above games consolidated as a reference checklist

**File:** `src/components/ContextCard.jsx`

Add a new "Screening Rules" section between the content and tips, rendering `cardData.sopRules` as a styled rules panel with an SOP-document feel (bordered box, checklist icons).

---

## Step 2: Enrich Resume Data Schema
**File:** `src/data/resumeScenarios.js`

Add these fields to the `resume` object in each scenario:

| Field | Type | Notes |
|-------|------|-------|
| `linkedIn` | `string` | All 25 scenarios get a LinkedIn URL |
| `portfolio` | `string \| null` | SDE roles with tech background (~10 scenarios) |
| `projects` | `[{ name, description, technologies[] }]` | ~10 scenarios, mostly SDE |
| `volunteerWork` | `[{ organization, role, duration }]` | ~6 scenarios, mixed |
| `extraCurricular` | `[{ type, organization, role }]` | ~8 scenarios |
| `languages` | changes from `string[]` to `[{ language, proficiency }]` | All 25 |
| `certifications` | changes from `string[]` to `[{ name, provider, issueDate }]` | All that have certs |
| experience[].`location` | `string` | All experience entries |

**Mix-bag approach:** Some resumes will be detailed (3+ sections filled), some sparse (just basics). This mirrors real-world variety.

---

## Step 3: Convert ~5 Scenarios to US/Canada
**File:** `src/data/resumeScenarios.js`

Convert these scenarios to US/Canada profiles:

| ID | Current Name | Convert To | Country |
|----|-------------|------------|---------|
| s4 | (current India profile) | US-based profile | US |
| s5 | (current India profile) | US-based profile | US |
| s10 | (current India profile) | Canada-based profile | Canada |
| s13 | (current India profile) | Canada-based profile | Canada |
| s22 | (if exists as India) | US-based profile | US |

Changes per converted profile:
- Name → culturally appropriate (e.g., David Miller, Emily Chen, James Thompson)
- Address → US/Canadian city (New York, Toronto, Vancouver, etc.)
- Phone → US/Canadian format (+1 xxx-xxx-xxxx)
- Education → US/Canadian universities (Stanford, MIT, University of Toronto, UBC, etc.)
- LinkedIn → US/Canadian LinkedIn format
- Experience → companies with US/Canadian locations
- Languages → English primary, possibly Spanish/French

---

## Step 4: Update ResumeView to Render New Fields
**File:** `src/components/ResumeView.jsx`

### Destructuring update (line 19-23):
```js
const {
  name, email, phone, address, careerObjective,
  linkedIn, portfolio,
  education = [], experience = [], skills = [],
  certifications = [], languages = [],
  projects = [], volunteerWork = [], extraCurricular = []
} = resumeData;
```

### Backward compatibility helpers:
```js
const formatLang = (lang) => typeof lang === 'string' ? lang : `${lang.language} (${lang.proficiency})`;
const formatCert = (cert) => typeof cert === 'string' ? cert : `${cert.name} — ${cert.provider} (${cert.issueDate})`;
```

### All 3 templates (Modern, Traditional, Creative) get:
1. **Contact header**: Add LinkedIn + Portfolio/GitHub links (icons + shortened URLs)
2. **Experience entries**: Add `location` under company name
3. **Languages**: Use `formatLang()` helper
4. **Certifications**: Use `formatCert()` helper
5. **Projects section**: After Experience — project name, description, tech pills
6. **Volunteer Work section**: Organization, role, duration
7. **Extra-curricular section**: Combined with volunteer in Traditional; separate in Modern/Creative

Render new sections conditionally (`projects.length > 0 &&`) so scenarios without them show no empty sections.

---

## Step 5: Mirror Data in games.js Inline Scenarios
**File:** `src/data/games.js`

The Phase 2 audit games (degree-detective, graduation-gate, university-validator, education-audit) inline their resume data. Update these ~11 inline scenarios to match the enriched schema from `resumeScenarios.js` for consistency.

---

## Files to Modify (Summary)
1. `src/data/contextCards.js` — Add `sopRules` arrays with specific screening criteria
2. `src/components/ContextCard.jsx` — Render new SOP rules section
3. `src/data/resumeScenarios.js` — Add new fields, convert 5 profiles to US/Canada
4. `src/components/ResumeView.jsx` — Render all new resume fields in 3 templates
5. `src/data/games.js` — Mirror enriched data in inline scenarios

## Files NOT Modified (Confirmed Safe)
- `src/data/audit.js` — Uses `getScenario()` spread, new fields flow through automatically
- `src/utils/scoring.js` — Only checks decision/risk/justification fields, not resume content
- `src/App.jsx` — No screen flow changes needed (SOP is in ContextCard)

---

## Verification
1. Run `npm run dev` and test each game from GameHub
2. Verify each ContextCard shows the new SOP rules section before game starts
3. Check all 3 resume templates (modern, traditional, creative) render new fields correctly
4. Confirm scenarios without optional fields (projects, volunteer) don't show empty sections
5. Verify US/Canada profiles display correctly with proper formatting
6. Test the final audit (all 10 scenarios) still works — portal comparison, risk tags, scoring
7. Check backward compatibility: old string-format languages/certifications still render if any path uses them

---
---

# PART 2: Full UI Redesign — Duolingo-Style Overhaul

## Context
Transform the app from dark glassmorphism to a light, playful, Duolingo-inspired design. Amazon Orange stays as anchor color paired with soft pastels. Font switches to Nunito. Icons switch from FontAwesome CDN to Lucide React. Framer Motion replaces CSS-only animations. Mascot gets an enhanced persistent role. GameHub becomes a horizontal train track journey map.

---

## Step 6: Install Dependencies & Update Fonts

**Files:** `package.json`, `index.html`, `src/main.jsx`, `src/App.jsx`

**Add dependencies:**
- `framer-motion` — page transitions, spring animations, layout animations
- `lucide-react` — modern icon library (replaces FontAwesome CDN)
- `@fontsource-variable/nunito` — self-hosted Nunito variable font

**Remove dependency:**
- `animate.css` — replaced by Framer Motion

**`index.html`:** Remove FontAwesome CDN `<link>` tag. Remove Google Fonts links for Inter/Outfit (keep JetBrains Mono or add `@fontsource/jetbrains-mono`).

**`src/main.jsx`:** Add `import '@fontsource-variable/nunito'`

**`src/App.jsx`:** Remove `import 'animate.css'`

---

## Step 7: Rewrite `src/index.css` — Light Theme Design System

Full rewrite of the ~387-line CSS file. This is the foundation everything builds on.

### 7a: New `@theme` block
```
--color-bg-base: #FAFAF8        (warm cream background)
--color-bg-surface: #FFFFFF      (card backgrounds)
--color-bg-muted: #F3F3F0        (subtle tinted backgrounds)

--color-primary: #FF9900          (Amazon Orange — kept)
--color-primary-hover: #E68A00
--color-primary-light: rgba(255,153,0,0.1)
--color-primary-glow: rgba(255,153,0,0.25)

--color-success: #58CC02          (Duolingo green)
--color-error: #FF4B4B            (warm red)
--color-warning: #FFC800          (golden yellow)
--color-info: #1CB0F6             (Duolingo blue)
--color-streak: #CE82FF           (purple for streaks)

--color-text-primary: #3C3C3C
--color-text-secondary: #777777
--color-text-muted: #AFAFAF
--color-border: #E5E5E5
--color-shadow: rgba(0,0,0,0.08)

--font-nunito: 'Nunito Variable', sans-serif
--font-mono: 'JetBrains Mono', monospace
```

### 7b: Base styles
- Body: `bg-bg-base`, `color-text-primary`, `font-nunito`, `font-weight: 600`
- **Remove** `body::before` dot-grid (dark-mode artifact)
- Headings: `font-nunito`, `font-weight: 800`

### 7c: Component classes rewritten

**`.card` / `.card-elevated`** (replace `.glass-card` / `.glass-card-elevated`):
White background, soft border, rounded-[20px], soft shadow. No glass/blur effects.

**`.btn-primary`** — Duolingo 3D push button:
Orange bg, white text, `border-bottom: 4px solid` darker orange. On `:active`: `translateY(2px)` + reduced border-bottom (push effect).

**`.btn-proceed` / `.btn-reject`** — Same 3D push pattern with success-green / error-red.

**`.option-card`** — White card, light border, hover `translateY(-2px)` + shadow increase.

**`.game-card`** — White card, rounded-2xl, soft shadow, hover lift.

**`.risk-tag`** — Colorful pills with pastel backgrounds.

**`.stat-badge`** — Rounded pill with `bg-bg-muted`.

### 7d: Animations
Remove most CSS animation classes (replaced by Framer Motion in JSX). Keep `pulse-red` for risk meter and delay utilities.

### 7e: Scrollbar
Light-mode: `rgba(0,0,0,0.1)` thumb.

---

## Step 8: Create Icon Map & Shared UI Components

**New file: `src/utils/iconMap.js`**
Maps string icon names (used in data files) to Lucide React components:
```js
import { Lightbulb, GraduationCap, CalendarCheck, Building2, FileCheck, ... } from 'lucide-react';
export const iconMap = { Lightbulb, GraduationCap, ... };
export const getIcon = (name) => iconMap[name] || Lightbulb;
```

**New file: `src/components/ui/MotionWrapper.jsx`**
Framer Motion page transition wrapper with `initial/animate/exit` variants (fade + slide up).

**FontAwesome -> Lucide mapping (94 icon instances across all files):**

| FA Class | Lucide | Files |
|----------|--------|-------|
| `fa-graduation-cap` | `GraduationCap` | Header, AuditGame |
| `fa-rocket` | `Rocket` | Hero |
| `fa-bolt` | `Zap` | Header, Results |
| `fa-gauge-high` | `Gauge` | Header, AuditGame, Results |
| `fa-code` | `Code` | Header, RoleBadge |
| `fa-warehouse` | `Warehouse` | Header, RoleBadge |
| `fa-check` | `Check` | GameHub, MiniGame |
| `fa-lock` | `Lock` | GameHub, AuditGame |
| `fa-fire` | `Flame` | MiniGame |
| `fa-lightbulb` | `Lightbulb` | ContextCard |
| `fa-tags` | `Tags` | AuditGame |
| `fa-gavel` | `Gavel` | AuditGame |
| `fa-brain` | `Brain` | Results |
| `fa-triangle-exclamation` | `AlertTriangle` | Results, ComparisonPanel |
| `fa-circle-check` | `CheckCircle` | AuditGame |
| `fa-circle-xmark` | `XCircle` | AuditGame |
| `fa-clock` | `Clock` | ProgressiveTimer |
| ...and ~30 more (see full mapping in Step 8 implementation) |

---

## Step 9: Redesign `App.jsx` — Framer Motion Page Transitions

**File:** `src/App.jsx`

- Remove `import 'animate.css'`
- Add `import { AnimatePresence, motion } from 'framer-motion'`
- Wrap `<main>` content in `<AnimatePresence mode="wait">`
- Each screen component wrapped in `<motion.div>` with fade+slide transitions
- Update confetti colors: `['#FF9900', '#58CC02', '#1CB0F6', '#CE82FF', '#FFC800']`
- Root div: `bg-bg-base min-h-screen` (remove dark classes)

---

## Step 10: Redesign `Header.jsx` — Light Sticky Header

**File:** `src/components/Header.jsx`

- Replace all FA icons with Lucide components
- `card-elevated` instead of `glass-card-elevated`
- Full-width sticky with `border-b border-border` (no floating card)
- Light pill stat badges with `bg-bg-muted`
- Add small mascot avatar before score stats
- All text colors updated: `text-text-primary`, `text-text-secondary`
- Wrap with `motion.header` for entry animation

---

## Step 11: Redesign `Hero.jsx` — Light Playful Landing

**File:** `src/components/Hero.jsx`

- Replace FA icons with Lucide
- Remove dark gradient meshes, use clean light background
- Feature cards: White cards with pastel tints (orange-50, blue-50, green-50)
- Title: `text-text-primary`, accent span uses `text-primary`
- CTA: Duolingo 3D `.btn-primary` with `motion.button` spring hover
- Replace CSS animation classes with Framer Motion `initial/animate` + `staggerChildren`
- Mascot: light-themed speech bubble

---

## Step 12: Redesign `GameHub.jsx` — Train Track Journey Map

**File:** `src/components/GameHub.jsx` — **Most structurally complex change**

Replace the card grid with a horizontal train track:

```
[Progress Header - card with overall % and station dots]

[Horizontal Track Container (overflow-x-auto, snap)]
  ══ Station 1 ══ Station 2 ══ Station 3 ══ Station 4 ══ Station 5 ══ Boss Station ══
      (mascot positioned at active station via Framer Motion layout)
```

**Station node states:**
- **Completed**: Green circle, checkmark, green connector line
- **Active**: Orange pulsing border, scale-up, info card expands below on click
- **Locked**: Gray circle, lock icon, gray connector

**Station info card** (on hover/click): Floats below active station with game title, description, badge, "Start" button. Uses Framer Motion `layoutId` for smooth expand.

**Mascot**: Absolutely positioned at active station, slides along track via `motion.div` with `layout` prop.

**Final audit**: Golden trophy station at end with `Trophy` Lucide icon.

**Mobile**: Horizontally scrollable with `overflow-x-auto` and CSS snap points.

**Track line**: `div` with `h-1 bg-border` between stations, `bg-success` for completed segments.

---

## Step 13: Redesign `MiniGame.jsx` — Clean Card Quiz

**File:** `src/components/MiniGame.jsx`

- Replace all FA icons with Lucide
- `card-elevated` instead of `glass-card-elevated`
- Option cards: white bg, hover `translateY(-2px)`, orange left border on select, green bg wash + `motion.div` bounce on correct, red bg wash + shake on wrong
- Streak: `Flame` icon with orange pill, `motion` scale spring on increment
- Feedback panel: Light green/red bg with saturated left border
- Progress bar: orange fill on `bg-bg-muted` track
- Wrap options in `motion.div` with staggered entrance

---

## Step 14: Redesign `AuditGame.jsx` — Lighter Split Layout

**File:** `src/components/AuditGame.jsx` (23 icon instances, 512 lines)

- Replace all 23 FA icons with Lucide equivalents
- `card-elevated` throughout
- Portal panel: White card with blue-tinted header (no dark gradients)
- Evidence panel: White card. Unrevealed = light gray + lock. Revealed = light blue bg + info border
- Risk tags: Unselected = `bg-bg-muted text-text-secondary`. Selected = `bg-primary-light text-primary border-primary`
- Decision buttons: Duolingo 3D push (green proceed, red reject)
- Feedback modal: `bg-black/40` backdrop, white card, Framer Motion spring entrance for mascot
- All dark-mode text colors -> light-mode equivalents

---

## Step 15: Redesign `ContextCard.jsx` — Friendly Pre-Game Modal

**File:** `src/components/ContextCard.jsx`

- Replace FA icons with Lucide
- Backdrop: `bg-bg-base/80` (light)
- Card: `card-elevated`
- Illustration: light gradient overlay (`from-white to-transparent`)
- Objective section: `bg-info/10` (light blue tint)
- Tips: Light cards with pastel left border, Framer Motion stagger
- SOP Rules section (from Step 1): Colorful cards with `ListChecks` Lucide icon
- CTA: "Let's Go!" Duolingo button with bounce animation

---

## Step 16: Redesign `Results.jsx` — Celebration Report

**File:** `src/components/Results.jsx`

- Replace 12 FA icons with Lucide
- `card-elevated` throughout
- Score cards: White cards with colored top border accent
- Behavior analysis: Light card with colored left border
- Case breakdown table: Clean white card, subtle striped rows (`even:bg-bg-muted`)
- Risk meter: Light gray track, same gradient fills
- Mascot: Large celebrating pose with Framer Motion bounce
- Section stagger entrance animations

---

## Step 17: Redesign Supporting Components

**`Mascot.jsx`:** Light speech bubble (white card, light arrow border), Framer Motion spring for state transitions, `AnimatePresence` for speech bubble enter/exit.

**`RoleBadge.jsx`:** Lucide `Code`/`Warehouse` icons, light-mode pastel backgrounds.

**`ProgressiveTimer.jsx`:** Lucide `Clock`, track `bg-border`, light text colors.

**`ComparisonPanel.jsx`:** Lucide icons, light-mode panel backgrounds, light conflict indicator.

**`ResumeView.jsx`:** Minimal changes — already uses white backgrounds internally. Update `text-cyber-cyan` references to `text-info`. Keep creative template dark sidebar as resume design element.

---

## Step 18: Update Data Files — Icon References

**`src/data/games.js`:** Change icon properties: `'fa-lightbulb'` -> `'Lightbulb'`, `'fa-user-graduate'` -> `'GraduationCap'`, etc.

**`src/data/contextCards.js`:** Same icon string changes (mirrors games.js).

**`src/data/audit.js`:** Change `riskTags` icon properties: `'fa-scroll'` -> `'Scroll'`, `'fa-calendar'` -> `'Calendar'`, etc.

**`src/utils/scoring.js`:** Update behavior config `icon` properties from FA to Lucide strings.

---

## Step 19: Verification & Polish

1. `npm run dev` — verify every screen renders in light mode
2. Search for remnant dark colors (`#0a`, `#11`, `#1a`, `rgba(255,255,255,0.0`)
3. Search for remaining `fa-` class references — should be zero
4. Search for remaining `glass-card` references — should be zero
5. Test Framer Motion transitions: hero -> hub -> game -> hub -> audit -> results -> restart
6. Test mascot at each stage with speech bubbles
7. Test train track: station states (completed/active/locked), horizontal scroll on mobile
8. Test ResumeView templates within light context
9. Test all Duolingo 3D push button interactions
10. Verify confetti fires on Results with updated colors
11. Mobile responsiveness check (especially train track)

---

## Implementation Order (dependency-aware)

1. Step 6 (deps must be installed first)
2. Step 7 (CSS foundation for everything)
3. Step 8 (icon map + shared components needed by all)
4. Step 9 (App.jsx enables page transitions)
5. Step 10 (Header — visible on all screens)
6. Step 11 (Hero — first screen)
7. Step 12 (GameHub — most complex structural change)
8. Step 15 (ContextCard — needed before testing games)
9. Step 13 (MiniGame)
10. Step 14 (AuditGame)
11. Step 16 (Results)
12. Step 17 (Supporting components — alongside their parents)
13. Step 18 (Data file icon updates — alongside Step 8)
14. Step 19 (Final verification)

---

## All Files Summary (Part 1 + Part 2)

### New files (3):
- `src/utils/iconMap.js`
- `src/components/ui/MotionWrapper.jsx`

### Modified files (20):
| File | Part 1 | Part 2 |
|------|--------|--------|
| `package.json` | - | Add framer-motion, lucide-react, @fontsource-variable/nunito; remove animate.css |
| `index.html` | - | Remove FA + Google Fonts CDN |
| `src/main.jsx` | - | Add font import |
| `src/index.css` | - | **Full rewrite** (light theme) |
| `src/App.jsx` | - | Framer Motion + confetti colors |
| `src/components/Header.jsx` | - | Light redesign + Lucide |
| `src/components/Hero.jsx` | - | Light redesign + Lucide + Framer |
| `src/components/GameHub.jsx` | - | **Train track restructure** |
| `src/components/MiniGame.jsx` | - | Light redesign + Lucide + Framer |
| `src/components/AuditGame.jsx` | - | Light redesign + Lucide (23 icons) |
| `src/components/Results.jsx` | - | Light redesign + Lucide + Framer |
| `src/components/ContextCard.jsx` | SOP rules render | Light redesign + Lucide |
| `src/components/Mascot.jsx` | - | Light speech bubble + Framer |
| `src/components/RoleBadge.jsx` | - | Lucide + light colors |
| `src/components/ProgressiveTimer.jsx` | - | Lucide + light colors |
| `src/components/ComparisonPanel.jsx` | - | Lucide + light colors |
| `src/components/ResumeView.jsx` | New fields in 3 templates | Minor color token updates |
| `src/data/contextCards.js` | Add sopRules | Icon string changes |
| `src/data/games.js` | Mirror enriched data | Icon string changes |
| `src/data/resumeScenarios.js` | Enrich + US/Canada | - |
| `src/data/audit.js` | - | Icon string changes in riskTags |
| `src/utils/scoring.js` | - | Icon string changes in behavior config |

### Files NOT modified:
- `src/data/eligibilityRules.js` — Reference only
- `vite.config.js` — No changes needed
