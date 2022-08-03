import Link from "next/link"
import { urlFor } from "../sanity"
import { PostShort } from "../typings"

interface PostThumbnailProps {
  post: PostShort
}

export const PostThumbnail = ({ post }: PostThumbnailProps) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <a className="border rounded-lg group cursor-pointer overflow-hidden">
        <img
          className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={urlFor(post.mainImageUrl).url()!}
          alt=""
        />
        <div className="flex justify-between p-5 bg-white">
          <div>
            <strong className="text-lg font-bold">{post.title}</strong>
            <p className="text-sm">{post.description} by {post.authorName}</p>
          </div>
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(post.authorImage).url()!} 
            alt={post.authorName}
          />
        </div>
      </a>
    </Link>
  )
}