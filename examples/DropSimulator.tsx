'use client';

import React, { useState } from 'react';

/**
 * Combined drop simulator that demonstrates multiple advanced mechanics together.
 * For educational and demonstration purposes.
 */
export function DropSimulator() {
  const [attempts, setAttempts] = useState(0);
  const [lastRareAt, setLastRareAt] = useState(0);

  const pityBonus = Math.min((attempts - lastRareAt) * 0.015, 0.35);
  const currentRareChance = Math.min(0.08 + pityBonus, 0.5);

  const simulateDrop = () => {
    const roll = Math.random();
    setAttempts((prev) => prev + 1);

    if (roll < currentRareChance) {
      setLastRareAt(attempts + 1);
      alert(`Rare item dropped! (Chance was ${(currentRareChance * 100).toFixed(1)}%)`);
    } else {
      alert(`No rare item. Current pity chance: ${(currentRareChance * 100).toFixed(1)}%`);
    }
  };

  const reset = () => {
    setAttempts(0);
    setLastRareAt(0);
  };

  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <h3 className="font-semibold mb-4">Combined Drop Simulator</h3>

      <div className="mb-4 text-sm">
        Attempts since last rare: <span className="font-mono">{attempts - lastRareAt}</span><br />
        Current rare chance: <span className="font-mono">{(currentRareChance * 100).toFixed(1)}%</span>
      </div>

      <button
        onClick={simulateDrop}
        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-medium mb-2"
      >
        Simulate Drop
      </button>

      <button
        onClick={reset}
        className="w-full text-sm underline opacity-70"
      >
        Reset Simulation
      </button>

      <p className="text-xs text-muted-foreground mt-4">
        This is a simplified educational simulator. Real systems should use server-side or on-chain logic for fairness.
      </p>
    </div>
  );
}
