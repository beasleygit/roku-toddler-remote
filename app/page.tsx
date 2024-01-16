import { getSortedPostsData } from "@/lib/markdown"
import Link from 'next/link'

async function getPosts() {
  const allPostsData = getSortedPostsData()

  return allPostsData
}

export default async function Home() {
  const allPostsData = await getPosts()
  return (
    <main className="bg-blue-500 flex flex-col content-center flex-wrap">
      <nav className="px-10 py-6 flex flex-row flex-wrap justify-between content-center bottom-b-2 bg-blue-600">
        <h2 className="grow p-2 text-center text-white">THEO TV</h2>
      </nav>
      <div className="flex flex-row w-full flex-wrap mt-10 px-10">
      { allPostsData.map((postData) =>
        <Link href={`/blog/${postData.id}`} key={postData.id} className="hover:bg-blue-400 mx-3 rounded overflow-hidden">
            <div className="p-3 flex flex-col justify-center content-center text-center">
              <img className="rounded-full border-4 border-blue-300" src={postData.img} alt="test" />
              <h3 className="mt-2 text-white">{postData.author}</h3>
            </div>
        </Link> 
      )}
      </div>
    </main>    
  )
}