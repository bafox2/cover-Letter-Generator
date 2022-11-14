import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Header.module.scss'
import { mdiPost, mdiContain } from '@mdi/js'
import { Icon } from '@mdi/react'

const Header = () => {
  const { data: session } = useSession()
  //use the nextjs router
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.nav__link}>
          <Link href="/">
            <a className={styles.logo}>
              <Icon
                className={styles.header__logo_svg}
                path={mdiPost}
                color=""
              />
              <div className={styles.logo__tag}>
                <p className={styles.logo__line}>Letter</p>
                <p className={styles.logo__line}>Starter</p>
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.nav__group}>
          <div className={styles.nav__link}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </div>
          <div className={styles.nav__link}>
            <Link href="/example">
              <a>Example</a>
            </Link>
          </div>
          <div className={styles.nav__link}>
            <Link href="/demo">
              <a>Demo</a>
            </Link>
          </div>
          {session && (
            <div className={styles.nav__link}>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </div>
          )}
        </div>
        <div className={styles.nav__link}>
          {session ? (
            // <Link
            //   href={{
            //     pathname: `/dashboard`,
            //   }}
            // >
            <p className={styles.profile}>
              <span className={styles.username}>{session?.user.name}</span>
              <button className={styles.buttonHeader} onClick={() => signOut()}>
                Sign out
              </button>
            </p>
          ) : (
            // </Link>
            <>
              No profile <br />
              <button className={styles.buttonHeader} onClick={() => signIn()}>
                Sign in
              </button>
            </>
          )}
        </div>
      </nav>
      <div></div>
    </header>
  )
}

export default Header
