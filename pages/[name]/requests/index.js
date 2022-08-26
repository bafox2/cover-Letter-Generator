import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.scss'

export default function QueryPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Query</title>
        <meta name="description" content="get an ai generated cover letter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Your Requests</h1>
      </main>
    </div>
  )
}
