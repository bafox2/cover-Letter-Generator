import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'

/* Allows you to view user card info and delete user card*/
const UserPage = ({ user }) => {
  const router = useRouter()
  console.log(router, 'router')
  const handleDelete = async () => {
    const username = router.query.name

    try {
      await fetch(`/api/users/${username}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the user.')
    }
  }

  return (
    <main key={user}>
      <div className="card">
        <h1 className="user-name">Name: {user?.name}</h1>
        <Image src={user?.avatar} height={64} width={64} />
        <p>Cover Letters: {user?.coverletters.length}</p>
        <p>Queries: {user?.queries.length}</p>
        {user?.queries.length > 0 && (
          <Link href={`/api/queries/${user.queries[0]}`}>
            <a>View Query</a>
          </Link>
        )}
        {user?.coverletters.length > 0 && (
          <Link href={`/api/coverletters/${user.coverletters[0]}`}>
            <a>View Cover Letter</a>
          </Link>
        )}
        <div>
          <Link
            href={{
              pathname: `${router.query.name}/requests`,
            }}
          >
            <a>New Query</a>
          </Link>
        </div>
        <div>
          <Link
            href={{
              pathname: `${router.query.name}/requests/new`,
            }}
          >
            <a>Past Queries</a>
          </Link>
        </div>
      </div>
      <button onClick={handleDelete}>Delete Self</button>
    </main>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const user = await User.findOne({ name: params.name }).lean()

  return { props: { user: JSON.parse(JSON.stringify(user)) } }
}

export default UserPage
