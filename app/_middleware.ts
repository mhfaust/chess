import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

	if (!token) {
		// User is not logged in
		// Redirect or handle unauthenticated access
		return new Response('Unauthorized', { status: 401 });
	}

	// User is logged in, proceed with the request
	return new Response(null, { status: 200 });
}
