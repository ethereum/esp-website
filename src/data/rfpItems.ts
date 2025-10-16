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
    Requirements__c:
      'Strong background in distributed systems, experience with Ethereum clients (Geth, Erigon, Nethermind, or Besu), proficiency in Go, Rust, or C#',
    Tags__c: 'Ethereum Clients;Performance;Research',
    Ecosystem_Need__c:
      'Ensure Ethereum execution clients remain performant as the network grows and resource constraints tighten.',
    Hard_Requirements__c:
      'Demonstrated experience contributing to Ethereum client codebases and profiling large distributed systems.',
    Soft_Requirements__c:
      'Ability to collaborate asynchronously with multiple client teams, provide regular progress updates, and document findings.',
    Resources__c:
      'Access to existing EF client team contacts, historical benchmark datasets, and targeted infrastructure for load testing.',
    RFP_Open_Date__c: '2024-01-15',
    RFP_Close_Date__c: '2024-06-30',
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
    Requirements__c:
      'Deep understanding of Ethereum consensus, MEV ecosystem experience, cryptography background, ability to work with validator and relay operators',
    Tags__c: 'MEV;Relay Infrastructure;Security',
    Ecosystem_Need__c:
      'Reduce single points of failure in MEV-Boost infrastructure to mitigate censorship and resilience risks.',
    Hard_Requirements__c:
      'Prior research output on MEV or relay systems and demonstrated cryptography expertise.',
    Soft_Requirements__c:
      'Comfort engaging with validator operators, writing public updates, and presenting recommendations to stakeholders.',
    Resources__c:
      'Relay operator interviews, EF research contacts, access to existing MEV-Boost telemetry where available.',
    RFP_Open_Date__c: '2024-02-01',
    RFP_Close_Date__c: '2024-07-15',
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
    Requirements__c:
      'Experience with multiple L2 solutions (Optimism, Arbitrum, Polygon, etc.), smart contract security expertise, understanding of bridge mechanisms',
    Tags__c: 'Layer 2;Interoperability;Bridges',
    Ecosystem_Need__c:
      'Coordinate liquidity and messaging across Layer 2 networks without sacrificing security guarantees.',
    Hard_Requirements__c:
      'Hands-on integration work with at least two production L2 stacks and prior security review experience.',
    Soft_Requirements__c:
      'Capacity to convene multi-team working groups and synthesize feedback into actionable specifications.',
    Resources__c:
      'Introductions to L2 core teams, prior EF interoperability research, existing bridge threat models.',
    RFP_Open_Date__c: '2024-03-05',
    RFP_Close_Date__c: '2024-09-01',
    RFP_Project_Duration__c: '12 months'
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
    Requirements__c:
      'Hardware engineering experience, knowledge of ZK proof systems (PLONK, STARK, Groth16), FPGA development skills',
    Tags__c: 'Zero Knowledge;Hardware;Acceleration',
    Ecosystem_Need__c:
      'Lower costs and latency for proof generation to unlock broader use of privacy-preserving applications.',
    Hard_Requirements__c:
      'Prior production hardware design experience and benchmarks on cryptographic workloads.',
    Soft_Requirements__c:
      'Ability to work with open-source communities and document reproducible hardware configurations.',
    Resources__c:
      'Reference implementations from existing ZK teams, EF applied ZK research contacts, prototype testing support.',
    RFP_Open_Date__c: '2024-01-10',
    RFP_Close_Date__c: '2024-08-20',
    RFP_Project_Duration__c: '18 months'
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
    Requirements__c:
      'Experience with database systems, knowledge of Ethereum state structure, proficiency in systems programming languages',
    Tags__c: 'Infrastructure;Archive Nodes;Storage',
    Ecosystem_Need__c:
      'Improve archive node accessibility for researchers and infrastructure providers by lowering storage costs.',
    Hard_Requirements__c:
      'Track record optimizing large-scale storage systems and familiarity with Ethereum state growth patterns.',
    Soft_Requirements__c:
      'Strong documentation practices and willingness to share findings with node operator community.',
    Resources__c:
      'Existing EF research on state growth, archive node operator interviews, access to long-term storage benchmarks.',
    RFP_Open_Date__c: '2024-04-01',
    RFP_Close_Date__c: '2024-10-15',
    RFP_Project_Duration__c: '9 months'
  }
];

export const getActiveRFPItems = (): RFPItem[] => {
  return rfpItems;
};

export const getRFPItemById = (id: string): RFPItem | undefined => {
  return rfpItems.find(item => item.Id === id);
};
