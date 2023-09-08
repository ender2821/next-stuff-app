
import { groq } from "next-sanity";
import React from "react";
import { client } from "../../../lib/sanity.client";
import PageView from "./PageView";

async function ToolsPage() {
  const query = groq`
  *[_type=='tools'][0]
  {
    _id,
    _createdAt,
    name    
  }
  `
  const tools:Tools = await client.fetch(query);

  return (
    <PageView data={tools}/>
  )
}

export default ToolsPage