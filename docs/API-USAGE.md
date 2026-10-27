# API usage for drop math

`calculatePityChance`, `applyPityBonus`, and `guaranteeProgress` take numbers you already have. They do not read a drop. Pity is not a field on `atomicdropsx`.

## What the contract actually stores

On 2026-10-27 `get_abi` for `atomicdropsx` listed `claimdrop` and a `drops` table. One row, scope `atomicdropsx`, `limit` 1, returned 200 with `more: true`. The row had `drop_id`, `collection_name`, `listing_price`, `account_limit`, `max_claimable`, `current_claimed`, `start_time`, and `end_time`. It did not have a pity counter.

```http
POST https://wax.greymass.com/v1/chain/get_table_rows
{"json":true,"code":"atomicdropsx","scope":"atomicdropsx","table":"drops","limit":1}
```

`current_claimed` against `max_claimable` is a sold-out check. It is not `isGuaranteeReady`. Account-specific pity, if a project builds it, would be their own table. Do not scan `drops` to invent one.

`claimdrop` is a signed transaction. This repo does not build it. The UI must not show a pity chance the contract will not honor.
## Shared rules

This file does not send the requests, and it does not change the engines. A custom origin is an `https` URL with no path, query, or password. Walk at most five origins and stop at the first success. Trust a chain host only after `get_info.chain_id` is `1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4`.

History, if you add it, is not the chain host. On 2026-10-26 `https://wax.eosrio.io/v2/history/get_actions` returned 404 while three other hosts returned 200: `https://wax.eosphere.io`, `https://wax.eosusa.io`, `https://api.waxsweden.org`. Re-check before you pin them. If `more` is true on a table read, continue with `lower_bound` set to `next_key` and keep `limit`.

Docs: [Chain API](https://docs.wax.io/apis/chain-api.htm), [Hyperion v2](https://hyperion.docs.eosrio.io/api/v2/).
