"use client";

import { useState, useId } from "react";
import { calculatePityChance } from "./engines";
import type { PityConfig } from "./types";

const DEFAULT_CONFIG: PityConfig = {
  baseRareChance: 0.08,
  pityIncreasePerAttempt: 0.015,
  maxPity: 0.5,
};

/**
 * DropSimulator
 *
 * Combined educational playground that demonstrates pity in a simple
 * claim-style loop. All probability math goes through the pure engine.
 * Results are shown inline (no alert spam) so the experience stays calm
 * and accessible.
 */
export function DropSimulator() {
  const [attempts, setAttempts] = useState(0);
  const [lastRareAt, setLastRareAt] = useState(0);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const resultId = useId();

  const consecutiveFailures = attempts - lastRareAt;
  const currentRareChance = calculatePityChance(consecutiveFailures, DEFAULT_CONFIG);

  function simulateDrop() {
    const roll = Math.random();
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (roll < currentRareChance) {
      setLastRareAt(nextAttempts);
      setLastResult(
        `Rare item received (chance was ${(currentRareChance * 100).toFixed(1)}%)`
      );
    } else {
      setLastResult(
        `No rare item. Pity is now at ${(calculatePityChance(consecutiveFailures + 1, DEFAULT_CONFIG) * 100).toFixed(1)}%`
      );
    }
  }

  function reset() {
    setAttempts(0);
    setLastRareAt(0);
    setLastResult(null);
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
      <h3 className="font-semibold text-lg mb-1">Combined Drop Simulator</h3>
      <p className="text-sm text-white/60 mb-5">
        A simple educational loop that applies soft pity on every consecutive failure.
      </p>

      <dl className="grid grid-cols-2 gap-3 text-sm mb-5">
        <div>
          <dt className="text-white/50">Attempts since last rare</dt>
          <dd className="font-mono text-white/90">{consecutiveFailures}</dd>
        </div>
        <div>
          <dt className="text-white/50">Current rare chance</dt>
          <dd className="font-mono text-emerald-400">
            {(currentRareChance * 100).toFixed(1)}%
          </dd>
        </div>
      </dl>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={simulateDrop}
          className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          Simulate one drop
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          Reset
        </button>
      </div>

      {lastResult && (
        <p
          id={resultId}
          className="mt-4 text-sm text-white/80 rounded-lg bg-white/5 px-3 py-2"
          role="status"
          aria-live="polite"
        >
          {lastResult}
        </p>
      )}

      <p className="text-xs text-white/40 mt-5 leading-relaxed">
        This is a simplified educational simulator. Real systems must use
        server-side or on-chain logic as the source of truth for rewards.
        The UI should never be the authority.
      </p>
    </section>
  );
}
