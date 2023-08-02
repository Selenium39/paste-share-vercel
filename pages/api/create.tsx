import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { id: customId, text, expiry } = req.body;

        // Generate a random ID
        const id = customId || Math.random().toString(36).substring(2, 8);

        // Convert the expiry time to a number
        const ttl = Number(expiry);

        // Store the text in Vercel KV with the expiry time
        await kv.setex(id, ttl, text);

        // Return the ID
        res.status(200).json({ id });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
