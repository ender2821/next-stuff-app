import { SetStateAction, useEffect, useState } from "react";

import styles from "./SimpleList.module.scss";
import DeleteIcon from "../assets/secondary-delete-icon.svg";
import ExternalLinkIcon from "../assets/external-link-icon.svg";
import SubmitIcon from "../assets/submit-icon.svg";

import { useRouter, usePathname } from "next/navigation";
import useClickOutside from "../hooks/useClickOutside";
import Image from "next/image";
import Link from "next/link";
import urlFor from "../lib/urlFor";
import useImageHandler from "../hooks/useImageHandler";
import useImageSubmit from "../hooks/useImageSubmit";
import classNames from "classnames";
import { iconRender } from "../helpers";

type PageProps = {
  label?: string;
  image?: any;
  link: string;
  description: string;
  price: string;
  item: string;
  id: string;
  itemKey: string;
  listName: "infoList" | "toDoList" | "specList" | "toBuyList" | "ownedList";
  category?: 'vehicles' | 'tools' | 'gear' | 'life';
  onDelete: (key: string) => void;
};

export default function SimpleListItem(props: PageProps) {
  const {
    label,
    item,
    id,
    itemKey,
    listName,
    description,
    price,
    link,
    image,
    onDelete,
    category
  } = props;
  const router = useRouter();
  const path = usePathname();

  const [formLabel, setFormLabel] = useState("");
  const [formText, setFormText] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLink, setFormLink] = useState("");

  const { expanded, setExpanded, ref } = useClickOutside<HTMLDivElement>({
    callback: () => {
      setFormText(item);
      label && setFormLabel(label);
      price && setFormPrice(price);
      description && setFormDescription(description);
      link && setFormLink(link);
    },
  });

  const { images, setImages, imageURLs, setImageURLs } = useImageHandler();
  const { imageSubmit } = useImageSubmit(images, id, {
    callback: () => {
      setImages([]);
      setImageURLs([]);
    },
  }, listName, itemKey,);

  useEffect(() => {
    setFormText(item);
    label && setFormLabel(label);
    price && setFormPrice(price);
    description && setFormDescription(description);
    link && setFormLink(link);
  }, [item, label, price, description, link]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages([...(e.target.files as any)] as SetStateAction<never[]>);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormLabel(value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormText(value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormPrice(value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormDescription(value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormLink(value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(itemKey, formText, label && formLabel);
  };

  const onComplexFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onComplexSubmit(itemKey, formText, formPrice, formDescription, formLink);
  };

  const onSubmit = (key: string, text: string, label?: string) => {
    const handleSubmit = async () => {
      await fetch("/api/_updateList", {
        method: "post",
        body: JSON.stringify({
          _id: id,
          key: key,
          label: label,
          text: text,
          name: listName,
        }),
      })
        .then(() => {
          router.replace(path as string);
          // router.reload();
          setExpanded(false);
        })
        .catch((error) => console.log(error));
    };
    handleSubmit();
  };

  const onComplexSubmit = (
    key: string,
    item: string,
    price: string,
    description: string,
    link: string
  ) => {
    const handleSubmit = async () => {
      imageSubmit();
      await fetch("/api/_updateComplexList", {
        method: "post",
        body: JSON.stringify({
          _id: id,
          key: key,
          item: item,
          price: price,
          description: description,
          link: link,
          name: listName,
        }),
      })
        .then(() => {
          router.replace(path as string);
          setExpanded(false);
        })
        .catch((error) => console.log(error));
    };
    handleSubmit();
  };

  const onFormDelete = () => {
    onDelete(itemKey);
  };

  const handlePurchase = async() => {
    await fetch("/api/_purchaseItem", {
      method: "post",
      body: JSON.stringify({
        _id: id,
        key: itemKey,
        item: item,
        price: price,
        description: description,
        link: link,
        image: image,
      }),
    })
    .then(() => {
      onFormDelete();
    })
    .then(() => {
      router.replace(path as string);
    })
    .catch((error) => console.log(error));
  }

  return (
    <>
      {listName === "toBuyList" || listName === "ownedList" ? (
        <li className={classNames(styles.listItem, expanded && styles.expanded)}>
          <div
            className={styles.formContain}
            ref={ref}
            onClick={() => setExpanded(true)}
          >
            {expanded ? (
              <form
                onSubmit={onComplexFormSubmit}
                className={styles.externalForm}
              >
                <div className={styles.externalFormInputs} id="form">
                  <div className={styles.purchaseContain}>
                    <div className={styles.imageContain}>
                      {images.length > 0 ? (
                        <Image src={imageURLs[0]} alt={item} fill />
                      ) : image ? (
                        <Image src={urlFor(image).url()} alt={item} fill />
                      ) : (
                        <div className={styles.photoPlaceholder}>
                          {category && iconRender(category)}
                        </div>
                      )}
                      <label htmlFor="upload"></label>
                      <input
                        type="file"
                        id="upload"
                        accept="image/*"
                        onChange={onImageChange}
                      />
                    </div>
                    {listName === "toBuyList" && <button onClick={handlePurchase}>Purchase</button>}
                  </div>
                  <div className={styles.inputsContain}>
                    <div className={styles.inputContain}>
                      <label htmlFor="item" className={styles.label}>
                        Item
                      </label>
                      <input
                        id="item"
                        name="item"
                        value={formText}
                        onChange={handleTextChange}
                      />
                    </div>
                    <div className={styles.inputContain}>
                      <label htmlFor="cost" className={styles.label}>
                        Cost
                      </label>
                      <input
                        id="cost"
                        name="cost"
                        value={formPrice}
                        onChange={handlePriceChange}
                      />
                    </div>
                    <div className={styles.inputContain}>
                      <label htmlFor="description" className={styles.label}>
                        Description
                      </label>
                      <input
                        id="description"
                        name="description"
                        value={formDescription}
                        onChange={handleDescriptionChange}
                      />
                    </div>
                    <div className={styles.inputContain}>
                      <label htmlFor="description" className={styles.label}>
                        Link
                      </label>
                      <input
                        id="link"
                        name="link"
                        value={formLink}
                        onChange={handleLinkChange}
                      />
                    </div>
                  </div>
                </div>
                <button className={styles.submitExternal} type="submit">
                  <SubmitIcon />
                </button>
              </form>
            ) : (
              <>
                <div className={styles.externalFormContent}>
                  <div className={styles.imageContain}>
                    {image ? (
                      <Image
                        src={urlFor(image).url()}
                        alt={item}
                        height={80}
                        width={80}
                      />
                    ) : (
                      <div className={styles.photoPlaceholder}>
                        {category && iconRender(category)}
                      </div>
                    )}
                  </div>
                  <div className={styles.textContain}>
                    <p className={styles.text}>
                      {price} {item ? item : "New Item"}
                    </p>
                    <p className={styles.text}>{description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          {!expanded && (
            <div className={styles.externalFormButtons}>
              <button className={styles.delete} onClick={onFormDelete}>
                <DeleteIcon />
              </button>
              <Link
                className={styles.delete}
                href={link ? link : ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon />
              </Link>
            </div>
          )}
        </li>
      ) : (
        <li className={classNames(styles.listItem, expanded && styles.expanded)}>
          <div
            className={styles.formContain}
            ref={ref}
            onClick={() => setExpanded(true)}
          >
            {expanded ? (
              <form onSubmit={onFormSubmit}>
                <div className={styles.inputContain} id="form">
                  {label && (
                    <>
                      <label htmlFor="label" className={styles.label}>
                        Label
                      </label>
                      <input
                        id="label"
                        name="label"
                        value={formLabel}
                        onChange={handleLabelChange}
                      />
                    </>
                  )}
                  {label && (
                    <label htmlFor="text" className={styles.label}>
                      Text
                    </label>
                  )}
                  <input
                    id="text"
                    name="text"
                    value={formText}
                    onChange={handleTextChange}
                  />
                </div>
                <button className={styles.submit} type="submit">
                  <SubmitIcon />
                </button>
              </form>
            ) : (
              <>
                <div className={styles.content}>
                  <label className={styles.label}>{label}</label>
                  <p className={styles.text}>{item ? item : "New Item"}</p>
                </div>
              </>
            )}
          </div>
          {!expanded && (
            <button className={styles.delete} onClick={onFormDelete}>
              <DeleteIcon />
            </button>
          )}
        </li>
      )}
    </>
  );
}
