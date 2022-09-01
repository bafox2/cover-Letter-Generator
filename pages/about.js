import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function About() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>About</h1>

        <p className={styles.description}>
          A few of the tools used to make this tool.
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Next js</h2>
            <p>
              Next js gave is a &lsquono assembly required &lsquo tool to give a
              great React developer experience.
            </p>
          </a>

          <a href="https://next-auth.js.org/docs" className={styles.card}>
            <h2>Next-Auth</h2>
            <p>
              Next-Auth is a great authentication system for Next.js. It&#39;s
              built on top of Passport.js.
            </p>
          </a>

          <a href="https://openai.com" className={styles.card}>
            <h2>Openai</h2>
            <p>
              Openai is a great tool to use for machine learning, and a fountain
              of inspiration for possibilities in the future.
            </p>
          </a>

          <a href="https://mongoosejs.com" className={styles.card}>
            <h2>Mongoose</h2>
            <p>
              Mongoose is the database for this project, and is a great tool to
              use for creating and updating models.
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}
