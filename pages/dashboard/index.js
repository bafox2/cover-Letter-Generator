import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'
import Requests from '../../models/Request'
import { useSession, getSession } from 'next-auth/react'

const UserPage = ({ user, requests }) => {
  const { data: session, status } = useSession()

  console.log(session, 'session being callled in user page with useSession')
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

  if (!session) {
    return (
      <main>
        <div>you</div>
      </main>
    )
  }

  return (
    <main key={user}>
      <div className="card">
        <h1 className="user-name">Name: {user?.name}</h1>
        <Image src={user?.avatar} height={64} width={64} />

        <div>
          <Link
            href={{
              pathname: `/dashboard/new`,
            }}
          >
            <a>Past Queries</a>
          </Link>
          <div>
            {requests.map((request) => (
              <div key={request._id}>
                <Link href={`/dashboard/${request._id}`}>
                  <a>{request.company}</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleDelete}>Delete Self</button>
    </main>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/unauthenticated',
        permanent: false,
      },
    }
  } else {
    await dbConnect()

    const user = await User.findOne({ name: session?.user.name }).lean()
    const requests = await Requests.find({ user: session.user.name }).lean()
    console.log(requests, 'requests')

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        requests: JSON.parse(JSON.stringify(requests)),
      },
    }
  }
}

export default UserPage
