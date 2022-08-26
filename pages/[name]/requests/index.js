import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.scss'
import { useForm } from 'react-hook-form'

export default function QueryPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Query</title>
        <meta name="description" content="get an ai generated cover letter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Your Requests</h1>

        <div className={styles.grid}>
          <a className={styles.card}>
            <h2>Your Strengths</h2>
            <input
              type="text"
              className="input"
              {...register('strengths', { required: true })}
            />
          </a>

          <a className={styles.card}>
            <h2>Company Highlights</h2>
            <input
              type="text"
              className="input"
              {...register('highlights', { required: true })}
            />
          </a>
        </div>

        <button type="submit">Submit</button>
      </main>
    </div>
  )
}
