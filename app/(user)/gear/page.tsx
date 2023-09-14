import React from "react";
import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";
import PageView from './PageView';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const query = groq`
  *[_type == "gear" && email == null]{
    _createdAt,
    _id,
    name,
    slug,
    image,
  }
`;

async function GearList() {

  const session = await getServerSession(authOptions)

  const sessionQuery = groq`
    *[_type == "gear" && email == "${session?.user?.email}"]{
      _createdAt,
      _id,
      name,
      slug,
      image,
    }
  `;

  const gear = await client.fetch(session ? sessionQuery : query);

  return (
    <PageView data={gear} />
  )
}

export default GearList