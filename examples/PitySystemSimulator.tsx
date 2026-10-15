"use client";

import { useState, useId } from "react";
import { calculatePityChance } from "./engines";
import type { PityConfig } from "./types";

export interface PitySystemSimulatorProps {
  /** Starting rare chance (0–1) */
  baseRareChance?: number;
  /** Increase per consecutive failure */
  pityIncreasePerAttempt?: number;
  /** Soft ceiling for soft pity */
  maxPity?: number;
  /** Optional hard pity threshold */
  hardPityAt?: number;
  className?: string;
}

/**
 * PitySystemSimulator
 *
 * Interactive educational simulator that shows how soft (and optional hard)
 * pity changes the probability of a rare outcome after consecutive failures.
 *
 * All math is performed by the pure `calculatePityChance` engine so the
 * same logic can be tested and reused elsewhere.
 */
export function PitySystemSimulator({
  baseRareChance = 0.05,
  pityIncreasePerAttempt = 0.01,
  maxPity = 0.5,
  hardPityAt,
  className = "",
}: PitySystemSimulatorProps) {
  const [attempts, setAttempts] = useState(0);
  const sliderId = useId();
  const resultId = useId();

  const config: PityConfig = {
    baseRareChance,
    pityIncreasePerAttempt,
    maxPity,
    hardPityAt,
  };

  const currentChance = calculatePityChance(attempts, config);
  const isHardPity = typeof hardPityAt === "number" && attempts >= hardPityAt;

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={`${sliderId}-title`}
    >
      <h3 id={`${sliderId}-title`} className="font-semibold text-lg mb-1">
        Pity System Simulator
      </h3>
      <p className="text-sm text-white/60 mb-5">
        Explore how consecutive failures increase the chance of a rare outcome.
        This is a pure client-side simulation for education and tuning.
      </p>

      <div className="mb-6">
        <label htmlFor={sliderId} className="text-sm text-white/70">
          Consecutive failures since last rare
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={hardPityAt ?? 50}
          value={attempts}
          onChange={(e) => setAttempts(Number(e.target.value))}
          className="w-full mt-2 accent-emerald-500"
          aria-valuemin={0}
          aria-valuemax={hardPityAt ?? 50}
          aria-valuenow={attempts}
          aria-describedby={resultId}
        />
        <div className="flex justify-between text-xs text-white/50 mt-1">
          <span>0</span>
          <span className="font-mono text-white/80">{attempts} attempts</span>
          <span>{hardPityAt ?? 50}</span>
        </div>
      </div>

      <div className="text-center rounded-xl bg-white/5 py-4" id={resultId}>
        <div className="text-sm text-white/60">Current rare chance</div>
        <div
          className="text-3xl font-bold tabular-nums mt-1 text-emerald-400"
          aria-live="polite"
        >
          {(currentChance * 100).toFixed(1)}%
        </div>
        {isHardPity && (
          <p className="text-sm text-amber-300 mt-2">
            Hard pity reached — rare outcome is now guaranteed
          </p>
        )}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-2 text-xs text-white/50">
        <div>
          <dt>Base rate</dt>
          <dd className="font-mono text-white/80">
            {(baseRareChance * 100).toFixed(1)}%
          </dd>
        </div>
        <div>
          <dt>Per-failure increase</dt>
          <dd className="font-mono text-white/80">
            +{(pityIncreasePerAttempt * 100).toFixed(1)}%
          </dd>
        </div>
        <div>
          <dt>Soft ceiling</dt>
          <dd className="font-mono text-white/80">
            {(maxPity * 100).toFixed(1)}%
          </dd>
        </div>
        {hardPityAt !== undefined && (
          <div>
            <dt>Hard pity at</dt>
            <dd className="font-mono text-white/80">{hardPityAt}</dd>
          </div>
        )}
      </dl>

      <p className="text-xs text-white/40 mt-5 leading-relaxed">
        Simulation only. In production, track consecutive failures per player
        and enforce the same logic server-side or on-chain. Never let the UI
        promise a result the contract cannot deliver.
      </p>
    </section>
  );
}
