
import { groq } from "next-sanity";
import React from "react";
import { client } from "../../../../lib/sanity.client";
import PageView from "./PageView";


type Props = {
  params: {
    slug: string;
  }
}


async function GearPage({params: { slug }}: Props) {
  const query = groq`
  *[_type=='gear' && slug.current == $slug][0]
  {
    _id,
    _createdAt,
    image,
    slug,
    name    
  }
  `

  const gear:Gear = await client.fetch(query, { slug });

  return (
    <PageView data={gear} slug={slug}/>
  )
}

export default GearPage