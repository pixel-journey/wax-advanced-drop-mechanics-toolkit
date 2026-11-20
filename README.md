# Pity bonus and allowance — not a drop contract

> **Trust:** `educational-reference` for `examples/engines.ts` only. `npm test` locks that file. The React simulators are not executed.  
> **Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

**One-sentence goal:** Show a soft pity line that caps, a hard pity that returns 1 (including the `hardPityAt: 0` footgun), a bonus added to every tier so the chances can sum past 1, and an allowance that floors at 0.

This is not `atomicdropsx`, not `atomicpacks`, and not a claim. Nothing here reads an NFT or broadcasts.

The longer pity course, with the same cap and the zero-threshold footgun, is already public: [wax-pity-system-and-guaranteed-rewards](https://github.com/pixel-journey/wax-pity-system-and-guaranteed-rewards). This file adds the **unnormalized bonus** and the **remaining allowance**.

## What is true (executed)

| Call | Result |
| --- | --- |
| `calculatePityChance(0, config)` | `0.01` |
| `calculatePityChance(10, config)` | `0.11` |
| `calculatePityChance(100, config)` | `0.5` (the cap) |
| `hardPityAt: 3` at 3 failures | `1` |
| `hardPityAt: 0` at 0 failures | `1` |
| bonus `0.1` on 0.8 and 0.2 | `0.9` and `0.3`, sum `1.2` |
| `guaranteeProgress(5, 10)` | `0.5` |
| `guaranteeProgress(0, 0)` | `1` |
| `remainingAllowance(5, 2)` | `0` |

## Run

```bash
npm test
```

## Do not

- Ship `hardPityAt: 0`. The first roll is already a guarantee.
- Renormalize after `applyPityBonus` and pretend the test did that. The test locks the sum at `1.2`.
- Call the React page a drop. It is not executed.

## Related

- [pity course](https://github.com/pixel-journey/wax-pity-system-and-guaranteed-rewards)
- [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) — a different AtomicAssets path, still not a drop
- Live drop contracts are someone else's deployment. Read them before you copy a chance function into one.

The course is [EDUCATION.md](EDUCATION.md).
