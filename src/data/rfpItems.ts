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
      'Strong background in distributed systems, experience with Ethereum clients (Geth, Erigon, Nethermind, or Besu), proficiency in Go, Rust, or C#'
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
      'Deep understanding of Ethereum consensus, MEV ecosystem experience, cryptography background, ability to work with validator and relay operators'
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
      'Experience with multiple L2 solutions (Optimism, Arbitrum, Polygon, etc.), smart contract security expertise, understanding of bridge mechanisms'
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
      'Hardware engineering experience, knowledge of ZK proof systems (PLONK, STARK, Groth16), FPGA development skills'
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
      'Experience with database systems, knowledge of Ethereum state structure, proficiency in systems programming languages'
  }
];

export const getActiveRFPItems = (): RFPItem[] => {
  return rfpItems;
};

export const getRFPItemById = (id: string): RFPItem | undefined => {
  return rfpItems.find(item => item.Id === id);
};
