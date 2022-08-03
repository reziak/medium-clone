import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Banner } from '../components/Banner'
import { PostThumbnail } from '../components/PostThumbnail'
import { sanityClient } from '../sanity'
import { PostShort, RawPost } from '../typings'

interface HomeProps {
  posts: PostShort[]
}

const Home: NextPage<HomeProps> = ({ posts }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Medium Clone</title>
      </Head>
      <Banner />

      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map((post) => (
          <PostThumbnail key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    _createdAt,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug,
    body
  }`

  const result = await sanityClient.fetch(query)

  const posts = result.map((post: RawPost) => {
    return {
      id: post._id,
      title: post.title,
      authorName: post.author.name,
      authorImage: post.author.image.asset._ref,
      description: post.description,
      mainImageUrl: post.mainImage.asset._ref,
      slug: post.slug.current,
    }
  })

  return {
    props: {
      posts,
    },
  }
}
