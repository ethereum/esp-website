import { FC } from 'react';

import { BaseGrantForm } from './BaseGrantForm';
import { WishlistSchema, WishlistItem, WishlistData, FormConfig } from './schemas/BaseGrant';
import {
  ContactInformationSection,
  ProjectOverviewSection,
  ProjectDetailsSection,
  AdditionalDetailsSection,
  SelectedItemDisplay,
  FormActions,
  FormContainer
} from './sections';
import { WISHLIST_THANK_YOU_PAGE_URL } from '../../constants';
import { UploadFile } from './fields';
import { api } from './api';

interface WishlistFormProps {
  wishlistItem: WishlistItem;
}

const wishlistFormConfig: FormConfig = {
  includeProjectDetails: true,
  formId: 'wishlist-form',
  submitApiEndpoint: 'wishlist',
  thankYouPageUrl: WISHLIST_THANK_YOU_PAGE_URL,
  selectedItemIdField: 'selectedWishlistId',
  selectedItemDisplayText: 'Selected Wishlist'
};

export const WishlistForm: FC<WishlistFormProps> = ({ wishlistItem }) => {
  return (
    <BaseGrantForm<WishlistData>
      config={wishlistFormConfig}
      schema={WishlistSchema}
      selectedItem={wishlistItem}
      onSubmit={api.wishlist.submit}
      useDefaultLayout={false}
    >
      <FormContainer>
        <SelectedItemDisplay
          selectedItem={wishlistItem}
          displayText={wishlistFormConfig.selectedItemDisplayText}
        />

        <ContactInformationSection />

        <ProjectOverviewSection includeFileUpload={false} />

        <ProjectDetailsSection />

        <AdditionalDetailsSection />

        <UploadFile
          id='fileUpload'
          label='PDF Proposal'
          helpText='Attach a PDF proposal that fulfills the requirements. This upload field is positioned at the bottom of the form.'
          isRequired
          dropzoneProps={{
            accept: ['application/pdf'],
            maxFiles: 1,
            maxSize: 4194304 // 4MB
          }}
        />

        <FormActions submitText='Submit Application' />
      </FormContainer>
    </BaseGrantForm>
  );
};
