
import { groq } from "next-sanity";
import React from "react";
import { client } from "../../../../lib/sanity.client";
import PageView from "./PageView";

async function ToolsToDoPage() {
  const query = groq`
    *[_type=='tools'][0]
    {
      _id,
      _createdAt,
      ownedList,
      name    
    }
  `

  const tools:Tools = await client.fetch(query);
  
  return (
    <PageView data={tools}/>
  )
}

export default ToolsToDoPage