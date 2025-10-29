import { FC } from 'react';

import { BaseGrantForm } from './BaseGrantForm';
import { RFP_THANK_YOU_PAGE_URL } from '../../constants';
import { api } from './api';
import { FormConfig } from './schemas/BaseGrant';
import { RFPSchema, RFPItem, RFPData } from './schemas/RFP';
import {
  ContactInformationSection,
  FormContainer,
  ProjectOverviewSection,
  SelectedItemDisplay,
  AdditionalDetailsSection,
  FormActions
} from './sections';

interface RFPFormProps {
  rfpItem: RFPItem;
}

const rfpFormConfig: FormConfig = {
  formId: 'rfp-form',
  submitApiEndpoint: 'rfp',
  thankYouPageUrl: RFP_THANK_YOU_PAGE_URL,
  selectedItemIdField: 'selectedRFPId',
  selectedItemDisplayText: 'Selected RFP'
};

export const RFPForm: FC<RFPFormProps> = ({ rfpItem }) => {
  return (
    <BaseGrantForm<RFPData>
      config={rfpFormConfig}
      schema={RFPSchema}
      selectedItem={rfpItem}
      onSubmit={api.rfp.submit}
    >
      <FormContainer>
        <SelectedItemDisplay
          selectedItem={rfpItem}
          displayText={rfpFormConfig.selectedItemDisplayText}
        />

        <ContactInformationSection fields={{ applicantProfile: false }} />

        <ProjectOverviewSection />

        <AdditionalDetailsSection 
          fields={{
            referral: {
              isRequired: false
            }
          }}
        />

        <FormActions submitText='Submit Application' />
      </FormContainer>
    </BaseGrantForm>
  );
};
