import type { AppProps } from 'next/app'
import '../styles/globals.css'
import styles from './main.module.scss'

import Header from './Header'
import Head from 'next/head'

import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Head>
        <title>Schit</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="A place to keep track of schit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
