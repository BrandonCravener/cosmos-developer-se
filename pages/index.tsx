import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()

  return (
    <>
      <Head>
        <title>Cosmos</title>
        <meta name="description" content="Curated search engine for developers." />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <main>
      </main>
    </>
  )
}
