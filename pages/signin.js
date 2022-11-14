import { signIn, getProviders } from 'next-auth/react'
import styles from '../styles/Signin.module.scss'
import { getSession } from 'next-auth/react'
import { mdiPost, mdiGithub } from '@mdi/js'
import { Icon } from '@mdi/react'

const Signin = ({ providers }) => {
  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.title}>Letter </h1>
        <p className={styles.disclaimer}>
          This app does not require any special permissions, Github is used
          solely for verification of identity.{' '}
        </p>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              className={styles.providerButton}
              onClick={() => signIn(provider.id)}
            >
              <p>Sign in with {provider.name} </p>
              <Icon path={mdiGithub} size={3} color="white" />
            </button>
          ))}
      </div>
    </main>
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
