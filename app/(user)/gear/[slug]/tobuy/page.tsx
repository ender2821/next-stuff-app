
import { groq } from "next-sanity";
import React from "react";
import { client } from "../../../../../lib/sanity.client";
import PageView from "./PageView";

type Props = {
  params: {
    slug: string;
  }
}

async function GearToDoPage({params: { slug }}: Props) {
  const query = groq`
    *[_type=='gear' && slug.current == $slug][0]
    {
      _id,
      _createdAt,
      toBuyList,
      slug,
      name    
    }
  `

  const gear:Gear = await client.fetch(query, { slug });
  
  return (
    <PageView data={gear}/>
  )
}

export default GearToDoPage