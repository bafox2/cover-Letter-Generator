import styles from '../styles/Form.module.scss'
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
    console.log(json)
  }

  const formatMilliseconds = (milliseconds) => {
    //take milliseconds and convert to hours and minutes
    const hours = Math.floor(milliseconds / 3600000)
    const minutes = Math.floor((milliseconds - hours * 3600000) / 60000)
    if (hours == 0) {
      return `${minutes} minutes`
    }
    if (minutes == 0) {
      return `${milliseconds / 1000} seconds`
    }
    return `${hours} hours and ${minutes} minutes`
  }

  const onError = (errors, e) => console.log(errors, e, 'this is from on error')
  return (
    <>
      <div className={styles.demoDescription}>
        <h1>Demo</h1>
        {nextpost === true ? (
          <h3>{`Available now!`}</h3>
        ) : (
          <h3>{`Available in ${formatMilliseconds(nextpost)}`}</h3>
        )}

        <p>
          GPT3 isn&#39;t free, the &#39;free&#39; requests without signing in
          are only available once every thirty minutes. In the meantime, you can view
          the last request done by a user, just like <b>you</b>.
        </p>
      </div>
      <div className={styles.demos}>
        <div >
          <h2>Categories</h2>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="company">
              Company
            </label>
            <p className={styles.form__description}>
              Name of the place you want to work
            </p>
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="company">
              Position
            </label>
            <p className={styles.form__description}>
              Name of the position being hired for
            </p>
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="company">
              Highlights
            </label>
            <p className={styles.form__description}>
              Things you want to the AI to talk about that you bring to the
              table
            </p>
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="company">
              Job Requirements
            </label>
            <p className={styles.form__description}>
              Things that they are looking for in this position
            </p>
          </div>
        </div>
        <div >
          <h2>Last Demo</h2>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="company">
              Company
            </label>
            <p className={styles.form__description}>{lastpost.company == "" ? "Left blank!" : lastpost.company}</p>
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="company">
              Position
            </label>
            <p className={styles.form__description}>{lastpost.position == "" ? "Left blank!" : lastpost.position}</p>
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="company">
              Highlights
            </label>
            <p className={styles.form__description}>{lastpost.highlights == "" ? "Left blank!" : lastpost.highlights}</p>
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="company">
              Job Requirements
            </label>
            <p className={styles.form__description}>{lastpost.jobListing == "" ? "Left blank!" : lastpost.jobListing}</p>
          </div>
          <div className={`${styles.form__group} ${styles.result}`}>
            <label className={styles.form__label} htmlFor="company">
              Result
            </label>
            <p className={styles.form__description}>{lastpost.result}</p>
          </div>
        </div>
        {nextpost === true && (
          <form
            className={styles.newDemo}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <h2>New Request</h2>
            <div className={styles.form__group}>
              <label className={styles.form__label} htmlFor="company">
                Company
              </label>
              <input
                className={styles.form__input}
                {...register('company')}
                placeholder="Company"
              />
              {errors.company && (
                <p className={styles.error}>{errors.company.message}</p>
              )}
            </div>
            <div className={styles.form__group}>
              <label className={styles.form__label} htmlFor="position">
                Position
              </label>
              <input
                className={styles.form__input}
                {...register('position')}
                placeholder="Position"
              />
              {errors.position && (
                <p className={styles.error}>{errors.position.message}</p>
              )}
            </div>
            <div className={styles.form__group}>
              <label className={styles.form__label} htmlFor="location">
                Highlights
              </label>

              <input
                className={styles.form__input}
                {...register('highlights')}
                placeholder="Highlights"
              />
              {errors.highlights && (
                <p className={styles.error}>{errors.highlights.message}</p>
              )}
            </div>
            <div className={styles.form__group}>
              <label className={styles.form__label} htmlFor="location">
                Job Requirements
              </label>

              <input
                className={styles.form__input}
                {...register('jobListing')}
                placeholder="Job Requirements"
              />
              {errors.style && (
                <p className={styles.error}>{errors.style.message}</p>
              )}
            </div>
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  //find the most recent request from the user with the name demo and return it
  await dbConnect()
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
