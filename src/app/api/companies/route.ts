import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = await fetch('http://192.168.0.140:5000/companies');
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch companies');
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export const fetchCompanies = async () => {
    const response = await fetch('/api/companies');
    if (!response.ok) {
        throw new Error('Failed to fetch companies');
    }
    return await response.json();
};