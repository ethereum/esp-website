---
title: "Circom"
img: ../../../images/projects/circom.png
category: "Zero Knowledge Proof R&D"
description: "A robust and scalable language for complex zkSNARK circuit design."
grantYear: "2019"
grantAmount: "$72,363"
status: "Language in production since 2018, revisions in progress"
latestUpdate: "https://blog.iden3.io/iden3-Introducing-a-new-set-of-tools-for-mastering-zkSNARKs.html"
lang: "en"
---

**Key components:**

- Programming language
- Compiler
- JavaScript implementation
- Libraries & documentation

**Deliverables:**

- Revise language design (syntax and semantics)
- Develop a new compiler
- Revise existing libraries
- Full documentation of language and standard libraries

**Needs addressed:** Circom eases the task of designing arithmetic circuits to be used in zero knowledge proofs

---

Circom, first released in 2018, is a programming language for designing and building reusable circuits compatible with [snarkjs](https://github.com/iden3/snarkjs). Circom allows the use of templates to represent components, similar to objects and classes in object-oriented programming.

Circom is a project of [Iden3](https://iden3.io), a team working on a decentralized identity management platform. Since zero knowledge proofs are an integral part of Iden3’s construction, the team set out to create a tool that would be useful for their own work, but could also be shared with the community for others working on similar problems to use (and contribute!).

Since its initial release, circom has become a go-to tool for many projects using zero knowledge proofs, including Tornado, Semaphore, Zeropool and many more. After a year of use and growth, in 2019 the circom team received a grant toward a top-to-bottom revision of the language to make it more efficient, reliable and scalable. This includes:

- Improving existing libraries and documentation; revising the syntax including domain specific constructions
- Revision of syntax, including domain specific constructions and extension of the language to include new types of constructions
- Revision of semantics, including a revised type system, more precise definition of scoping rules, object binding and memory management
- Develop a new compiler and analyze possible target languages

A specification of Circom is being published in Q1 2020 and the new compiler is already in development.

**Follow along:** [Github](https://github.com/iden3/circom), [Blog](https://blog.iden3.io/)
