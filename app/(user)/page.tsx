
import React from 'react';
import Link from 'next/link';
import styles from './main.module.scss'


function Home() {
  return (
    <>
      <ul className={styles.homeLinks}>
        <li>
          <Link href="/vehicles">

            Vehicles
            
          </Link>
        </li>
      </ul>
    </>  
  )
}

export default Home;