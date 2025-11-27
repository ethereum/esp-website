import formidable from 'formidable';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

/**
 * Parses multipart/form-data
 */
export const multipartyParse =
  (handler: NextApiHandler, options: formidable.Options) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const maxSize = options.maxFileSize || 10 * 1024 * 1024;
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    
    if (contentLength > maxSize) {
      res.status(413).json({ status: 'fail', error: 'File too large' });
      return Promise.resolve();
    }

    const form = formidable(options);

    return new Promise<void>(resolve => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Form parsing error:', err);
          res.status(400).json({ status: 'fail', error: 'Invalid form data' });
          return resolve();
        }

        const parsedFields: Record<string, any> = {};
        for (const property in fields) {
          const value = fields[property];

          try {
            parsedFields[property] = JSON.parse(value as string);
          } catch (err) {
            parsedFields[property] = value;
          }
        }

        // Extend `req` object with parsed fields and files
        req.fields = parsedFields;
        req.files = files;

        const maybePromise = handler(req, res);
        // In case handler returns a promise, wait for it; otherwise resolve on next tick
        if (maybePromise && typeof (maybePromise as any).then === 'function') {
          (maybePromise as Promise<any>).finally(() => resolve());
        } else {
          resolve();
        }
      });
    });
  };
