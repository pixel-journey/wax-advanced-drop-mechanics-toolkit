'use client';

import React from 'react';

interface ProbabilityCalculatorProps {
  baseRates: Array<{ name: string; chance: number }>;
  pityBonus?: number;
  className?: string;
}

/**
 * Simple probability calculator with optional pity bonus.
 */
export function ProbabilityCalculator({
  baseRates,
  pityBonus = 0,
  className = '',
}: ProbabilityCalculatorProps) {
  const adjustedRates = baseRates.map((item) => ({
    ...item,
    adjustedChance: Math.min(item.chance + pityBonus, 1),
  }));

  return (
    <div className={`rounded-2xl border border-white/10 p-6 ${className}`}>
      <h3 className="font-semibold mb-4">Probability Breakdown</h3>

      <div className="space-y-2">
        {adjustedRates.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span className="font-mono tabular-nums">
              {(item.adjustedChance * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      {pityBonus > 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          Pity bonus applied: +{(pityBonus * 100).toFixed(1)}%
        </p>
      )}
    </div>
  );
}
