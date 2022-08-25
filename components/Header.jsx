import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
const Header = () => {
  const { data: session } = useSession()
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/example">Example</a>
          </li>
        </ul>
      </nav>
      <div>
        {session ? (
          <>
            Signed in as {session?.user.name}{' '}
            <span>
              <Image src={session?.user.image} height={32} width={32}></Image>
            </span>
            <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
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
