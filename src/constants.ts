import { UseToastOptions } from '@chakra-ui/react';
import { NavLink, SidebarLink, TabsMap } from './types';

// metadata
export const HEAD_TITLE = 'Ethereum Foundation ESP';
export const SITE_URL = 'https://esp.ethereum.foundation';

// home
export const HOME_URL = '/';

// about
export const ABOUT_URL = '/about';
export const WHO_WE_SUPPORT_URL = '/about/who-we-support';
export const HOW_WE_SUPPORT_URL = '/about/how-we-support';
export const SIDEBAR_ABOUT_LINKS: SidebarLink[] = [
  { text: 'Overview', href: `${ABOUT_URL}/#overview` },
  { text: 'Grant Management', href: `${ABOUT_URL}/#grant-management` },
  { text: 'Funding Coordination', href: `${ABOUT_URL}/#funding-coordination` }
];

// applicants
export const APPLICANTS_URL = '/applicants';
export const SIDEBAR_APPLICANTS_LINKS: SidebarLink[] = [
  { text: 'Mission and Scope', href: `${APPLICANTS_URL}/#mission-and-scope` },
  { text: 'Process', href: `${APPLICANTS_URL}/#process` },
  { text: 'Selection criteria', href: `${APPLICANTS_URL}/#selection-criteria` },
  { text: 'FAQ', href: `${APPLICANTS_URL}/#faq` }
];

export const OFFICE_HOURS_URL = '/applicants/office-hours';
export const SIDEBAR_OFFICE_HOURS_LINKS: SidebarLink[] = [
  { text: 'Summary', href: `${OFFICE_HOURS_URL}/#description` },
  { text: 'What we offer', href: `${OFFICE_HOURS_URL}/#what-we-offer` },
  { text: "What we DON'T offer", href: `${OFFICE_HOURS_URL}/#what-we-dont-offer` },
  { text: 'Eligibility', href: `${OFFICE_HOURS_URL}/#eligibility` },
  { text: 'Process', href: `${OFFICE_HOURS_URL}/#process` },
  { text: 'Before submitting', href: `${OFFICE_HOURS_URL}/#before-submitting` },
  { text: 'FAQ', href: `${OFFICE_HOURS_URL}/#faq` },
  { text: 'Apply', href: `${OFFICE_HOURS_URL}/#apply` }
];

export const WISHLIST_URL = '/applicants/wishlist';
export const SIDEBAR_WISHLIST_LINKS: SidebarLink[] = [
  { text: 'Summary', href: `${WISHLIST_URL}/#description` },
  // { text: 'What are wishlist items', href: `${WISHLIST_URL}/#what-are-wishlist-items` },
  { text: 'Apply', href: `${WISHLIST_URL}/#apply` }
];

export const RFP_URL = '/applicants/rfp';
export const SIDEBAR_RFP_LINKS: SidebarLink[] = [
  { text: 'Summary', href: `${RFP_URL}/#description` },
  // { text: 'What are RFPs', href: `${RFP_URL}/#what-are-rfps` },
  { text: 'Apply', href: `${RFP_URL}/#apply` }
];

// rounds
export const ROUNDS_URL = '/rounds';

export const ACADEMIC_GRANTS_URL = '/academic-grants';
export const SIDEBAR_ACADEMIC_GRANTS_LINKS: SidebarLink[] = [
  { text: 'Summary', href: `${ACADEMIC_GRANTS_URL}/#introduction` },
  { text: 'Submit proposal', href: `${ACADEMIC_GRANTS_URL}/#submit-proposal` },
  { text: 'Requirements', href: `${ACADEMIC_GRANTS_URL}/#requirements` },
  { text: 'Deadline', href: `${ACADEMIC_GRANTS_URL}/#deadline` },
  { text: 'Eligibility criteria', href: `${ACADEMIC_GRANTS_URL}/#eligibility-criteria` },
  { text: 'What is not eligible', href: `${ACADEMIC_GRANTS_URL}/#not-eligible` },
  { text: 'Selection criteria', href: `${ACADEMIC_GRANTS_URL}/#selection-criteria` },
  { text: 'Wishlist', href: `${ACADEMIC_GRANTS_URL}/#wishlist` },
  { text: 'Support', href: `${ACADEMIC_GRANTS_URL}/#support` },
  { text: 'FAQ', href: `${ACADEMIC_GRANTS_URL}/#faq` }
];

// apply forms
export const OFFICE_HOURS_APPLY_URL = '/applicants/office-hours/apply';
export const WISHLIST_APPLY_URL = '/applicants/wishlist/apply';
export const RFP_APPLY_URL = '/applicants/rfp/apply';

// grantee finance
export const GRANTEE_FINANCE_URL = '/applicants/grantee-finance';
export const GRANTEE_FINANCE_THANK_YOU_PAGE_URL = '/applicants/grantee-finance/thank-you';

// thank you pages
export const OFFICE_HOURS_THANK_YOU_PAGE_URL = '/applicants/office-hours/thank-you';
export const WISHLIST_THANK_YOU_PAGE_URL = '/applicants/wishlist/thank-you';
export const RFP_THANK_YOU_PAGE_URL = '/applicants/rfp/thank-you';
export const DIRECT_GRANT_THANK_YOU_PAGE_URL = '/form-direct/apply/thank-you';

