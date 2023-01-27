import React from "react";
import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";
import PageView from './PageView';

const query = groq`*[_type == "vehicle"] | order(_createdAt desc){
  _createdAt,
  _id,
  name,
  slug,
  image,
}`;

async function VehicleList() {
  const vehicles = await client.fetch(query);
  return (
    <PageView data={vehicles} />
  )
}

export default VehicleList