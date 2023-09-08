import React from "react";
import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";
import PageView from './PageView';

const query = groq`
  *[_type == "gear"]{
    _createdAt,
    _id,
    name,
    slug,
    image,
  }
`;

async function VehicleList() {
  const gear = await client.fetch(query);
  return (
    <PageView data={gear} />
  )
}

export default VehicleList