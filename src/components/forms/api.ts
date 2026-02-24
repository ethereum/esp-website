import { GranteeFinanceFormData, NewsletterFormData } from './../../types';

import { createFormData } from '../../utils';

import {
  API_GRANTEE_FINANCE,
  API_NEWSLETTER_SIGNUP_URL,
  API_OFFICE_HOURS,
  API_WISHLIST,
  API_RFP,
  API_DIRECT_GRANT,
  API_CSAT
} from './constants';

import type { WishlistData } from './schemas/Wishlist';
import type { RFPData } from './schemas/RFP';
import type { DirectGrantData } from './schemas/DirectGrant';
import type { OfficeHoursData } from './schemas/OfficeHours';
import type { CSATData } from './schemas/CSAT';

const methodOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

export const api = {
  officeHours: {
    submit: (data: OfficeHoursData) => {
      const formData = createFormData(data);

      const officeHoursRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      return fetch(API_OFFICE_HOURS, officeHoursRequestOptions);
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
  wishlist: {
    submit: (data: WishlistData) => {
      const formData = createFormData(data);

      const wishlistRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      return fetch(API_WISHLIST, wishlistRequestOptions);
    }
  },
  rfp: {
    submit: (data: RFPData) => {
      const formData = createFormData(data);

      const rfpRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      return fetch(API_RFP, rfpRequestOptions);
    }
  },
  directGrant: {
    submit: (data: DirectGrantData) => {
      const formData = createFormData(data);

      const directGrantRequestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      return fetch(API_DIRECT_GRANT, directGrantRequestOptions);
    }
  },
  csat: {
    submit: (data: CSATData) => {
      const csatRequestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify(data)
      };

      return fetch(API_CSAT, csatRequestOptions);
    }
  },
  granteeFinance: {
    submit: (data: GranteeFinanceFormData) => {
      const granteeFinanceRequestOptions: RequestInit = {
        ...methodOptions,
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          isCentralizedExchange: data.isCentralizedExchange === 'Yes'
        })
      };

      return fetch(API_GRANTEE_FINANCE, granteeFinanceRequestOptions);
    }
  }
};
