
import { groq } from "next-sanity";
import React from "react";
import { client } from "../../../../../lib/sanity.client";
import PageView from "./PageView";

type Props = {
  params: {
    slug: string;
  }
}

async function VehicleToDoPage({params: { slug }}: Props) {
  const query = groq`
    *[_type=='vehicle' && slug.current == $slug][0]
    {
      _id,
      _createdAt,
      toDoList,
      slug,
      name    
    }
  `

  const vehicle:Vehicle = await client.fetch(query, { slug });
  
  return (
    <PageView data={vehicle}/>
  )
}

export default VehicleToDoPage