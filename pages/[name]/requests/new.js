import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.scss'
import RequestForm from '../../../components/RequestForm'

export default function QueryPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Powered by <a href="https://openai.com">open.ai!</a>
        </h1>

        <RequestForm />
      </main>
    </div>
  )
}
