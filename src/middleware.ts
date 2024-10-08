import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {

    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    if (req.nextUrl.pathname.startsWith('/_next/')) {
        return;
    }

    if (token) {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/dashboard/', req.nextUrl.origin));
        }
        return;
    } else {
        if (pathname === '/login' || pathname === '/register') {
            return;
        }
        return NextResponse.redirect(new URL('/login' + "?callback=" + req.url, req.nextUrl.origin));
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};
