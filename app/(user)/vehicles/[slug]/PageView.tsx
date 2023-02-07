"use client";

import React, { useContext, useEffect } from "react";
import styles from './vehicleHome.module.scss';
import Image  from 'next/image';
import urlFor from '../../../../lib/urlFor'
import appContext from '../../../../lib/appContext'
import Link from "next/link";

import InfoIcon from '../../../../assets/info-icon.svg';
import ToDoIcon from '../../../../assets/todo-icon.svg';
import ToBuyIcon from '../../../../assets/tobuy-icon.svg';
import OwnedIcon from '../../../../assets/owned-icon.svg';
import SpecsIcon from '../../../../assets/specs-icon.svg';

type PageProps = {
  data: Vehicle,
  slug: string,
}

export default function PageView(props:PageProps) {
  const { data, slug } = props
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(true);
    setTitleText(data.name);
  }, [data.name, setSecondaryLayout, setTitleText])

  return (
    <>
      <div className={styles.imageContain}>
        <Image
          src={urlFor(data?.image).url()}
          alt={data?.name}
          fill
        />
      </div>
      <ul className={styles.linkList}>
        <li>
          <Link
            href={`/vehicles/${slug}/info`}
          >
            <span className={styles.iconContain}><InfoIcon /></span>
            <span className={styles.text}>{data?.name} Info</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/vehicles/${slug}/todo`}
          >
            <span className={styles.iconContain}><ToDoIcon /></span>
            <span className={styles.text}>Schit to do</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/vehicles/${slug}/tobuy`}
          >
            <span className={styles.iconContain}><ToBuyIcon /></span>
            <span className={styles.text}>Schit to buy</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/vehicles/${slug}/owned`}
          >
            <span className={styles.iconContain}><OwnedIcon /></span>
            <span className={styles.text}>Schit owned</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/vehicles/${slug}/specs`}
          >
            <span className={styles.iconContain}><SpecsIcon /></span>
            <span className={styles.text}>Sciht specs</span>
          </Link>
        </li>
      </ul>
    </>
  )
}
