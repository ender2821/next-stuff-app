
import { getServerSession } from "next-auth";
import { groq } from "next-sanity";
import React from "react";
import { authOptions } from "../../../../helpers";
import { client } from "../../../../lib/sanity.client";
import PageView from "./PageView";

async function LifeToDoPage() {
  const query = groq`
    *[_type=='life' && email == null]
    {
      _id,
      _createdAt,
      ownedList,
      name    
    }
  `

  const session = await getServerSession(authOptions)

  const sessionQuery = groq`
  *[_type == "life" && email == "${session?.user?.email}"]{
    _createdAt,
    _id,
    ownedList,
    name,
  }
  `;

  const life:Life[] = await client.fetch(session ? sessionQuery : query);
  
  return (
    <PageView data={life[0]}/>
  )
}

export default LifeToDoPage