
import { getServerSession } from "next-auth";
import { groq } from "next-sanity";
import React from "react";
import { authOptions } from "../../../helpers";
import { client } from "../../../lib/sanity.client";
import PageView from "./PageView";

async function LifePage() {
  const query = groq`
  *[_type=='life' && email == null]
  {
    _id,
    _createdAt,
    name    
  }
  `;

  const session = await getServerSession(authOptions)
  const id = "life";

  const newCategory = async() => {
    await fetch(process.env.NEXTAUTH_URL + "/api/_addDefaultCategory", {
      method: "post",
      body: JSON.stringify({
        id: id,
        name: "life",
        email: session?.user?.email
      }),
    }).catch((error) => console.log(error));
  }

  const sessionQuery = groq`
  *[_type == "life" && email == "${session?.user?.email}"]{
    _createdAt,
    _id,
    name,
  }
  `;

  const life:Life[] = await client.fetch(session ? sessionQuery : query);

  if (session && life.length === 0 ) {
    newCategory();
  }

  return (
    <PageView data={life[0]}/>
  )
}

export default LifePage