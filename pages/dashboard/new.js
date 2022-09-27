import styles from '../../styles/Form.module.scss'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { mdiLoading } from '@mdi/js'
import { Icon } from '@mdi/react'

export default function QueryPage() {
  //validations - maxlength for some, minlength,
  //could add user to the
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { data: session } = useSession()
  async function onSubmit(data) {
    setLoading((prevState) => !prevState)
    data = { data, user: session.user.name, type: 'user' }
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    setLoading((prevState) => !prevState)
    const json = await response
    console.log(json, 'this is from the json in the /dashboard/new.js')
    // Router.push(`/dashboard/${json._id}`)
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
      {loading && (
        <Icon
          path={mdiLoading}
          size={3}
          color="blue"
          className={styles.loading}
        />
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const sessionAuth = await getSession(context)
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
