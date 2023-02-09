import { NextApiRequest, NextApiResponse } from "next/types";
import { client } from "../../lib/sanity.client";

client.config ({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function favoriteButtonHandler(req: NextApiRequest, res: NextApiResponse) {
  const { _id} = JSON.parse(req.body);

  function makeKey(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const newItem = [{ _key: makeKey(12), item: '', label: 'New item' }]
  const data = await client.patch(_id).append('infoList', newItem).commit().catch((error) => console.log(error))
  res.status(200).json({ data })
}