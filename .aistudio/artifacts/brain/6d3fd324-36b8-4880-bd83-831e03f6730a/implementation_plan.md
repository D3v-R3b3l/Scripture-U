# Scripture Universe — Mobile UX, Accessibility & Canonical Knowledge Graph Overhaul

This plan upgrades Scripture Universe to resolve mobile navigation clipping, enforce full backdrop blur and focus isolation on walkthrough and detail modals across mobile and desktop, switch body copy to a high-legibility `JetBrains Mono` + `Plus Jakarta Sans` pairing, unlock full-canon zoom-out on the 3D Double-Helix, and replace the sparse Knowledge Graph with an immediate, multi-mode Canonical Cross-Reference & Theological Network Observatory that surpasses the classic 63,779 biblical cross-reference arc diagram.

### User Review & Critical Decisions

> [!IMPORTANT]
> Your Phase 1 design decisions have been locked into this specification. Please review the architecture and UX behaviors below and click **Proceed** when ready to build.

- **Confirmed Decision 1 — Tri-Mode Knowledge Graph Architecture**: The Knowledge Graph will feature three synchronized visualization engines: (1) **Canonical Rainbow Arc Diagram** (all 66 books and 1,189 chapter density bars along the horizontal baseline with hundreds of luminous cross-reference arcs categorized by canonical distance and theological motif), (2) **Force-Directed Theological Network** (interactive physics graph of Covenants, People, Prophecies, Themes, Events, and Places), and (3) **Inter-Testamental Chord Matrix** (circular canonical ring mapping book-to-book citation flow between Old and New Testament divisions).
- **Confirmed Decision 2 — Zero-Latency Default Overview & Live Statistical Dashboard**: Upon opening the Knowledge Graph tab, the canvas will render immediately (zero blank-canvas state) showing the full 66-book canonical overview paired with a live statistical telemetry dashboard (total cross-references, inter-testamental fulfillment density, top hub books, and covenantal distribution).
- **Confirmed Decision 3 — Typography & Optical Legibility**: Technical body prose, narrative descriptions, and data panels will use `JetBrains Mono` for crisp monospace clarity, paired with `Plus Jakarta Sans` for single-line UI controls and `Cinzel` reserved strictly for primary display headings.

---

### 1. Overview & Core Concept

- **What It Does**: Transforms Scripture Universe into a calibrated, mobile-first and desktop-grade biblical research observatory where every viewport—from a 375px smartphone to a 1440px+ monitor—maintains strict visual containment, accessible keyboard/touch ergonomics, full-canon 3D zoom visibility, and rich cross-reference analytics.
- **Target Audience / Persona**: Biblical scholars, students, pastors, and visual learners exploring canonical structure, inter-testamental prophecy fulfillment, and theological cross-references across mobile and desktop devices.
- **Key Value**:
  - **Flawless Mobile Containment**: Eliminates horizontal button bleed in the header, multi-line button wrapping (`OT & NT`), and clipped modals on compact screens.
  - **Focused Modal & Walkthrough Governance**: Guarantees that whenever the Research Journey Walkthrough or Deep Context Inspector modal is open, background clutter is blurred/dimmed and the active modal holds clear visual and keyboard focus.
  - **Full-Canon 3D Helix Visibility**: Expands the Double-Helix camera zoom range (`0.22x` to `2.4x`) with a dedicated **Fit Full Canon** control so all 66 books from Genesis to Revelation can be viewed simultaneously without top or bottom clipping.
  - **Groundbreaking Cross-Reference Visualization**: Elevates the Knowledge Graph into an interactive analytical instrument that renders the entire 66-book chapter histogram and luminous cross-reference rainbow arcs alongside network and chord views.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Mobile & Desktop Navigation**:
     - On mobile viewports (`375px–430px`), the top bar displays the compact brand lockup and a properly sized, single-line `Discover` action button that never bleeds past the viewport edge. Below it, horizontally scrollable navigation tabs and toolbar controls maintain `whitespace-nowrap shrink-0` discipline and minimum `44×44px` touch hitboxes.
  2. **Focused Walkthrough & Modal Experience**:
     - **Mobile / Compact Screens**: Opening the 5-Step Research Journey Guide or any entity/scripture inspector renders a full-viewport backdrop (`bg-black/75 backdrop-blur-md`) that dims and blurs the underlying canvas and toolbars. The modal sits centered as a self-contained, scrollable sheet with sticky step navigation (`< Previous` / `Next Step >`) and an explicit close button so buttons are never cut off.
     - **Desktop Screens**: When the Research Journey Guide is open on desktop, a subtle spotlight backdrop (`bg-black/55 backdrop-blur-[3px]`) dims competing background panels and elevates the Guide card to the highest z-index focal plane with an active amber focus border and keyboard shortcut support (`Escape` to minimize, `←`/`→` for step traversal). Clicking "Try This Step Now" actions or minimizing the guide smoothly restores full interactive canvas brightness.
  3. **Full-Canon Double-Helix Zoom & Fit**:
     - Users can zoom out to `0.22x` (via pinch, scroll wheel, Zoom Out button, or a new **Fit Full Helix** button) which automatically centers `scrollProgress` and scales the 42-step 3D helix so Genesis at the top and Revelation at the bottom fit comfortably inside the canvas frame with breathing room.
  4. **Knowledge Graph & Canonical Cross-Reference Arc Observatory**:
     - **Immediate Load**: Opens directly to the **Canonical Rainbow Arc Diagram** with all 66 books arrayed in canonical order from Genesis to Revelation along a bottom chapter-length histogram bar (1,189 chapters).
     - **Color-Encoded Cross-Reference Arcs**: Hundreds of high-precision Bézier arcs rise above the canonical baseline, color-graded by canonical span and division (matching and improving upon the classic 63,779 cross-reference infographic with interactive filtering by Testament span, Covenant, Canonical Division, or specific Book).
     - **Interactive Scrubbing & Live Statistical HUD**: Hovering or tapping any book bar along the bottom axis or any arc in the sky isolates all incoming and outgoing cross-references for that book, displays exact citation pairs, and updates the live statistical telemetry cards (`Total Cross-References`, `OT → NT Prophetic Fulfillments`, `Canonical Hub Centrality`, and `Active Chapter Density`).
     - **Instant Mode Switching**: Users can switch seamlessly between **Arc Diagram** (Rainbow Cross-Reference Infographic), **Force Network** (2D physics-stabilized entity and book constellation), and **Chord Matrix** (circular canonical inter-dependency wheel).

