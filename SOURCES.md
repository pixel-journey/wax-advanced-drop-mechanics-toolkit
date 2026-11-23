# Sources

| Source | Use |
| --- | --- |
| [pity course](https://github.com/pixel-journey/wax-pity-system-and-guaranteed-rewards) | **Different** published policy (soft/hard guarantee) |
| [pack opening](https://github.com/pixel-journey/wax-drops-and-pack-opening-experience) | Atomic unbox + claim UX |
| [pinknetworkx/atomicpacks-contract](https://github.com/pinknetworkx/atomicpacks-contract) | Real pack path (this lab is not that) |
| [docs.wax.io AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | NFT context |
| [wharfkit/skill](https://github.com/wharfkit/skill) | SessionKit if a host later claims |
| [atomic-knowledge](https://github.com/atomicassets/atomic-knowledge) | Network before live AA actions |

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

## Product facts locked by tests (`examples/engines.ts`)

| Call | Result |
| --- | --- |
| `calculatePityChance(0, config)` | `0.01` |
| `calculatePityChance(10, config)` | `0.11` |
| `calculatePityChance(100, config)` | `0.5` (cap) |
| `hardPityAt: 3` at 3 failures | `1` |
| `hardPityAt: 0` at 0 failures | `1` (**footgun**) |
| bonus `0.1` on 0.8 and 0.2 | `0.9` and `0.3`, sum **1.2** (not renormalized) |
| `remainingAllowance(5, 2)` | `0` |

React simulators are **not** executed by `npm test`.

## Portability

Engine math ports. Drop contract tables and `orng.wax` (WAX-only) do not.

## Suggested topics

`antelope` `education` `pixel-journey` `nft` `wax`
