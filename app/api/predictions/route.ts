import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { getReplicate } from '@/lib/replicate'
import type { WebhookEventType } from 'replicate'
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
        throw new Error(
            'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
        );
    }

    const replicate = getReplicate()

    const {
        prompt,
        a_prompt = 'best quality, extremely detailed',
        n_prompt = 'longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality',
        image } = await request.json();

    if (!image) {
        return NextResponse.json({ detail: 'image can not be empty' }, { status: 500 });
    }

    const options: Options = {
        version: '854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b',
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
    const prediction = await replicate.predictions.create(options);

    if (prediction?.error) {
        return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }
    return NextResponse.json(prediction, { status: 201 });
}