import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(process.env.PROJECT_GRANTS_DOWNLOAD_FILE_URL!);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  res.setHeader('Content-Disposition', 'attachment; filename=projectGrantsApplication.docx');
  res.send(response.body);
}
