
import { getServerSession } from "next-auth";
import { groq } from "next-sanity";
import React from "react";
import { authOptions } from "../../../helpers";
import { client } from "../../../lib/sanity.client";
import PageView from "./PageView";

async function ToolsPage() {
  const query = groq`
  *[_type=='tools' && email == ""]
  {
    _id,
    _createdAt,
    name    
  }
  `

  const session = await getServerSession(authOptions)
  const id = "tools";

  const newCategory = async() => {
    await fetch(process.env.NEXTAUTH_URL + "/api/_addDefaultCategory", {
      method: "post",
      body: JSON.stringify({
        id: id,
        name: "tools",
        email: session?.user?.email
      }),
    }).catch((error) => console.log(error));
  }

  const sessionQuery = groq`
  *[_type == "tools" && email == "${session?.user?.email}"]{
    _createdAt,
    _id,
    name,
  }
  `;
  const tools:Tools[] = await client.fetch(session ? sessionQuery : query);

  if (session && tools.length === 0 ) {
    newCategory();
  }

  return (
    <PageView data={tools[0]}/>
  )
}

export default ToolsPage