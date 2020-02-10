---
title: "ethers.js"
img: ../../images/projects/ethers-js.png
category: "Developer experience"
description: "A complete and compact JavaScript library for interacting with Ethereum."
grantYear: "2019"
grantAmount: "$25,000"
status: "In use; version 5 in beta"
latestUpdate: "https://blog.ricmoo.com/beta-release-ethers-js-v5-59d0db222d7b"
---

**Key components:**

- JavaScript library for interacting with Ethereum
- Thorough documentation
- First-class citizen support for ENS names
- 20,000+ test cases

**Deliverables:**

- Lerna for modularization
- Improved documentation
- Improved command line tools for managing Ethereum accounts, tasks and development
- Version 5 release

**Needs addressed:** Extensive and versatile toolkit minimizes pain points of developing dapps on Ethereum

---

When Richard Moore (better known to some as RicMoo) first started working on ethers.js, he just wanted to create tools that he needed for his own work building dapps on Ethereum. However, it quickly became a go-to JavaScript library for dapp builders across the Ethereum community.

Ethers.js is notable for its compact size – it zips up to just 85kb. Within that tiny package developers can find all common functionality required for dapps and wallets, fully TypeScript ready and backed up by thorough documentation and extensive testing. This is very much a library by Ethereum, for Ethereum: ENS names are fully functional as Ethereum addresses – they can be used anywhere that hex addresses can. Import/export for JSON wallets (Geth, Parity and crowdsale), BIP 39 backup phrases, and HD wallets are all supported.

Ethers.js received a grant in early 2019, and RicMoo has kept busy in the intervening months! There have been improvements to documentation and command line tools, restructuring the codebase to be more modularized - using Lerna on Github to keep things organized - and a beta release of version 5 in mid 2019.

Later in 2019, the ethers.js and web3.js teams joined forces. Their work continues as a unified effort, developing One Library To Rule Them All (or more accurately One Library That Is Very Good But You’re Welcome To Fork It Or Use Something Else Entirely Because This is Open Source After All).

Ethers.js v5 continues to progress and will be coming out of beta soon – in the meantime keep an eye on the changelog for updates: https://github.com/ethers-io/ethers.js/blob/ethers-v5-beta/CHANGELOG.md

---

**Follow along:** [Blog](https://blog.ricmoo.com/), [Github](https://github.com/ethers-io/ethers.js),
Twitter [@ricmoo](https://twitter.com/ricmoo), [@ethersproject](https://twitter.com/ethersproject) (low activity, advisory only)

Ethers.js is a Gitcoin CLR recipient! Contribute at [gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2](https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2)