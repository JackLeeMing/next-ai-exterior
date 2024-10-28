import { type NextRequest } from 'next/server'
import { getReplicate } from '@/lib/replicate'
import { writeFile } from "node:fs/promises";
const replicate = getReplicate()

async function handler(request: NextRequest) {
    const uid = request.nextUrl.searchParams.get('uid') || ''
    console.log(uid)
    const output = await replicate.run(
        "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
        {
            input: {
                eta: 0,
                image: "https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png",
                scale: 9,
                prompt: "a cheerful modernist bedroom",
                a_prompt: "best quality, extremely detailed",
                n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
                ddim_steps: 20,
                num_samples: "1",
                value_threshold: 0.1,
                image_resolution: "512",
                detect_resolution: 512,
                distance_threshold: 0.1
            }
        }
    );
    const str = []
    if (Array.isArray(output)) {
        for (let i = 0; i < output.length; i++) {
            const filename = `outputs/output_${i}.png`
            await writeFile(filename, output[i]);
            str.push(filename)
        }
    }
    console.log("Image saved as output.png");
    return Response.json({
        code: 0,
        msg: 'ok',
        data: str,
    })
}


export const GET = handler

export const POST = handler