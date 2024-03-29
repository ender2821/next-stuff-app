import { useRouter, usePathname } from 'next/navigation';

import AddIcon from '../assets/add-icon.svg';
import AddSomeImage from '../assets/add-some-schit-image.svg';
import styles from './SimpleList.module.scss';

import SimpleListItem from './SimpleListItem';

type PageProps = {
  data: Array<any>
  id: string;
  listName: 'infoList' | 'toDoList' | 'specList' | 'toBuyList' | 'ownedList';
  hasLabel?: boolean;
  category?: 'vehicles' | 'tools' | 'gear' | 'life';
}

export default function SimpleList(props:PageProps) {
  const { data, id, listName, hasLabel, category } = props;
  const router = useRouter();
  const path = usePathname();

  const onDelete = async(key: string) => {
    await fetch('/api/_deleteListItem', {
      method: 'post',
      body: JSON.stringify({ _id: id, key: key, name: listName}),
    })
    .then(() => {
      router.refresh();
    })
    .catch((error) => console.log(error));
  }

  const onAdd = async() => {
    await fetch('/api/_addListItem', {
      method: 'post',
      body: JSON.stringify({ _id: id, name: listName, label: hasLabel ? 'New Item' : undefined}),
    }).then(() => {
      router.refresh();
    }).catch((error) => console.log(error));
  }

  return (
    <ul className={styles.list}>
      {data && data.length > 0 ? (
        data?.map((item, i: number) => {
          return(
            <SimpleListItem category={category} {...item} key={i} itemKey={item?._key} id={id} onDelete={onDelete} listName={listName}/>
          );
        })
      ) : (
        <>
        {listName !== "infoList" && (
          <div className={styles.addSomeContain}>
          <p>Add some schit</p>
            <AddSomeImage />
          </div>
          )}
        </>
      )}
      <button onClick={onAdd} className={styles.addButton}><AddIcon/></button>
    </ul>
  )
}