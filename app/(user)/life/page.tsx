
import { groq } from "next-sanity";
import React from "react";
import { client } from "../../../lib/sanity.client";
import PageView from "./PageView";

async function LifePage() {
  const query = groq`
  *[_type=='life'][0]
  {
    _id,
    _createdAt,
    name    
  }
  `
  const life:Life = await client.fetch(query);

  return (
    <PageView data={life}/>
  )
}

export default LifePage