import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next/types";
import { authOptions } from "../../helpers";
import { client } from "../../lib/sanity.client";

client.config ({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function favoriteButtonHandler(req: NextApiRequest, res: NextApiResponse) {
  const {id, name, slug} = JSON.parse(req.body);
  const session = await getServerSession(req, res, authOptions)

  const doc = {
    _type: id,
    name: name,
    description: '',
    slug: {
      _type: 'slug',
      current: slug
    },
    email: session ? session?.user?.email : null,
  }

  const data = await client.create(doc).catch((error) => console.log(error))
  res.status(200).json({ data })
}