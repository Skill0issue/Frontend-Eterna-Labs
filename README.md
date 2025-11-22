# Project — Axiom SOL DeFi Dashboard (Recreation)
 
## Overview
Implement a high-performance, real-time token-tracking dashboard for Solana. The central UI is a Pulse Table monitoring three market segments: **New Pairs**, **Final Stretch**, and **Migrated**. Focus: low-latency updates, responsive layout, clear filter/sort UX, and maintainable architecture.

## Tech Stack & Key Files
- Framework: Next.js 14 (App Router) — `src/app/layout.tsx`, `src/app/Pulse/page.tsx`  
- Language: TypeScript — `src/types/token.ts`  
- Styling: Tailwind CSS (custom dark theme `bg-[#0b0c10]`) — `src/globals.css`  
- Server state: TanStack Query — `src/queries/tokens.ts`, `src/lib/api.ts`  
- Client state: Redux Toolkit — `src/store/tokensSlice.ts`, `src/store/index.ts`  
- UI: Shadcn UI / Radix primitives — `src/components/ui/*`  
- Hooks / utils: `src/hooks/useWebSocket.ts`, `src/lib/utils.ts`, `src/utils/generateToken.ts`

## Core Deliverables
A. Responsive layout  
- Desktop (XL): three-column grid (all segments visible).  
- Mobile/Tablet: single-list view with internal tabs.  
- App root with fixed header and footer.

B. Real-time data & token display  
- `useWebSocket` simulates live updates (900 ms interval) and writes to TanStack Query cache.  
- `TokenRow` shows name, symbol, liquidity, volume, sparkline, and audit badges (Snipers, Dev Holdings, Top10Holders).

C. Filtering & sorting  
- `FiltersModal` manages complex filters.  
- Sort key/direction live in Redux; central sorting applied and passed to each Section.

## Performance Analysis & Optimizations
- Update model: current client simulation is O(N) per tick (iterates full token list every 900 ms). In production prefer server-side or subscription-based updates to achieve O(K) updates (only changed items).  
- Sorting: O(N log N). Use memoization so sorting runs only when tokens or sort params change.  
- Rendering: memoize rows with `React.memo` so unchanged TokenRows do not re-render.  
- Cache updates: prefer direct writes via `queryClient.setQueryData` to avoid full refetch/re-render.  
- TanStack Query config: SWR pattern, `staleTime = 60_000` ms, GC ~5 minutes to allow instant back-navigation.

Key implemented techniques:
- useMemo for sorted lists.  
- React.memo for `TokenRow`.  
- Direct cache mutation (`queryClient.setQueryData`) for incremental updates.  
- Debounce and viewport hooks to reduce unnecessary work.

## Reusability & Architecture
- Generic `Section` component used for each market segment (`src/components/Table/Section.tsx`).  
- Clear separation: server state (TanStack Query) vs UI/client state (Redux).  
- Encapsulated hooks: `useWebSocket`, `useDebounce`, `useViewport` live in `src/hooks/`.  
- Central `Token` type in `src/types/token.ts` for type safety.  
- Atomic UI components in `src/components/ui/` for consistent, reusable building blocks.  
- SVG icons exported as components for flexible styling.




## Layout Snapshots

1. Desktop (XL view)  
- Primary view: three independent, vertical columns — one per market segment.  
- Data visibility: all three data sets visible simultaneously; each column independently sortable and scrollable.  
- File logic: render three instances of `Section` inside `TokenTable`'s desktop container.  
<img width="1886" height="712" alt="image-1" src="https://github.com/user-attachments/assets/8a7858ee-4858-4a84-8536-0e950b316ae2" />

2. Tablet / Tab layout (MD view)  
- Primary view: single-column content with persistent tabs or a compact multi-column that prioritizes readability. Tabs provide fast switching between segments while preserving vertical space.  
- Data visibility: one segment visible at a time, accessible via tabs; quick access to neighboring segments via swipe or tab row.  
- File logic: `TokenTable` toggles which `Section` instance is rendered or shown; state drives the active tab.  
<img width="447" height="702" alt="image-3" src="https://github.com/user-attachments/assets/7b01cd12-27c6-456d-987d-88aad71a9b1a" />

3. Mobile (SM / small view)  
- Primary view: single full-width list optimized for vertical scrolling.  
- Data switching: internal tabs (or segmented control) switch the underlying data source — "New Pairs", "Final Stretch", "Migrated" — without a full page reload.  
- File logic: a single `Section` instance receives `currentTokens` based on the active tab; preserve scroll position when possible.  
<img width="481" height="722" alt="image-2" src="https://github.com/user-attachments/assets/606a7aa3-30f7-4553-a0cd-0274950260f3" />

4. Token Row detail (row density & affordances)  
- Identity: large token logo, token name, symbol, and abbreviated contract ID.  
- Contextual data: status badges (Snipers, Dev Holdings, Top10Holders), quick links (Twitter, explorer, search).  
- Price & action: current price, volatility indicator/sparkline, liquidity/volume metrics, and a compact Buy action.  
- Implementation notes: keep `TokenRow` memoized; structure for accessibility and keyboard focus for actions.


## Project Structure (excerpt)

- public/
    - svg/
- src/
    - app/
        - Pulse/page.tsx
        - layout.tsx
        - globals.css
    - components/
        - Table/ (Section, TokenRow)
        - ui/ (Button, Dialog, Tabs)
        - Navbar/, Footer/
    - hooks/ (useWebSocket.ts, useDebounce.ts, useViewport.ts)
    - queries/ (tokens.ts)
    - store/ (tokensSlice.ts, index.ts)
    - types/ (token.ts)
    - lib/ (api.ts, utils.ts)
    - utils/ (generateToken.ts, sparklinegen.ts)

## Summary: Tradeoffs & Benefits
- Tradeoff: client-side full-list simulation is simple but costly at scale. Replace with targeted updates or server-driven streams for production.  
- Benefits: memoization and cache-directed updates keep UI responsive; modular components and typed contracts enable maintainability and easy scaling.
- Developer DX: path aliases, barrel exports, and centralized utilities improve readability and refactorability.

