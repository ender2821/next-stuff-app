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
  const { _id, key, label, text } = JSON.parse(req.body);

  
  if ( label ) {
    const itemKey = `infoList[_key=="${key}"].item`;
    const labelKey = `infoList[_key=="${key}"].label`;
    const itemToUpdate = {[itemKey]: text, [labelKey]: label};

    const data = await client.patch(_id).set(itemToUpdate).commit().catch((error) => console.log(error))
    res.status(200).json({ data })
  } else {
    const itemKey = `infoList[_key=="${key}"].item`;
    const itemToUpdate = {[itemKey]: text};

    const data = await client.patch(_id).set(itemToUpdate).commit().catch((error) => console.log(error))
    res.status(200).json({ data })
  }
}