- **Visual Identity & Theme**:
  - **Aesthetic Direction**: Calibrated Deep-Space Biblical Observatory (`60%` deep obsidian canvas `#050609`, `30%` flat slate/obsidian structural panels `#0B0E17` with `1px` hairline borders, `10%` molten-amber `#F59E0B` and crystalline cyan `#38BDF8` telemetry accents).
  - **Typography & Hierarchy**:
    - *Display & Canonical Titles*: `Cinzel` (`font-serif-title`) for primary titles and canonical book headers.
    - *Technical Body Prose & Data Readouts*: `JetBrains Mono` (`font-mono`) with `line-height: 1.65`, slightly increased letter spacing (`0.01em`), and `tabular-nums` for effortless reading on dark surfaces.
    - *UI Controls & Interactive Labels*: `Plus Jakarta Sans` (`font-sans`) with strict single-line `whitespace-nowrap shrink-0` containment.

- **Accessibility & Ergonomics (WCAG AA Compliance)**:
  - **Touch Target Discipline**: All interactive buttons, zoom controls, filter tabs, and bottom dock items enforce at least `44×44px` hit targets on touch devices.
  - **Keyboard & Screen Reader Support**: Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `role="dialog"`, `aria-modal="true"`, `aria-labelledby`), focus trapping inside open modals, `Escape` key dismissal, visible `focus-visible:ring-2 focus-visible:ring-amber-400` outlines, and `prefers-reduced-motion` support to pause automatic canvas rotation when requested by the operating system.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Synchronous Pre-Computed Layout for the Knowledge Graph**
  - *Chosen Approach*: Initialize all graph node coordinates, canonical book positions, and cross-reference arcs synchronously during state initialization (`useMemo` / initial `useRef` seed) rather than inside a post-render `useEffect`.
  - *Why*: Eliminates the race condition that caused the Knowledge Graph to load to a blank canvas until a filter button was clicked.
  - *Alternatives Considered*: Triggering a forced re-render after `useEffect` mount (adds visual flash and layout delay).

- **Decision 2: High-Density Canonical Cross-Reference Dataset + Tri-Mode Canvas**
  - *Chosen Approach*: Combine curated canonical cross-references, prophetic fulfillment links, and chapter-level density data across all 66 books into a unified canonical index powering the **Rainbow Arc Diagram**, **Force Network**, and **Chord Matrix**.
  - *Why*: Delivers both the sweeping macro-level beauty of the 63,779 cross-reference arc diagram and granular, clickable verse-to-verse theological inspection.
  - *Alternatives Considered*: Static image or SVG-only chart (cannot handle hundreds of interactive arcs with smooth 60fps pan/zoom and hover hit-testing).

