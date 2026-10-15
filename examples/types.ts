/**
 * Shared types for the Advanced Drop Mechanics Toolkit.
 * Keep these stable so simulators and future production components stay consistent.
 */

/** A single outcome in a drop table */
export interface DropRate {
  /** Display name of the item or tier */
  name: string;
  /** Base probability in the range [0, 1] */
  chance: number;
}

/** Configuration for a soft/hard pity system */
export interface PityConfig {
  /** Starting probability of the rare outcome */
  baseRareChance: number;
  /** How much the rare chance increases per failed attempt */
  pityIncreasePerAttempt: number;
  /** Soft ceiling — chance will not exceed this value via soft pity alone */
  maxPity: number;
  /** Optional hard pity: after this many failures the rare outcome is guaranteed */
  hardPityAt?: number;
}

/** Configuration for a hard guaranteed reward */
export interface GuaranteedConfig {
  /** Number of attempts after which the reward is guaranteed */
  threshold: number;
  /** Display name of the guaranteed reward */
  rewardName: string;
}

/** Daily / rate-limit fairness settings */
export interface FairnessConfig {
  dailyDropLimit: number;
  /** Optional shorter window (e.g. per hour) */
  rateLimitWindowMinutes?: number;
  rateLimitMax?: number;
}

/** Result of a pure probability calculation */
export interface AdjustedRate extends DropRate {
  /** Chance after all active modifiers have been applied */
  adjustedChance: number;
}
