import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { id: customId, text } = req.body;

        // Generate a random ID
        const id = customId || Math.random().toString(36).substring(2, 8);

        // Store the text in Vercel KV
        await kv.set(id, text);

        // Return the ID
        res.status(200).json({ id });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
