import {useEffect, useRef, useState} from 'react';

import styles from './SimpleList.module.scss';
import DeleteIcon from '../assets/secondary-delete-icon.svg';
import SubmitIcon from '../assets/submit-icon.svg';

type PageProps = {
  label?: string;
  item: string;
  id: string;
  onSubmit: (id:string, text:string, label?: string) => void;
}

export default function SimpleListItem(props:PageProps) {
  const { label, item, onSubmit, id } = props;

  const [formLabel, setFormLabel] = useState('');
  const [formText, setFormText] = useState('');

  // TODO: see if this can be refactored as a hook 
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(false);
        setFormText(item);
        label && setFormLabel(label);
      }
    };
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [item, label]);
  //

  useEffect(() => {
    setFormText(item);
    label && setFormLabel(label);
  }, [item, label]);

  const handleLabelChange = (event) => {
    const value = event.target.value;
    setFormLabel(value)
  }

  const handleTextChange = (event) => {
    const value = event.target.value;
    setFormText(value)
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(id, formText, label && formLabel);
  }

  return (
    <li className={styles.listItem} ref={ref} onClick={() => setExpanded(true)} >
      {expanded ? (
        <form onSubmit={onFormSubmit}>
          <div className={styles.inputContain}  id="form">
            {label && 
              <>
                <label htmlFor="label" className={styles.label} >Label</label>
                <input id="label" name="label" value={formLabel} onChange={handleLabelChange}/>
              </>
            }
            <label htmlFor="text" className={styles.label} >Text</label>
            <input id="text" name="text" value={formText} onChange={handleTextChange}/>
          </div>
          <button className={styles.submit} type="submit" ><SubmitIcon /></button>
        </form>
      ) : (
        <>
          <div className={styles.content}>
            <label className={styles.label}>{label}</label>
            <p className={styles.text}>{item}</p>
          </div>
          <button className={styles.delete} onClick={() => alert('delete')}><DeleteIcon /></button>
        </>
        )
      }
    </li>
  )
}