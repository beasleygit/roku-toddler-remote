"use client"

async function getData(yd) {
  const rokuDeviceIP = '192.168.50.225';
  const channelId = '837';

  try {
    const res = await fetch(`http://${rokuDeviceIP}:8060/launch/${channelId}?contentId=${yd}&t=0`, {
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
    }

    // Check if the response body is not empty and is JSON
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return data;
    } catch (err) {
      console.error("Response is not valid JSON:", text);
      return null; // or handle this case as you see fit
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // rethrow the error after logging
  }
}

export default function InteractiveVideo({ vid }) {
  const handleClick = async () => {
    try {
      const data = await getData(vid.url)
      console.log(data)
      // Handle the data as needed
    } catch (error) {
      console.error(error)
      // Handle error appropriately
    }
  }

  return (
    <div onClick={handleClick} className="min-w-64 hover:bg-blue-400 mx-3 rounded overflow-hidden">
      <div className="p-3 flex flex-col justify-center content-center text-center">
        <img className="rounded border-4 border-blue-300 aspect-[4/3]" src={`https://img.youtube.com/vi/${vid.url}/hqdefault.jpg`} alt="test" />
      </div>
    </div>
  )
}
