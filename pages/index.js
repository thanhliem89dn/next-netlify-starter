import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { fetchEntries } from '../util/contentfulPosts'
import Post from '@components/Post'

export default function Home({posts}) {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <div className="posts">
          {posts && posts.map((p) => {
            return <Post key={p.date} date={p.date} image={p.image?.fields} title={p.title} />
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries()
  const posts = await res.filter((entry) => {
    return entry.sys.contentType.sys.id === "post"
  }).map((p) => {
    return p.fields
  })
  console.log(posts)
  return {
    props: {
      posts,
    },
  }
}