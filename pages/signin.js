import { signIn, getProviders } from 'next-auth/react'
import styles from '../styles/Signin.module.scss'
import { getSession } from 'next-auth/react'
import { mdiPost, mdiGithub } from '@mdi/js'
import { Icon } from '@mdi/react'

const Signin = ({ csrfToken, providers }) => {
  return (
    <>
      <div className={styles.cardWrapper}>
        <Icon path={mdiPost} size={3.5} color="white" />
        <h1 className={styles.title}>Cover Letter Generator</h1>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ marginBottom: 0 }}>
              <Icon path={mdiGithub} size={1} color="white" />
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        <p className={styles.disclaimer}>
          This app doesn't require any special permissions, Github is used
          solely for verification of identity.{' '}
        </p>
      </div>
    </>
  )
}

export default Signin

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const session = await getSession(context)
  if (session) {
    return {
      redirect: { destination: '/dashboard' },
    }
  }
  return {
    props: {
      providers,
    },
  }
}
