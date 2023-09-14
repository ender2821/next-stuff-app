// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next/types";
import { client } from "../../lib/sanity.client";
import {createReadStream} from 'fs'
import formidable from 'formidable';

client.config ({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function imageUploadHandler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({ keepExtensions: true });
  
  interface UploadFile {
    filepath: string,
    mimeType: string,
    originalFilename: string,
  }

  form.parse(req, async(err, fields, files) => {
    const selectedFile = files.file as unknown as UploadFile;

    const imageKey = fields?.key !== undefined ? `${fields?.name}[_key=="${fields?.key}"].image` : 'image';

    const response = await client.assets.upload('image', createReadStream(selectedFile.filepath), {
      contentType: selectedFile.mimeType,
      filename: selectedFile.originalFilename,
    }).then(imageAsset => {
      return client
        .patch(fields?.sanityId as string)
        .set({
          [imageKey]: {
            _type: 'image',
            asset: {
              _type: "reference",
              _ref: imageAsset._id
            }
          }
        })
        .commit()
    });

    res.status(200).json({ response })

  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};