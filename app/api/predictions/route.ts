import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { getReplicate } from '@/lib/replicate'
import type { WebhookEventType } from 'replicate'
import { VERSION } from '@/lib/data'
// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NGROK_HOST;

type Options = {
    version: string,
    input: Record<string, string | number>,
    webhook: string,
    webhook_events_filter: WebhookEventType[]
}


export async function POST(request: NextRequest) {

    if (!process.env.REPLICATE_API_TOKEN) {
        return NextResponse.json({ error: 'The REPLICATE_API_TOKEN environment variable is not set.', code: 500 });
    }
    const replicate = getReplicate()
    const {
        prompt,
        a_prompt = 'best quality, extremely detailed',
        n_prompt = 'longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality',
        image
    } = await request.json();

    if (!image) {
        return NextResponse.json({ error: 'image can not be empty', code: 500 });
    }

    const options: Options = {
        version: VERSION,
        input: {
            eta: 0,
            image: image,
            scale: 9,
            prompt: prompt,
            a_prompt: a_prompt,
            n_prompt: n_prompt,
            ddim_steps: 20,
            num_samples: "1",
            value_threshold: 0.1,
            image_resolution: "512",
            detect_resolution: 512,
            distance_threshold: 0.1
        },
        webhook: '',
        webhook_events_filter: []
    }

    if (WEBHOOK_HOST) {
        options.webhook = `${WEBHOOK_HOST}/api/webhooks`
        options.webhook_events_filter = ["start", "completed"]
    }
    // A prediction is the result you get when you run a model, including the input, output, and other details
    try {
        const prediction = await replicate.predictions.create(options);
        console.log('prediction', prediction)
        if (prediction?.error) {
            return NextResponse.json({ error: prediction.error, code: 500 });
        }
        return NextResponse.json({ code: 200, data: prediction }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ code: 500, error: 'requst error' });
    }

}