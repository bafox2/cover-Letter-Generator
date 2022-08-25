import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
const Header = () => {
  const { data: session } = useSession()
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
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
        </ul>
      </nav>
      <div>
        {session ? (
          <Link href={`${session?.user.name}`}>
            <a>
              Signed in as {session?.user.name}{' '}
              <span>
                <Image src={session?.user.image} height={32} width={32}></Image>
              </span>
              <br />
              <button onClick={() => signOut()}>Sign out</button>
            </a>
          </Link>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
