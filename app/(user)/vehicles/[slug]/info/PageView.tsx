"use client";

import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import Image  from 'next/image';
import urlFor from '../../../../../lib/urlFor'
import appContext from '../../../../../lib/appContext'

import styles from './page.module.scss';
import SimpleList from "../../../../../components/SimpleList";
import SubmitIcon from '../../../../../assets/submit-icon.svg';
import SubmitIconLight from '../../../../../assets/submit-icon-light.svg';
import PhotoUploadIcon from '../../../../../assets/upload-photo-icon.svg';

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
  const [imageOverlay, setImageOverlay] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleImageClickOutside = (event: MouseEvent): void => {
      if (imageRef.current && !imageRef.current.contains(event.target as Node)) {
        setImageOverlay(false);
      }
    };
    document.addEventListener('click', handleImageClickOutside, true);
    return () => {
      document.removeEventListener('click', handleImageClickOutside, true);
    };
  }, []);
  //

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if(images.length < 1) return;
    let newImageURLs: any = [];
    images.forEach( image => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs);
  }, [images]);

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImages([...e.target.files as any ] as SetStateAction<never[]>)
  };

  const onImageSubmit = async() => {
    if(images.length < 1) return;
    
    const body = new FormData();
    body.append("file", images[0]);
    body.append("sanityId", data?._id);

    await fetch('/api/_uploadImage', {
      method: 'post',
      body: body,
    }).then(() => {
      router.replace(path as string);
    }).then(() => {
      setImages([]);
      setImageURLs([]);
    }).catch((error) => console.log(error));
  }


  // description handling 
  const [formText, setFormText] = useState('');

  useEffect(() => {
    setFormText(data?.description as string);
  }, [data?.description]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setFormText(value)
  }

  const onDescriptionFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDescriptionSubmit(formText);
  }

  const onDescriptionSubmit = (text: string) => {
    const handleSubmit = async() => {
    
      await fetch('/api/_updateDescription', {
        method: 'post',
        body: JSON.stringify({ _id: data?._id, text: text }),
      }).then(() => {
        router.replace(path as string);
        setExpanded(false);
      }).catch((error) => console.log(error));
    
    };
    handleSubmit()
  }

  return (
    <>
      <div className={styles.imageContain} onClick={() => setImageOverlay(true)}>
        
        {imageOverlay && (
          <div className={styles.overlay} ref={imageRef}>
            { images.length == 0 && (
              <div className={styles.titleContain}>
                <span className={styles.iconContain}>
                  <PhotoUploadIcon />
                </span>
                <p>Change Photo</p>
              </div>
            )}
            <label htmlFor="upload"></label>
            <input type="file" id="upload" accept="image/*" onChange={onImageChange} />
            { images.length > 0 && <button onClick={onImageSubmit} className={styles.photoSubmitButton}><SubmitIconLight /></button>}
          </div>
        )}

        { images.length > 0 ? (
          <Image
            src={imageURLs[0]}
            alt={data?.name}
            fill
          />
        ) : (
          <Image
            src={urlFor(data?.image).url()}
            alt={data?.name}
            fill
          />
        )}
      </div>
      <form className={styles.description} ref={ref} onSubmit={onDescriptionFormSubmit} onClick={() => setExpanded(true)}>
        {expanded ? (
          <>
            <label>Description</label>
            <textarea value={formText} onChange={handleTextChange}/>
            <button className={styles.submit} type="submit"><SubmitIcon /></button>
          </>
        ) : (
          <>
          <label>Description</label>
          <p>{data?.description}</p>
          </>
        )}
      </form>
      <SimpleList data={data?.infoList as List[]} listName={'infoList'} id={data?._id}/>
    </>
  )
}
