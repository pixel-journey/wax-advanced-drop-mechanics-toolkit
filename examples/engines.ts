/**
 * Pure calculation engines for advanced drop mechanics.
 *
 * These functions are deliberately side-effect free and deterministic
 * so they can be unit-tested and used safely in both simulation UIs
 * and (with care) as reference logic for on-chain or server-side systems.
 */

import type { PityConfig, DropRate, AdjustedRate } from "./types";

/**
 * Calculate the current rare chance given how many consecutive failures
 * have occurred and a pity configuration.
 */
export function calculatePityChance(
  consecutiveFailures: number,
  config: PityConfig
): number {
  const soft = Math.min(
    config.baseRareChance + consecutiveFailures * config.pityIncreasePerAttempt,
    config.maxPity
  );

  if (
    typeof config.hardPityAt === "number" &&
    consecutiveFailures >= config.hardPityAt
  ) {
    return 1;
  }

  return soft;
}

/**
 * Apply a flat pity bonus to a list of base rates.
 * The rarest item (lowest base chance) typically receives the bonus;
 * this simple version adds the bonus to every rate and then clamps.
 * Production systems often apply the bonus only to the target rare tier.
 */
export function applyPityBonus(
  baseRates: DropRate[],
  pityBonus: number
): AdjustedRate[] {
  return baseRates.map((item) => ({
    ...item,
    adjustedChance: Math.min(Math.max(item.chance + pityBonus, 0), 1),
  }));
}

/**
 * Progress toward a hard guarantee (0 → 1).
 */
export function guaranteeProgress(
  attemptsSinceLast: number,
  threshold: number
): number {
  if (threshold <= 0) return 1;
  return Math.min(attemptsSinceLast / threshold, 1);
}

/**
 * Whether the hard guarantee has been reached.
 */
export function isGuaranteeReady(
  attemptsSinceLast: number,
  threshold: number
): boolean {
  return attemptsSinceLast >= threshold;
}

/**
 * Remaining allowance under a daily (or similar) limit.
 */
export function remainingAllowance(
  used: number,
  limit: number
): number {
  return Math.max(limit - used, 0);
}
