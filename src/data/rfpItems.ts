import { RFPItem } from '../components/forms/schemas/RFP';

export const rfpItems: RFPItem[] = [
  {
    Id: 'RFP001',
    Name: 'Ethereum Client Optimization Research',
    Description__c:
      'Research and develop optimization techniques for Ethereum execution clients to improve sync times, reduce resource consumption, and enhance overall network performance.',
    Category__c: 'Research',
    Priority__c: 'High',
    Expected_Deliverables__c:
      'Research report, proof-of-concept implementation, performance benchmarks, and optimization recommendations',
    Skills_Required__c:
      'Ethereum protocol expertise, systems programming, performance optimization, benchmarking',
    Estimated_Effort__c: '6-12 months',
    Tags__c: 'Execution Clients;Performance;Research',
    Ecosystem_Need__c:
      'Maintain client diversity and operational excellence for the Ethereum network by improving client performance and resiliency.',
    Hard_Requirements__c:
      'Proven experience with at least one Ethereum execution client (Geth, Erigon, Nethermind, or Besu).\nDemonstrated track record in systems-level performance optimization.',
    Soft_Requirements__c:
      'Ability to collaborate with client teams and share findings openly.\nComfort presenting results to technical stakeholders.',
    Resources__c:
      'https://github.com/ethereum/execution-specs\nhttps://github.com/ethereum/pm',
    RFP_Open_Date__c: '2024-08-01',
    RFP_Close_Date__c: '2024-09-30',
    RFP_Project_Duration__c: '6-12 months'
  },
  {
    Id: 'RFP002',
    Name: 'MEV-Boost Relay Decentralization Study',
    Description__c:
      'Comprehensive analysis of current MEV-Boost relay infrastructure and proposal for decentralization mechanisms to reduce single points of failure and censorship risks.',
    Category__c: 'Research',
    Priority__c: 'High',
    Expected_Deliverables__c:
      'Technical specification, prototype implementation, security analysis, and deployment roadmap',
    Skills_Required__c:
      'MEV expertise, consensus layer knowledge, cryptographic protocols, distributed systems',
    Estimated_Effort__c: '8-14 months',
    Tags__c: 'MEV;Consensus;Research',
    Ecosystem_Need__c:
      'Reduce centralization risks and censorship vectors in current MEV-Boost relay infrastructure.',
    Hard_Requirements__c:
      'Extensive knowledge of Ethereum consensus and MEV supply chain mechanics.\nAbility to model and analyze relay operator incentives.',
    Soft_Requirements__c:
      'Established relationships across MEV stakeholders and validator communities.\nStrong communication skills for cross-organizational coordination.',
    Resources__c:
      'https://github.com/flashbots/mev-boost\nhttps://ethresear.ch/c/mev/21',
    RFP_Open_Date__c: '2024-07-15',
    RFP_Close_Date__c: '2024-09-15',
    RFP_Project_Duration__c: '8-14 months'
  },
  {
    Id: 'RFP003',
    Name: 'Layer 2 Interoperability Framework',
    Description__c:
      'Design and implement a standardized framework for cross-layer communication and asset bridging between different Layer 2 solutions while maintaining security guarantees.',
    Category__c: 'Protocol Development',
    Priority__c: 'Medium',
    Expected_Deliverables__c:
      'Protocol specification, reference implementation, security audit, integration guides for L2 projects',
    Skills_Required__c:
      'Layer 2 protocols, bridge security, smart contract development, formal verification',
    Estimated_Effort__c: '10-18 months',
    Tags__c: 'Layer 2;Interoperability;Protocol Design',
    Ecosystem_Need__c:
      'Improve composability and safety for cross-rollup applications and liquidity.',
    Hard_Requirements__c:
      'Hands-on experience building on multiple rollup stacks.\nSecurity reviews completed for bridge or interoperability systems.',
    Soft_Requirements__c:
      'Strong community engagement record with L2 teams.\nAbility to produce clear documentation for external integrators.',
    Resources__c:
      'https://l2beat.com/\nhttps://research.scroll.io/\nhttps://docs.arbitrum.io/',
    RFP_Open_Date__c: '2024-06-01',
    RFP_Close_Date__c: '2024-08-31',
    RFP_Project_Duration__c: '10-18 months'
  },
  {
    Id: 'RFP004',
    Name: 'Zero-Knowledge Proof Hardware Acceleration',
    Description__c:
      'Develop specialized hardware acceleration solutions for zero-knowledge proof generation and verification to improve performance and reduce costs for ZK applications.',
    Category__c: 'Hardware',
    Priority__c: 'Medium',
    Expected_Deliverables__c:
      'Hardware design specifications, FPGA/ASIC prototypes, performance benchmarks, open-source implementations',
    Skills_Required__c:
      'Hardware design, FPGA/ASIC development, cryptography, zero-knowledge proofs',
    Estimated_Effort__c: '12-24 months',
    Tags__c: 'Zero Knowledge;Hardware;Acceleration',
    Ecosystem_Need__c:
      'Enable scalable, affordable ZK proof generation for rollups and privacy-preserving applications.',
    Hard_Requirements__c:
      'Expertise shipping FPGA or ASIC designs to production.\nDeep familiarity with contemporary ZK proving systems (PLONK, STARK, Groth16).',
    Soft_Requirements__c:
      'Experience collaborating with protocol and application teams.\nOpen-source ethos and willingness to upstream improvements.',
    Resources__c:
      'https://zkproof.org/\nhttps://github.com/privacy-scaling-explorations\nhttps://github.com/barretenberg/barretenberg',
    RFP_Open_Date__c: '2024-05-20',
    RFP_Close_Date__c: '2024-08-01',
    RFP_Project_Duration__c: '12-24 months'
  },
  {
    Id: 'RFP005',
    Name: 'Ethereum Archive Node Optimization',
    Description__c:
      'Research and develop solutions to reduce storage requirements and improve query performance for Ethereum archive nodes while maintaining full historical data access.',
    Category__c: 'Infrastructure',
    Priority__c: 'High',
    Expected_Deliverables__c:
      'Optimized archive node implementation, compression algorithms, query optimization techniques, deployment guide',
    Skills_Required__c:
      'Database optimization, storage systems, Ethereum protocol, data compression',
    Estimated_Effort__c: '6-10 months',
    Tags__c: 'Infrastructure;Archive Nodes;Data',
    Ecosystem_Need__c:
      'Lower barriers for operating archive nodes while maintaining full historical data availability.',
    Hard_Requirements__c:
      'Demonstrated work with large-scale distributed storage or database engines.\nProficiency in systems programming languages (Go, Rust, or C++).',
    Soft_Requirements__c:
      'Ability to collaborate with node operator community.\nComfort sharing reproducible benchmarks and best practices.',
    Resources__c:
      'https://github.com/ethereum/go-ethereum\nhttps://github.com/ledgerwatch/erigon\nhttps://ethereum.org/en/developers/docs/nodes-and-clients/',
    RFP_Open_Date__c: '2024-07-01',
    RFP_Close_Date__c: '2024-09-10',
    RFP_Project_Duration__c: '6-10 months'
  }
];

export const getActiveRFPItems = (): RFPItem[] => {
  return rfpItems;
};

export const getRFPItemById = (id: string): RFPItem | undefined => {
  return rfpItems.find(item => item.Id === id);
};
