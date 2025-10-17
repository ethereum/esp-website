import { FC } from 'react';

import { BaseGrantForm } from './BaseGrantForm';
import {
  ContactInformationSection,
  ProjectOverviewSection,
  ProjectDetailsSection,
  AdditionalDetailsSection,
  FormActions,
  FormContainer
} from './sections';
import { DIRECT_GRANT_THANK_YOU_PAGE_URL } from '../../constants';
import { UploadFile } from './fields';
import { api } from './api';
import { FormConfig } from './schemas/BaseGrant';
import { DirectGrantSchema, DirectGrantData } from './schemas/DirectGrant';

export const DirectGrantForm: FC = () => {
  const directGrantFormConfig: FormConfig = {
    formId: 'direct-grant-form',
    submitApiEndpoint: 'direct-grant',
    thankYouPageUrl: DIRECT_GRANT_THANK_YOU_PAGE_URL,
    selectedItemIdField: 'selectedDirectGrantId',
    selectedItemDisplayText: ''
  };

  const mockSelectedItem = {
    Id: 'direct-grant',
    Name: 'Direct Grant',
    Description__c: 'Direct Grant Application'
  };

  return (
    <BaseGrantForm<DirectGrantData>
      config={directGrantFormConfig}
      schema={DirectGrantSchema}
      selectedItem={mockSelectedItem}
      onSubmit={api.directGrant.submit}
    >
      <FormContainer>
        <ContactInformationSection />

        {/* Disable file upload since we need it to be at the bottom of the form and not required */}
        <ProjectOverviewSection fields={{ fileUpload: false }} />

        <ProjectDetailsSection />

        <AdditionalDetailsSection
          fields={{
            referral: {
              label: 'Internal EF Contact',
              helpText:
                'Provide the name of the Ethereum Foundation team member or team who directed you to complete this application.'
            }
          }}
        />

        <UploadFile
          id='fileUpload'
          label='PDF Proposal'
          helpText='Attach a PDF proposal if you’d like to share additional details not covered in the application form.'
          dropzoneProps={{
            accept: ['application/pdf'],
            maxFiles: 1,
            maxSize: 4194304 // 4MB
          }}
          isRequired
        />

        <FormActions submitText='Submit Application' />
      </FormContainer>
    </BaseGrantForm>
  );
};
