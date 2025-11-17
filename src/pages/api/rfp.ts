import type { NextApiRequest, NextApiResponse } from 'next';

import { multipartyParse } from '../../middlewares/multipartyParse';
import { sanitizeFields } from '../../middlewares/sanitizeFields';
import { verifyCaptcha } from '../../middlewares/verifyCaptcha';
import { MAX_WISHLIST_FILE_SIZE } from '../../constants';
import { RFPSchema } from '../../components/forms/schemas/RFP';
import { createSalesforceRecord, uploadFileToSalesforce, generateCSATToken } from '../../lib/sf';
import { mapFormDataToSalesforce } from '../../lib/sf-field-mappings';
import type { File } from 'formidable';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fields = { ...req.fields, ...req.files };

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // validate fields against the schema
  const result = RFPSchema.safeParse(fields);
  if (!result.success) {
    const formatted = result.error.format();
    console.error(formatted);

    res.status(500).end();
    return;
  }

  try {
    const applicationData = mapFormDataToSalesforce(result.data, 'rfp');

    const salesforceResult = await createSalesforceRecord('Application__c', applicationData);

    // Handle file upload if present
    if (result.data.fileUpload) {
      const uploadProposal = result.data.fileUpload as File;

      // Validate file object has required properties
      if (!uploadProposal.filepath || !uploadProposal.originalFilename) {
        console.error('Invalid file object:', uploadProposal);
        res.status(400).json({ error: 'Invalid file upload' });
        return;
      }

      try {
        await uploadFileToSalesforce(
          uploadProposal,
          salesforceResult.id,
          '[PROPOSAL]',
          result.data.projectName
        );
        console.log('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading proposal:', error);
        res.status(500).json({ error: 'Failed to upload proposal' });
        return;
      }
    }

    console.log('RFP application submitted:', {
      selectedRFPId: result.data.selectedRFPId,
      projectName: result.data.projectName,
      applicant: `${result.data.firstName} ${result.data.lastName}`,
      email: result.data.email,
      salesforceId: salesforceResult.id
    });

    const csatToken = generateCSATToken(salesforceResult.id);

    res.status(200).json({
      success: true,
      message: 'RFP application submitted successfully',
      applicationId: salesforceResult.id,
      csatToken
    });
  } catch (error) {
    console.error('Error submitting RFP application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default multipartyParse(sanitizeFields(verifyCaptcha(handler)), {
  maxFileSize: MAX_WISHLIST_FILE_SIZE
});
