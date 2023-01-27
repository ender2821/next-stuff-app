"use client";

import React, { useContext, useEffect } from "react";
import styles from './vehicleHome.module.scss';
import Image  from 'next/image';
import urlFor from '../../../../lib/urlFor'
import appContext from '../../../../lib/appContext'

type PageProps = {
  data: Vehicle
}

export default function PageView(props:PageProps) {
  const { data } = props
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(true);
    setTitleText(data.name);
  }, [data.name, setSecondaryLayout, setTitleText])

  return (
    <div className={styles.imageContain}>
      <Image
        src={urlFor(data?.image).url()}
        alt={data?.name}
        fill
      />
    </div>
  )
}
