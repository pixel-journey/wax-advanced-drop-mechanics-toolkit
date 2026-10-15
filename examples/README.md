# Examples — Advanced Drop Mechanics Toolkit

Educational, production-oriented component references for advanced drop mechanics on WAX.

All complex probability and progress math lives in pure functions inside `engines.ts`. The UI components are responsible for presentation, accessibility, and clear explanations — never for being the source of truth of rewards.

## Files

| File | Role |
|------|------|
| `types.ts` | Shared TypeScript contracts |
| `engines.ts` | Pure, deterministic calculation engines (pity, probability, progress, allowance) |
| `PitySystemSimulator.tsx` | Interactive soft/hard pity explorer |
| `GuaranteedRewards.tsx` | Hard-guarantee progress indicator |
| `ProbabilityCalculator.tsx` | Base vs adjusted probability breakdown |
| `FairnessProtections.tsx` | Daily-limit / fairness messaging |
| `DropSimulator.tsx` | Combined educational claim-style loop |
| `demo.tsx` | Full composition with shared state |

## Design rules followed in these examples

1. **Simulation is pure and client-side** — instant, free, testable.
2. **UI never claims what the contract cannot deliver** — educational only.
3. **Current odds and progress are visible** — transparency builds trust.
4. **Accessibility is treated as quality** — labels, live regions, keyboard focus, progressbar roles.
5. **Language stays calm and factual** — especially around limits and guarantees.

## How to use

- Import individual components into a Next.js (or similar) app for learning and prototyping.
- Re-use the pure functions from `engines.ts` in unit tests or as reference logic.
- When moving to production, keep the same separation: simulation for education and tuning, on-chain or server-side logic as the authority for actual rewards.

These examples are part of the Pixel Journey WAX Ecosystem Blueprint Catalog and follow the PX Perfection Standard.
