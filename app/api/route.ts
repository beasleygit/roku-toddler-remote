import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const slug = searchParams.get('slug')
  const rokuDeviceIP = '192.168.50.225'
  const channelId = '837';

  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 });
  }

  try {
    const res = await fetch(`http://${rokuDeviceIP}:8060/launch/${channelId}?contentId=${slug}`, {
      method: 'POST'
    })

    return new Response('Request to Roku sent successfully', { status: 200 })
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 })
  }
}
