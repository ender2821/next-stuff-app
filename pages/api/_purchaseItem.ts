// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next/types";
import { client } from "../../lib/sanity.client";

client.config ({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function favoriteButtonHandler(req: NextApiRequest, res: NextApiResponse) {
  const { _id, key, item, price, description, link, image} = JSON.parse(req.body);

  const newItem = [{ _key: key, item: item, price: price, description: description, link: link, image: image}]

  const data = await client.patch(_id).setIfMissing({ownedList: []}).append('ownedList', newItem).commit().catch((error) => console.log(error))
  res.status(200).json({ data })
}