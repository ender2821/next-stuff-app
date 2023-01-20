import React from "react";
import urlFor from '../../../lib/urlFor'
import Image  from 'next/image';
import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";

const query = groq`*[_type == "vehicle"] | order(_createdAt desc){
  _createdAt,
  _id,
  name,
  slug,
  image,
}`;

async function VehicleList() {
  const vehicles = await client.fetch(query);
  console.log(vehicles)
  return (
    <>
    <p>
      <Image 
        src={urlFor(vehicles[0].image).url()}
        alt={''}
        width={400}
        height={250}
      />
      <span style={{color: "white"}}>This is the vehicle list</span>
    </p>
    </>
  )
}

export default VehicleList