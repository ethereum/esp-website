import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const fieldsToSanitize = ['firstName', 'lastName'];

// resource: https://daringfireball.net/2010/07/improved_regex_for_matching_urls
const removeURLsRegex =
  /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g;

export const sanitizeFields =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const fields = req.fields || req.body;

    const fieldsSanitized = Object.keys(fields).reduce<Record<string, string>>((prev, key) => {
      let value = fields[key];
      if (fieldsToSanitize.includes(key)) {
        value = value.replace(removeURLsRegex, '');
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
