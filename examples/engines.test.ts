import { describe, expect, it } from "vitest";
import {
  applyPityBonus,
  calculatePityChance,
  guaranteeProgress,
  isGuaranteeReady,
  remainingAllowance,
} from "./engines";

const config = {
  baseRareChance: 0.01,
  pityIncreasePerAttempt: 0.01,
  maxPity: 0.5,
};

describe("pity", () => {
  it("starts at the base and caps at maxPity", () => {
    expect(calculatePityChance(0, config)).toBeCloseTo(0.01);
    expect(calculatePityChance(10, config)).toBeCloseTo(0.11);
    expect(calculatePityChance(100, config)).toBe(0.5);
  });

  it("returns 1 at hard pity, including a zero threshold", () => {
    expect(calculatePityChance(2, { ...config, hardPityAt: 3 })).toBeCloseTo(0.03);
    expect(calculatePityChance(3, { ...config, hardPityAt: 3 })).toBe(1);
    expect(calculatePityChance(0, { ...config, hardPityAt: 0 })).toBe(1);
  });

  it("adds the bonus to every tier and does not renormalize", () => {
    const adjusted = applyPityBonus(
      [
        { name: "common", chance: 0.8 },
        { name: "rare", chance: 0.2 },
      ],
      0.1,
    );
    expect(adjusted[0].adjustedChance).toBeCloseTo(0.9);
    expect(adjusted[1].adjustedChance).toBeCloseTo(0.3);
    const sum = adjusted.reduce((total, row) => total + row.adjustedChance, 0);
    expect(sum).toBeCloseTo(1.2);
  });
});

describe("guarantee and allowance", () => {
  it("measures progress and a non-positive threshold as already done", () => {
    expect(guaranteeProgress(5, 10)).toBe(0.5);
    expect(guaranteeProgress(10, 10)).toBe(1);
    expect(guaranteeProgress(0, 0)).toBe(1);
    expect(isGuaranteeReady(9, 10)).toBe(false);
    expect(isGuaranteeReady(10, 10)).toBe(true);
  });

  it("floors the remaining allowance at zero", () => {
    expect(remainingAllowance(1, 5)).toBe(4);
    expect(remainingAllowance(5, 2)).toBe(0);
  });
});
