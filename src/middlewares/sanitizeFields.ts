import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { isURL } from '../utils';

const fieldsToSanitize = ['firstName', 'lastName', 'company'];
const numericFields = ['budgetRequest', 'requestedAmount', 'expectedAttendees'];

function removeURLs(text: string) {
  return text
    .split(' ')
    .map(value => (isURL(value) ? '' : value))
    .join(' ');
}

function sanitizeNumeric(value: any): number | string {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return isNaN(parsed) ? value : parsed;
}

export const sanitizeFields =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const fields = req.fields || req.body;

    const fieldsSanitized = Object.keys(fields).reduce<Record<string, any>>((prev, key) => {
      let value = fields[key];
      
      if (fieldsToSanitize.includes(key)) {
        value = removeURLs(value);
      }

      if (numericFields.includes(key)) {
        value = sanitizeNumeric(value);
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
