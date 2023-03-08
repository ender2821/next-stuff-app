"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import urlFor from "../../../lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import appContext from "../../../lib/appContext";

import DeleteIcon from "../../../assets/delete-icon.svg";
import SubmitIcon from "../../../assets/submit-icon-light.svg";
import AddIcon from "../../../assets/add-icon.svg";
import AddSomeImage from "../../../assets/add-some-schit-image-light.svg";

import useIconRender from "../../../hooks/useIconRender";

import styles from "./listPage.module.scss";

type ListPage = {
  slug: { current: string };
  name: string;
  image: string;
  _id: string;
};

type PageProps = {
  data: ListPage[];
};

export default function PageView(props: PageProps) {
  const { data } = props;
  const { setSecondaryLayout, setTitleText } = useContext(appContext);
  const [newItem, setNewItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    setSecondaryLayout(false);
    setTitleText(path?.slice(1) as string);
  }, [setSecondaryLayout, setTitleText, data, path]);

  const onAddSubmit = async () => {
    if (newItemName.length > 0) {
      const id = "vehicle";

      const slugify = (str: string) => {
        return str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
      };

      await fetch("/api/_addCategory", {
        method: "post",
        body: JSON.stringify({
          id: id,
          name: newItemName,
          slug: slugify(newItemName),
        }),
      })
        .then(() => {
          setNewItem(false);
          setNewItemName("");
          router.replace(path as string);
        })
        .catch((error) => console.log(error));
    }
  };

  const onDelete = async (id: string) => {
    await fetch("/api/_deleteCategory", {
      method: "post",
      body: JSON.stringify({ id: id }),
    })
      .then(() => {
        router.replace(path as string);
      })
      .catch((error) => console.log(error));
  };

  const handleNewItemNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setNewItemName(value);
  };

  return (
    <>
      <ul className={styles.itemList}>
        {data?.map((item: ListPage, i: number) => {
          return (
            <li key={i} className={styles.listItem}>
              <Link href={`/vehicles/${item?.slug?.current}`}>
                <div className={styles.imageContain}>
                  {item?.image ? (
                    <Image
                      src={urlFor(item?.image).url()}
                      alt={item?.name}
                      fill
                    />
                  ) : (
                    <div className={styles.iconContain}>{useIconRender(path.slice(1))}</div>
                  )}
                </div>
                <div className={styles.content}>
                  <p>{item?.name}</p>
                </div>
              </Link>
              <button onClick={() => onDelete(item?._id)}>
                <DeleteIcon />
              </button>
            </li>
          );
        })}
        {newItem && (
          <li className={styles.listItem}>
            <div className={styles.newItem}>
              <div className={styles.iconContain}>{useIconRender(path.slice(1))}</div>

              <div className={styles.content}>
                <div className={styles.inputContain}>
                  <input
                    onChange={handleNewItemNameChange}
                    value={newItemName}
                  />
                </div>
                <button onClick={onAddSubmit}>
                  <SubmitIcon />
                </button>
              </div>
            </div>
          </li>
        )}
        {data?.length === 0 && !newItem && (
          <div className={styles.addSomeContain}>
            <p>Add some schit</p>
            <AddSomeImage />
          </div>
        )}
      </ul>
      <button onClick={() => setNewItem(true)} className={styles.addButton}>
        <AddIcon />
      </button>
    </>
  );
}
