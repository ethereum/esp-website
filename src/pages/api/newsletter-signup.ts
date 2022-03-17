import type { NextApiRequest, NextApiResponse } from 'next';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_APIKEY,
  server: process.env.MAILCHIMP_SERVER
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  const { email } = body;

  if (method !== 'POST') {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        NEWSLETTER: 'true'
      }
    });

    res.status(200).end();
  } catch (err: any) {
    console.error(err);

    if (err.response) {
      // return the mailchimp error code & message
      // docs: https://mailchimp.com/developer/marketing/docs/errors/
      const body = err.response.body;
      res.status(body.status).end(body.detail);
    } else {
      res.status(500).end();
    }
  }
}
