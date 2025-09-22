import { FC } from 'react';

import { BaseGrantForm } from './BaseGrantForm';
import { RFPSchema, RFPData, RFPItem, FormConfig } from './schemas/BaseGrant';
import { RFP_THANK_YOU_PAGE_URL } from '../../constants';
import { api } from './api';

interface RFPFormProps {
  rfpItem: RFPItem;
}

const rfpFormConfig: FormConfig = {
  includeProjectDetails: false,
  formId: 'rfp-form',
  submitApiEndpoint: 'rfp',
  thankYouPageUrl: RFP_THANK_YOU_PAGE_URL,
  selectedItemIdField: 'selectedRFPId',
  selectedItemDisplayText: 'Selected RFP'
};

export const RFPForm: FC<RFPFormProps> = ({ rfpItem }) => {
  return (
    <BaseGrantForm
      config={rfpFormConfig}
      schema={RFPSchema}
      selectedItem={rfpItem}
      onSubmit={api.rfp.submit}
    />
  );
};
