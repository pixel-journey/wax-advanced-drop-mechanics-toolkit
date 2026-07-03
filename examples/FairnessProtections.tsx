'use client';

import React from 'react';

interface FairnessProtectionsProps {
  dailyDropLimit: number;
  currentDropsToday: number;
  className?: string;
}

/**
 * Simple fairness protection indicator.
 * Shows daily limits and abuse prevention.
 */
export function FairnessProtections({
  dailyDropLimit,
  currentDropsToday,
  className = '',
}: FairnessProtectionsProps) {
  const progress = Math.min(currentDropsToday / dailyDropLimit, 1);

  return (
    <div className={`rounded-2xl border border-white/10 p-6 ${className}`}>
      <h3 className="font-semibold mb-2">Fairness Protections</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Daily drop limit to prevent abuse
      </p>

      <div className="w-full bg-white/10 rounded-full h-3 mb-2">
        <div
          className="bg-amber-500 h-3 rounded-full transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="text-sm">
        {currentDropsToday} / {dailyDropLimit} drops used today
      </div>

      {progress >= 1 && (
        <p className="text-xs text-amber-400 mt-2">
          Daily limit reached. Come back tomorrow.
        </p>
      )}
    </div>
  );
}
