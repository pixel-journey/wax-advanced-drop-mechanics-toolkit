"use client";

import { useId } from "react";
import { guaranteeProgress, isGuaranteeReady } from "./engines";

export interface GuaranteedRewardsProps {
  attemptsSinceLastReward: number;
  guaranteedThreshold: number;
  rewardName?: string;
  className?: string;
}

/**
 * GuaranteedRewards
 *
 * Shows progress toward a hard guarantee. Once the threshold is reached
 * the reward is considered ready. Uses pure helpers so the same logic
 * can be shared with other layers.
 */
export function GuaranteedRewards({
  attemptsSinceLastReward,
  guaranteedThreshold,
  rewardName = "Rare Item",
  className = "",
}: GuaranteedRewardsProps) {
  const labelId = useId();
  const progressId = useId();

  const progress = guaranteeProgress(
    attemptsSinceLastReward,
    guaranteedThreshold
  );
  const ready = isGuaranteeReady(
    attemptsSinceLastReward,
    guaranteedThreshold
  );
  const remaining = Math.max(guaranteedThreshold - attemptsSinceLastReward, 0);

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={labelId}
    >
      <h3 id={labelId} className="font-semibold text-lg mb-1">
        Guaranteed Reward
      </h3>
      <p className="text-sm text-white/60 mb-5">
        <span className="text-white/80 font-medium">{rewardName}</span> is
        guaranteed after {guaranteedThreshold} attempts without receiving it.
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
              ready ? "bg-emerald-400" : "bg-emerald-600"
            }`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div id={progressId} className="flex justify-between text-sm">
        <span className="font-mono text-white/80">
          {attemptsSinceLastReward} / {guaranteedThreshold}
        </span>
        {ready ? (
          <span className="text-emerald-400 font-medium" aria-live="polite">
            Ready to claim
          </span>
        ) : (
          <span className="text-white/50">
            {remaining} remaining
          </span>
        )}
      </div>

      <p className="text-xs text-white/40 mt-5 leading-relaxed">
        Hard guarantees remove the pure “infinite bad luck” tail. Keep the
        threshold visible so players understand when the guarantee will trigger.
      </p>
    </section>
  );
}
