import { Comment } from "../typings"

interface CommentsListProps {
  comments: Comment[]
}

export const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <div className="max-w-2xl p-10 my-10 mx-auto shadow-yellow-500 shadow space-y-2">
      <h3 className="text-4xl">Comments</h3>
      <hr className="pb-2" />
      {comments.map(comment => (
        <div
          key={comment._id}
          className="bg-yellow-100 p-4 rounded-lg"
        >
          <strong>{comment.name} commented:</strong>
          <p className="ml-5">{comment.comment}</p>
        </div>
      ))}
    </div>
  )
}