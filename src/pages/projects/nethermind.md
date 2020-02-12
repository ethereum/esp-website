---
title: "Nethermind"
img: ../../images/projects/nethermind.png
category: "Eth 1.0 usability"
description: ".NET Core client for Ethereum 1.0"
grantYear: "2019"
grantAmount: "$50,000"
status: "Deployed and in use"
latestUpdate: "https://twitter.com/nethermindeth/status/1225713703460405248"
---

**Key components:**

- Eth1 client written in .NET
- Fast sync
- Minimal hardware requirements
- Thorough documentation

**Deliverables:**

- Battletesting at scale
- Beam sync
- Bug bounties

**Needs addressed:** Eth1 client diversity and network maintenance for miners

---

Nethermind is a .NET Core-based Ethereum client built by the team of the same name. Founder Tomasz Kajetan Stanczak worked in finance, foreign exchange and trading technology before falling for Ethereum. With Nethermind, he brought that experience to bear and set out to create a client with all the features a finance business would need in order to access Ethereum's full potential.

Fast, lightweight and data analytics oriented, [Nethermind](https://nethermind.io) was created with enterprise in mind. The .NET framework is more common among enterprise applications than Rust or Go (the languages used for Parity and Geth respectively), making it a natural choice for a client aimed at enterprise users. Additional enterprise-focused features include node monitoring with Prometheus and Grafana, and Kafka feeds for onchain data.

Recently, the Nethermind team has made efforts to work with companies that use Ethereum integrations, focusing on delivering improvements needed for enterprise users. In January they completed a detailed plan of action based on feedback from miners and mining pools. Some upcoming additions to the Nethermind client include:

- AuRa consensus algorithm (as seen on xDai, Parity, PoA,and EWF) (completed)
- Stratum mining protocol (upcoming)
- Neth module support: allows people to load their own extensions and modules into the node (upcoming)
- [Beam Sync](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a) and further stateless client support (upcoming)
- ...and much more!

The Nethermind team remains dedicated to maintaining and advancing Ethereum 1.0, with lots more improvements in the pipeline!

**Follow along:** [Documentation](https://nethermind.readthedocs.io), [Gitter](https://gitter.im/nethermindeth/nethermind), [Releases](https://github.com/NethermindEth/nethermind/releases), [Docker](https://hub.docker.com/r/nethermind/nethermind), [Codecov.io](https://codecov.io/gh/NethermindEth/nethermind), [Github Actions](https://github.com/NethermindEth/nethermind/actions)

Nethermind is a Gitcoin CLR recipient! Contribute at [gitcoin.co/grants/142/nethermind](https://gitcoin.co/grants/142/nethermind)
