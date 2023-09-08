"use client";

import React, { useContext, useEffect } from 'react';
import appContext from "../../lib/appContext";

import Link from 'next/link';
import styles from './main.module.scss';

import VehicleIcon from '../../assets/vehicle-icon.svg';
import ToolsIcon from '../../assets/specs-icon.svg';
import GearIcon from '../../assets/gear-icon.svg';
import LifeIcon from '../../assets/life-icon.svg';

function Home() {
  const { setSecondaryLayout } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(false);
  }, [setSecondaryLayout]);

  return (
    <>
      <ul className={styles.homeLinks}>
        <li>
          <Link href="/vehicles">
            <div className={styles.iconContain}>
              <VehicleIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/tools">
            <div className={styles.iconContain}>
              <ToolsIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/gear">
            <div className={styles.iconContain}>
              <GearIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/life">
            <div className={styles.iconContain}>
              <LifeIcon />
            </div>
          </Link>
        </li>
      </ul>
    </>  
  )
}

export default Home;
