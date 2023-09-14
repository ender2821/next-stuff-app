"use client";

import React, { useContext, useEffect } from 'react';
import appContext from "../../lib/appContext";

import Link from 'next/link';
import styles from './main.module.scss';

import VehicleIcon from '../../assets/vehicle-icon.svg';
import ToolsIcon from '../../assets/specs-icon.svg';
import GearIcon from '../../assets/gear-icon.svg';
import LifeIcon from '../../assets/life-icon.svg';
import { signIn, signOut, useSession } from 'next-auth/react';

function Home() {
  const { setSecondaryLayout, setTitleText } = useContext(appContext);

  useEffect(() => {
    setSecondaryLayout(false);
    setTitleText("");
  }, [setSecondaryLayout, setTitleText]);

  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </> ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      <ul className={styles.homeLinks}>
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
