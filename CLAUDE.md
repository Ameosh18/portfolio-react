# Portfolio React — Project Guidelines for Claude

This file is automatically read by Claude Code at the start of every session.
Follow every rule here unless the user explicitly overrides it in conversation.

---

## 1. Project Overview

Personal portfolio for **Ameya Kulkarni**, Lead UX Designer (9.5 years).
Built with React + Vite, deployed to GitHub Pages at `/portfolio-react/`.

**Stack:** React 18, React Router 6, Framer Motion (`motion/react`), plain CSS (no CSS-in-JS).

**Key files:**
| File | Purpose |
|---|---|
| `style.css` | All global styles and CSS variables (2800+ lines) |
| `src/App.jsx` | Router, NameProvider, CustomCursor |
| `src/context/NameContext.jsx` | Visitor name state (sessionStorage) |
| `src/components/LoadingScreen.jsx` | Intro loading animation |
| `src/components/NamePopup.jsx` | Glassmorphism name-entry dialog |
| `src/components/CustomCursor.jsx` | Accent-colored cursor + name tooltip |
| `src/components/Nav.jsx` | Navigation + theme toggle |
| `src/pages/HomePage.jsx` | Main landing page |
| `src/pages/WorkPage.jsx` | Work listing |
| `src/pages/CaseStudyPage.jsx` | Case study detail |

---

## 2. Design System — CSS Variables

All colours and surfaces are defined as CSS custom properties.
**Always use these variables. Never hardcode hex values in new code.**

### Dark Theme (default, `:root`)
```css
--bg:              #0A0A0A
--surface:         #111111
--surface-raised:  #1A1A1A
--border:          #1F1F1F
--border-subtle:   #161616
--text:            #FFFFFF
--text-secondary:  #CCCCCC
--muted:           #AAAAAA
--muted-strong:    #888888
--accent:          #C8A97E   /* warm gold — primary brand colour */
--accent-rgb:      200, 169, 126
--accent-strong:   #D4B896
--card-bg:         rgba(17, 17, 17, 0.65)
--nav-bg:          rgba(10, 10, 10, 0.92)
--overlay-bg:      rgba(10, 10, 10, 0.97)
```

### Light Theme (`[data-theme="light"]`)
```css
--bg:              #F7F4F0   /* warm cream — page background only */
--surface:         #EDEAE5
--surface-raised:  #E4E0DA
--border:          #D4CFC8
--border-subtle:   #E0DCD6
--text:            #1A1A1A
--text-secondary:  #2E2E2E
--muted:           #5A5A5A
--muted-strong:    #777777
--accent:          #7A5E34   /* warm brown */
--accent-rgb:      122, 94, 52
--accent-strong:   #9A7A4A
--card-bg:         rgba(237, 234, 229, 0.80)
--nav-bg:          rgba(247, 244, 240, 0.92)
--overlay-bg:      rgba(247, 244, 240, 0.97)
```

### Light Theme Colour Rule
> Use **white (`#FFFFFF` or `rgba(255,255,255,...)`)** for glass/card elements in light mode — NOT cream.
> Cream (`#F7F4F0`) is for the page background only. White produces cleaner glassmorphism in light mode.

---

## 3. Typography

```css
--font-display: 'Playfair Display', Georgia, serif   /* headings, hero text */
--font-body:    'DM Sans', system-ui, sans-serif     /* all body copy, UI */
```

**Scale guidelines for popup/card content:**
| Role | Size |
|---|---|
| Eyebrow label | 12px, `letter-spacing: 0.12em`, uppercase |
| Headline | `clamp(28px, 6vw, 38px)`, Playfair Display |
| Body copy | 16px, `line-height: 1.75` |
| Input text | 16px |
| Button | 14px, `font-weight: 600` |
| Disclaimer / meta | 12px |

**Typography rules:**
- Use `var(--font-display)` for all headings and display text.
- Use `var(--font-body)` for all UI, labels, body, and buttons.
- Never use `font-size` below 12px for any visible text.
- Increase font sizes when content feels small — default to comfortable reading sizes.

---

