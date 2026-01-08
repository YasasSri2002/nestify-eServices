import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL;

export async function GET() {
    try {
        if (!SPRING_BOOT_URL) {
            return NextResponse.json(
                { error: 'SPRING_BOOT_API_URL not configured' },
                { status: 500 }
            );
        }

        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        const url = `${SPRING_BOOT_URL}/api/v1/providers/count-all`;
        
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch: ${response.status} ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching provider count:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}