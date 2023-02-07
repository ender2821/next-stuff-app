"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image  from 'next/image';
import urlFor from '../../../../../lib/urlFor'
import appContext from '../../../../../lib/appContext'

import styles from './page.module.scss';
import SimpleList from "../../../../../components/SimpleList";
import SubmitIcon from '../../../../../assets/submit-icon.svg';

type PageProps = {
  data: Vehicle,
}

export default function PageView(props:PageProps) {
  const { data } = props
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

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

  const onSubmit = (id: string, text: string, label?: string,) => {
    console.log(id, text, label && label);
  }

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
      <SimpleList data={data?.infoList} onSubmit={onSubmit} />
    </>
  )
}
