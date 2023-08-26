import openai from "@/utils/openAi";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  input: string;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "what is yemen?" }],
    model: "gpt-3.5-turbo",
  });
  const { input } = req.body;
  res.status(200).json({ name: "mustafa" });
}
