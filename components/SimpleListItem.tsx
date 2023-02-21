import { useEffect, useRef, useState } from "react";

import styles from "./SimpleList.module.scss";
import DeleteIcon from "../assets/secondary-delete-icon.svg";
import SubmitIcon from "../assets/submit-icon.svg";

import { useRouter, usePathname } from "next/navigation";
import useClickOutside from "../hooks/useClickOutside";

type PageProps = {
  label?: string;
  item: string;
  id: string;
  itemKey: string;
  listName: string;
  onDelete: (key: string) => void;
};

export default function SimpleListItem(props: PageProps) {
  const { label, item, id, itemKey, listName, onDelete } = props;
  const router = useRouter();
  const path = usePathname();

  const [formLabel, setFormLabel] = useState("");
  const [formText, setFormText] = useState("");

  const { expanded, setExpanded, ref } = useClickOutside<HTMLDivElement>({
    callback: () => {
      setFormText(item);
      label && setFormLabel(label);
    },
  });

  // TODO: see if this can be refactored as a hook
  // const [expanded, setExpanded] = useState(false);
  // const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent): void => {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       setExpanded(false);
  //       setFormText(item);
  //       label && setFormLabel(label);
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside, true);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, [item, label]);
  //

  useEffect(() => {
    setFormText(item);
    label && setFormLabel(label);
  }, [item, label]);

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormLabel(value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormText(value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(itemKey, formText, label && formLabel);
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
          setExpanded(false);
        })
        .catch((error) => console.log(error));
    };
    handleSubmit();
  };

  const onFormDelete = () => {
    onDelete(itemKey);
  };

  return (
    <li className={styles.listItem}>
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
              <p className={styles.text}>{item}</p>
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
  );
}
