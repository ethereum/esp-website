import { Fields, Files } from 'formidable';
import { IncomingMessage } from 'http';

declare module 'next' {
  export interface NextApiRequest extends IncomingMessage {
    fields?: Fields;
    files?: Files;
  }
}
