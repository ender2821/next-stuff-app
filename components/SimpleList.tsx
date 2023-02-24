import { useRouter, usePathname } from 'next/navigation';

import AddIcon from '../assets/add-icon.svg';
import styles from './SimpleList.module.scss';

import SimpleListItem from './SimpleListItem';

type PageProps = {
  data: Array<any>
  id: string;
  listName: 'infoList' | 'toDoList' | 'specList' | 'toBuyList' | 'ownedList';
}

export default function SimpleList(props:PageProps) {
  const { data, id, listName } = props;
  const router = useRouter();
  const path = usePathname();

  const onDelete = (key: string) => {
    const handleDelete = async() => {
        await fetch('/api/_deleteListItem', {
          method: 'post',
          body: JSON.stringify({ _id: id, key: key, name: listName}),
        }).then(() => {
          router.replace(path as string);
        }).catch((error) => console.log(error));
    };
    handleDelete();
  }

  const onAdd = () => {
    const handleAdd = async() => {

        await fetch('/api/_addListItem', {
          method: 'post',
          body: JSON.stringify({ _id: id, name: listName, label: data && data[0]?.label ? 'New Item' : undefined}),
        }).then(() => {
          router.replace(path as string);
        }).catch((error) => console.log(error));
    };
    handleAdd();
  }

  return (
    <ul className={styles.list}>
      {data && data.length > 0 ? (
        data?.map((item, i: number) => {
          return(
            <SimpleListItem {...item} key={i} itemKey={item?._key} id={id} onDelete={onDelete} listName={listName}/>
          );
        })
      ) : (
        <p>Add some schit</p>
      )}
      <button onClick={onAdd} className={styles.addButton}><AddIcon/></button>
    </ul>
  )
}