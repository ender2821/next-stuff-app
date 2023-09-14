import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next/types";
import { client } from "../../lib/sanity.client";

client.config ({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function favoriteButtonHandler(req: NextApiRequest, res: NextApiResponse) {
  const {id, name, email} = JSON.parse(req.body);

  const doc = {
    _type: id,
    name: name,
    email: email,
  }

  const data = await client.create(doc).catch((error) => console.log(error))
  res.status(200).json({ data })
}