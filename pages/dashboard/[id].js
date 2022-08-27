import Request from '../../../models/Request'
import { getSession } from 'next-auth/react'

const SampleLetter = ({ request }) => {
  // requests have a company, position, joblisting, and highlights
  return (
    <main>
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
    </main>
  )
}

export async function getServerSideProps(context, params) {
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
    const request = await Request.findByID(params.id).lean()
    return { props: { request: JSON.parse(JSON.stringify(request)) } }
  }
}

export default SampleLetter
