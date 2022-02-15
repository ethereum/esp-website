import { OfficeHoursFormData, ProjectGrantsFormData } from '../../types';

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
          // Multipickist values (reasonForMeeting) in SF are stored in a string that separates each value by a semicolon
          reasonForMeeting: data.reasonForMeeting.join(';'),
          timezone: data.timezone.value
          // TODO: add recordTypeFlag when defined
        })
      };

      return fetch('/api/office-hours', officeHoursRequestOptions).then(res => res);
    }
  },
  projectGrants: {
    submit: (data: ProjectGrantsFormData) => {
      const projectGrantsRequestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website: `https://${data.website}`,
          github: `https://github.com/${data.github}`,
          projectCategory: data.projectCategory.value,
          country: data.country.value,
          timezone: data.timezone.value,
          howDidYouHearAboutESP: data.howDidYouHearAboutESP.value
          // TODO: add recordTypeFlag when defined
        })
      };

      return fetch('/api/project-grants', projectGrantsRequestOptions).then(res => res);
    }
  }
};
