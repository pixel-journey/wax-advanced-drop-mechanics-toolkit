# Education — pity math, not a drop contract

> **Rung:** `npm test` runs `examples/engines.test.ts`. The React files are not executed.  
> **The test is the rule.**

This is not `atomicdropsx`, not `atomicpacks`, and not a claim. Nothing here reads an NFT or broadcasts.

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Compute a soft pity chance and see the cap |
| Intermediate | Spot that the bonus is added to every tier |
| Masterclass | Say what a real pack contract still has to do |

---

## Beginner — one scene

```ts
calculatePityChance(0, { baseRareChance: 0.01, pityIncreasePerAttempt: 0.01, maxPity: 0.5 })
// 0.01

calculatePityChance(100, same)
// 0.5
```

Ten failures: `0.11`. One hundred failures: still `0.5`, because `maxPity` caps the soft line.

`hardPityAt: 3` returns `1` once failures reach 3. `hardPityAt: 0` also returns `1` on the first call, because `0 >= 0`. That is a footgun, not a feature to ship.

`guaranteeProgress(5, 10)` is `0.5`. A threshold of `0` is treated as already done. `remainingAllowance(5, 2)` is `0`.

### Predict, then run

```bash
npm test
```

---

## Intermediate — the rates no longer sum to 1

`applyPityBonus` adds the bonus to **every** row, then clamps each row to `[0, 1]`. It does not pick the rare tier. It does not renormalize.

A table of `0.8` and `0.2` plus `0.1` becomes `0.9` and `0.3`. The sum is `1.2`. A UI that treats those numbers as a probability distribution will mint the wrong story.

The comment in `engines.ts` already says production systems usually bonus only the target tier. The function does not do that. Do not describe the demo as if it did.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Soft pity grows without a ceiling | Chance above 1 | capped at `maxPity` | `caps at maxPity` |
| `hardPityAt: 0` | "disabled" | always `1` | `including a zero threshold` |
| Bonus only the rare row | Looks fair | every row moves | `does not renormalize` |
| Allowance goes negative | UI shows −3 | floored at 0 | `floors the remaining allowance` |

---

## Masterclass — what a pack still needs

Atomic packs (the separate `atomicpacks` contract) deposit RAM, announce rolls, and open by transferring one pack NFT with memo `unbox`, then take an RNG callback. This file does not build that transaction.

`atomicdropsx` is another contract. These functions do not match its ABI. Re-read the account you will actually call.

A tested craft gate that returns unsent `mintasset` / `burnasset` bodies, with `tokens_to_back` always empty, is `px-blend-simple-nft-to-nft`. That is a blend, not pity.

### What this course will not teach

- A signed claim
- That the React simulators match `engines.ts` (they were not executed here)
- A probability table that sums to 1 after pity
