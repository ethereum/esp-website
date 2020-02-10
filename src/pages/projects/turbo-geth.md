---
title: "Turbo-Geth"
img: ../../images/projects/turbo-geth.png
category: "Eth 1.0 scalability/sustainability"
description: "Optimized go-ethereum client."
grantYear: "2018"
grantAmount: "$25,000"
status: "In testing, targeting March 2020 release"
latestUpdate: "https://medium.com/@akhounov/is-ethereum-state-growing-faster-now-and-ethereum-state-analytics-project-97777ab47af"
---

**Key components:**

- Compact database format
- Simplified mining
- Rapid data extraction

**Deliverables:**

- Stabilize database format
- Battle-tested public release
- Ethereum State Analytics prototype

**Needs addressed:** Eth 1.0 client optimization, compact state storage

---

Turbo-Geth is just what it sounds like: a faster, powered-up version of the long-established Geth client. The goal is to scale Ethereum not by way of layer 2 protocols or sharding, but through improvements to how clients interact with the existing blockchain.

One of Turbo-Geth’s key innovations is to replace the hash tree - the typical way of storing Ethereum data - with a simplified, lighter-weight index. The result is a state and history that are both more compact and quicker to query.

Since receiving a grant in late 2018, the Turbo-Geth team has experimented with ways of further improving the database format. These have included:

- **THIN_HISTORY**: further reduction of the size of the history of accounts and storage.

- **INTERMEDIATE_HASHES**: extra info stored in the database which adds around 10% to the current state size, but allows much quicker restart times and helps to speed up sync and block processing.

- **GetNodeData support**: could allow Turbo-Geth to partially support fast sync

- **Pre-sorting**: to speed up archive node sync, certain information such as history and transaction hash lookup is computed and sorted after sync, rather than inspecting blocks to fill out the database during the syncing process.

2019 also saw the creation of a working Ethereum State Analytics prototype, which enables extraction of lots of information from a running Turbo-Geth node – in roughly 5% of the time it would take to extract the same data from a Geth node. This data can be used to generate charts like [these](https://medium.com/@akhounov/ethereum-block-gas-limit-increase-and-state-growth-b95353153179), which can help us understand things like the effects of protocol changes on performance and user behavior.

Turbo-Geth is still being tested, but is getting ready to come out of hiding – the team is targeting March 2020 for a mainnet-ready public release.

**Follow along**: [Github](https://github.com/ledgerwatch/turbo-geth)

Turbo-Geth is a Gitcoin CLR recipient! Contribute at [gitcoin.co/grants/224/turbo-geth](https://gitcoin.co/grants/224/turbo-geth)