## 4. Theme System

- Theme is stored in `localStorage` with key `"theme"` (values: `"dark"` / `"light"`).
- Applied via `data-theme` attribute on `<html>` — toggled in `Nav.jsx`.
- **Every new component must work correctly in both themes.**
- Use CSS variable overrides with `[data-theme="light"] .component-name { }` for light-specific adjustments.
- `#root` has `transition: background-color 0.3s, color 0.3s` for smooth theme switching.
- Test both themes visually before considering any UI feature complete.

---

## 5. WCAG Accessibility — Non-Negotiable Rules

**Always follow WCAG 2.1 AA as a minimum. These rules are mandatory:**

### Colour Contrast (WCAG 1.4.3)
Minimum ratios — verified against the design system:
| Text | Background | Ratio | Status |
|---|---|---|---|
| `#AAAAAA` (--muted dark) | `#111111` | 8.5:1 | AAA |
| `#FFFFFF` (--text dark) | `#111111` | 21:1 | AAA |
| `#C8A97E` (--accent dark) | `#111111` | 9.4:1 | AAA |
| `#5A5A5A` (--muted light) | `#F7F4F0` | 6.6:1 | AA |
| `#5A5A5A` (--muted light) | `#FFFFFF` | 7.1:1 | AA |
| `#7A5E34` (--accent light) | `#F7F4F0` | 6.2:1 | AA |
| `#0A0A0A` on `#C8A97E` (btn) | | 9.6:1 | AAA |

> When adding new colour combinations, verify contrast before shipping.

### Dialogs / Modals
Every modal/dialog must have:
```jsx
role="dialog"
aria-modal="true"
aria-labelledby="[id-of-heading]"
```
- Focus must move INTO the dialog on open (use `setTimeout(() => ref.focus(), 50)`).
- Focus must be trapped inside (Tab/Shift+Tab cycle within focusable elements only).
- Focus must RETURN to the previously active element on close (store `prevFocusRef = document.activeElement`).
- Escape key must close the dialog.
- Clicking the backdrop (outside the card) must close the dialog.

### Form Inputs
- Every input must have a visible `<label>` element linked via `htmlFor` / `id` pair.
- Do NOT rely on placeholder text as the only label — placeholders disappear on focus.
- Use `aria-disabled` in addition to the HTML `disabled` attribute on buttons.

### Interactive Elements
- Minimum touch target size: 44x44px (WCAG 2.5.5).
- All interactive elements need `:focus-visible` styles. Use:
  ```css
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  ```
- Never use `outline: none` without providing an equivalent focus indicator.

### Custom Cursor
- `body { cursor: none; }` is applied for the custom accent cursor.
- Restore on touch devices: `@media (pointer: coarse) { body { cursor: auto; } }`
- Restore in high-contrast mode:
  ```css
  @media (forced-colors: active) {
    body { cursor: auto; }
    .custom-cursor-arrow, .custom-cursor-tooltip { display: none; }
  }
  ```
- All cursor elements must have `aria-hidden="true"` and `pointer-events: none`.

### Semantic HTML
- Use landmark elements: `<main>`, `<nav>`, `<section>`, `<footer>`.
- Use heading hierarchy — do not skip levels (h1 -> h2 -> h3).
- Decorative elements get `aria-hidden="true"`.
- Images must have meaningful `alt` text (never empty on content images).

---

## 6. UX Principles

### General
- **Do not add features, abstractions, or refactors beyond what is explicitly requested.**
- Keep interactions purposeful — every animation and transition must serve the user, not show off.
- Default to **comfortable sizing** — when in doubt, make text and touch targets bigger, not smaller.

### Glassmorphism Cards
Standard glass card recipe:
```css
background: rgba(17, 17, 17, 0.72);          /* dark */
background: rgba(255, 255, 255, 0.82);        /* light — use WHITE not cream */
backdrop-filter: blur(28px) saturate(160%);
-webkit-backdrop-filter: blur(28px) saturate(160%);
border: 1px solid rgba(255, 255, 255, 0.08); /* dark */
border: 1px solid rgba(0, 0, 0, 0.06);       /* light */
border-radius: 24px;
box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
```

