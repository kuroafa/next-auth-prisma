import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        res.status(200).json({ name: 'mustafa' });
    } catch (error) {
        console.log('error getting api page', error)
    }
  
}
