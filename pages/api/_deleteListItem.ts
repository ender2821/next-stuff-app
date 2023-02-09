import { NextApiRequest, NextApiResponse } from "next/types";
import { client } from "../../lib/sanity.client";

client.config ({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function favoriteButtonHandler(req: NextApiRequest, res: NextApiResponse) {
  const { _id, key} = JSON.parse(req.body);

  const itemToRemove = [`infoList[_key=="${key}"]`];
  const data = await client.patch(_id).unset(itemToRemove).commit().catch((error) => console.log(error))
  res.status(200).json({ data })
}