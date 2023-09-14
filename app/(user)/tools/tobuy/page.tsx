
import { getServerSession } from "next-auth";
import { groq } from "next-sanity";
import React from "react";
import { authOptions } from "../../../../helpers";
import { client } from "../../../../lib/sanity.client";
import PageView from "./PageView";

async function ToolsToBuy() {
  const query = groq`
    *[_type=='tools' && email == null]
    {
      _id,
      _createdAt,
      toBuyList,
      name    
    }
  `
  const session = await getServerSession(authOptions)

  const sessionQuery = groq`
  *[_type == "tools" && email == "${session?.user?.email}"]{
    _createdAt,
    _id,
    toBuyList,
    name,
  }
  `;

  const tools:Tools[] = await client.fetch(session ? sessionQuery : query);

  return (
    <PageView data={tools[0]}/>
  )
}

export default ToolsToBuy