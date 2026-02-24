import { FC } from 'react';

import { GrantInitiativeSelection } from './GrantInitiativeSelection';
import { WishlistItem } from './schemas/Wishlist';
import { GrantInitiative } from '../../types';

const getWishlistUrl = (item: GrantInitiative) =>
  `/applicants/wishlist/${item.Custom_URL_Slug__c || item.Id}`;

interface WishlistSelectionProps {
  wishlistItems: WishlistItem[];
  paramTags?: string[];
}

export const WishlistSelection: FC<WishlistSelectionProps> = ({ wishlistItems, paramTags }) => {
  return (
    <GrantInitiativeSelection
      items={wishlistItems as GrantInitiative[]}
      getItemUrl={getWishlistUrl}
      paramTags={paramTags}
      emptyStateTitle="No Wishlist Available"
      emptyStateMessage="There are currently no active wishlists available for application."
    />
  );
};
