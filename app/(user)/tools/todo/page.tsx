
import { getServerSession } from "next-auth";
import { groq } from "next-sanity";
import React from "react";
import { client } from "../../../../lib/sanity.client";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import PageView from "./PageView";

async function ToolsToDoPage() {
  const query = groq`
    *[_type=='tools' && email == null]
    {
      _id,
      _createdAt,
      toDoList,
      name    
    }
  `
  const session = await getServerSession(authOptions)

  const sessionQuery = groq`
  *[_type == "tools" && email == "${session?.user?.email}"]{
    _createdAt,
    _id,
    toDoList,
    name,
  }
  `;

  const tools:Tools[] = await client.fetch(session ? sessionQuery : query);
  
  return (
    <PageView data={tools[0]}/>
  )
}

export default ToolsToDoPage