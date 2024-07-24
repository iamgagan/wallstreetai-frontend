import { v2 as cloudinary } from 'cloudinary'
import type { NextApiRequest, NextApiResponse } from 'next'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDUNARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

type RequestBody = {
    file: string; // base64 string
    userId: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { file, userId } = req.body as RequestBody;
        cloudinary.uploader.upload(, { public_id: userId }, function(error, result) {
            if (error) {
                res.status(500).json({ error: 'Something went wrong' });
            } else {
                res.status(200).json({ data: result });
            }
        });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}