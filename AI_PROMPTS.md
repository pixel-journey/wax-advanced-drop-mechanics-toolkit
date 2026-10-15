# AI_PROMPTS.md — Advanced Drop Mechanics Toolkit

Ready-to-use prompts for AI coding agents when working with this blueprint.

Paste the relevant block together with `spec.yaml` and/or `ARCHITECTURE.md` for best results.

---

## 1. Tune a pity curve

```
Using the pure calculatePityChance engine and PitySystemSimulator from this repository,
help me design a pity curve for [DESCRIBE THE DROP].

Requirements:
- Keep soft pity and optional hard pity clearly separated
- Show the resulting probability at several attempt counts
- Prefer parameters that feel fair rather than extractive
- Do not change the pure engine contract
```

---

## 2. Add a new modifier to ProbabilityCalculator

```
Extend the probability system so it can apply an additional modifier
(e.g. time-of-day, inventory-based, or event boost) on top of pity.

Requirements:
- Keep all math in pure functions (extend engines.ts)
- Update ProbabilityCalculator to show base → pity → extra modifier clearly
- Preserve accessibility and calm educational language
```

---

## 3. Wire a real claim path (WharfKit)

```
Add an optional claim path that uses WharfKit to call a real drop contract
(e.g. atomicdropsx or a project-specific contract).

Requirements:
- Simulation and claim must remain strictly separated
- Show a clear preview of the on-chain action before signing
- Never let the UI promise a result the contract cannot deliver
- On failure, explain the error calmly and offer a path forward
```

---

## 4. Implement daily + hourly rate limits

```
Extend FairnessProtections to support both a daily limit and a shorter
rate-limit window (e.g. per hour).

Requirements:
- Use pure helpers for remaining allowance
- Calm, factual messaging when a limit is reached
- Clear indication of when each limit resets
- Accessibility preserved (progressbar roles, live regions)
```

---

## 5. Full safety / fairness review

```
Review the current examples (PitySystemSimulator, GuaranteedRewards,
ProbabilityCalculator, FairnessProtections, DropSimulator) against the
fairness invariants in ARCHITECTURE.md and spec.yaml.

List any place where:
- Simulation could be mistaken for on-chain authority
- Odds or progress are not visible
- Language feels manipulative or alarming without a path forward

If none exist, say so explicitly.
```

---

## 6. Adapt to a specific contract

```
Adapt the educational patterns in this toolkit to the drop contract
[CONTRACT NAME / INTERFACE].

Requirements:
- Keep the pure simulation layer unchanged for education and tuning
- Map the claim path cleanly to the real contract actions
- Document any differences between simulated odds and on-chain behavior
- Preserve all fairness invariants
```

---

*These prompts are part of the Pixel Journey AI collaboration toolkit.*
