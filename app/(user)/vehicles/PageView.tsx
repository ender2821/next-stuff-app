'use client';

import React, { useContext, useEffect } from "react";
import urlFor from '../../../lib/urlFor'
import Image  from 'next/image';
import Link from "next/link";
import appContext from '../../../lib/appContext'

import DeleteIcon from "../../../assets/delete-icon.svg"
import styles from './listPage.module.scss';

type ListPage = {
  slug: {current: string}
  name: string;
  image: string;
}

type PageProps = {
  data: ListPage[]
}

export default function PageView(props:PageProps){
  const { data } = props;
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(false);
    setTitleText('vehicles');
  }, [setSecondaryLayout, setTitleText])
  return (
    <ul className={styles.itemList}>
      {data.map((item: ListPage, i:number) => {
        return (
          <li 
            key={i} 
          >
            <Link
              href={`/vehicles/${item?.slug?.current}`}
              className={styles.listItem}
            >
              <div className={styles.imageContain}>
              <Image 
                src={urlFor(item?.image).url()}
                alt={item?.name}
                fill
              />
              </div>
              <div className={styles.content}>
                <p>{item?.name}</p>
                <button>
                  <DeleteIcon />
                </button>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}