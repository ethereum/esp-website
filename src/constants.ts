import { TabsMap } from './types';

// about
export const ABOUT_URL = '/about';
export const WHO_WE_SUPPORT_URL = '/about/who-we-support';
export const HOW_WE_SUPPORT_URL = '/about/how-we-support';

// applicants
export const APPLICANTS_URL = '/applicants';
export const OFFICE_HOURS_URL = '/applicants/office-hours';
export const SMALL_GRANTS_URL = '/applicants/small-grants';
export const PROJECT_GRANTS_URL = '/applicants/project-grants';
export const APPLICANTS_PAGES = [OFFICE_HOURS_URL, SMALL_GRANTS_URL, PROJECT_GRANTS_URL];

// apply forms
export const PROJECT_GRANTS_APPLY_URL = '/applicants/project-grants/apply';
export const OFFICE_HOURS_APPLY_URL = '/applicants/office-hours/apply';
export const SMALL_GRANTS_APPLY_URL = '/applicants/small-grants/apply';
export const PROJECT_GRANTS_DOWNLOAD_FILE_URL =
  'https://ipfs.chainsafe.io/ipfs/QmQ6TWeRS2z5pMsKsZgeBiCdZwNM1wctno9ESYkZUkNKi4';

// thank you pages
export const PROJECT_GRANTS_THANK_YOU_PAGE_URL = '/applicants/project-grants/thank-you';
export const OFFICE_HOURS_THANK_YOU_PAGE_URL = '/applicants/office-hours/thank-you';
export const SMALL_GRANTS_THANK_YOU_PAGE_URL = '/applicants/small-grants/thank-you';

// ethereum ecosystem
export const ETHEREUM_ORG_URL = 'https://ethereum.org/';
export const ETHEREUM_PRIVACY_POLICY_URL = 'https://ethereum.org/en/privacy-policy/';
export const ETHEREUM_TERMS_OF_USE_URL = 'https://ethereum.org/en/terms-of-use/';
export const ETHEREUM_GITHUB_URL = 'https://github.com/ethereum';
export const ETHEREUM_JOBS_URL = 'https://ethereum.org/en/community/#ethereum-jobs';
export const ETHEREUM_COMMUNITY_URL = 'https://ethereum.org/en/community/';
export const ETHEREUM_BROAD_ECOSYSTEM_URL =
  'https://ethereum.org/en/community/grants/#broad-ethereum-ecosystem';
export const ETHEREUM_GRANTS_URL = 'https://ethereum.org/en/community/grants/';

// EF
export const EF_PHILOSOPHY_URL = 'https://ethereum.foundation/philosophy/';
export const EF_JOBS_URL = 'https://ethereum.bamboohr.com/jobs/';

// ESP external links
export const ESP_BLOG_URL = 'https://blog.ethereum.org/category/ecosystem-support-program/';
export const ESP_TWITTER_URL = 'https://twitter.com/EF_ESP';
export const ESP_EMAIL_ADDRESS = 'mailto:esp@ethereum.org';

// tabs
export const APPLICANTS_TABS = ['Overview', 'Office Hours', 'Small Grants', 'Project Grants'];
export const TABS_MAP: TabsMap = {
  [APPLICANTS_URL]: 0,
  [OFFICE_HOURS_URL]: 1,
  [SMALL_GRANTS_URL]: 2,
  [PROJECT_GRANTS_URL]: 3,
  [OFFICE_HOURS_APPLY_URL]: 1,
  [OFFICE_HOURS_THANK_YOU_PAGE_URL]: 1,
  [SMALL_GRANTS_APPLY_URL]: 2,
  [SMALL_GRANTS_THANK_YOU_PAGE_URL]: 2,
  [PROJECT_GRANTS_APPLY_URL]: 3,
  [PROJECT_GRANTS_THANK_YOU_PAGE_URL]: 3
};

// mobile menu
export const MOBILE_MENU = [
  { href: '/', text: 'Home' },
  { href: APPLICANTS_URL, text: 'For Applicants' },
  { href: ABOUT_URL, text: 'About ESP' },
  { href: ESP_BLOG_URL, text: 'Blog' }
];

// external links
export const ETHRESEARCH_URL = 'https://ethresear.ch/';

// api
export const API_DOWNLOAD_APPLICATION_URL = '/api/download-application';
