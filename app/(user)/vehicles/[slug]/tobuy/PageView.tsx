"use client";

import React, { useContext, useEffect } from "react";
import appContext from '../../../../../lib/appContext'

import SimpleList from "../../../../../components/SimpleList";

type PageProps = {
  data: Vehicle,
}

export default function PageView(props:PageProps) {
  const { data } = props
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(true);
    setTitleText("To Buy");
  }, [setSecondaryLayout, setTitleText])

  return (
    <>
      <SimpleList data={data?.toBuyList as List[]} category={'vehicles'} listName={'toBuyList'} id={data?._id}/>
    </>
  )
}
