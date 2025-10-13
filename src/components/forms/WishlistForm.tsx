import { FC } from 'react';

import { BaseGrantForm } from './BaseGrantForm';
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
import { FormConfig } from './schemas/BaseGrant';
import { WishlistSchema, WishlistItem, WishlistData } from './schemas/Wishlist';

interface WishlistFormProps {
  wishlistItem: WishlistItem;
}

const wishlistFormConfig: FormConfig = {
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
    >
      <FormContainer>
        <SelectedItemDisplay
          selectedItem={wishlistItem}
          displayText={wishlistFormConfig.selectedItemDisplayText}
        />

        <ContactInformationSection />

        {/* Disable file upload since we need it to be at the bottom of the form and not required */}
        <ProjectOverviewSection fields={{ fileUpload: false }} />

        <ProjectDetailsSection />

        <AdditionalDetailsSection />

        <UploadFile
          id='fileUpload'
          label='PDF Proposal'
          helpText='Attach a PDF proposal that fulfills the requirements. This upload field is positioned at the bottom of the form.'
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
