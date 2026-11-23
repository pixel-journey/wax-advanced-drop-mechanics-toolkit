# Security — advanced drop engines

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Soft pity | rises then **caps** |
| `hardPityAt: 0` | rate **1** at 0 failures (footgun) |
| `applyPityBonus` | does **not** renormalize (sum can exceed 1) |
| Allowance | floors at **0** |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live drop / pack claim | Not performed |
| React simulators | Not executed by `npm test` |
| Other pity policy | [pity course](https://github.com/pixel-journey/wax-pity-system-and-guaranteed-rewards) is different |

## Attack angles

1. Shipping `hardPityAt: 0` so the first roll is already forced.  
2. Renormalizing after `applyPityBonus` and claiming tests allow it.  
3. Calling the React page a drop open.  
4. Merging this curve with the other pity repo without tests.  
5. Letting simulation UI imply on-chain authority.

## Honesty limits

Pure engines only. Prefer WharfKit; keep sim vs claim strictly separated.

[docs.wax.io](https://docs.wax.io/)
