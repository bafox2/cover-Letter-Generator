import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Header.module.scss'
import { mdiPost, mdiContain } from '@mdi/js'
import { Icon } from '@mdi/react'

const Header = () => {
  const { data: session } = useSession()
  console.log(session, 'session from header with useSession')
  //use the nextjs router
  return (
    <header>
      <nav>
        <ul className={styles.navbar}>
          <li className={styles.nav__link}>
            <Link href="/">
              <a>
                <Icon path={mdiPost} size={1.5} color="white" />
                {''}
              </a>
            </Link>
          </li>
          <li className={styles.nav__link}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li className={styles.nav__link}>
            <Link href="/example">
              <a>Example</a>
            </Link>
          </li>
          <li className={styles.nav__link}>
            <Link href="/demo">
              <a>Demo</a>
            </Link>
          </li>
          {session && (
            <li className={styles.nav__link}>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
          )}

          <li className={styles.nav__link}>
            {session ? (
              <Link
                href={{
                  pathname: `/dashboard`,
                }}
              >
                <a className={styles.profile}>
                  {' '}
                  {/* <Image
                    src={session?.user.image}
                    height={32}
                    width={32}
                    alt="avatar"
                    className={styles.avatar}
                  ></Image> */}
                  <span className={styles.username}>{session?.user.name}</span>
                  <button
                    className={styles.buttonHeader}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </a>
              </Link>
            ) : (
              <>
                No profile <br />
                <button
                  className={styles.buttonHeader}
                  onClick={() => signIn()}
                >
                  Sign in
                </button>
              </>
            )}
          </li>
        </ul>
      </nav>
      <div></div>
    </header>
  )
}

export default Header
