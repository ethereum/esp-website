import formidable from 'formidable';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

/**
 * Parses multipart/form-data
 */
export const multipartyParse =
  (handler: NextApiHandler, options: formidable.Options) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable(options);

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(400).json({ status: 'fail' });
        return;
      }

      // Extend `req` object with parsed fields and files
      req.fields = fields;
      req.files = files;

      handler(req, res);
    });
  };
