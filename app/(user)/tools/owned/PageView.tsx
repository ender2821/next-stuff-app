"use client";

import React, { useContext, useEffect } from "react";
import appContext from '../../../../lib/appContext'

import SimpleList from "../../../../components/SimpleList";

type PageProps = {
  data: Tools,
}

export default function PageView(props:PageProps) {
  const { data } = props
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(true);
    setTitleText("Owned");
  }, [setSecondaryLayout, setTitleText])

  return (
    <>
      <SimpleList data={data?.ownedList as List[]} category={'tools'} listName={'ownedList'} id={data?._id}/>
    </>
  )
}