### Animations
- Use **Framer Motion** (`motion/react`) for all enter/exit animations.
- Standard popup/card entry:
  ```js
  initial: { opacity: 0, scale: 0.95, y: 24 }
  animate: { opacity: 1, scale: 1, y: 0 }
  exit:    { opacity: 0, scale: 0.96, y: 16 }
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  ```
- Wrap conditionally rendered animated components in `<AnimatePresence>`.
- Use `requestAnimationFrame` for continuous tracking (e.g. cursor) — never `setInterval` or `mousemove` -> `setState`.

### Responsive Design
**Breakpoints (mobile-first):**
| Breakpoint | Purpose |
|---|---|
| `max-width: 480px` | Mobile layout (stack columns, remove notch effects) |
| `max-width: 640px` | Small mobile |
| `max-width: 768px` | Tablet |
| `max-width: 1024px` | Large tablet / small desktop |

**Rules:**
- Every new component must be tested at 320px, 480px, 768px, 1280px viewport widths.
- Touch targets must be at least 44px tall on mobile.
- Font sizes must never feel cramped — use `clamp()` for responsive scaling.
- Hide custom cursor on touch devices (`@media (pointer: coarse)`).

---

## 7. Content & Copywriting Rules

### Mandatory: No Em Dashes
**Never use em dashes (`—`) anywhere on the site.** This applies to:
- JSX text content
- `alt` attributes
- `aria-label` values
- Comments in JSX (use plain hyphen `-` instead)

**Replace em dashes with:**
- A comma for a natural pause: `platform, I work...`
- A colon for introducing: `DiGiSense: Connected Vehicle...`
- A period to split into two sentences
- A conjunction: `...insights and reducing...`
- An interpunct `·` as a visual separator in UI labels

### Voice and Tone
- **Down-to-earth and humble** — grateful the visitor is here, not self-promotional.
- **Crisp and direct** — fewer words land harder. Cut anything that over-explains.
- **Slightly human** — conversational, warm, like a real person wrote it.
- **Never overconfident** — avoid phrases like "my finest work", "stops being just another portfolio", "make it yours" (imperative commands feel pushy).

### Popup Copy (established, do not change without explicit instruction)
```
Eyebrow:     "One quick thing"
Headline:    "Glad you're here."
Body:        "I'd love to know who's exploring my work. Just your name. That's all."
Placeholder: "What should I call you?"
Button:      "Step Inside ->"
Disclaimer:  "Only for this session"
```

---

## 8. Custom Cursor System

### Cursor Arrow
- Shape: Traced 4-point dart cursor (`M4 1 L97 45 L52 54 L36 99 Z` in a `0 0 100 100` viewBox).
- Size: `width="28" height="28"`.
- Fill: `var(--accent)` — no stroke, no shadow.
- Hotspot: top-left tip (no CSS `translate` offset — position is the tip).

### Tooltip
- Appears when visitor name is set in sessionStorage.
- Format: `Name (You)` — the `(You)` portion in `var(--accent)`.
- Offset from arrow tip: `transform: translate(36px, 2px)` — gives breathing space past the arrow body.
- Pill shape: `border-radius: 100px`, `backdrop-filter: blur(12px)`, `var(--card-bg)` background.

### State Management
- Name stored in `sessionStorage` key `"visitor-name"`.
- Accessed via `useName()` hook from `src/context/NameContext.jsx`.
- Custom cursor renders globally in `App.jsx` via `<CustomCursor />` inside `AppContent`.

---

## 9. Visitor Name Popup Flow

1. `LoadingScreen` plays for 3.2s.
2. On `onComplete`: if no name in sessionStorage, wait 400ms then show `NamePopup`.
3. Homepage content is **blurred** (`filter: blur(14px)`) until name is confirmed.
4. On name confirmed: blur lifts with a smooth `0.5s ease` transition.
5. Returning visitors (name in sessionStorage): no popup, content unblurs immediately.
6. The `content-blurred` class is applied to `<main id="home-view">`.

---

