import { GoogleSpreadsheet, ServiceAccountCredentials } from 'google-spreadsheet';

let credentials: ServiceAccountCredentials;
try {
  credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '');
} catch (error) {
  console.log(error);
}

interface ISpreadsheetConfig {
  id: string;
  sheetName: string;
}

interface IRow {
  [header: string]: string | number | boolean | undefined;
}

export default async function addRowToSpreadsheet(spreadsheet: ISpreadsheetConfig, rawRow: IRow) {
  if (!credentials) {
    throw new Error('no credentials');
  }

  const doc = new GoogleSpreadsheet(spreadsheet.id);
  await doc.useServiceAccountAuth(credentials);

  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[spreadsheet.sheetName];

  // remove undefined values in an immutable way
  const row = Object.keys(rawRow).reduce((newRow, key) => {
    const value = rawRow[key];
    if (value !== undefined) {
      newRow[key] = value;
    }

    return newRow;
  }, {} as Record<string, string | number | boolean>);

  await sheet.addRow(row);
}
