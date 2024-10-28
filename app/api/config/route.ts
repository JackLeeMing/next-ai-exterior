import { type NextRequest } from 'next/server'

async function handler(request: NextRequest) {
    const uid = request.nextUrl.searchParams.get('uid') || ''
    console.log(uid)
    const data = {
        vercel_url: process.env.VERCEL_URL,
        ngrok_host: process.env.NGROK_HOST,
        uid: ''
    }
    return Response.json({
        code: 0,
        msg: 'ok',
        data: data,
    })
}


export const GET = handler

export const POST = handler