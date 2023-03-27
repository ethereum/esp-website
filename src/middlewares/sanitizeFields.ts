import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { isURL } from '../utils';

const fieldsToSanitize = ['firstName', 'lastName', 'company'];

function removeURLs(text: string) {
  return text
    .split(' ')
    .map(value => (isURL(value) ? '' : value))
    .join(' ');
}

export const sanitizeFields =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const fields = req.fields || req.body;

    const fieldsSanitized = Object.keys(fields).reduce<Record<string, string>>((prev, key) => {
      let value = fields[key];
      if (fieldsToSanitize.includes(key)) {
        value = removeURLs(value);
      }

      if (typeof value === 'string') {
        value = value.trim();
      }

      return {
        ...prev,
        [key]: value
      };
    }, {});

    if (req.fields) {
      req.fields = fieldsSanitized;
    }

    if (req.body) {
      req.body = fieldsSanitized;
    }

    return handler(req, res);
  };
