# ARCHITECTURE.md — Advanced Drop Mechanics Toolkit

> **What `npm test` actually locks:** `examples/engines.ts` only (pity cap, unnormalized bonus, allowance). The React simulators are not executed. This is not `atomicdropsx`. The public course is [wax-pity-system-and-guaranteed-rewards](https://github.com/pixel-journey/wax-pity-system-and-guaranteed-rewards). The sections below are design notes, not a deployed contract.

This document defines the technical and ethical architecture for the blueprint. It is the authoritative reference for both human developers and AI agents implementing or extending these patterns.

---

## 1. Overview & Design Intent

Advanced drop mechanics (pity, guarantees, dynamic probabilities, fairness protections) sit at the intersection of game design, economics, and player trust.

This architecture prioritizes, in order:

1. **Fairness & Transparency** — players should be able to understand and believe the system
2. **Simulation-first** — complex logic must be testable and visualizable before any on-chain cost
3. **Clear separation** — simulation never pretends to be the authoritative on-chain result
4. **Reusability** — engines and components must adapt cleanly to different drop contracts
5. **Accessibility** — the educational value is lost if the interface is not usable by everyone

---

## 2. Core Fairness & Safety Invariants

These rules must hold in every implementation that claims to follow this blueprint:

| # | Invariant | Rationale |
|---|-----------|-----------|
| 1 | Simulation is pure and client-side | Instant feedback, zero cost, fully testable, no false promises |
| 2 | UI never claims a result the on-chain contract cannot deliver | Trust is destroyed the first time the UI and chain disagree |
| 3 | Current odds and progress are always visible to the player | Hidden pity or guarantees feel manipulative |
| 4 | Pity and guarantee parameters are explainable in plain language | Players form better relationships with systems they understand |
| 5 | Fairness protections (limits, rate limiting, etc.) are first-class | Protects both the economy and the long-term player base |
| 6 | Accessibility is treated as part of educational quality | Exclusion reduces the value of the toolkit |

---

## 3. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface Layer                     │
│         Next.js 15 + Tailwind + framer-motion               │
│              (respects prefers-reduced-motion)              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Simulation & Education Layer                   │
│  PitySystemSimulator · GuaranteedRewards ·                  │
│  ProbabilityCalculator · FairnessProtections ·              │
│  DropSimulator (combined playground)                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 Pure Calculation Engines                    │
│        (deterministic, side-effect free, unit-testable)     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Claim / Execution Layer (optional)             │
│         WharfKit session + clear transaction preview        │
│              → real drop contract (e.g. atomicdropsx)       │
└─────────────────────────────────────────────────────────────┘
```

The critical boundary is between the **Simulation & Education Layer** and the **Claim / Execution Layer**. Crossing that boundary should always be an explicit, previewable user action.

---

## 4. Component Contracts

### 4.1 PitySystemSimulator

**Responsibility**: Let the user explore how pity changes odds over consecutive failures.

**Minimum requirements**:
- Adjustable base rate, soft-pity start, hard-pity ceiling
- Live display of current probability after N failures
- Visual curve or progress indicator
- Plain-language explanation of the current state
- Fully keyboard accessible

### 4.2 GuaranteedRewards

**Responsibility**: Show progress toward a hard guarantee.

**Minimum requirements**:
- Clear counter (attempts remaining / total)
- Visual progress
- Distinction between soft pity and hard guarantee
- Accessible text alternative for the progress indicator

### 4.3 ProbabilityCalculator

**Responsibility**: Break down base probability + active modifiers (pity, etc.).

**Minimum requirements**:
- Transparent arithmetic (base → modified)
- Support for multiple simultaneous modifiers
- Deterministic pure function at its core

### 4.4 FairnessProtections

**Responsibility**: Surface daily limits, rate limiting, and other anti-abuse signals.

**Minimum requirements**:
- Clear remaining allowance
- Calm messaging when a limit is reached
- Guidance that these protections exist to keep the system healthy for everyone

### 4.5 DropSimulator (composition)

**Responsibility**: Combine the above into a single educational playground.

**Minimum requirements**:
- All sub-components remain independently usable
- State is easy to reset
- No on-chain calls inside the pure simulation mode

---

## 5. Simulation vs On-Chain Execution

| Concern | Simulation Layer | Claim / Execution Layer |
|---------|------------------|-------------------------|
| Purpose | Education, tuning, transparency | Actual reward distribution |
| Cost | Zero | Gas / CPU / NET |
| Authority | None (illustrative) | The drop contract is the source of truth |
| Failure mode | User sees a simulated outcome | User must receive a clear preview and confirmation |
| Testing | Unit tests + visual playground | Testnet + careful mainnet rollout |

Never blur these two layers in the UI. A player should always know whether they are looking at a simulation or about to sign a real transaction.

---

## 6. Data Flow (Typical)

1. Creator or player opens the simulator and adjusts parameters.
2. Pure engines recalculate odds, pity progress, and guarantees in real time.
3. Visualizations and plain-language explanations update.
4. (Optional) Player decides to claim against a real drop contract.
5. UI shows a clear preview of the on-chain action.
6. WharfKit session presents the transaction for signing.
7. Result is confirmed; any local simulation state is reconciled or reset as appropriate.

---

## 7. Error Handling & Edge Cases

| Situation | Expected Behavior |
|-----------|-------------------|
| Zero attempts / fresh state | Show base rates clearly |
| Hard pity reached | Guarantee is visible and understandable |
| Daily limit reached | Calm explanation + when the limit resets |
| Simulation parameters out of range | Clamp or reject with clear feedback |
| On-chain claim fails | Explain the failure and offer a path forward |
| UI and contract would disagree | Block the claim path and surface the mismatch |

---

## 8. Accessibility Requirements

- Full keyboard operability for every interactive control
- Meaningful labels and live regions for dynamic probability updates
- Text alternatives for every progress bar or curve
- Respect `prefers-reduced-motion`
- High-contrast support for status and warning indicators

Accessibility is part of the educational quality of this toolkit.

---

## 9. Extension Points

Future work that stays compatible with this architecture:

- Richer dynamic probability engines (time-based, inventory-based, etc.)
- Server-side or contract-side authoritative validation of simulation parameters
- Analytics hooks for drop performance
- Deeper integration with pack-opening and broader gamification systems
- Multi-contract adapters for different drop providers

All extensions must continue to obey the Fairness & Safety Invariants in §2.

---

## 10. Relationship to Other Blueprints

This architecture is intentionally complementary to:

- `wax-drops-and-pack-opening-experience` — the broader drop and pack UX surface
- Other Atomic and gamification tools in the catalog

Shared patterns (probability display, progress indicators, calm limit messaging) should be kept consistent across the Atomic family.

---

*This architecture prioritizes fairness, transparency, education, and clean separation of simulation from execution.*

**Pixel Journey — Beautiful interfaces for public blockchain data.**
