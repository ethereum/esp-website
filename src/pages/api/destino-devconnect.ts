import { NextApiRequest, NextApiResponse } from 'next';
import { DestinoDevconnectSchema } from '../../components/forms/schemas/DestinoDevconnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = DestinoDevconnectSchema.parse(req.body);

    // TODO: Add Salesforce integration here
    // For now, just return success
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(400).json({ message: 'Invalid form data' });
  }
}
