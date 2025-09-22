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
  API_PECTRA_PGR,
  API_PROJECT_GRANTS,
  API_PSE_SPONSORSHIPS,
  API_SMALL_GRANTS_EVENT,
  API_SMALL_GRANTS_PROJECT,
  API_EPF_APPLICATION,
  API_PSE_APPLICATION,
  API_ACADEMIC_GRANTS,
  API_TEN_YEAR_ANNIVERSARY,
  API_WISHLIST,
  API_RFP
} from './constants';

import type { EPFData } from './schemas/EPFApplication';
import type { PSEData } from './schemas/PSEGrants';
import type { AcademicGrantsData } from './schemas/AcademicGrants';
import type { PectraPGRData } from './schemas/PectraPGR';
import type { DestinoDevconnectData } from './schemas/DestinoDevconnect';
import type { TenYearAnniversaryData } from './schemas/TenYearAnniversary';
import type { WishlistData } from './schemas/Wishlist';
import type { RFPData } from './schemas/RFP';

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
        fiatCurrency: data.fiatCurrency.value,
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
      const curatedData: { [key: string]: any } = {
        ...data,
        // Company is a required field in SF, we're using the Name as default value if no company provided
        company: data.company === '' ? `${data.firstName} ${data.lastName}` : data.company,
        country: data.country.value,
        fiatCurrency: data.fiatCurrency.value,
        website: getWebsite(data.website),
        projectCategory: data.projectCategory.value,
        repeatApplicant: data.repeatApplicant === 'Yes',
        eventType: data.eventType.value,
        eventFormat: data.eventFormat.value,
        howDidYouHearAboutESP: data.howDidYouHearAboutESP.value
      };

      const formData = createFormData(curatedData);

      const smallGrantsRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
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
          l2Payment: data.l2Payment === 'Yes',
          l2Network: data.l2Network ?? '',
          isCentralizedExchange: data.isCentralizedExchange === 'Yes'
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
          company: data.company === 'N/A' ? `${data.firstName} ${data.lastName}` : data.company
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
          company: data.company ? data.company : `${data.firstName} ${data.lastName}`,
          category: data.category.value,
          country: data.country.value,
          website: getWebsite(data.website),
          // `eventType` and `eventFormat` are available for 'Community Event' category only
          eventType: data.eventType?.value ?? '',
          eventFormat: data.eventFormat?.value ?? ''
        })
      };

      return fetch(API_PSE_SPONSORSHIPS, pseSponsorshipsRequestOptions);
    }
  },
  pseGrants: {
    submit: (data: PSEData) => {
      const pseGrantsRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify(data)
      };

      return fetch(API_PSE_APPLICATION, pseGrantsRequestOptions);
    }
  },
  epfApplication: {
    submit: (data: EPFData) => {
      const epfApplicationRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify(data)
      };

      return fetch(API_EPF_APPLICATION, epfApplicationRequestOptions);
    }
  },
  academicGrants: {
    submit: (data: AcademicGrantsData) => {
      const formData = createFormData(data);

      const dataRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      return fetch(API_ACADEMIC_GRANTS, dataRequestOptions);
    }
  },
  pectraPGR: {
    submit: (data: PectraPGRData) => {
      const curatedData: { [key: string]: any } = {
        ...data,
        company:
          data.individualOrTeam === 'Individual' && data.company === ''
            ? `${data.firstName} ${data.lastName}`
            : data.company
      };
      const formData = createFormData(curatedData);

      const dataRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      return fetch(API_PECTRA_PGR, dataRequestOptions);
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
  },
  destinoDevconnect: {
    submit: async (data: DestinoDevconnectData) => {
      return fetch('/api/destino-devconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }
  },
  tenYearAnniversary: {
    submit: async (data: TenYearAnniversaryData) => {
      return fetch(API_TEN_YEAR_ANNIVERSARY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }
  },
  wishlist: {
    submit: (data: WishlistData) => {
      const wishlistRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify({
          ...data,
          company: data.company || `${data.firstName} ${data.lastName}`,
          repeatApplicant: data.repeatApplicant
        })
      };

      return fetch(API_WISHLIST, wishlistRequestOptions);
    }
  },
  rfp: {
    submit: (data: RFPData) => {
      const curatedData: { [key: string]: any } = {
        ...data,
        company: data.company || `${data.firstName} ${data.lastName}`,
        repeatApplicant: data.repeatApplicant
      };

      const formData = createFormData(curatedData);

      const rfpRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      return fetch(API_RFP, rfpRequestOptions);
    }
  }
};
