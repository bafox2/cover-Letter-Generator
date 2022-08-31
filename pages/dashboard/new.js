import styles from '../../styles/Home.module.scss'
import { useForm } from 'react-hook-form'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'

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
  }

  const onError = (errors, e) => console.log(errors, e)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Powered by <a href="https://openai.com">open.ai!</a>
        </h1>

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
      </main>
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
