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
  const { _id, key, item, price, description, link, name} = JSON.parse(req.body);

  const itemKey = `${name}[_key=="${key}"].item`;
  const priceKey = `${name}[_key=="${key}"].price`;
  const descriptionKey = `${name}[_key=="${key}"].description`;
  const linkKey = `${name}[_key=="${key}"].link`;

  const itemToUpdate = {[itemKey]: item, [priceKey]: price, [descriptionKey]: description, [linkKey]: link};

  const data = await client.patch(_id).set(itemToUpdate).commit().catch((error) => console.log(error))
  res.status(200).json({ data })
}