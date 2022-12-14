import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { sanityClient, urlFor } from "../../sanity"
import { Comment, Post, RawPost } from "../../typings"
import PortableText from 'react-portable-text'
import { CommentForm } from "../../components/CommentForm"
import { CommentsList } from "../../components/CommentsList"

interface SinglePostProps {
  post: Post
  comments: Comment[]
}

const SinglePost = ({ post, comments }: SinglePostProps) => {
  return (
    <main>
      <Head>
        <title>{post.title}</title>
      </Head>
      <img
        className="w-full h-40 object-cover"
        src={post.mainImageUrl} alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3 font-bold">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>

        <div className="flex items-center gap-2">
          <img
            className="h-10 w-10 rounded-full"
            src={post.authorImage}
            alt=""
          />
          <p className="font-extralight text-sm">
            Blog post by{' '}
            <Link href={`/authors/${post.authorName}`}>
              <a className="text-green-600 hover:underline transition ease-in-out">
                {post.authorName}
              </a>
            </Link>{' '}
            - Published at {post.createdAt}
          </p>
        </div>

        <div className="my-10">
          <PortableText 
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={
              {
                h1: (props: any) => {
                  return <h1 className="text-2xl font-bold my-5" {...props} />
                },
                h2: (props: any) => {
                  return <h2 className="text-xl font-bold my-5" {...props} />
                },
                li: ({ children }: any) => {
                  return <li className="ml-4 list-disc">{children}</li>
                },
                link: ({ href, children }: any) => {
                  return (<a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>)
                },
                normal: (props: any) => {
                  return <p className="mb-5" {...props} />
                },
              }
            }
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      <CommentForm postId={post.id} />
      {comments && (
        <CommentsList comments={comments} />
      )}
    </main>
  )
}

export default SinglePost

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug
  }`

  const result = await sanityClient.fetch(query)

  const paths = result.map((post: RawPost) => {
    return { params: {
      slug: post.slug.current
    }}
  })

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      author -> {
        name,
        image
      },
      'comments': *[
        _type == "comment" &&
        post._ref == ^._id &&
        approved == true
      ],
      description,
      mainImage,
      slug,
      body
    }
  `

  const result = await sanityClient.fetch(query, {
    slug: params?.slug
  })

  if (!result) {
    return {
      notFound: true
    }
  }

  const post = {
    id: result._id,
    createdAt: new Date(result._createdAt).toLocaleString(),
    title: result.title,
    authorName: result.author.name,
    authorImage: urlFor(result.author.image.asset._ref).url(),
    description: result.description,
    mainImageUrl: urlFor(result.mainImage.asset._ref).url(),
    slug: result.slug.current,
    body: result.body
  }

  const comments = result.comments ? result.comments : []

  return {
    props: {
      post,
      comments,
    },
    revalidate: 10,
  }
}