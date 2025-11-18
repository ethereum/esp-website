import type { NextApiRequest, NextApiResponse } from 'next';
import type { File } from 'formidable';

import { multipartyParse } from '../../middlewares/multipartyParse';
import { sanitizeFields } from '../../middlewares/sanitizeFields';
import { verifyCaptcha } from '../../middlewares/verifyCaptcha';
import { MAX_WISHLIST_FILE_SIZE } from '../../constants';
import { OfficeHoursSchema } from '../../components/forms/schemas/OfficeHours';
import { createSalesforceRecord, uploadFileToSalesforce, generateCSATToken } from '../../lib/sf';
import { mapFormDataToSalesforce } from '../../lib/sf-field-mappings';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fields = { ...req.fields, ...req.files };

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate fields against the schema
  const result = OfficeHoursSchema.safeParse(fields);
  if (!result.success) {
    const formatted = result.error.format();
    console.error('Validation error:', formatted);

    res.status(400).json({ error: 'Validation failed', details: formatted });
    return;
  }

  try {
    // Get base mapped data
    const baseApplicationData = mapFormDataToSalesforce(result.data, 'officeHours');

    // Apply Office Hours-specific logic
    const applicationData: Record<string, any> = { ...baseApplicationData };

    // Handle Name field logic
    if (result.data.officeHoursRequest === 'Advice') {
      // For Advice requests, Name is set to "FirstName, LastName"
      if (result.data.firstName && result.data.lastName) {
        applicationData.Name = `${result.data.firstName}, ${result.data.lastName}`;
      }
    } else if (result.data.officeHoursRequest === 'Project Feedback') {
      // For Project Feedback, use projectName (already mapped, but ensure it's set)
      if (result.data.projectName) {
        applicationData.Name = result.data.projectName;
      }
    }

    // Remove Project Feedback fields if request type is Advice
    if (result.data.officeHoursRequest === 'Advice') {
      delete applicationData.Application_ProjectDescription__c;
      delete applicationData.Application_ProjectRepo__c;
      delete applicationData.Application_Domain__c;
      delete applicationData.Application_AdditionalInformation__c;
    }

    // Handle company fallback: use 'N/A' instead of firstName + lastName
    // Override the default company fallback logic from mapFormDataToSalesforce
    if (!result.data.company || result.data.company === '') {
      applicationData.Application_Company__c = 'N/A';
    }

    const salesforceResult = await createSalesforceRecord('Application__c', applicationData);

    // Handle file upload if present (only for Project Feedback)
    if (
      result.data.officeHoursRequest === 'Project Feedback' &&
      'fileUpload' in result.data &&
      result.data.fileUpload
    ) {
      const uploadFile = result.data.fileUpload as File;

      // Validate file object has required properties
      if (!uploadFile.filepath || !uploadFile.originalFilename) {
        console.error('Invalid file object:', uploadFile);
        res.status(400).json({ error: 'Invalid file upload' });
        return;
      }

      try {
        await uploadFileToSalesforce(
          uploadFile,
          salesforceResult.id,
          '[PROPOSAL]',
          result.data.projectName
        );
        console.log('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
        return;
      }
    }

    console.log('Office Hours application submitted:', {
      officeHoursRequest: result.data.officeHoursRequest,
      applicant: `${result.data.firstName} ${result.data.lastName}`,
      email: result.data.email,
      salesforceId: salesforceResult.id
    });

    const csatToken = generateCSATToken(salesforceResult.id);

    res.status(200).json({
      success: true,
      message: 'Office Hours application submitted successfully',
      applicationId: salesforceResult.id,
      csatToken
    });
  } catch (error) {
    console.error('Error submitting Office Hours application:', error);
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
