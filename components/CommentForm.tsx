import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface CommentFormProps {
  postId: string
}

export const CommentForm = ({ postId }: CommentFormProps) => {
  const { register, handleSubmit, formState, reset } = useForm<IFormInput>()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/create-comment', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(() => {
      console.log(data)
      reset()
      setSubmitted(true)
    }).catch((err) => {
      console.log(err)
      setSubmitted(false)
    })
  }

  if (submitted) {
    return (
      <div className='flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
        <h3 className='text-3xl font-bold mb-3 text-center'>Thank you for your comment!</h3>
        <p className='text-center'>Once it has been reviewed and approved it will appear below!</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="py-3 mt-2" />

      <input
        {...register("_id")}
        type="hidden"
        name="_id"
        value={postId}
      />

      <label className="flex flex-col mb-5">
        <span className="text-gray-700">Name</span>
        <input
          {...register("name", { required: true })}
          name="name"
          type="text"
          placeholder="Tell us your name"
          className="shadow border rounded py-2 px-3 form-input mt-1 w-full ring-yellow-500 outline-none focus:ring"
        />
        {formState.errors.name && (
          <p className="text-red-500 mt-1">The name field is required</p>
        )}
      </label>
      <label className="flex flex-col mb-5">
        <span className="text-gray-700">Email</span>
        <input
          {...register("email", { required: true })}
          name="email"
          type="email"
          placeholder="Tell us your email"
          className="shadow border rounded py-2 px-3 form-input mt-1 w-full ring-yellow-500 outline-none focus:ring"
        />
        {formState.errors.email && (
          <p className="text-red-500 mt-1">The email field is required</p>
        )}
      </label>
      <label className="flex flex-col mb-5">
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register("comment", { required: true })}
          name="comment"
          rows={8}
          placeholder="Share your comment with the author"
          className="shadow border rounded py-2 px-3 form-textarea mt-1 w-full ring-yellow-500 outline-none focus:ring"
        />
        {formState.errors.comment && (
          <p className="text-red-500 mt-1">The comment field is required</p>
        )}
      </label>
      <button type="submit" className='shadow bg-yellow-500 text-white hover:bg-yellow-400 transition-colors ease-in-out py-2 px-4 rounded cursor-pointer focus:shadow-outline focus:outline-none font-bold'>
        Send your comment
      </button>
    </form>
  )
}