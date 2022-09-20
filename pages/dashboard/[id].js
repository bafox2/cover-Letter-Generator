import Request from '../../models/Request'
import dbConnect from '../../lib/dbConnect'
import { getSession, useSession } from 'next-auth/react'

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
        <p>Company: {request.company}</p>
        <p>Position: {request.position}</p>
        <p>Job Listing: {request.jobListing}</p>
        <p>Highlights: {request.highlights}</p>
      </div>
      <div>
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
  } else {
    await dbConnect()
    const request = await Request.findOne({ _id: context.params.id }).lean()
    return {
      props: {
        request: JSON.parse(JSON.stringify(request)),
        session: JSON.parse(JSON.stringify(session)),
      },
    }
  }
}

export default SampleLetter
