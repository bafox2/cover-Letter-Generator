import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'
import Requests from '../../models/Request'
import { useSession, getSession } from 'next-auth/react'
import styles from '../../styles/Dashboard.module.scss'

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
    return <div>you need to log in to see this!</div>
  }

  return (
    <div className={styles.dashboard} key={user}>
      <div className={styles.dashboardUser}>
        <h1 className={styles.userTitle}>Name: {user?.name}</h1>
        <Image
          src={user?.avatar}
          height={320}
          width={320}
          alt="avatar"
          className={styles.bigAvatar}
        />
      </div>
      <div className={styles.requestTable}>
        <h2>Letters</h2>
        <ul>
          {requests.map((request) => (
            <Link href={`/dashboard/${request._id}`} key={request._id}>
              <li>
                <span className={styles.request}>{request.company}</span>
                <span className={styles.request}>{request.createdAt}</span>
              </li>
              {/* possibly add in request.createdAt too */}
            </Link>
          ))}
        </ul>
        <Link
          href={{
            pathname: `/dashboard/new`,
          }}
        >
          <button className={styles.newRequest}>New Query</button>
        </Link>
      </div>
    </div>
  )
}

//disclaimer - this is a fun project to dip my toes into tech that captivates me.
// Check your cover letter and use it as an inspiration. OpenAI allows the public to use their GPT-3 API and it is our duty to use it responsibly.

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
    const requests = await Requests.find({ user: session.user.name })
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
