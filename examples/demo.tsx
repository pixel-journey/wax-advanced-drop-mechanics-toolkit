"use client";

import { useState } from "react";
import { PitySystemSimulator } from "./PitySystemSimulator";
import { GuaranteedRewards } from "./GuaranteedRewards";
import { ProbabilityCalculator } from "./ProbabilityCalculator";
import { FairnessProtections } from "./FairnessProtections";
import { DropSimulator } from "./DropSimulator";

const BASE_RATES = [
  { name: "Common", chance: 0.7 },
  { name: "Uncommon", chance: 0.2 },
  { name: "Rare", chance: 0.08 },
  { name: "Legendary", chance: 0.02 },
];

/**
 * Educational demo that composes the advanced drop mechanics components.
 * Shared attempt state drives the pity bonus and fairness indicators so
 * the relationships between the pieces are easy to see.
 */
export default function AdvancedDropMechanicsDemo() {
  const [attempts, setAttempts] = useState(0);
  const pityBonus = Math.min(attempts * 0.01, 0.35);

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400/80">
          Pixel Journey · Atomic Ecosystem
        </p>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Advanced Drop Mechanics Demo
        </h1>
        <p className="max-w-2xl text-sm text-white/60">
          Explore pity, guarantees, probability modifiers, and fairness protections.
          All complex math runs through pure client-side engines. Nothing here is
          an on-chain authority — it is an educational playground.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setAttempts((prev) => Math.min(prev + 1, 60))}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          Simulate attempt (+1)
        </button>
        <button
          type="button"
          onClick={() => setAttempts(0)}
          className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          Reset shared state
        </button>
        <span className="self-center text-sm text-white/50">
          Shared attempts: <span className="font-mono text-white/80">{attempts}</span>
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PitySystemSimulator
          baseRareChance={0.05}
          pityIncreasePerAttempt={0.01}
          maxPity={0.45}
          hardPityAt={40}
        />
        <GuaranteedRewards
          attemptsSinceLastReward={attempts}
          guaranteedThreshold={15}
          rewardName="Legendary Item"
        />
      </div>

      <ProbabilityCalculator baseRates={BASE_RATES} pityBonus={pityBonus} />

      <FairnessProtections
        dailyDropLimit={25}
        currentDropsToday={attempts}
      />

      <DropSimulator />

      <footer className="border-t border-white/10 pt-6 text-xs text-white/40">
        These components belong to the{" "}
        <span className="text-white/60">wax-advanced-drop-mechanics-toolkit</span>{" "}
        blueprint and follow the PX Perfection Standard. Simulation is never the
        source of truth for real rewards.
      </footer>
    </div>
  );
}
