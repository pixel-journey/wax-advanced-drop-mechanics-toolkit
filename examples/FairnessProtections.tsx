"use client";

import { useId } from "react";
import { remainingAllowance } from "./engines";

export interface FairnessProtectionsProps {
  dailyDropLimit: number;
  currentDropsToday: number;
  className?: string;
}

/**
 * FairnessProtections
 *
 * Surfaces daily (or similar) limits so players understand the rules that
 * keep the system healthy for everyone. Messaging stays calm and factual.
 */
export function FairnessProtections({
  dailyDropLimit,
  currentDropsToday,
  className = "",
}: FairnessProtectionsProps) {
  const headingId = useId();
  const progressId = useId();

  const used = Math.min(currentDropsToday, dailyDropLimit);
  const remaining = remainingAllowance(currentDropsToday, dailyDropLimit);
  const progress = dailyDropLimit > 0 ? used / dailyDropLimit : 1;
  const limitReached = remaining === 0;

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-1">
        Fairness Protections
      </h3>
      <p className="text-sm text-white/60 mb-5">
        Daily limits help prevent abuse and keep the economy healthy for all players.
      </p>

      <div className="mb-2">
        <div
          className="w-full bg-white/10 rounded-full h-3 overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-labelledby={progressId}
        >
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              limitReached ? "bg-amber-400" : "bg-amber-500"
            }`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div id={progressId} className="flex justify-between text-sm">
        <span className="font-mono text-white/80">
          {used} / {dailyDropLimit} used today
        </span>
        <span className={limitReached ? "text-amber-300" : "text-white/50"}>
          {limitReached ? "Limit reached" : `${remaining} remaining`}
        </span>
      </div>

      {limitReached && (
        <p className="text-sm text-amber-200/90 mt-3" role="status">
          You have reached today’s limit. The counter resets at the next daily boundary.
          These limits exist so the system stays fair for everyone.
        </p>
      )}

      <p className="text-xs text-white/40 mt-5 leading-relaxed">
        Fairness rules should be enforced both in the UI (for clarity) and on-chain
        or server-side (for authority). Never rely on the client alone.
      </p>
    </section>
  );
}
