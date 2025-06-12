import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { AGRMailingSchema } from '../../components/AGRMailingForm';

const LISTMONK_API_URL = 'https://listmonk.ethereum.org';
const LISTMONK_LIST_ID = 5;

const apiUsername = process.env.LISTMONK_API_USERNAME;
const accessToken = process.env.LISTMONK_API_ACCESS_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, name, university } = AGRMailingSchema.parse(req.body);

    // 1. Create or update the subscriber
    const response = await fetch(`${LISTMONK_API_URL}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${apiUsername}:${accessToken}`
      },
      body: JSON.stringify({
        email,
        name,
        status: 'enabled',
        lists: [LISTMONK_LIST_ID],
        attribs: {
          university
        }
      })
    });

    const data = await response.json();

    if (!response.ok && data?.message?.toLowerCase().includes('already exists')) {
      // If already exists, continue to fetch the subscriber ID
    } else if (!response.ok) {
      console.error(data.message);
      return res.status(500).json({ message: 'Error adding contact' });
    }

    // 2. Get the subscriber's ID by email
    const getRes = await fetch(
      `${LISTMONK_API_URL}/api/subscribers?query=email='${encodeURIComponent(email)}'`,
      {
        headers: {
          Authorization: `token ${apiUsername}:${accessToken}`
        }
      }
    );
    const getData = await getRes.json();
    const subscriber = getData.data?.results?.[0];
    if (!subscriber || !subscriber.id) {
      console.error(getData.message);
      return res.status(500).json({ message: 'Could not find subscriber after creation.' });
    }

    // 3. Add the subscriber to the list
    const putRes = await fetch(`${LISTMONK_API_URL}/api/subscribers/lists`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${apiUsername}:${accessToken}`
      },
      body: JSON.stringify({
        ids: [subscriber.id],
        action: 'add',
        target_list_ids: [LISTMONK_LIST_ID],
        status: 'confirmed'
      })
    });
    const putData = await putRes.json();

    if (!putRes.ok || putData.data !== true) {
      console.error(putData.message);
      return res.status(500).json({ message: 'Failed to add subscriber to the list.' });
    }

    res.status(200).json({ message: 'Contact added successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    console.error('Error adding contact:', error);
    res.status(500).json({ message: 'Error adding contact' });
  }
}
