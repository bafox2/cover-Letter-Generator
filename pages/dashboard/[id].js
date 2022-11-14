import Request from '../../models/Request'
import dbConnect from '../../lib/dbConnect'
import { getSession, useSession } from 'next-auth/react'
import styles from '../../styles/Home.module.scss'

const SampleLetter = ({ request }) => {
  const { data: session } = useSession()

  // I need to make sure that the user of the object and the user of the session are the same
  if (request.user !== session.user.name) {
    return <div>This isn&#39;t your request.</div>
  }

  return (
    <>
      <h1>Query</h1>
      <div>
        <h2>Inputs</h2>
        <div>
          <p>Company: {request.company}</p>
        </div>
        <div>
          <p>Position: {request.position}</p>
        </div>
        <div>
          <p>Job Listing: {request.jobListing}</p>
        </div>
        <div>
          <p>Highlights: {request.highlights}</p>
        </div>
      </div>
      <div className={styles.wide}>
        <h2>Output</h2>
        <p>{request.result}</p>
      </div>
    </>
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
  }
  if (context.params.id == undefined) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  if (session) {
    await dbConnect()
    console.log(context.params, 'context.params.id')
    const request = await Request.findOne({ _id: context.params.id }).lean()
    //check to see if the user is the same as the user of the request
    if (request.user !== session.user.name) {
      console.log('this is not your request')
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }
    return {
      props: {
        request: JSON.parse(JSON.stringify(request)),
        session: JSON.parse(JSON.stringify(session)),
      },
    }
  }
}

export default SampleLetter
