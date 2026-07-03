# ARCHITECTURE.md — Advanced Drop Mechanics Toolkit

This document provides deeper technical context for the advanced drop mechanics blueprint.

## Overview

The goal of this toolkit is to help developers implement advanced drop mechanics (pity systems, guaranteed rewards, dynamic probabilities, and fairness protections) in a clean, educational, and production-ready way.

## Core Principles

- **Fairness first**: Mechanics should feel rewarding without being manipulative or abusive.
- **Transparency**: Players should understand how the system works.
- **Simulation-first**: Complex logic should be testable and visualizable client-side before going on-chain.
- **Reusability**: Engines and components should be easy to adapt to different drop types and contracts.
- **Safety**: Strong validation and anti-abuse protections.

## High-Level Architecture

```
User Interface (Next.js + Tailwind + shadcn/ui)
          │
          ▼
Simulation Layer (Pure client-side engines)
          │
          ▼
State Management (Zustand)
          │
          ▼
Visualization Components (Pity, Guaranteed, Probability, Fairness)
          │
          ▼
On-chain Execution (via WharfKit + real drop contract)
```

## Key Components

| Component                    | Responsibility                                      | Key Technologies          |
|------------------------------|-----------------------------------------------------|---------------------------|
| `PitySystemSimulator`        | Interactive pity probability simulation             | React + client-side calc  |
| `GuaranteedRewards`          | Progress tracking toward guaranteed items           | React state + progress UI |
| `ProbabilityCalculator`      | Dynamic probability display with modifiers          | Pure calculation logic    |
| `FairnessProtections`        | Daily limits and abuse prevention indicators        | React + simple logic      |
| `demo.tsx`                   | Full composition example                            | All components together   |

## Data Flow

1. User interacts with simulators (client-side only)
2. Mechanics are visualized and explained in real time
3. When ready, the system connects to a real drop contract (e.g. `atomicdropsx` or project-specific)
4. On-chain execution happens with proper validation
5. Results are confirmed and UI is updated

## Simulation vs On-Chain

- All complex probability and pity logic runs **client-side** for instant feedback and education.
- On-chain execution is kept minimal and only triggered after clear user confirmation.
- This separation makes the system testable, auditable, and safer.

## Error Handling & Safety

- All simulations should gracefully handle edge cases (zero attempts, max pity, etc.).
- On-chain calls must include clear previews and confirmation steps.
- Fairness protections (daily limits, rate limiting) should be enforced both client-side and on-chain where possible.

## Accessibility Considerations

- All interactive simulators should support keyboard navigation.
- Visual progress indicators should have text alternatives.
- Reduced motion preferences should be respected.

## Future Extensions

- Advanced dynamic probability engines
- Server-side authoritative simulation validation
- Analytics dashboard for drop performance
- Integration with broader gamification systems (achievements, battle passes)
- Multi-contract support for different drop providers

This architecture prioritizes **education + safety + reusability**, making it easier for developers to build advanced, fair drop systems on WAX.
