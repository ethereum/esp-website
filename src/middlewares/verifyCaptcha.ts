import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { HCAPTCHA_VERIFY_URL } from '../constants';

const { HCAPTCHA_SECRET } = process.env;

/**
 * Verifies client captcha token against hCaptcha endpoint
 */
export const verifyCaptcha =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    let captchaToken;

    if (req.fields?.captchaToken) {
      captchaToken = req.fields.captchaToken;
    }

    if (req.body?.captchaToken) {
      captchaToken = req.body.captchaToken;
    }

    if (!captchaToken) {
      return res.status(400).json({ status: 'captcha failed' });
    }

    const response = await fetch(HCAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `response=${captchaToken}&secret=${HCAPTCHA_SECRET}`
    });

    if (!response.ok) {
      return res.status(400).json({ status: 'captcha failed' });
    }

    const { success } = await response.json();

    if (!success) {
      return res.status(400).json({ status: 'captcha failed' });
    }

    return handler(req, res);
  };
