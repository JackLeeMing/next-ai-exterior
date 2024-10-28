import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { getReplicate } from '@/lib/replicate'
const replicate = getReplicate()

export async function handler(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const prediction = await replicate.predictions.get(id);

    if (prediction?.error) {
        return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction);
}

export const GET = handler

export const POST = handler