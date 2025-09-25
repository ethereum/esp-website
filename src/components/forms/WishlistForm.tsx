import { FC } from 'react';

import { BaseGrantForm } from './BaseGrantForm';
import { WishlistSchema, WishlistItem, FormConfig } from './schemas/BaseGrant';
import { WISHLIST_THANK_YOU_PAGE_URL } from '../../constants';
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
    <BaseGrantForm
      config={wishlistFormConfig}
      schema={WishlistSchema}
      selectedItem={wishlistItem}
      onSubmit={api.wishlist.submit}
    />
  );
};
