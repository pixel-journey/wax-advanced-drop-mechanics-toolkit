"use client";

import { useId } from "react";
import { applyPityBonus } from "./engines";
import type { DropRate } from "./types";

export interface ProbabilityCalculatorProps {
  baseRates: DropRate[];
  /** Flat bonus applied by the pure engine (typically from pity) */
  pityBonus?: number;
  className?: string;
}

/**
 * ProbabilityCalculator
 *
 * Displays base rates and the adjusted rates after modifiers.
 * Uses the pure `applyPityBonus` engine so the arithmetic stays
 * transparent and testable.
 */
export function ProbabilityCalculator({
  baseRates,
  pityBonus = 0,
  className = "",
}: ProbabilityCalculatorProps) {
  const headingId = useId();
  const adjusted = applyPityBonus(baseRates, pityBonus);

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-1">
        Probability Breakdown
      </h3>
      <p className="text-sm text-white/60 mb-5">
        Base rates versus adjusted rates after active modifiers.
      </p>

      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-xs text-white/40 mb-1">
          <span>Outcome</span>
          <span className="text-right">Base</span>
          <span className="text-right">Adjusted</span>
        </div>

        {adjusted.map((item) => (
          <div
            key={item.name}
            className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-sm items-center"
          >
            <span className="text-white/90">{item.name}</span>
            <span className="font-mono tabular-nums text-white/50 text-right">
              {(item.chance * 100).toFixed(1)}%
            </span>
            <span className="font-mono tabular-nums text-emerald-400 text-right">
              {(item.adjustedChance * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      {pityBonus > 0 && (
        <p className="text-xs text-white/50 mt-4" aria-live="polite">
          Active pity bonus: +{(pityBonus * 100).toFixed(1)}%
        </p>
      )}

      <p className="text-xs text-white/40 mt-5 leading-relaxed">
        Transparent arithmetic builds trust. Show players both the base table
        and the effect of any active modifiers.
      </p>
    </section>
  );
}
