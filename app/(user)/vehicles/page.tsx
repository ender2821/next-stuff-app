import React from "react";
import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";
import PageView from './PageView';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const query = groq`
  *[_type == "vehicle" && email == null]{
    _createdAt,
    _id,
    name,
    slug,
    image,
  }
`;

async function VehicleList() {
  const session = await getServerSession(authOptions)

  const sessionQuery = groq`
    *[_type == "vehicle" && email == "${session?.user?.email}"]{
      _createdAt,
      _id,
      name,
      slug,
      image,
    }
  `;

  const vehicles = await client.fetch(session ? sessionQuery : query);
  return (
    <PageView data={vehicles} />
  )
}

export default VehicleList