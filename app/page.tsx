"use client"
import { videos } from './posts/videos'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isClassActive, setIsClassActive] = useState(false)
  const [countdown, setCountdown] = useState(0)
  
  useEffect(() => {
    let interval;
    if (isClassActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000)
    }
    return () => clearInterval(interval);
  }, [isClassActive, countdown]);

  const handleClick = async (index) => {
    const arrayLength = videos[index].length
    const randomVid =  Math.floor(Math.random() * (arrayLength - 1)) + 1
    const video = videos[index][randomVid]

    setIsClassActive(true)
    setCountdown(15)

    setTimeout(() => {
      setIsClassActive(false);
    }, 15000)
  
    try {
      const response = await fetch(`/api/?slug=${video}`, { method: 'POST' })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      console.log('Request sent successfully')

    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <main className="bg-blue-500 flex flex-col content-center flex-wrap p-10">
      <div className={`${isClassActive ? 'hflex flex-wrap flex-col content-center justify-center' : 'hidden'}`}>
        <img src="/baby-shark.gif" className="max-w-60 mx-auto" />
        <h2 className="text-white text-4xl uppercase font-bold block text-center">Loading... </h2>
        <h2 className="text-white text-7xl uppercase font-bold block text-center mt-5">{countdown}</h2>
      </div>
      <div className={`grid grid-cols-5 gap-3 w-full ${isClassActive ? 'no-touch' : ''}`}>
        {videos.map((video, index) => (
          <div className="drop-shadow-lg flex justify-center content-end flex-wrap border-4 border-blue-700 rounded-xl aspect-square" style={{
            backgroundImage: `url('${index}.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} key={index} onClick={() => handleClick(index)}>
            <div className="bg-blue-500/80 border-t-4 border-blue-700 px-3 py-1 flex flex-col justify-center content-center w-full">
              <h2 className="text-center text-white text-xs xl:text-3xl">{video[0]}</h2>
              <span className="text-center font-bold text-white hidden xl:text-xl xl:block">{video.length-1} Videos</span>             
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
