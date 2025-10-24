import { FC } from 'react';

import { BaseGrantForm } from './BaseGrantForm';
import { AdditionalDetailsSection, ContactInformationSection } from './sections';
import { OfficeHoursRequestSection } from './sections/OfficeHoursRequestSection';
import { FormActions, FormContainer } from './sections/FormBlocks';
import { OFFICE_HOURS_THANK_YOU_PAGE_URL } from '../../constants';
import { api } from './api';
import { FormConfig } from './schemas/BaseGrant';
import { OfficeHoursSchema, OfficeHoursData } from './schemas/OfficeHours';

export const OfficeHoursForm: FC = () => {
  const officeHoursFormConfig: FormConfig = {
    formId: 'office-hours-form',
    submitApiEndpoint: 'direct-grant', // This will be ignored, we're using a custom submit function
    thankYouPageUrl: OFFICE_HOURS_THANK_YOU_PAGE_URL,
    selectedItemIdField: 'selectedDirectGrantId', // Dummy value, not used
    selectedItemDisplayText: ''
  };

  const mockSelectedItem = {
    Id: 'office-hours',
    Name: 'Office Hours',
    Description__c: 'Office Hours Application'
  };

  const defaultValues: Partial<OfficeHoursData> = {
    officeHoursRequest: 'Project Feedback',
    profileType: 'Individual',
    repeatApplicant: false,
    opportunityOutreachConsent: true
  };

  return (
    <BaseGrantForm<OfficeHoursData>
      config={officeHoursFormConfig}
      schema={OfficeHoursSchema}
      selectedItem={mockSelectedItem}
      onSubmit={api.officeHours.submit}
      defaultValues={defaultValues}
    >
      <FormContainer>
        <ContactInformationSection
          fields={{
            company: { isRequired: false },
            website: false
          }}
        />

        <OfficeHoursRequestSection />

        <AdditionalDetailsSection
          fields={{
            referral: false,
            additionalInfo: false
          }}
        />

        <FormActions submitText='Submit Application' />
      </FormContainer>
    </BaseGrantForm>
  );
};
