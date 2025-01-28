import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ContactsApi, ContactsApiApiKeys, HttpError } from '@getbrevo/brevo';

import { AGRMailingSchema } from '../../components/AGRMailingForm';

const apiInstance = new ContactsApi();
apiInstance.setApiKey(ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, name, university } = AGRMailingSchema.parse(req.body);

    await apiInstance.createContact({
      listIds: [3],
      email: email,
      attributes: {
        FULLNAME: name,
        UNIVERSITY: university
      }
    });

    res.status(200).json({ message: 'Contact added successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    if (error instanceof HttpError) {
      const code = error.body.code;
      if (code === "duplicate_parameter") {
        return res.status(400).json({ message: 'You are already subscribed to the mailing list' });
      }
    }

    console.error('Error adding contact:', error);
    res.status(500).json({ message: 'Error adding contact' });
  }
}
