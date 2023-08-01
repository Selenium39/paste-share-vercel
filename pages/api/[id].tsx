import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    // Get the text from Vercel KV
    const text = await kv.get<string>(id as string);

    // Return the text
    res.status(200).json({ text });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
