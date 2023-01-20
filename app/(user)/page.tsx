
import React from 'react';
import Link from 'next/link';
import Image  from 'next/image';
import styles from './main.module.scss'

function Home() {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.homeLinks}>
          <li>
            <Link href="/vehicles">Vehicles</Link>
          </li>
        </ul>
      </div>
    </>  
  )
}

export default Home;