## 10. Z-Index Layers (established)
| Layer | Z-index | Element |
|---|---|---|
| Page content | 0-99 | Regular content |
| Navigation | 100 | `<nav>` |
| Noise overlay | 1000 | `body::before` |
| Artifact modals | 500 | `.artifact-modal` |
| Name popup backdrop | 10000 | `.name-popup-backdrop` |
| Custom cursor | 99998-99999 | `.custom-cursor-tooltip` / `.custom-cursor-arrow` |

---

## 11. Storage Keys
| Key | Storage | Value | Purpose |
|---|---|---|---|
| `theme` | localStorage | `"dark"` or `"light"` | Theme persistence across sessions |
| `visitor-name` | sessionStorage | String | Visitor's name for current tab session |

---

## 13. Case Study Hero Section — Template

Every case study page follows this standard hero pattern. Copy it exactly when adding a new case study.

### Hero Layout Types

**Type A: Two-column with image** (use when you have a strong hero image)
- Left column (75%): narrative content + meta
- Right column (25%): full-height edge-to-edge image
- Example: DigiSense

**Type B: Single-column text only** (use when no strong image exists)
- Full-width hero with max-width 840px content, left-aligned
- Example: PFS ONE

---

### JSX Structure — Type A (with image)

```jsx
{/* BREADCRUMB */}
<section className="cs-breadcrumb">
  <div className="breadcrumb-nav">
    <Link to="/portfolio-react/work">Work</Link>
    <span className="separator">/</span>
    <span className="current">Project Name</span>
  </div>
</section>

{/* HERO */}
<section className="hero">
  <div className="hero-content">
    <h1 className="hero-headline reveal">
      One strong sentence that frames the problem as tension or discovery.
    </h1>
    <p className="hero-subheadline reveal">One short italic line that hooks the reader.</p>
    <div className="hero-meta reveal">
      <div className="hero-meta-item">
        <span className="hero-meta-label">Role</span>
        <span className="hero-meta-value">Lead UX Designer</span>
      </div>
      <div className="hero-meta-item">
        <span className="hero-meta-label">Platform</span>
        <span className="hero-meta-value">iOS · Android · Web</span>
      </div>
      <div className="hero-meta-item">
        <span className="hero-meta-label">Timeline</span>
        <span className="hero-meta-value">Year</span>
      </div>
      <div className="hero-meta-item">
        <span className="hero-meta-label">Studio</span>
        <span className="hero-meta-value">Studio Name</span>
      </div>
    </div>
  </div>
  <div className="hero-image">
    {imgError ? (
      <div className="hero-image-placeholder"><span>Project Name</span></div>
    ) : (
      <img src={heroImg} alt="[descriptive alt text]" onError={() => setImgError(true)} />
    )}
  </div>
  <div className="scroll-indicator">
    <span>Scroll to explore</span>
  </div>
</section>
```

### JSX Structure — Type B (text only)

```jsx
{/* BREADCRUMB */}
<section className="cs-breadcrumb">
  <div className="breadcrumb-nav">
    <Link to="/portfolio-react/work">Work</Link>
    <span className="separator">/</span>
    <span className="current">Project Name</span>
  </div>
</section>

{/* HERO */}
<section className="hero">
  <div className="hero-content">
    <h1 className="hero-headline reveal">
      One strong sentence that frames the problem as tension or discovery.
    </h1>
    <p className="hero-subheadline reveal">Supporting sentence expanding on the stakes.</p>
    <p className="hero-tagline reveal">Optional: one italic closer that draws the reader in.</p>
    <div className="hero-meta reveal">
      {/* same meta items as Type A */}
    </div>
  </div>
  <div className="scroll-indicator">
    <span>Scroll to explore</span>
  </div>
</section>
```

---

### Required CSS for each new case study

Add a `.cs-[slug]` block in `src/case-study.css` with the hero type:

