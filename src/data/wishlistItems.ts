import { WishlistItem } from '../components/forms/schemas/Wishlist';

export const wishlistItems: WishlistItem[] = [
  {
    Id: 'WL001',
    Name: 'Zero-Knowledge Proof Educational Content',
    Description__c:
      'Create comprehensive educational materials about ZK proofs, including tutorials, examples, and interactive demos to help developers understand and implement ZK solutions.',
    Category__c: 'Education',
    Priority__c: 'High',
    Expected_Deliverables__c:
      'Interactive tutorials, code examples, documentation, and video content',
    Skills_Required__c: 'ZK expertise, technical writing, web development',
    Estimated_Effort__c: '3-6 months',
    Tags__c: 'Zero Knowledge;Education;Content',
    Out_of_Scope__c: 'Closed-source or proprietary educational materials.',
    Resources__c: 'Access to existing EF education repositories and ZK research notes.'
  },
  {
    Id: 'WL002',
    Name: 'Layer 2 Gas Optimization Tools',
    Description__c:
      'Develop tools to help developers optimize gas usage on various Layer 2 solutions, including cost comparison and optimization recommendations.',
    Category__c: 'Developer Tools',
    Priority__c: 'High',
    Expected_Deliverables__c: 'Gas optimization toolkit, comparison dashboard, integration guides',
    Skills_Required__c: 'Solidity, Layer 2 protocols, web development',
    Estimated_Effort__c: '4-8 months',
    Tags__c: 'Layer 2;Tooling;Developer Experience',
    Out_of_Scope__c: 'Closed analytics platforms or tooling that requires API keys or paywalls.',
    Resources__c: 'Guidance from EF L2 support team and historical gas usage datasets.'
  },
  {
    Id: 'WL003',
    Name: 'Ethereum Staking Pool Security Analysis',
    Description__c:
      'Conduct comprehensive security analysis of staking pool implementations and create best practices guide for secure staking pool development.',
    Category__c: 'Security',
    Priority__c: 'Medium',
    Expected_Deliverables__c:
      'Security analysis report, best practices documentation, audit checklist',
    Skills_Required__c: 'Security auditing, Ethereum consensus, smart contracts',
    Estimated_Effort__c: '2-4 months',
    Tags__c: 'Security;Staking;Research',
    Out_of_Scope__c: 'Audits of private staking pools without community impact.',
    Resources__c: 'Introductions to staking pool teams, access to prior EF staking reports.'
  },
  {
    Id: 'WL004',
    Name: 'DeFi Protocol Composability Framework',
    Description__c:
      'Build a framework that helps developers understand and implement secure composability patterns when building on top of existing DeFi protocols.',
    Category__c: 'DeFi',
    Priority__c: 'Medium',
    Expected_Deliverables__c: 'Composability framework, integration patterns, security guidelines',
    Skills_Required__c: 'DeFi protocols, smart contracts, security analysis',
    Estimated_Effort__c: '6-12 months',
    Tags__c: 'DeFi;Composability;Security',
    Out_of_Scope__c: 'Token launches or projects that prioritize TVL growth over shared tooling.',
    Resources__c:
      'Access to EF DeFi research fellows and prior composability incident post-mortems.'
  },
  {
    Id: 'WL005',
    Name: 'Ethereum Node Operation Monitoring',
    Description__c:
      'Create monitoring and alerting tools for Ethereum node operators to track node health, performance, and network participation.',
    Category__c: 'Infrastructure',
    Priority__c: 'High',
    Expected_Deliverables__c: 'Monitoring dashboard, alerting system, performance metrics',
    Skills_Required__c: 'System administration, Ethereum clients, monitoring tools',
    Estimated_Effort__c: '3-6 months',
    Tags__c: 'Infrastructure;Monitoring;Nodes',
    Out_of_Scope__c:
      'Hosted monitoring services that do not release tooling under permissive open-source licenses.',
    Resources__c:
      'Introductions to node operator communities, prior EF infrastructure tooling benchmarks.'
  }
];

export const getActiveWishlistItems = (): WishlistItem[] => {
  return wishlistItems;
};

export const getWishlistItemById = (id: string): WishlistItem | undefined => {
  return wishlistItems.find(item => item.Id === id);
};
