import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'

/* Allows you to view user card info and delete user card*/
const UserPage = ({ user }) => {
  const router = useRouter()
  // const handleDelete = async () => {
  //   const userID = router.query.id

  //   try {
  //     await fetch(`/api/users/${userID}`, {
  //       method: 'Delete',
  //     })
  //     router.push('/')
  //   } catch (error) {
  //     setMessage('Failed to delete the user.')
  //   }
  // }

  return (
    <div key={user}>
      <div className="card">
        <h5 className="user-name">Name: {user?.name}</h5>
        <Image src={user?.avatar} height={64} width={64} />
        <p>Cover Letters: {user?.coverletters.length}</p>
        <p>Queries: {user?.queries.length}</p>
        {user.queries.length > 0 && (
          <Link href={`/api/queries/${user.queries[0]}`}>
            <a>View Query</a>
          </Link>
        )}
        {user.coverletters.length > 0 && (
          <Link href={`/api/coverletters/${user.coverletters[0]}`}>
            <a>View Cover Letter</a>
          </Link>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const user = await User.findOne({ name: params.name }).lean()
  console.log(user)

  return { props: { user: JSON.parse(JSON.stringify(user)) } }
}

export default UserPage
