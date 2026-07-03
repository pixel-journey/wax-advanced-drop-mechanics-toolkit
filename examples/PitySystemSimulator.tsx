'use client';

import React, { useState } from 'react';

interface PitySystemSimulatorProps {
  baseRareChance: number;
  pityIncreasePerAttempt: number;
  maxPity: number;
  className?: string;
}

/**
 * Interactive pity system simulator.
 * Shows how pity increases the chance of rare rewards over time.
 */
export function PitySystemSimulator({
  baseRareChance = 0.05,
  pityIncreasePerAttempt = 0.01,
  maxPity = 0.5,
  className = '',
}: PitySystemSimulatorProps) {
  const [attempts, setAttempts] = useState(0);

  const currentChance = Math.min(
    baseRareChance + attempts * pityIncreasePerAttempt,
    maxPity
  );

  return (
    <div className={`rounded-2xl border border-white/10 p-6 ${className}`}>
      <h3 className="font-semibold mb-4">Pity System Simulator</h3>

      <div className="mb-4">
        <label className="text-sm text-muted-foreground">Attempts since last rare:</label>
        <input
          type="range"
          min="0"
          max="50"
          value={attempts}
          onChange={(e) => setAttempts(parseInt(e.target.value))}
          className="w-full mt-2"
        />
        <div className="text-center mt-1 font-mono">{attempts} attempts</div>
      </div>

      <div className="text-center">
        <div className="text-sm text-muted-foreground">Current Rare Chance</div>
        <div className="text-3xl font-bold tabular-nums mt-1">
          {(currentChance * 100).toFixed(1)}%
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        This is a simulation. In production, track attempts per player and apply on the server or via smart contract logic.
      </p>
    </div>
  );
}
