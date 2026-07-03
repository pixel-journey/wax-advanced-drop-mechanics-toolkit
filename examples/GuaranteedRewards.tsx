'use client';

import React from 'react';

interface GuaranteedRewardsProps {
  attemptsSinceLastReward: number;
  guaranteedThreshold: number;
  rewardName: string;
  className?: string;
}

/**
 * Guaranteed reward indicator.
 * Shows progress toward a guaranteed reward.
 */
export function GuaranteedRewards({
  attemptsSinceLastReward,
  guaranteedThreshold,
  rewardName = 'Rare Item',
  className = '',
}: GuaranteedRewardsProps) {
  const progress = Math.min(attemptsSinceLastReward / guaranteedThreshold, 1);

  return (
    <div className={`rounded-2xl border border-white/10 p-6 ${className}`}>
      <h3 className="font-semibold mb-2">Guaranteed Reward</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {rewardName} guaranteed after {guaranteedThreshold} attempts
      </p>

      <div className="w-full bg-white/10 rounded-full h-3 mb-2">
        <div
          className="bg-emerald-500 h-3 rounded-full transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="text-sm">
        {attemptsSinceLastReward} / {guaranteedThreshold} attempts
        {progress >= 1 && <span className="ml-2 text-emerald-400">(Ready!)</span>}
      </div>
    </div>
  );
}
