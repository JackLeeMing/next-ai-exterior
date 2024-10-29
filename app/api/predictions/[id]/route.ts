import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { getReplicate } from '@/lib/replicate'
const replicate = getReplicate()

async function handler(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const prediction = await replicate.predictions.get(id);
        if (prediction?.error) {
            return NextResponse.json({ error: prediction.error, code: 500 });
        }
        return NextResponse.json({ code: 200, data: prediction });
    } catch (error) {
        return NextResponse.json({ code: 500, error: 'fail to get prediction ' + id });
    }
}

export const GET = handler

export const POST = handler