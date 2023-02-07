
import styles from './SimpleList.module.scss';

import SimpleListItem from './SimpleListItem';

type PageProps = {
  data: Array<any>
  onSubmit: () => void;
}

export default function SimpleList(props:PageProps) {
  const { data, onSubmit } = props;

  return (
    <ul className={styles.list}>
      {data.map((item, i: number) => {
        return(
          <SimpleListItem label={item?.infoLabel} key={i} item={item?.infoItem} id={item?._key} onSubmit={onSubmit} />
        );
      })}
    </ul>
  )
}