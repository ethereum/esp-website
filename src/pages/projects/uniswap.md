---
title: "Uniswap"
img: ../../images/projects/uniswap.png
category: "Usability - end user"
description: "Automated market maker designed around ease of use, gas efficiency, and decentralization."
grantYear: "2018"
grantAmount: "$50,000 + 120 ETH for security audit"
status: "Deployed and in use"
latestUpdate: "https://twitter.com/UniswapExchange/status/1218201972261773312"
---

**Key components:**

- Price discovery
- Direct swaps between ERC-20s
- Automated market making mechanism

**Deliverables:**

- User interface
- Documentation
- Security audit

**Needs addressed:** Convenient, gas efficient decentralized exchange

---

Uniswap is the kind of scrappy success story that exemplifies the magic of Ethereum. Hayden Adams set out in 2017 to implement the [x\*y=k market maker mechanism](https://ethresear.ch/t/improving-front-running-resistance-of-x-y-k-market-makers/1281), proposed by Vitalik Buterin and others, which creates an automated exchange between two tokens using on-chain liquidity reserves. The [journey](https://medium.com/uniswap/uniswap-birthday-blog-v0-7a91f3f6a1ba) that followed was one of discovery, determination, questionable career choices and celebrity cameos; the resulting dapp is now a household name, at least in any household where an Ethereum fan resides.

By the time the Uniswap grant was awarded, a basic testnet was already up and running. The funds were used to bridge the last mile – auditing, documentation and building out a robust UI – while keeping the project fully open source and decentralized. Uniswap debuted on mainnet during Devcon4, in November 2018.

In addition to a slick market maker, Uniswap solved some tricky user experience dilemmas without sacrificing decentralization:

- ERC20-to-ERC20 trades in a single atomic transaction: a factory and registry contract that deploys a separate exchange contract and ETH pair for every ERC20 token, so that ETH can be used as an intermediary token for exchange between any two ERC20s.
- Gas efficiency: a simple price determination mechanism, carefully designed contract and no dedicated token means trades can be executed at low cost, roughly 20% more than a simple token transfer.
- Users can connect any wallet they own via MetaMask, Coinbase, WalletConnect, Fortmatic or Portis – no need to wrap ETH or deposit tokens into a local wallet in order to trade.

With hundreds of tokens supported, over $50M in its liquidity pools, and about $2M traded every day, Uniswap has grown rapidly. It has been integrated into dozens of other projects and is considered a core piece of infrastructure for the growing DeFi movement.

In 2019, Uniswap grew to include an [analytics site](https://uniswap.info/), a [developer SDK](https://github.com/Uniswap/uniswap-sdk), a [graphQL API](https://github.com/graphprotocol/uniswap-subgraph) (subgraph), and made significant improvements to its open source [frontend](https://uniswap.exchange/swap). It was also the basis of some playful-but-significant experimentation, including [Unisocks](https://unisocks.exchange/), the first known example of tokenized, dynamically priced socks; and the [Unipig](https://unipig.exchange) game, developed in collaboration with Plasma Group to demonstrate the UX improvements made possible by Optimistic Rollup.

In the coming year, the Uniswap team plans on releasing Uniswap V2, a new version of the protocol which expands its utility.

**Follow along:** [Github](https://github.com/Uniswap), [Twitter](https://twitter.com/UniswapExchange), [Discord](https://discordapp.com/invite/Y7TF6QA), [Reddit](https://www.reddit.com/r/UniSwap/), [Blog](https://medium.com/uniswap)
