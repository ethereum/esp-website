import {
  AcademicGrantsFormData,
  DevconGrantsFormData,
  GranteeFinanceFormData
} from './../../types';
import { getGitHub, getWebsite } from '../../utils';

import { OfficeHoursFormData, ProjectGrantsFormData, SmallGrantsFormData } from '../../types';

import {
  API_ACADEMIC_GRANTS,
  API_DEVCON_GRANTS,
  API_GRANTEE_FINANCE_URLS,
  API_OFFICE_HOURS,
  API_PROJECT_GRANTS,
  API_SMALL_GRANTS_EVENT,
  API_SMALL_GRANTS_PROJECT
} from './constants';

const methodOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

export const api = {
  officeHours: {
    submit: (data: OfficeHoursFormData) => {
      const officeHoursRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify({
          ...data,
          // Company is a required field in SF, we're using the Name as default value if no company provided
          company: data.company === '' ? `${data.firstName} ${data.lastName}` : data.company,
          projectCategory: data.projectCategory.value,
          howDidYouHearAboutESP: data.howDidYouHearAboutESP.value,
          // Multipickist values (reasonForMeeting) in SF are stored in a string that separates each value by a semicolon
          reasonForMeeting: data.reasonForMeeting.join('; '),
          timezone: data.timezone.value
        })
      };

      return fetch(API_OFFICE_HOURS, officeHoursRequestOptions);
    }
  },
  projectGrants: {
    submit: (data: ProjectGrantsFormData) => {
      const projectGrantsRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify({
          ...data,
          // Company is a required field in SF, we're using the Name as default value if no company provided
          company: data.company === 'N/A' ? `${data.firstName} ${data.lastName}` : data.company,
          website: getWebsite(data.website),
          github: getGitHub(data.github),
          projectCategory: data.projectCategory.value,
          country: data.country.value,
          timezone: data.timezone.value,
          howDidYouHearAboutESP: data.howDidYouHearAboutESP.value
        })
      };

      return fetch(API_PROJECT_GRANTS, projectGrantsRequestOptions);
    }
  },
  smallGrants: {
    submit: (data: SmallGrantsFormData, isAProject: boolean) => {
      const smallGrantsRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify({
          ...data,
          // Company is a required field in SF, we're using the Name as default value if no company provided
          company: data.company === '' ? `${data.firstName} ${data.lastName}` : data.company,
          website: getWebsite(data.website),
          projectCategory: data.projectCategory.value,
          repeatApplicant: data.repeatApplicant === 'Yes' ? true : false,
          eventType: data.eventType.value,
          eventFormat: data.eventFormat.value
        })
      };

      return fetch(
        isAProject ? API_SMALL_GRANTS_PROJECT : API_SMALL_GRANTS_EVENT,
        smallGrantsRequestOptions
      );
    }
  },
  granteeFinance: {
    submit: (data: GranteeFinanceFormData, preference: string) => {
      const granteeFinanceRequestOptions: RequestInit = {
        ...methodOptions,
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          L2Payment: data.l2Payment === 'Yes' ? true : false
        })
      };

      return fetch(API_GRANTEE_FINANCE_URLS[preference], granteeFinanceRequestOptions);
    }
  },
  academicGrants: {
    submit: (data: AcademicGrantsFormData) => {
      const academicGrantsRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify({
          ...data,
          POCisAuthorisedSignatory: data.POCisAuthorisedSignatory === 'Yes' ? true : false,
          applyingAs: data.applyingAs.value,
          // Company is a required field in SF, we're using the Name as default value if no company provided
          company: data.company === 'N/A' ? `${data.firstName} ${data.lastName}` : data.company,
          country: data.country.value,
          timezone: data.timezone.value,
          projectCategory: data.projectCategory.value,
          howDidYouHearAboutGrantsWave: data.howDidYouHearAboutGrantsWave.value,
          wouldYouShareYourResearch: data.wouldYouShareYourResearch.value,
          repeatApplicant: data.repeatApplicant === 'Yes' ? true : false,
          canTheEFReachOut: data.canTheEFReachOut === 'Yes' ? true : false
        })
      };

      return fetch(API_ACADEMIC_GRANTS, academicGrantsRequestOptions);
    }
  },
  devconGrants: {
    submit: (data: DevconGrantsFormData) => {
      const devconGrantsRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify({
          ...data,
          // Company is a required field in SF, we're using the Name as default value if no company provided
          company: data.company === 'N/A' ? `${data.firstName} ${data.lastName}` : data.company,
          eventType: data.eventType.value,
          eventFormat: data.eventFormat.value,
          howDidYouHearAboutESP: data.howDidYouHearAboutESP.value
        })
      };

      return fetch(API_DEVCON_GRANTS, devconGrantsRequestOptions);
    }
  }
};
