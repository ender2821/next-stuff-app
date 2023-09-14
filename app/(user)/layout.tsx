'use client'

import '../../styles/globals.css'
import styles from './main.module.scss'
import { useState } from 'react';
import Header from './Header'
import appContext from '../../lib/appContext';
import { Montserrat } from '@next/font/google';
import classNames from 'classnames';
import { SessionProvider } from "next-auth/react"

const montserrat = Montserrat({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  const [secondaryLayout, setSecondaryLayout] = useState(false);
  const [titleText, setTitleText] = useState('')
  
  return (
    <html>
      <head />
      <SessionProvider>
        <appContext.Provider 
          value={
            {secondaryLayout, setSecondaryLayout, titleText, setTitleText}
          }
        >
          <body className={montserrat.className}>
            <Header className={secondaryLayout ? 'headerSecondary' : ''} secondaryLayout={secondaryLayout} titleText={titleText} />
            <main className={classNames(styles.main, secondaryLayout && styles.mainSecondary)}>
              <div className={styles.container}>
                {children}
              </div>
            </main>
          </body>
        </appContext.Provider>
      </SessionProvider>
    </html>
  )
}
