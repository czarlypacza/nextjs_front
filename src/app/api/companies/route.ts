import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    console.log('query', query);

    let categories = searchParams.get('tags')?.split(',') || [];
    categories = categories.map((category) => category.trim().toLowerCase().split(' ').join('_'));
    console.log('categories', categories);

    try {
        const data = await prisma.company.findMany({
            where: {
                name: {
                    contains: query,
                },
                categories: {
                    some: {
                        category: {
                            name: {
                                in: categories,
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
                name: true,
                review_count: true,
                categories: {
                    select: {
                        category: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
