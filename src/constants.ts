import { TabsMap } from './types';

// about
export const ABOUT_URL = '/about';
export const WHAT_WE_SUPPORT_URL = '/about/what-we-support';

// applicants
export const APPLICANTS_URL = '/applicants';
export const APPLICANTS_PAGES_BASEPATH = '/applicants/';
export const OFFICE_HOURS_URL = '/applicants/office-hours';
export const SMALL_GRANTS_URL = '/applicants/small-grants';
export const PROJECT_GRANTS_URL = '/applicants/project-grants';

// tabs
export const APPLICANTS_TABS = ['Overview', 'Office Hours', 'Small Grants', 'Project Grants'];
export const TABS_MAP: TabsMap = {
  [APPLICANTS_URL]: 0,
  [OFFICE_HOURS_URL]: 1,
  [SMALL_GRANTS_URL]: 2,
  [PROJECT_GRANTS_URL]: 3
};