```css
/* ── [PROJECT NAME] hero ── */

/* Type A (with image): */
.cs-[slug] .hero {
  display: grid;
  grid-template-columns: 75fr 25fr;
  align-items: center;
}
.cs-[slug] .hero-content {
  padding: 100px var(--grid-margin) 80px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.cs-[slug] .hero-image {
  height: 100vh;
  background: var(--surface);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cs-[slug] .hero-image img {
  width: 100%; height: 100%; object-fit: cover; opacity: 0.9;
}
.cs-[slug] .hero-headline {
  font-family: var(--font-display);
  font-size: clamp(40px, 4.5vw, 68px);
  font-weight: 400;
  line-height: 1.07;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 32px;
}
.cs-[slug] .hero-subheadline {
  font-family: var(--font-display);
  font-size: clamp(22px, 2.2vw, 34px);
  font-weight: 400;
  font-style: italic;
  color: var(--accent);
  margin-bottom: 48px;
  line-height: 1.3;
}

/* Responsive for Type A: */
@media (max-width: 1024px) {
  .cs-[slug] .hero { grid-template-columns: 1fr; }
  .cs-[slug] .hero-image { display: none; }
  .cs-[slug] .hero-content { padding: 80px var(--grid-margin); }
}
@media (max-width: 768px)  { .cs-[slug] .hero-content { padding: 64px var(--grid-margin) 60px; } }
@media (max-width: 480px)  { .cs-[slug] .hero-content { padding: 48px var(--grid-margin) 52px; } }

/* Type B (text only): */
.cs-[slug] .hero {
  display: flex;
  align-items: center;
  padding: 100px var(--grid-margin) 80px;
}
.cs-[slug] .hero-content {
  max-width: 840px;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  z-index: 1;
}
/* Responsive for Type B: */
@media (max-width: 1024px) { .cs-[slug] .hero { padding: 80px var(--grid-margin); } }
@media (max-width: 768px)  { .cs-[slug] .hero { min-height: auto; padding: 64px var(--grid-margin) 60px; } }
@media (max-width: 480px)  { .cs-[slug] .hero { padding: 48px var(--grid-margin) 52px; } }
```

---

### Registering a new case study

1. **Create** `src/pages/[ProjectName]Page.jsx` — copy DigiSensePage.jsx or PfsOnePage.jsx as template.
2. **Add route** in `src/App.jsx`:
   ```jsx
   import [ProjectName]Page from './pages/[ProjectName]Page'
   // inside Routes:
   <Route path="/[slug]" element={<[ProjectName]Page />} />
   ```
3. **Add to Work gallery** in `src/components/StackedGallery.jsx` — add a card entry to `CARDS`.
4. **Update Nav** active detection — add `'/[slug]'` to the `CASE_STUDY_PATHS` array in `src/components/Nav.jsx`.
5. **Add breadcrumb current label** in the new page: `<span className="current">Display Name</span>`.
6. **Never use `<nav>` for breadcrumbs** — use `<div className="breadcrumb-nav">`. The global `nav { position: fixed }` rule in `style.css` would break it.

### Hero copywriting guidelines

- **Headline**: One sentence framing the *problem as a discovery question or tension*. Not a project title. Not a tagline. A narrative hook.
- **Subheadline**: One italic sentence — either the scale of the problem, the emotional stakes, or the resolution hint.
- **Case study number**: Sequential label (Case Study 01, 02, ...) — accent colored, uppercase, small.
- **Meta strip** (required 4 fields): Role, Platform, Timeline, Studio/Client.
- **No em dashes** anywhere — see rule in section 7.

---

## 14. What NOT to Do

- **Never hardcode hex colours** — always use CSS variables.
- **Never use em dashes (`—`)** anywhere.
- **Never skip WCAG checks** — contrast, focus, labels are non-negotiable.
- **Never add features beyond what was requested** — no "while I'm at it" changes.
- **Never use `outline: none`** without a replacement focus style.
- **Never write multi-line comments** explaining what code does — code should be self-documenting.
- **Never use cream (`#F7F4F0`) for glass cards in light mode** — use white.
- **Never make text smaller** when uncertain — default to larger, more readable sizes.
- **Never commit breaking changes** without running `npm run build` first.
- **Never push to `main` without verifying the build is clean.**
