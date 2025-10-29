import type { NextApiRequest, NextApiResponse } from 'next';

import { sanitizeFields } from '../../middlewares/sanitizeFields';
import { verifyCaptcha } from '../../middlewares/verifyCaptcha';
import { CSATSchema } from '../../components/forms/schemas/CSAT';
import { updateSalesforceRecord, verifyCSATToken } from '../../lib/sf';

interface CSATAPIRequest extends NextApiRequest {
  body: {
    applicationId: string;
    csatToken: string;
    csatRating: number;
    csatComments?: string;
    captchaToken: string;
  };
}

const handler = async (req: CSATAPIRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate fields against the schema
  const result = CSATSchema.safeParse(req.body);
  if (!result.success) {
    const formatted = result.error.format();
    console.error('CSAT validation error:', formatted);

    res.status(400).json({ error: 'Validation failed', details: formatted });
    return;
  }

  try {
    // Verify JWT token
    const decoded = verifyCSATToken(result.data.csatToken);

    if (!decoded) {
      console.error('Invalid or expired CSAT token');
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Verify that token's applicationId matches the one in the request
    if (decoded.applicationId !== result.data.applicationId) {
      console.error('Token applicationId mismatch');
      return res.status(401).json({ error: 'Token does not match application' });
    }

    // Update the Application record with CSAT fields
    const updateData = {
      Application_CSAT_Rating__c: result.data.csatRating,
      Application_CSAT_Comments__c: result.data.csatComments || ''
    };

    await updateSalesforceRecord('Application__c', result.data.applicationId, updateData);

    console.log('CSAT feedback submitted:', {
      applicationId: result.data.applicationId,
      rating: result.data.csatRating,
      hasComments: !!result.data.csatComments
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    console.error('Error submitting CSAT feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

export default sanitizeFields(verifyCaptcha(handler));