- **Decision 3: Unified Modal Backdrop & Spotlight Focus System**
  - *Chosen Approach*: Render a dedicated backdrop scrim (`backdrop-blur-md bg-black/75` on mobile/tablet; spotlight scrim `backdrop-blur-[3px] bg-black/55` on desktop with a prominent "Explore Canvas Directly" minimize action) whenever the walkthrough guide or inspector modal is active.
  - *Why*: Prevents underlying HUD text, grid lines, and glowing 3D elements from visually bleeding through modal text on small screens while keeping the guide unmistakably in focus on desktop.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         SCRIPTURE UNIVERSE APPLICATION                       │
│  Typography: JetBrains Mono (Body/Telemetry) + Plus Jakarta Sans (UI)        │
│  Accessibility: WCAG AA Contrast · 44px Touch Targets · Keyboard & ARIA      │
└──────────────────────┬───────────────────────────────────┬───────────────────┘
                       │                                   │
        ┌──────────────▼──────────────┐     ┌──────────────▼──────────────┐
        │   Responsive Navigation     │     │   Modal & Focus Governance  │
        │  • Contained Mobile Header  │     │  • Full-Screen Blur Scrim   │
        │  • Single-Line Pill Controls│     │  • Desktop Spotlight Focus  │
        │  • 44px Sanctuary Dock      │     │  • Escape & Focus Trapping  │
        └──────────────┬──────────────┘     └──────────────┬──────────────┘
                       │                                   │
        ┌──────────────▼───────────────────────────────────▼──────────────┐
        │                    PRIMARY OBSERVATORY VIEWS                    │
        ├─────────────────────────────────┬───────────────────────────────┤
        │   3D Double-Helix Observatory   │  Tri-Mode Knowledge Graph     │
        │  • Zoom Range: 0.22x – 2.40x    │  1. Rainbow Arc Diagram (66   │
        │  • "Fit Full Canon" Auto-Scale  │     books, 1,189 ch. bars,    │
        │  • Dynamic Vertical Centering   │     spectral Bézier arcs)     │
        │  • Focused 5-Step Walkthrough   │  2. Force-Directed Network    │
        │    Modal with Live Actions      │  3. Canonical Chord Matrix    │
        │  • Right-Wing Canonical Dossier │  • Live Statistical Dashboard │
        └─────────────────────────────────┴───────────────────────────────┘
```

- **Data Model & State**:
  - **Canonical Cross-Reference Engine**:
    - Maps all 66 books (`order 1..66`, `chapters`, `division`, `testament`, cumulative chapter offsets `1..1189`) to a rich network of inter-canonical cross-reference arcs and theological entity edges.
    - Categorizes each cross-reference arc by **Spectral Band** (Torah, Historical, Wisdom/Poetry, Major/Minor Prophets, Gospels/Acts, Epistles, Apocalyptic, and OT→NT Messianic Fulfillment) and **Canonical Distance** (chapter delta across the 1,189-chapter baseline).
  - **Helix Camera & Viewport Scaling**:
    - Expands `zoom` bounds to `[0.22, 2.40]`.
    - Dynamically interpolates `verticalOffset` as `zoom` decreases below `0.65` so that at full zoom-out (`0.32x`), the entire 42-step helix centers vertically at `height * 0.5` with both Genesis (`step 0`) and Revelation (`step 42`) fully inside the viewport.

- **Interactive Component & State Mapping**:
  - **Mobile Header & Toolbar Controls**:
    - Constrains top-bar padding and CTA width on `< 640px` screens (`Discover` label on mobile, `Discover Link` on `sm+`), enforces `whitespace-nowrap` on `OT & NT` strand buttons, and adds `min-h-[40px]` / `min-w-[40px]` touch targets.
  - **Walkthrough Modal & Inspector Modal**:
    - Adds backdrop overlay with click-outside-to-minimize, `Escape` listener, `role="dialog"`, `aria-modal="true"`, and internal scroll container (`max-h-[75dvh] overflow-y-auto`) with a pinned footer for `< Previous` and `Next Step >` buttons so navigation is never clipped on short viewports.
  - **Knowledge Graph Tri-Mode Controls**:
    - Mode switcher (`Arc Diagram` | `Force Network` | `Chord Matrix`), Division/Covenant filter bar, search input with instant highlight, Book/Entity inspector drawer, and a collapsible 4-metric live statistical ribbon at the top of the workspace.
