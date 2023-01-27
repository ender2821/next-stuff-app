
import { groq } from "next-sanity";
import React, { useContext } from "react";
import { client } from "../../../../lib/sanity.client";
import PageView from "./PageView";


type Props = {
  params: {
    slug: string;
  }
}


async function VehiclePage({params: { slug }}: Props) {
  // react context doesnt work in server components, need to find a way to deal with it
  // const { setSecondaryLayout } = useContext(appContext)
  // setSecondaryLayout(true);

  const query = groq`
    *[_type=='vehicle' && slug.current == $slug][0]
    {
      ...,
    }
  `

  const vehicle:Vehicle = await client.fetch(query, { slug });

  return (
    <PageView data={vehicle}/>
  )
}

export default VehiclePage