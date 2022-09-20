import styles from '../../styles/Form.module.scss'
import { useForm } from 'react-hook-form'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'

export default function QueryPage() {
  //validations - maxlength for some, minlength,

  //could add user to the body
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { data: session } = useSession()
  async function onSubmit(data) {
    data = { data, user: session.user.name, type: 'user' }
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    const json = await response.json()
    Router.push(`/dashboard/${json._id}`)
  }

  const onError = (errors, e) => console.log(errors, e)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Powered by <a href="https://openai.com">open.ai!</a>
      </h1>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles.form__group}>
          <label className={styles.form__label} htmlFor="company">
            Company
          </label>
          <p className={styles.form__description}>
            Name of the place you want to work
          </p>
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
          <p className={styles.form__description}>
            Name of the place you want to work
          </p>
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
          <p className={styles.form__description}>
            Things you want to the AI to talk about that you bring to the table
          </p>
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
            Job Listing
          </label>
          <p className={styles.form__description}>
            Things that they are looking for in this position
          </p>
          <input
            className={styles.form__input}
            {...register('jobListing')}
            placeholder="Job Listing"
          />
          {errors.style && (
            <p className={styles.error}>{errors.style.message}</p>
          )}
        </div>
        <button className={styles.submit} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  const sessionAuth = await getSession(context)
  console.log(sessionAuth, 'sessionfr om server side')
  if (!sessionAuth) {
    return {
      redirect: {
        destination: '/unauthenticated',
        permanent: false,
      },
    }
  } else {
    return {
      props: {},
    }
  }
}
