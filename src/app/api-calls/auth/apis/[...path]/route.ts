import { cookies } from 'next/headers';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL;

// Public endpoints that don't need authentication
const PUBLIC_ENDPOINTS = [
            "/api/v1/providers/top5",
            "/api/v1/providers/all",
            "/api/v1/providers/by-expertises",
            "/admin/realms/market-realm/users/",
            "/api/v1/client/persist",
            "/api/v1/category/all",
            "/api/v1/gig/active-posters",
            "/api/v1/providers/by-id",
            "/api/v1/review/by-gig-id"
];

function isPublicEndpoint(path: string): boolean {
  return PUBLIC_ENDPOINTS.some(endpoint => path.startsWith(endpoint));
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  // Reconstruct the Spring Boot API path
  const apiPath = `/${params.path.join('/')}`;
  const searchParams = request.nextUrl.searchParams.toString();
  const fullUrl = SPRING_BOOT_URL + apiPath + (searchParams ? '?' + searchParams : '');
  console.log('this is full url '+fullUrl);


  const headers: any = {
    'Content-Type': 'application/json',
  };

  // Add authentication if not a public endpoint
  if (!isPublicEndpoint(apiPath)) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    let body = null;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const text = await request.text();
      body = text ? JSON.parse(text) : null;
    }

    const response = await axios({
      method,
      url: fullUrl,
      data: body,
      headers,
    });

    return NextResponse.json(response.data, { status: response.status });

  } catch (error: any) {
    console.error(`Spring Boot API Error (${method} ${apiPath}):`, error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  //suppress(Unexpected `await` of a non-Promise (non-"Thenable") value.)
  return handleRequest(request, await params, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, await params, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, await params, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, await params, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, await params, 'PATCH');
}