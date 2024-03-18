import {
  DevconGrantsFormData,
  EcodevGrantsFormData,
  GranteeFinanceFormData,
  NewsletterFormData,
  OfficeHoursFormData,
  PSESponsorshipsFormData,
  ProjectGrantsFormData,
  SmallGrantsFormData
} from './../../types';

import { createFormData, getWebsite } from '../../utils';

import {
  API_DEVCON_GRANTS,
  API_ECODEV_GRANTS,
  API_GRANTEE_FINANCE,
  API_NEWSLETTER_SIGNUP_URL,
  API_OFFICE_HOURS,
  API_PROJECT_GRANTS,
  API_PSE_SPONSORSHIPS,
  API_SMALL_GRANTS_EVENT,
  API_SMALL_GRANTS_PROJECT,
  API_DATA_CHALLENGE_GRANTS
} from './constants';

import type { ZKGrantsData } from './schemas/ZKGrants';
import type { DataChallengeData } from './schemas/DataChallenge4844';

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
          country: data.country.value,
          timezone: data.timezone.value
        })
      };

      return fetch(API_OFFICE_HOURS, officeHoursRequestOptions);
    }
  },
  projectGrants: {
    submit: (data: ProjectGrantsFormData) => {
      const curatedData: { [key: string]: any } = {
        ...data,
        // Company is a required field in SF, we're using the Name as default value if no company provided
        company: data.company === 'N/A' ? `${data.firstName} ${data.lastName}` : data.company,
        website: getWebsite(data.website),
        projectCategory: data.projectCategory.value,
        country: data.country.value,
        timezone: data.timezone.value,
        howDidYouHearAboutESP: data.howDidYouHearAboutESP.value,
        repeatApplicant: data.repeatApplicant === 'Yes'
      };

      const formData = createFormData(curatedData);

      const projectGrantsRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
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
          country: data.country.value,
          website: getWebsite(data.website),
          projectCategory: data.projectCategory.value,
          repeatApplicant: data.repeatApplicant === 'Yes',
          eventType: data.eventType.value,
          eventFormat: data.eventFormat.value,
          howDidYouHearAboutESP: data.howDidYouHearAboutESP.value
        })
      };

      return fetch(
        isAProject ? API_SMALL_GRANTS_PROJECT : API_SMALL_GRANTS_EVENT,
        smallGrantsRequestOptions
      );
    }
  },
  granteeFinance: {
    submit: (data: GranteeFinanceFormData) => {
      const granteeFinanceRequestOptions: RequestInit = {
        ...methodOptions,
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          l2Payment: data.l2Payment === 'Yes'
        })
      };

      return fetch(API_GRANTEE_FINANCE, granteeFinanceRequestOptions);
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
  },
  ecodevGrants: {
    submit: (data: EcodevGrantsFormData) => {
      const curatedData: { [key: string]: any } = {
        ...data,
        // Company is a required field in SF, we're using the Name as default value if no company provided
        company: data.company === 'N/A' ? `${data.firstName} ${data.lastName}` : data.company,
        website: getWebsite(data.website),
        projectCategory: data.projectCategory.value,
        country: data.country.value,
        timezone: data.timezone.value,
        repeatApplicant: data.repeatApplicant === 'Yes'
      };

      const formData = createFormData(curatedData);

      const ecodevGrantsRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      return fetch(API_ECODEV_GRANTS, ecodevGrantsRequestOptions);
    }
  },
  pseSponsorships: {
    submit: (data: PSESponsorshipsFormData) => {
      const pseSponsorshipsRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify({
          ...data,
          // Company is a required field in SF, we're using the Name as default value if no company provided
          company: data.company === '' ? `${data.firstName} ${data.lastName}` : data.company,
          country: data.country.value,
          website: getWebsite(data.website),
          eventType: data.eventType.value,
          eventFormat: data.eventFormat.value
        })
      };

      return fetch(API_PSE_SPONSORSHIPS, pseSponsorshipsRequestOptions);
    }
  },
  dataChallenge: {
    submit: (data: DataChallengeData) => {
      const dataRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify(data)
      };

      return fetch(API_DATA_CHALLENGE_GRANTS, dataRequestOptions);
    }
  },
  newsletter: {
    submit: (data: NewsletterFormData) => {
      const newsletterRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify({
          ...data
        })
      };

      return fetch(API_NEWSLETTER_SIGNUP_URL, newsletterRequestOptions);
    }
  }
};
