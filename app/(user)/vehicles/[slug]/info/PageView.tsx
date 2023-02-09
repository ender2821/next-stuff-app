"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image  from 'next/image';
import urlFor from '../../../../../lib/urlFor'
import appContext from '../../../../../lib/appContext'

import styles from './page.module.scss';
import SimpleList from "../../../../../components/SimpleList";
import SubmitIcon from '../../../../../assets/submit-icon.svg';
// import router from "next/router";
import { useRouter, usePathname } from 'next/navigation';


type PageProps = {
  data: Vehicle,
}

export default function PageView(props:PageProps) {
  const { data } = props
  const { setSecondaryLayout, setTitleText } = useContext(appContext);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    setSecondaryLayout(true);
    setTitleText(data?.name);
  }, [data?.name, setSecondaryLayout, setTitleText])

  // TODO: see if this can be refactored as a hook 
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);



  const onSubmit = (key: string, text: string, label?: string,) => {
    console.log(key, text, label && label);

    const handleSubmit = async() => {
    
      await fetch('/api/_updateList', {
        method: 'post',
        body: JSON.stringify({ _id: data?._id, key: key, label: label, text: text }),
      }).then(() => {
        router.replace(path as string);
      }).catch((error) => console.log(error));
    
    };
    handleSubmit()
  }

  console.log(data)

  return (
    <>
      <div className={styles.imageContain}>
        <Image
          src={urlFor(data?.image).url()}
          alt={data?.name}
          fill
        />
      </div>
      <div className={styles.description} ref={ref} onClick={() => setExpanded(true)}>
        {expanded ? (
          <>
            <label>Description</label>
            <textarea/>
            <button className={styles.submit} onClick={() => alert('submit')}><SubmitIcon /></button>
          </>
        ) : (
          <>
          <label>Description</label>
          <p>{data?.description}</p>
          </>
        )}
      </div>
      <SimpleList data={data?.infoList} id={data?._id} onSubmit={onSubmit} />
    </>
  )
}
