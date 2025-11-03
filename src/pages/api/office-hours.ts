import type { NextApiRequest, NextApiResponse } from 'next';
import type { File } from 'formidable';

import { multipartyParse } from '../../middlewares/multipartyParse';
import { sanitizeFields } from '../../middlewares/sanitizeFields';
import { verifyCaptcha } from '../../middlewares/verifyCaptcha';
import { MAX_WISHLIST_FILE_SIZE } from '../../constants';
import { OfficeHoursSchema } from '../../components/forms/schemas/OfficeHours';
import { createSalesforceRecord, uploadFileToSalesforce, generateCSATToken } from '../../lib/sf';

interface OfficeHoursAPIRequest extends NextApiRequest {
  body: {
    // Contact Information
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    profileType: string;
    otherProfileType?: string;
    alternativeContact?: string;
    country: string;
    timezone: string;

    // Office Hours Request
    officeHoursRequest: 'Advice' | 'Project Feedback';
    officeHoursReason: string;

    // Project Feedback specific (conditional)
    projectName?: string;
    projectSummary?: string;
    projectRepo?: string;
    domain?: string;
    additionalInfo?: string;

    // Additional Details
    repeatApplicant: boolean;
    opportunityOutreachConsent: boolean;

    // Required for submission
    captchaToken: string;
  };
}

const handler = async (req: OfficeHoursAPIRequest, res: NextApiResponse) => {
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
    // For "Advice" requests, Application Name is "First Name, Last Name"
    // For "Project Feedback" requests, Application Name is the project name
    const applicationName =
      result.data.officeHoursRequest === 'Advice'
        ? `${result.data.firstName}, ${result.data.lastName}`
        : result.data.projectName;

    const applicationData = {
      // Contact Information
      Application_FirstName__c: result.data.firstName,
      Application_LastName__c: result.data.lastName,
      Application_Email__c: result.data.email,
      Application_Company__c: result.data.company || 'N/A',
      Application_ProfileType__c: result.data.profileType,
      Application_Other_ProfileType__c: result.data.otherProfileType,
      Application_Alternative_Contact__c: result.data.alternativeContact,
      Application_Country__c: result.data.country,
      Application_Time_Zone__c: result.data.timezone,

      // Office Hours Request
      Application_OfficeHours_RequestType__c: result.data.officeHoursRequest,
      Application_OfficeHours_Reason__c: result.data.officeHoursReason,

      // Project Feedback specific fields (only present if Project Feedback)
      Name: applicationName,
      ...(result.data.officeHoursRequest === 'Project Feedback' && {
        Application_ProjectDescription__c: result.data.projectSummary,
        Application_ProjectRepo__c: result.data.projectRepo,
        Application_Domain__c: result.data.domain,
        Application_AdditionalInformation__c: result.data.additionalInfo
      }),

      // Additional Details
      Application_Repeat_Applicant__c: result.data.repeatApplicant,
      Application_OutreachConsent__c: result.data.opportunityOutreachConsent,

      // Hardwired fields
      Application_Stage__c: 'New',
      Application_Source__c: 'Webform',
      RecordTypeId: '012Vj000008z3fVIAQ'
    };

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
