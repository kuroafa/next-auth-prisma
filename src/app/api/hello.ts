import openai from "@/utils/openAi";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
   name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'what is yemen?' }],
        model: 'gpt-3.5-turbo',
      });
      console.log(completion.choices);
      res.status(200).json({name: 'mustafa'})
}