// ethereum ecosystem
export const ETHEREUM_ORG_URL = 'https://ethereum.org/';
export const ETHEREUM_COOKIE_POLICY_URL = 'https://ethereum.org/en/cookie-policy/';
export const ETHEREUM_PRIVACY_POLICY_URL = 'https://ethereum.org/en/privacy-policy/';
export const ETHEREUM_TERMS_OF_USE_URL = 'https://ethereum.org/en/terms-of-use/';
export const ETHEREUM_GITHUB_URL = 'https://github.com/ethereum';
export const ETHEREUM_JOBS_URL = 'https://ethereum.org/en/community/get-involved/#ethereum-jobs/';
export const ETHEREUM_COMMUNITY_URL = 'https://ethereum.org/en/community/';
export const ETHEREUM_BROAD_ECOSYSTEM_URL =
  'https://ethereum.org/en/community/grants/#broad-ethereum-ecosystem';
export const ETHEREUM_GRANTS_URL = 'https://ethereum.org/en/community/grants/';

// EF
export const EF_PHILOSOPHY_URL = 'https://ethereum.foundation/philosophy/';
export const EF_JOBS_URL = 'https://jobs.lever.co/ethereumfoundation';

// ESP external links
export const ESP_BLOG_URL = 'https://blog.ethereum.org/category/ecosystem-support-program/';
export const ESP_TWITTER_URL = 'https://twitter.com/EF_ESP';
export const ESP_FARCASTER_URL = 'https://farcaster.xyz/ef-esp';
export const ESP_LENS_URL = 'https://hey.xyz/u/ef_esp';
export const ESP_BLUESKY_URL = 'https://bsky.app/profile/ef-esp.bsky.social';
export const ESP_EMAIL_ADDRESS = 'esp@ethereum.org';
export const ACADEMIC_GRANTS_EMAIL_ADDRESS = 'academic-grants@ethereum.org';
export const GRANTS_EMAIL_ADDRESS = 'grant-rounds@ethereum.org';
export const FOUNDER_SUCCESS_URL = 'https://ethereum.org/founders/';
export const ENTERPRISE_ACCELERATION_URL = 'https://institutions.ethereum.org/';
export const ETHEREUM_EVERYWHERE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeA-W8iy2PJxrY3TD4lMYXyky_wLd4QB_7NRwqSxCd0e19MUg/viewform';
export const FUNDING_COORDINATION_EMAIL = 'vinay.vasanji@ethereum.org';
export const ARGOT_COLLECTIVE_URL = 'https://www.argot.org/';
export const REMIX_LABS_URL = 'https://remix-project.org/';
export const POWDR_LABS_URL = 'https://www.powdr.org/';

// applicants tabs
export const APPLICANTS_TABS = ['Overview', 'Office Hours', 'Wishlist', 'RFPs'];
export const APPLICANTS_TABS_MAP: TabsMap = {
  [APPLICANTS_URL]: 0,
  [OFFICE_HOURS_URL]: 1,
  [OFFICE_HOURS_APPLY_URL]: 1,
  [OFFICE_HOURS_THANK_YOU_PAGE_URL]: 1,
  [WISHLIST_URL]: 2,
  [WISHLIST_APPLY_URL]: 2,
  [WISHLIST_THANK_YOU_PAGE_URL]: 2,
  [RFP_URL]: 3,
  [RFP_APPLY_URL]: 3,
  [RFP_THANK_YOU_PAGE_URL]: 3
};

// about tabs
export const ABOUT_TABS = ['What We Support'];
export const ABOUT_TABS_MAP: TabsMap = {
  [ABOUT_URL]: 0
};

// nav
export const NAV_LINKS: NavLink[] = [
  { href: HOME_URL, text: 'Home' },
  { href: APPLICANTS_URL, text: 'How to Apply' },
  { href: ABOUT_URL, text: 'About ESP' },
  { href: ESP_BLOG_URL, text: 'Blog' }
];

// external links
export const ETHRESEARCH_URL = 'https://ethresear.ch/';
export const DEVCON_URL = 'https://devcon.org/';
export const HCAPTCHA_VERIFY_URL = 'https://hcaptcha.com/siteverify';

// api
export const DOWNLOAD_APPLICATION_URL = '/projectGrantsApplication.docx';

// form validation
export const MAX_TEXT_LENGTH = 255;
export const MAX_TEXT_AREA_LENGTH = 2000;
export const MIN_TEXT_AREA_LENGTH = 500;
// Todo: get clarity from Vanessa here
export const CUSTOM_MIN_TEXT_AREA_LENGTH = 10;

// proposal upload file size limit (4mb)
export const MAX_PROPOSAL_FILE_SIZE = 4194304;
export const MAX_PROPOSAL_FILE_COUNT = 5;

// wishlist upload file size limit (4mb)
export const MAX_WISHLIST_FILE_SIZE = 4194304;

// toast options
export const TOAST_OPTIONS: UseToastOptions = {
  position: 'top-right',
  duration: 5000,
  isClosable: true,
  containerStyle: {
    fontFamily: 'fonts.heading'
  }
};

// preview image
export const HOMEPAGE_HERO_MOBILE_URL =
  'https://esp.ethereum.foundation/images/homepage-hero-mobile.png';

export const OPEN_SOURCE_LICENSE_OPTIONS = [
  { value: 'MIT', label: 'MIT' },
  { value: 'Apache-2.0', label: 'Apache-2.0' },
  { value: 'BSD Licenses', label: 'BSD Licenses' },
  { value: 'ISC License', label: 'ISC License' },
  { value: 'BSL-1.0', label: 'BSL-1.0' },
  { value: 'GPL-3.0', label: 'GPL-3.0' },
  { value: 'GPL-2.0', label: 'GPL-2.0' },
  { value: 'AGPL-3.0', label: 'AGPL-3.0' },
  { value: 'Unlicense', label: 'Unlicense' },
  { value: 'CC0-1.0', label: 'CC0-1.0' },
  { value: 'Other', label: 'Other' },
  { value: 'N/A', label: 'N/A' }
];
