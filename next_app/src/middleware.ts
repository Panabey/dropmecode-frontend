import { NextRequest, NextResponse } from 'next/server';

export const config = {
	matcher: "/",
};

export default function middleware(req: NextRequest) {
	const isMaintenanceMode = Boolean(JSON.parse(String(process.env.NEXT_PUBLIC_IS_MAINTENANCE)))

	if (isMaintenanceMode && req.nextUrl.pathname !== '/maintenance') {
		req.nextUrl.pathname = `/maintenance`
		return NextResponse.redirect(req.nextUrl)
	}
}