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
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(false);
    setTitleText("");
  }, [setSecondaryLayout, setTitleText]);

  return (
    <>
      <ul className={styles.homeLinks}>
        <h1 className={styles.title}>System for Comprehensive Home Inventory and Tasks</h1>
        <li>
          <Link href="/vehicles">
            <div className={styles.iconContain}>
              <VehicleIcon />
            </div>
            <p>Vehicles</p>
          </Link>
        </li>
        <li>
          <Link href="/tools">
            <div className={styles.iconContain}>
              <ToolsIcon />
            </div>
            <p>Tools</p>
          </Link>
        </li>
        <li>
          <Link href="/gear">
            <div className={styles.iconContain}>
              <GearIcon />
            </div>
            <p>Gear</p>
          </Link>
        </li>
        <li>
          <Link href="/life">
            <div className={styles.iconContain}>
              <LifeIcon />
            </div>
            <p>Life</p>
          </Link>
        </li>
      </ul>
    </>  
  )
}

export default Home;
