import '../../styles/globals.css'
import styles from './main.module.scss'

import Header from './Header'
import Head from 'next/head'

import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body className={montserrat.className}>
        <Header />
        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  )
}
