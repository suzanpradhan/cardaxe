import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string[] } }
) {
    const slug = (params.slug as string[]).join('/');
    const path = '/' + slug.replace('/home', '').replace('home', '');
    const secret = req.nextUrl.searchParams.get('secret');

    if (secret !== process.env.REVALIDATION_TOKEN) {
        return NextResponse.json(
            { message: 'Invalid token' },
            {
                status: 200,
            }
        );
    }

    try {
        await revalidatePath(path);
        return NextResponse.json({
            revalidated: true,
            page: path,
        });
    } catch (err) {
        return NextResponse.json('Error revalidating', {
            status: 500,
        });
    }
}
