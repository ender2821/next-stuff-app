import { useRouter, usePathname } from 'next/navigation';

import styles from './SimpleList.module.scss';

import SimpleListItem from './SimpleListItem';

type PageProps = {
  data: Array<any>
  onSubmit: (id:string, text:string, label?: string) => void;
  id: string;
}

export default function SimpleList(props:PageProps) {
  const { data, onSubmit, id } = props;
  const router = useRouter();
  const path = usePathname();

  const onDelete = (key: string) => {
    const handleDelete = async() => {
        await fetch('/api/_deleteListItem', {
          method: 'post',
          body: JSON.stringify({ _id: id, key: key}),
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
          body: JSON.stringify({ _id: id}),
        }).then(() => {
          router.replace(path as string);
        }).catch((error) => console.log(error));
    };
    handleAdd();
  }

  console.log(data)

  return (
    <ul className={styles.list}>
      {data.map((item, i: number) => {
        return(
          <SimpleListItem label={item?.label} key={i} itemKey={item?._key} item={item?.item} id={id} onSubmit={onSubmit} onDelete={onDelete} />
        );
      })}
      <button onClick={onAdd}>Add New Item</button>
    </ul>
  )
}