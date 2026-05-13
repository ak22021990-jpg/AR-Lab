# AMZ3 Academic Risk Lab — Comprehensive Design Critique

## Context
This is a **production training tool for screening agents** who verify candidate education eligibility before company outreach. The app uses a Duolingo-inspired gamification model with 5 mini-games + a final audit challenge. This critique covers every screen, identifies 45+ issues across UX, accessibility, layout, content, and missing features, and provides actionable recommendations. The user wants a demo-ready product.

---

## CRITICAL Issues (Blocks usability or violates standards)

### 1. ~~No Focus Styles — Accessibility Blocker~~ [FIXED]
**File:** `src/index.css`
**Issue:** Zero `focus-visible` styles defined. Keyboard users cannot see which element is focused. This fails WCAG 2.1 AA (2.4.7 Focus Visible).
**Fix:** Add to base styles:
```css
*:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### 2. ~~Real Political Figures as Candidate Names — Content Risk~~ [FIXED]
**File:** `src/data/resumeScenarios.js`, `src/data/games.js`
**Issue:** Final audit uses Narendra Modi, Rahul Gandhi, Arvind Kejriwal, Mamata Banerjee, Amit Shah as candidate names in a "reject/proceed" screening game. Also uses Pichai, Nadella, Musk, Bezos. For a professional training tool, this is a legal and sensitivity liability.
**Fix:** Replace ALL with fictional US/Canadian names. Keep very minimal Indian profiles (1-2 max). Ensure diverse, culturally appropriate fictional names.

### 3. ~~AuditGame Decision Controls Buried Below Resume~~ [FIXED]
**Files:** `src/components/AuditGame.jsx:326-486`
**Issue:** Resume has `min-h-[600px]`, and risk tags + decision buttons are placed BELOW it. Agents must scroll 600px+ past the resume to make decisions. In real screening workflows, resume and decision panel should be visible simultaneously.
**Fix:** Restructure to a **fixed split-panel layout**:
- Left panel: Resume (scrolls independently within its container)
- Right sidebar: Portal data + Evidence tokens (already there)
- Bottom sticky bar: Risk tags + Proceed/Reject buttons (always visible)
- OR make the risk tags + decision section `sticky bottom-0`

### 4. ~~ComparisonPanel Overlays Resume Content~~ [FIXED]
**File:** `src/components/AuditGame.jsx:345-361`
**Issue:** For `graduation-gate` game, the ComparisonPanel uses `absolute top-10 left-0 right-0 z-10`, completely blocking the resume the agent needs to reference.
**Fix:** Position comparison panel ABOVE the resume container (not overlaying), or make it a collapsible/dismissible banner with a toggle button.

### 5. ~~MiniGame Auto-Submits on Click — Conflicting UX~~ [FIXED]
**File:** `src/components/MiniGame.jsx:269`
**Issue:** `onClick={() => !answered && handleAnswer(idx)}` immediately submits the answer on click. But there's also a "Lock Answer" button at line 323. Users expect click = select, button = submit (the Duolingo pattern).
**Fix:** Separate selection from submission:
- `onClick` should only set `setSelectedOption(idx)`
- "Lock Answer" button calls `handleAnswer(selectedOption)`
- Remove `handleAnswer` from option `onClick`

### 6. ~~Timer Durations Decrease for Harder Games~~ [FIXED]
**Files:** `src/components/MiniGame.jsx:46-53`, `src/components/AuditGame.jsx:67-74`
**Issue:** Eligibility Basics gets 120s, Education Audit gets 60s. Harder games have more complex scenarios but LESS time.
**Fix:** Flip the order:
- Eligibility Basics: 60s (simple MCQ)
- Degree Detective: 80s
- Graduation Gate: 90s
- University Validator: 100s
- Education Audit: 120s (most complex)

---

## MAJOR Issues (Significantly harms UX or visual quality)

### 7. ~~Hero Illustration Pushes CTA Below Fold~~ [FIXED]
**File:** `src/components/Hero.jsx:44-62`
**Issue:** Hero illustration wrapper (`max-w-2xl`, `mb-12`) + title (`mb-12`) + feature grid (`mb-16`) means the "Start Training Hub" button is ~800px down. On 1080p displays, it's below the fold.
**Fix:** Reduce illustration max width to `max-w-lg`, reduce margins (`mb-8` instead of `mb-12/16`), or use a side-by-side layout.

### 8. ~~GameHub Massive Dead Space~~ [FIXED]
**File:** `src/components/GameHub.jsx:122`
**Issue:** Track container has `mb-48` (192px) + `pb-32` (128px) + `min-h-[400px]` — creating ~300px+ of empty whitespace below the track.
**Fix:** Reduce to `mb-16 pb-16`, remove `min-h-[400px]`.

### 9. Pop-over Cards Clip at Screen Edges
**File:** `src/components/GameHub.jsx:222-264`
**Issue:** Station info pop-overs are `w-72` positioned at `top-36`. For the first and last stations, these clip off the visible area.
**Fix:** Add edge detection: first 2 stations get `left-0`, last 2 stations get `right-0`, middle stations stay centered.

### 10. ~~No Keyboard Navigation on Journey Map~~ [FIXED]
**File:** `src/components/GameHub.jsx:140-267`
**Issue:** Station nodes only respond to click. No `tabIndex`, `role`, `aria-label`, or `onKeyDown` handlers.
**Fix:** Add `tabIndex={0}`, `role="button"`, `aria-label={station.title}`, and `onKeyDown` for Enter/Space activation.

### 11. ~~ContextCard Cannot Be Dismissed~~ [FIXED]
**File:** `src/components/ContextCard.jsx`
**Issue:** No close button or Escape key handler. Accidental clicks force agents to start the game.
**Fix:** Add a back/close button in the top-right corner. Add `onKeyDown` listener for Escape to call `onBack` if available.

### 12. ~~Feedback Modal Hides Mascot on <1024px~~ [FIXED]
**File:** `src/components/AuditGame.jsx:201-213`
**Issue:** Mascot reaction is `hidden lg:block`. On screens below 1024px, agents get no emotional feedback — a core Duolingo mechanic.
**Fix:** Show mascot inside the modal (above the title) at a smaller size for all screen sizes.

### 13. ~~Risk Tags Missing "Select All That Apply" Guidance~~ [FIXED]
**File:** `src/components/AuditGame.jsx:405-425`
**Issue:** "Identify Issues" header with no instruction on expected selection count. Agents don't know if they should select 1 or many.
**Fix:** Add microcopy: "Select all applicable risk factors" below the heading.

### 14. No State Persistence
**Issue:** Refreshing the browser or closing the tab loses ALL progress. For a tool with 5 labs + a final audit, this is frustrating.
**Fix:** (Deferred to future scope per user) — Note this as a v2 requirement.

### 15. ~~Missing `.no-scrollbar` CSS Class~~ [FIXED]
**File:** `src/components/GameHub.jsx:138` references `.no-scrollbar` but it's not in `src/index.css`
**Fix:** Add to index.css:
```css
.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
```

### 16. ~~Security — innerHTML in Mascot Component~~ [FIXED]
**File:** `src/components/Mascot.jsx:86-89`
**Issue:** `container.innerHTML = ...` bypasses React's DOM and could cause reconciliation issues.
**Fix:** Use React state: `const [fallbackEmoji, setFallbackEmoji] = useState(null)` and render conditionally.

### 17. ~~Security — dangerouslySetInnerHTML in ResumeView~~ [FIXED]
**File:** `src/components/ResumeView.jsx:448-466`
**Issue:** Inline `<style>` tag via `dangerouslySetInnerHTML` for scrollbar CSS.
**Fix:** Move these styles to `src/index.css` under `.custom-scrollbar` class.

### 18. ~~Feedback Modal Needs Full Debrief Expansion~~ [FIXED]
**File:** `src/components/AuditGame.jsx:192-287`
**Issue:** Current feedback shows score breakdown and one-line rule, but agents need deeper learning. Training tools should show the complete reasoning chain.
**Fix:** Expand the feedback modal to include:
- The exact SOP rule (with section reference)
- Step-by-step correct reasoning chain
- Common mistakes for this scenario type
- "What to look for next time" guidance
- Collapsible "Learn More" section

### 19. ~~No Review Mode for Completed Games~~ [FIXED]
**File:** `src/components/GameHub.jsx:249-261`
**Issue:** "Revisit Lab" fully restarts the game with shuffled questions. Agents can't review their previous answers.
**Fix:** Offer two buttons in the pop-over: "Review Previous" (read-only mode showing questions + correct answers + explanations) and "Retry Fresh" (current behavior).

---

## MINOR Issues (Polish issues reducing perceived quality)

### 20. ~~"Elite Screening Protocol" Tone Mismatch~~ [FIXED]
**File:** `src/components/Hero.jsx:66-67`
**Issue:** The subtitle "Elite Screening Protocol" feels military/corporate, conflicting with Duolingo playfulness.
**Fix:** Use "Your Training Starts Here" or "Master Education Screening". [Applied: "Your Training Starts Here"]

### 21. ~~Feature Card Images Washed Out~~ [FIXED]
**File:** `src/components/Hero.jsx:92`
**Issue:** `opacity-60` by default makes illustrations look broken/faded.
**Fix:** Use `opacity-80` or `opacity-90` minimum. [Applied: opacity-100]

### 22. ~~Station Labels Truncate Game Names~~ [FIXED]
**File:** `src/components/GameHub.jsx:215-216`
**Issue:** `max-w-[120px]` with `text-ellipsis` cuts "University Validator" to "University Va..."
**Fix:** Remove max-width or increase to `max-w-[140px]` and allow 2-line wrapping.

### 23. ~~Header Mascot Always Neutral~~ [FIXED]
**File:** `src/components/Header.jsx:58-63`
**Issue:** Always loads `neutral.png` regardless of game state, risk level, or streaks.
**Fix:** Accept a `mascotState` prop and dynamically update: `src={/assets/mascot/${mascotState}.png}`

### 24. ~~Header Risk Meter Too Small~~ [FIXED]
**File:** `src/components/Header.jsx:88`
**Issue:** `h-1.5` makes the risk meter nearly invisible.
**Fix:** Increase to `h-2` or `h-2.5`.

### 25. ~~ContextCard Bounce Button Distracting~~ [FIXED]
**File:** `src/components/ContextCard.jsx:136-141`
**Issue:** Infinite `y: [0, -4, 0]` bounce while agents are reading SOP rules.
**Fix:** Add `transition: { y: { repeat: Infinity, duration: 2, delay: 5 } }` to start bouncing only after reading time.

### 26. ~~ContextCard Overflow on 1080p~~ [FIXED]
**File:** `src/components/ContextCard.jsx:31`
**Issue:** Modal with illustration (h-56) + content can overflow on 1080p screens.
**Fix:** Add `max-h-[90vh] overflow-y-auto` to the inner content div.

### 27. Evidence Tokens Not Using CSS Class
**File:** `src/components/AuditGame.jsx:498-499`
**Issue:** Evidence indicators are tiny `w-3.5 h-3.5` dots, but CSS has a styled `.evidence-token` class (`w-10 h-10`) going unused.
**Fix:** Use the `.evidence-token` class for consistency.

### 28. ~~Back Button Grammar~~ [FIXED]
**File:** `src/components/MiniGame.jsx:344`
**Issue:** "Exit Lab Hub" should be "Exit to Lab Hub" or "Back to Hub".

### 29. ~~SVG Score Ring No Accessibility~~ [FIXED]
**File:** `src/components/Results.jsx:138-162`
**Issue:** No `aria-label` or role on the SVG score ring.
**Fix:** Add `role="img" aria-label={Total score: ${totalScore} out of 150}`.

### 30. ~~Results Page Single Action Only~~ [FIXED]
**File:** `src/components/Results.jsx:327-334`
**Issue:** Only "CONTINUE TO LAB HUB". No retry, review, print, or export.
**Fix:** Add "Review Cases" and "Print Results" buttons.

### 31. ~~Mascot Missing xs Size~~ [FIXED]
**File:** `src/components/Mascot.jsx:15-19`
**Issue:** `sizeClasses` only defines `sm`, `md`, `lg`. But `GameHub.jsx:202` passes `size="xs"`, falling back to undefined.
**Fix:** Add `xs: 'w-8 h-8'` to `sizeClasses`.

### 32. ~~Creative Resume Language Bars Hardcoded~~ [FIXED]
**File:** `src/components/ResumeView.jsx:352`
**Issue:** Language proficiency bars are hardcoded to 4/5 filled regardless of actual proficiency.
**Fix:** Map proficiency strings to numeric values: `{ Native: 5, Fluent: 4, Intermediate: 3, Basic: 2 }`.

---

## MISSING Features — Recommendations for Demo-Readiness

### 33. ~~Animated Decision Tree / SOP Flowchart~~ [FIXED]
**Recommendation:** Add an interactive SVG flowchart to each ContextCard showing the decision logic:
- "Is degree in valid list?" → Yes/No branches
- "Is graduation year in window?" → Yes/No
- Can be created in Canva Pro as SVG exports or use a React flow library
- Serves as both a learning aid and a reference during gameplay

### 34. ~~Canva Pro Video Integration~~ [FIXED]
**Recommendation:** Embed short (30-60s) Canva video walkthroughs before each lab:
- Create in Canva Pro using their video editor
- Export as MP4 and host in `/public/assets/videos/`
- Or use Canva's embed feature with `<iframe>`
- Video topics: "How to Read a Resume for Red Flags", "Portal vs Resume: What to Check", "The SOP Decision Framework"
**Fix:** Decided against video integration for better interactivity. Implemented an interactive UI walkthrough using `react-joyride`. It guides the user through a dummy resume in the ContextCard overlay before starting the game, highlighting key fields like graduation year and degree.

### 35. ~~Lottie Animations Instead of Static Mascot PNGs~~ [FIXED]
**Recommendation:** Replace mascot PNGs with Lottie JSON animations.
**Fix:** Decided against Lottie due to setup friction. Instead, implemented continuous state-based animations (breathing, shaking, rotating) directly on the existing static PNGs using Framer Motion (`<motion.img>`).

### 36. ~~Sound Effects for Gamification~~ [FIXED]
**Recommendation:** Add optional sound effects (toggle in header):
- Correct answer: short success chime
- Wrong answer: soft error tone
- Streak: ascending tones
- Level complete: celebration jingle
- Can use royalty-free sounds from Canva Pro or Pixabay
**Fix:** Implemented a zero-dependency Web Audio API synthesizer (`src/utils/audio.js`) that dynamically generates chimes, tones, and celebration sounds without needing any external audio assets. Added a volume toggle in the header.

### 37. ~~Confetti Upgrade~~ [FIXED]
**Recommendation:** Currently confetti fires on score gain. Consider:
- Different confetti patterns per achievement (stars for perfect score, emojis for streaks)
- Use `canvas-confetti` presets: `confetti.shapeFromPath()` for custom shapes
**Fix:** Created `src/utils/confetti.js` utility that exposes a `triggerConfetti(type)` function. It fires different shapes and patterns based on the achievement: `perfect` (stars and circles), `streak` (fire and star emojis), or `default` for regular completion. Integrated this into `MiniGame.jsx` (for streak) and `App.jsx` (for completion).

### 38. ~~Progress Breadcrumb~~ [FIXED]
**Recommendation:** Add a minimal breadcrumb below the header showing: `Hub > Lab 3: Graduation Gate > Case 2 of 3` so agents always know where they are.
**Fix:** Created a new `Breadcrumb` component and integrated it just below the `Header` in `App.jsx`. It dynamically shows the hub link, the current lab/audit name with its number, and the case progress.

### 39. Hotkeys for Power Users
**Recommendation:** Add keyboard shortcuts:
- `1-4` to select options in MCQ
- `Enter` to submit/next
- `P` for Proceed, `R` for Reject in audit
- `Escape` to go back

### 40. Print-Friendly Results Page
**Recommendation:** Add a `@media print` stylesheet or a "Print Results" button that generates a clean summary for agent records.

---

## Asset Recommendations

### From Canva Pro (Free/Pro)
1. **Illustration Headers** — Use Canva's illustration library for each game's ContextCard header (search: "education", "graduation", "certificate", "audit")
2. **Video Walkthroughs** — Create 30-60s explainer videos using Canva's video templates
3. **Decision Tree Graphics** — Create SOP flowcharts using Canva's diagram templates, export as SVG

### Free Resources
1. **LottieFiles.com** — Free animated mascot characters (search: "robot assistant", "owl teacher")
2. **Lucide Icons** — Already using, but consider adding more for visual variety
3. **Undraw.co** — Free SVG illustrations (customizable colors to match #FF9900)
4. **Pixabay.com** — Royalty-free sound effects for gamification
5. **Hero Patterns** — Subtle SVG background patterns (heropatterns.com) for section differentiation

### SVG Inline Illustrations
Consider replacing the PNG illustrations with inline SVGs for:
- Faster loading (no network request)
- Color customization via CSS variables
- Crisp at any resolution
- Smaller bundle size

---

## Priority Ranking for Demo-Readiness

### P0 — Fix Before Demo
1. Replace all real names with fictional US/Canadian names (Issue #2)
2. Fix MiniGame auto-submit behavior to Duolingo-style (Issue #5)
3. Fix AuditGame layout — sticky decision controls (Issue #3)
4. Fix timer order — increase time for harder games (Issue #6)
5. Add focus styles for accessibility (Issue #1)
6. Fix ComparisonPanel overlay (Issue #4)
7. Add `.no-scrollbar` CSS (Issue #15)
8. Fix Mascot `xs` size class (Issue #31)

### P1 — Important for Quality
9. Reduce GameHub dead space (Issue #8)
10. Add "Select all that apply" to risk tags (Issue #13)
11. Add ContextCard close/back button (Issue #11)
12. Fix feedback modal mascot visibility (Issue #12)
13. Move dangerouslySetInnerHTML CSS to index.css (Issue #17)
14. Fix Mascot innerHTML to React state (Issue #16)
15. Expand feedback to full debrief (Issue #18)

### P2 — Polish
16-32. All minor issues listed above

### P3 — New Features
33-40. Asset recommendations, videos, Lottie, sounds, hotkeys, etc.

---

## Verification Plan
1. Tab through entire app with keyboard only — every interactive element must have visible focus
2. Test AuditGame on 1366x768 and 1920x1080 — decision controls must be visible without scrolling
3. Verify all 25 scenarios have fictional names
4. Test MiniGame: click option (should highlight), click Lock Answer (should submit)
5. Verify timer: Eligibility Basics = 60s, Education Audit = 120s
6. Test ContextCard on 1080p — should not overflow, should have close button
7. Test GameHub pop-overs on first and last stations — should not clip
8. Run `grep -r "innerHTML" src/` — should return zero results after fixes
9. Run `grep -r "dangerouslySetInnerHTML" src/` — should only be in justified cases
10. Check all mascot states render correctly (including xs size in GameHub)
