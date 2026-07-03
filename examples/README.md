# Examples

This folder contains production-ready, reusable component examples for implementing advanced Atomic Drop mechanics on WAX.

## Important Note

These examples are designed to be adaptable to real on-chain drop contracts (e.g. `atomicdropsx` and others). Always test thoroughly on testnet when integrating with real contracts.

## Shared Types

See `types.ts` for common interfaces used across the examples.

## Available Components

| File                        | Description                                      | Recommended Use Case                     |
|-----------------------------|--------------------------------------------------|------------------------------------------|
| `PitySystemSimulator.tsx`   | Interactive pity system with adjustable parameters | Education + testing pity mechanics       |
| `GuaranteedRewards.tsx`     | Progress toward guaranteed rewards               | Showing pity + guarantee systems         |
| `ProbabilityCalculator.tsx` | Probability breakdown with pity bonus            | Visualizing dynamic probabilities        |
| `FairnessProtections.tsx`   | Daily limits and abuse prevention                | Fairness and rate limiting               |
| `DropSimulator.tsx`         | Combined mechanics demo                          | Full simulation experience               |
| `demo.tsx`                  | Full component composition example               | Understanding how everything works together |

## How to Use

1. Copy the components you need into your project.
2. Adapt styling to your design system.
3. Connect execution logic to your chosen drop contract.
4. Use shared types from `types.ts` for consistency.

These examples follow strict TypeScript and modern React + WharfKit patterns.
