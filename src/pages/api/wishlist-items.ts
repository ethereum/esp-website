import type { NextApiRequest, NextApiResponse } from 'next';

// Mock data for now - in production this would fetch from Salesforce
const mockWishlistItems = [
  {
    Id: 'WL001',
    Name: 'Zero-Knowledge Proof Educational Content',
    Description__c: 'Create comprehensive educational materials about ZK proofs, including tutorials, examples, and interactive demos to help developers understand and implement ZK solutions.',
    Category__c: 'Education',
    Priority__c: 'High',
    Status__c: 'Active',
    Expected_Deliverables__c: 'Interactive tutorials, code examples, documentation, and video content',
    Skills_Required__c: 'ZK expertise, technical writing, web development',
    Estimated_Effort__c: '3-6 months'
  },
  {
    Id: 'WL002',
    Name: 'Layer 2 Gas Optimization Tools',
    Description__c: 'Develop tools to help developers optimize gas usage on various Layer 2 solutions, including cost comparison and optimization recommendations.',
    Category__c: 'Developer Tools',
    Priority__c: 'High',
    Status__c: 'Active',
    Expected_Deliverables__c: 'Gas optimization toolkit, comparison dashboard, integration guides',
    Skills_Required__c: 'Solidity, Layer 2 protocols, web development',
    Estimated_Effort__c: '4-8 months'
  },
  {
    Id: 'WL003',
    Name: 'Ethereum Staking Pool Security Analysis',
    Description__c: 'Conduct comprehensive security analysis of staking pool implementations and create best practices guide for secure staking pool development.',
    Category__c: 'Security',
    Priority__c: 'Medium',
    Status__c: 'Active',
    Expected_Deliverables__c: 'Security analysis report, best practices documentation, audit checklist',
    Skills_Required__c: 'Security auditing, Ethereum consensus, smart contracts',
    Estimated_Effort__c: '2-4 months'
  },
  {
    Id: 'WL004',
    Name: 'DeFi Protocol Composability Framework',
    Description__c: 'Build a framework that helps developers understand and implement secure composability patterns when building on top of existing DeFi protocols.',
    Category__c: 'DeFi',
    Priority__c: 'Medium',
    Status__c: 'Active',
    Expected_Deliverables__c: 'Composability framework, integration patterns, security guidelines',
    Skills_Required__c: 'DeFi protocols, smart contracts, security analysis',
    Estimated_Effort__c: '6-12 months'
  },
  {
    Id: 'WL005',
    Name: 'Ethereum Node Operation Monitoring',
    Description__c: 'Create monitoring and alerting tools for Ethereum node operators to track node health, performance, and network participation.',
    Category__c: 'Infrastructure',
    Priority__c: 'High',
    Status__c: 'Active',
    Expected_Deliverables__c: 'Monitoring dashboard, alerting system, performance metrics',
    Skills_Required__c: 'System administration, Ethereum clients, monitoring tools',
    Estimated_Effort__c: '3-6 months'
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In production, this would be:
    // const items = await fetchFromSalesforce('SELECT Id, Name, Description__c, Category__c, Status__c FROM Grants_Initiative__c WHERE Status__c = "Active"');

    // Filter only active items
    const activeItems = mockWishlistItems.filter(item => item.Status__c === 'Active');

    res.status(200).json(activeItems);
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist items' });
  }
}