---
title: "Ethereum on ARM"
img: ../../../images/projects/ethereum-on-arm.png
category: "Usability - miner/validator"
description: "Custom Linux images to automatically turn resource constrained devices into full Ethereum nodes."
grantYear: "2019"
grantAmount: "$20,000"
status: "~150 nodes on Eth1 mainnet, Eth 2.0 testnets on Prysm and Lighthouse"
latestUpdate: "https://www.reddit.com/r/ethereum/comments/epxy8l/ethereum_on_arm_ethereum_1020_ecosystem/"
lang: "en"
---

**Key components:**

- Plug & play images for [Raspberry Pi 4](https://github.com/diglos/pi-gen), [NanoPC-T4 and RockPro64](https://github.com/diglos/userpatches)
- Support for Geth, Nethermind and Parity 1.0 clients
  (currently usable through docker image)
- Initial support for Eth 2.0
- Images contain additional ecosystem components e.g. Status.im, Raiden, IPFS, Swarm and Vipnode
- Easy upgrades through a built-in APT repository

**Deliverables:**

- Create Armbian and Raspbian stable images for running Ethereum nodes through Geth and Parity clients
- Integration with Swarm, IPFS, and Whisper
- Research on Eth2 clients and staking process

**Needs addressed:** Ethereum on ARM makes running an Ethereum node accessible and affordable

---

When a lot of people think of an Ethereum node, they imagine expensive equipment and complicated processes – stuff best left to the experts. Ethereum on ARM looks to change this by making it as easy as possible to participate in running the network.

The “ARM” in Ethereum on ARM stands for [Advanced RISC Machine](https://en.wikipedia.org/wiki/ARM_architecture). ARM is a compact and efficient chip architecture used in the vast majority of processors in our smartphones, laptops and tablets – as well as single-board “system on a chip” computers like the Raspberry Pi.

Eth on ARM provides plug & play images that take care of all necessary steps to turn an ARM board into a full Ethereum node, from setting up the environment to running the Ethereum software and synchronizing the blockchain. It currently supports Raspberry Pi 4, NanoPC-T4 and RockPro64 - all single-board devices ranging in price from roughly \$50-150 USD. Add a very active Github, regular updates to Reddit and the project's creator, Diego Losada, jumping into the comments to troubleshoot, and suddenly running a node seems pretty darn accessible.

Ethereum on ARM was awarded a grant in 2019 to support continued development, including adding Geth and Parity light server support on Rockchip RK3399 and Raspberry Pi and integration of Swarm, IPFS and Whisper. Eth 2.0 support is [ramping up](https://www.reddit.com/r/ethereum/comments/epxy8l/ethereum_on_arm_ethereum_1020_ecosystem/), with a Prysm testnet already running and Lighthouse close behind.

**Follow along:** [Twitter](https://twitter.com/EthereumOnARM), [GitHub](https://github.com/diglos)

Ethereum on ARM is a Gitcoin CLR recipient! Contribute at [gitcoin.co/grants/384/ethereum-on-arm](https://gitcoin.co/grants/384/ethereum-on-arm)
