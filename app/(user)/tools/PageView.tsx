"use client";

import React, { useContext, useEffect } from "react";
import styles from "./toolsHome.module.scss";
import appContext from "../../../lib/appContext";
import Link from "next/link";

import ToDoIcon from "../../../assets/todo-icon.svg";
import ToBuyIcon from "../../../assets/tobuy-icon.svg";
import OwnedIcon from "../../../assets/owned-icon.svg";

type PageProps = {
  data: Tools;
};

export default function PageView(props: PageProps) {
  const { data } = props;
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  console.log(data)
  useEffect(() => {
    setSecondaryLayout(true);
    setTitleText(data?.name);
  }, [data?.name, setSecondaryLayout, setTitleText]);

  return (
    <>
      <ul className={styles.linkList}>
        <li>
          <Link href={`/tools/todo`}>
            <span className={styles.iconContain}>
              <ToDoIcon />
            </span>
            <span className={styles.text}>Schit to do</span>
          </Link>
        </li>
        <li>
          <Link href={`/tools/tobuy`}>
            <span className={styles.iconContain}>
              <ToBuyIcon />
            </span>
            <span className={styles.text}>Schit to buy</span>
          </Link>
        </li>
        <li>
          <Link href={`/tools/owned`}>
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
