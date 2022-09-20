import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { mdiPost, mdiContain } from '@mdi/js'
import { Icon } from '@mdi/react'

const Header = () => {
  const { data: session } = useSession()
  console.log(session, 'session from header with useSession')
  //use the nextjs router
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>
                <Icon path={mdiPost} size={1.5} color="white" />
                {''}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/example">
              <a>Example</a>
            </Link>
          </li>
          <li>
            <Link href="/demo">
              <a>Demo</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        {session ? (
          <Link
            href={{
              pathname: `/dashboard`,
            }}
          >
            <a>
              Signed in as {session?.user.name}{' '}
              <span>
                <Image
                  src={session?.user.image}
                  height={32}
                  width={32}
                  alt="avatar"
                ></Image>
              </span>
              <br />
              <button className={styles.button} onClick={() => signOut()}>
                Sign out
              </button>
            </a>
          </Link>
        ) : (
          <>
            Not signed in <br />
            <button className={styles.button} onClick={() => signIn()}>
              Sign in
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
