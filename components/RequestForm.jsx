import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const RequestForm = () => {
  //validations - maxlength for some, minlength,

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data, e) => console.log(data, e)
  const onError = (errors, e) => console.log(errors, e)
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register('strengths')} placeholder="Strengths" />
      {errors.strengths && <p>{errors.strengths.message}</p>}
      <input {...register('highlights')} placeholder="Highlights" />
      {errors.highlights && <p>{errors.highlights.message}</p>}
      <input {...register('style')} placeholder="Style" />
      {errors.style && <p>{errors.style.message}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}

export default RequestForm
