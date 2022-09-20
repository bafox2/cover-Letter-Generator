import styles from '../styles/Home.module.scss'
import { useForm } from 'react-hook-form'
import dbConnect from '../lib/dbConnect'
import Request from '../models/Request'
import User from '../models/User'

export default function QueryPage({ nextpost, lastpost }) {
  //need to add in some type of preview card
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {
    console.log(data)
    data = { data, user: 'demo', type: 'demo' }
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    const json = await response.json()
  }

  const formatMilliseconds = (milliseconds) => {
    //take milliseconds and convert to hours and minutes
    const hours = Math.floor(milliseconds / 3600000)
    const minutes = Math.floor((milliseconds - hours * 3600000) / 60000)
    return `${hours} hours and ${minutes} minutes`
  }

  const onError = (errors, e) => console.log(errors, e, 'this is from on error')
  console.log()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Powered by <a href="https://openai.com">open.ai!</a>
      </h1>
      <div>
        <h2>Demo Timing</h2>
        {nextpost === true ? (
          <h3>{`Available now!`}</h3>
        ) : (
          <h3>{`Available in ${formatMilliseconds(nextpost)}`}</h3>
        )}

        <p>
          GPT3 isn&#39;t free, the &#39;free&#39; requests without signing in
          are only available once every two hours. In the meantime, you can view
          the last request done by a user, just like <b>you</b>.
        </p>
      </div>
      <div>
        <h2>Last Demo</h2>
        <p>{lastpost.company}</p>
        <p>{lastpost.position}</p>
        <p>{lastpost.highlights}</p>
        <p>{lastpost.jobListing}</p>
        <p>{lastpost.result}</p>
      </div>
      {nextpost === true && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input {...register('company')} placeholder="Company" />
          {errors.company && <p>{errors.company.message}</p>}
          <input {...register('position')} placeholder="Position" />
          {errors.company && <p>{errors.company.message}</p>}
          <input {...register('highlights')} placeholder="Highlights" />
          {errors.highlights && <p>{errors.highlights.message}</p>}
          <input {...register('jobListing')} placeholder="Job Listing" />
          {errors.style && <p>{errors.style.message}</p>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  //find the most recent request from the user with the name demo and return it
  await dbConnect()
  const checkDemo = await Request.findOne({ user: 'demo' })
  const checkUser = await User.findOne({ name: 'demo' })
  checkUser
    ? console.log('user found')
    : User.create({
        name: 'demo',
        avatar: 'https://avatars.githubusercontent.com/u/63611775?v=4',
        requests: 0,
      })
  const request = await Request.findOne({ user: 'demo' }).sort({
    createdAt: -1,
  })
  const demoUser = await User.findOne({ name: 'demo' })
  const nextRequestTiming = await demoUser.calculateNextRequest()
  console.log(nextRequestTiming, 'this is the next request timing')

  return {
    props: {
      lastpost: JSON.parse(JSON.stringify(request)),
      nextpost: JSON.parse(JSON.stringify(nextRequestTiming)),
    },
  }
}
