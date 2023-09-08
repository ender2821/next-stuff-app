"use client";

import React, { useContext, useEffect } from "react";
import styles from "./gearHome.module.scss";
import Image from "next/image";
import urlFor from "../../../../lib/urlFor";
import appContext from "../../../../lib/appContext";
import Link from "next/link";

import InfoIcon from "../../../../assets/info-icon.svg";
import ToDoIcon from "../../../../assets/todo-icon.svg";
import ToBuyIcon from "../../../../assets/tobuy-icon.svg";
import OwnedIcon from "../../../../assets/owned-icon.svg";
import VehicleImage from "../../../../assets/vehicle-image.svg";

type PageProps = {
  data: Gear;
  slug: string;
};

export default function PageView(props: PageProps) {
  const { data, slug } = props;
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(true);
    setTitleText(data?.name);
  }, [data?.name, setSecondaryLayout, setTitleText]);

  return (
    <>
      <div className={styles.imageContain}>
        {data?.image ? (
          <Image src={urlFor(data?.image).url()} alt={data?.name} fill />
        ) : (
          <VehicleImage />
        )}
      </div>
      <ul className={styles.linkList}>
        <li>
          <Link href={`/gear/${slug}/info`}>
            <span className={styles.iconContain}>
              <InfoIcon />
            </span>
            <span className={styles.text}>{data?.name} Info</span>
          </Link>
        </li>
        <li>
          <Link href={`/gear/${slug}/todo`}>
            <span className={styles.iconContain}>
              <ToDoIcon />
            </span>
            <span className={styles.text}>Schit to do</span>
          </Link>
        </li>
        <li>
          <Link href={`/gear/${slug}/tobuy`}>
            <span className={styles.iconContain}>
              <ToBuyIcon />
            </span>
            <span className={styles.text}>Schit to buy</span>
          </Link>
        </li>
        <li>
          <Link href={`/gear/${slug}/owned`}>
            <span className={styles.iconContain}>
              <OwnedIcon />
            </span>
            <span className={styles.text}>Schit owned</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
