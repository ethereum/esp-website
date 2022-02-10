import { OfficeHoursFormData } from '../../types';

export const api = {
  officeHours: {
    submit: (data: OfficeHoursFormData) => {
      const officeHoursRequestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          projectCategory: data.projectCategory.value,
          howDidYouHearAboutESP: data.howDidYouHearAboutESP.value,
          // TODO: enable reasonForMeeting field when available on SF's sandbox
          // Multipickist values (reasonForMeeting) in SF are stored in a string that separates each value by a semicolon
          // reasonForMeeting: data.reasonForMeeting.join(';'),
          timezone: data.timezone.value
          // TODO: add recordTypeFlag when defined
        })
      };

      return fetch('/api/office-hours', officeHoursRequestOptions).then(res => res);
    }
  }
};
