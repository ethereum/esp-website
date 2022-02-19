import { UseToastOptions } from '@chakra-ui/react';
import { NavLink, SidebarLink, TabsMap } from './types';

// metadata
export const HEAD_TITLE = 'Ethereum Foundation ESP';

// home
export const HOME_URL = '/';

// about
export const ABOUT_URL = '/about';
export const WHO_WE_SUPPORT_URL = '/about/who-we-support';
export const HOW_WE_SUPPORT_URL = '/about/how-we-support';

// applicants
export const APPLICANTS_URL = '/applicants';
export const OFFICE_HOURS_URL = '/applicants/office-hours';
export const SMALL_GRANTS_URL = '/applicants/small-grants';
export const PROJECT_GRANTS_URL = '/applicants/project-grants';
export const SIDEBAR_APPLICANTS_LINKS: SidebarLink[] = [
  { text: 'Mission and Scope', href: `${APPLICANTS_URL}/#mission-and-scope` },
  { text: 'How we support', href: `${APPLICANTS_URL}/#how-we-support` },
  { text: 'Application types', href: `${APPLICANTS_URL}/#application-types` }
];
export const SIDEBAR_OFFICE_HOURS_LINKS: SidebarLink[] = [
  { text: 'Summary', href: `${OFFICE_HOURS_URL}/#description` },
  { text: 'Process', href: `${OFFICE_HOURS_URL}/#process` },
  { text: 'Eligibility', href: `${OFFICE_HOURS_URL}/#eligibility` },
  { text: 'What we offer', href: `${OFFICE_HOURS_URL}/#what-we-offer` },
  { text: "What we DON'T offer", href: `${OFFICE_HOURS_URL}/#what-we-dont-offer` },
  { text: 'Before submitting', href: `${OFFICE_HOURS_URL}/#before-submitting` },
  { text: 'FAQ', href: `${OFFICE_HOURS_URL}/#faq` },
  { text: 'Apply', href: `${OFFICE_HOURS_URL}/#apply` }
];
export const SIDEBAR_PROJECT_GRANTS_LINKS: SidebarLink[] = [
  { text: 'Summary', href: `${PROJECT_GRANTS_URL}/#description` },
  { text: 'Process', href: `${PROJECT_GRANTS_URL}/#process` },
  { text: 'Requirements', href: `${PROJECT_GRANTS_URL}/#requirements` },
  { text: 'Eligibility', href: `${PROJECT_GRANTS_URL}/#eligibility` },
  { text: 'What is NOT eligible', href: `${PROJECT_GRANTS_URL}/#what-is-not-eligible` },
  {
    text: 'Tips for submitting a great application',
    href: `${PROJECT_GRANTS_URL}/#tips-application`
  },
  { text: 'FAQ', href: `${PROJECT_GRANTS_URL}/#faq` },
  { text: 'Apply', href: `${PROJECT_GRANTS_URL}/#apply` }
];
export const SIDEBAR_SMALL_GRANTS_LINKS: SidebarLink[] = [
  { text: 'Summary', href: `${SMALL_GRANTS_URL}/#description` },
  { text: 'Process', href: `${SMALL_GRANTS_URL}/#process` },
  { text: 'Requirements', href: `${SMALL_GRANTS_URL}/#requirements` },
  { text: 'Eligibility', href: `${SMALL_GRANTS_URL}/#eligibility` },
  { text: 'What is NOT eligible', href: `${SMALL_GRANTS_URL}/#what-is-not-eligible` },
  {
    text: 'Tips for submitting a great application',
    href: `${SMALL_GRANTS_URL}/#tips-application`
  },
  { text: 'FAQ', href: `${SMALL_GRANTS_URL}/#faq` },
  { text: 'Apply', href: `${SMALL_GRANTS_URL}/#apply` }
];

// apply forms
export const PROJECT_GRANTS_APPLY_URL = '/applicants/project-grants/apply';
export const OFFICE_HOURS_APPLY_URL = '/applicants/office-hours/apply';
export const SMALL_GRANTS_APPLY_URL = '/applicants/small-grants/apply';

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

// applicants tabs
export const APPLICANTS_TABS = ['Overview', 'Office Hours', 'Small Grants', 'Project Grants'];
export const APPLICANTS_TABS_MAP: TabsMap = {
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

// about tabs
export const ABOUT_TABS = ['What We Support', 'Who We Support', 'How We Support'];
export const ABOUT_TABS_MAP: TabsMap = {
  [ABOUT_URL]: 0,
  [WHO_WE_SUPPORT_URL]: 1,
  [HOW_WE_SUPPORT_URL]: 2
};

// nav
export const NAV_LINKS: NavLink[] = [
  { href: HOME_URL, text: 'Home' },
  { href: APPLICANTS_URL, text: 'For Applicants' },
  { href: ABOUT_URL, text: 'About ESP' },
  { href: ESP_BLOG_URL, text: 'Blog' }
];

// external links
export const ETHRESEARCH_URL = 'https://ethresear.ch/';

// api
export const API_DOWNLOAD_APPLICATION_URL = '/api/download-application';
export const API_NEWSLETTER_SIGNUP_URL = '/api/newsletter-signup';

// grants list
export const CURRENT_GRANTS_QUARTERS = ['3', '4'];

// proposal upload
export const MAX_PROPOSAL_FILE_SIZE = 2147483648;

// toast options
export const TOAST_OPTIONS: UseToastOptions = {
  position: 'top-right',
  duration: 5000,
  isClosable: true,
  containerStyle: {
    fontFamily: 'fonts.heading'
  }
};
