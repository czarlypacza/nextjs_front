import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    console.log('query', query);

    try {
        const data = await prisma.company.findMany({
            where: {
                name: {
                    contains: query,
                },
            },
            select: {
                id: true,
                name: true,
                review_count: true,
            },
        });
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
