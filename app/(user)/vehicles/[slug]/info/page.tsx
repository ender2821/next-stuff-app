
import { groq } from "next-sanity";
import React from "react";
import { client } from "../../../../../lib/sanity.client";
import PageView from "./PageView";

type Props = {
  params: {
    slug: string;
  }
}

async function VehicleInfoPage({params: { slug }}: Props) {
  const query = groq`
    *[_type=='vehicle' && slug.current == $slug][0]
    {
      _id,
      _createdAt,
      description,
      image,
      infoList,
      slug,
      name    
    }
  `

  const vehicle:Vehicle = await client.fetch(query, { slug });
  
  return (
    <PageView data={vehicle}/>
  )
}

export default VehicleInfoPage