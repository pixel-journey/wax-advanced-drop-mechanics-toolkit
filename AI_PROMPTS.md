# AI handoff — advanced drop mechanics toolkit

## Non-negotiables

1. Soft pity line that **caps**; hard pity returns **1**.
2. **`hardPityAt: 0` is a footgun** — at 0 failures the rate is already **1**. Do not ship it.
3. `applyPityBonus` adds bonus to every tier and does **not** renormalize (sample sum **1.2**).
4. `remainingAllowance` floors at **0**.
5. **Not** `atomicdropsx`, not `atomicpacks`, not a claim. Nothing reads an NFT or broadcasts.
6. Longer pity course with different policy is [wax-pity-system-and-guaranteed-rewards](https://github.com/pixel-journey/wax-pity-system-and-guaranteed-rewards) — do **not** merge curves.
7. React simulators are **not** executed by `npm test` — only pure engines.

## Prompt seeds

- "calculatePityChance at cap — value?"
- "hardPityAt 0 at 0 failures — result and why refuse shipping it?"
- "applyPityBonus 0.1 on 0.8 and 0.2 — sum after bonus?"
- "Wire WharfKit claim only with sim vs claim strictly separated."

## Do not

- Renormalize after applyPityBonus and pretend tests allow it.
- Call the React page a drop.
- Import this curve into the other pity repo and claim they are the same policy.
