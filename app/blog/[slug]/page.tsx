import { singlePost } from '@/lib/markdown'
import InteractiveVideo from '../../components/interactiveVideo'

async function getPosts(slug) {
  const postData = singlePost(slug)
  return postData
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPosts(params.slug)

  if (postData.notFound) {
    // Render a not-found message or component
    return (
      <main className="flex flex-col content-center justify-center flex-wrap">
        <h2>Post Not Found</h2>
        <p>The requested post could not be found.</p>
      </main>
    )
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  // Shuffle videos
  const shuffledVideos = shuffleArray([...postData.video]);

  return (
    <main className="bg-blue-500 flex flex-col content-center flex-wrap">
      <nav className="px-10 py-6 flex flex-row flex-wrap justify-between content-center bottom-b-2 bg-blue-600">
        <a href="/" className="hover:bg-blue-900 border-blue-800 border-2 text-lg text-white rounded bg-blue-700 self-center py-2 px-6 uppercase">
          <span>&#8592; Go Back</span>
        </a>  
        <h2 className="grow p-2 ml-10 mb-0 text-white">{postData.author}</h2>
      </nav>
      <div className="flex flex-row w-full flex-wrap mt-10 px-10 content-center justify-center">
      { shuffledVideos.map((vid) =>
        <InteractiveVideo key={vid.url} vid={vid} />
      )}
      </div>
    </main>      
  )
}
