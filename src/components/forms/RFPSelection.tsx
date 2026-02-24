import { FC } from 'react';

import { GrantInitiativeSelection } from './GrantInitiativeSelection';
import { RFPItem } from './schemas/RFP';
import { GrantInitiative } from '../../types';

const getRFPUrl = (item: GrantInitiative) =>
  `/applicants/rfp/${item.Custom_URL_Slug__c || item.Id}`;

interface RFPSelectionProps {
  rfpItems: RFPItem[];
  paramTags?: string[];
}

export const RFPSelection: FC<RFPSelectionProps> = ({ rfpItems, paramTags }) => {
  return (
    <GrantInitiativeSelection
      items={rfpItems as GrantInitiative[]}
      getItemUrl={getRFPUrl}
      paramTags={paramTags}
      emptyStateTitle="No RFP Items Available"
      emptyStateMessage="There are currently no active Request for Proposals available for application."
    />
  );
};
