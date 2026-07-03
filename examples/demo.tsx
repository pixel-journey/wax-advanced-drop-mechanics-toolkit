'use client';

import { useState } from 'react';
import { PitySystemSimulator } from './PitySystemSimulator';
import { GuaranteedRewards } from './GuaranteedRewards';
import { ProbabilityCalculator } from './ProbabilityCalculator';
import { FairnessProtections } from './FairnessProtections';

/**
 * Demo showing how the advanced drop mechanics components work together.
 */
export default function AdvancedDropMechanicsDemo() {
  const [attempts, setAttempts] = useState(0);

  const baseRates = [
    { name: 'Common', chance: 0.7 },
    { name: 'Uncommon', chance: 0.2 },
    { name: 'Rare', chance: 0.1 },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">Advanced Drop Mechanics Demo</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <PitySystemSimulator />
        <GuaranteedRewards
          attemptsSinceLastReward={attempts}
          guaranteedThreshold={10}
          rewardName="Legendary Item"
        />
      </div>

      <ProbabilityCalculator baseRates={baseRates} pityBonus={attempts * 0.01} />

      <FairnessProtections dailyDropLimit={20} currentDropsToday={attempts} />

      <button
        onClick={() => setAttempts((prev) => Math.min(prev + 1, 50))}
        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
      >
        Simulate Attempt
      </button>

      <button
        onClick={() => setAttempts(0)}
        className="ml-4 text-sm underline opacity-70"
      >
        Reset
      </button>
    </div>
  );
}
