"use client";

import React, { useContext, useEffect } from "react";
import appContext from '../../../../../lib/appContext'

import styles from './page.module.scss';
import SimpleList from "../../../../../components/SimpleList";

type PageProps = {
  data: Vehicle,
}

export default function PageView(props:PageProps) {
  const { data } = props
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(true);
    setTitleText("Specs");
  }, [setSecondaryLayout, setTitleText])

  return (
    <>
      <SimpleList data={data?.specList as List[]} listName={'specList'} id={data?._id}/>
    </>
  )
}
