/**
 * Shared types for advanced drop mechanics examples.
 */

export interface DropRate {
  name: string;
  chance: number;
}

export interface PityConfig {
  baseRareChance: number;
  pityIncreasePerAttempt: number;
  maxPity: number;
}

export interface GuaranteedConfig {
  threshold: number;
  rewardName: string;
}
