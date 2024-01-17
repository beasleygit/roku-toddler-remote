"use client"
import { videos } from './posts/videos'

export default function Home() {

  const handleClick = async (index) => {
    const arrayLength = videos[index].length
    const randomVid =  Math.floor(Math.random() * (arrayLength - 1)) + 1
    const video = videos[index][randomVid]
    console.log(video)

    try {
      const response = await fetch(`/api/?slug=${video}`, { method: 'POST' })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // Handle success
      console.log('Request sent successfully')
    } catch (error) {
      console.error('Error fetching data:', error)
      // Handle error
    }
  }

  return (
    <main className="bg-blue-500 flex flex-col content-center flex-wrap p-10">
      <div className="grid grid-cols-4 gap-3 w-full">
        {videos.map((video, index) => (
          <div className="drop-shadow-lg flex justify-center content-end flex-wrap border-4 border-blue-700 rounded-xl aspect-square" style={{
            backgroundImage: `url('${index}.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} key={index} onClick={() => handleClick(index)}>
            <div className="bg-blue-500/80 border-t-4 border-blue-700 px-3 py-1 flex flex-col justify-center content-center w-full">
              <h2 className="text-center text-white text-md xl:text-3xl">{video[0]}</h2>
              <span className="text-center font-bold text-white text-xs xl:text-xl">{video.length} Videos</span>             
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
