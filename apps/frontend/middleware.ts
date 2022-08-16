import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const parseJwt = (token) => {
    const decode = JSON.parse(atob(token?.split('.')[1]));
    return decode.exp * 1000 >= new Date().getTime();
  };

  if (request.cookies.get('accessToken')) {
    if (parseJwt(request.cookies.get('accessToken'))) {
      if (
        request.nextUrl.pathname === '/api/v1/login' ||
        request.nextUrl.pathname === '/login'
      ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } else {
        return NextResponse.next();
      }
    } else {
      if (
        request.nextUrl.pathname === '/api/v1/login' ||
        request.nextUrl.pathname.includes('.') ||
        request.nextUrl.pathname === '/login'
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  } else {
    if (
      request.nextUrl.pathname === '/api/v1/login' ||
      request.nextUrl.pathname.includes('.') ||
      request.nextUrl.pathname === '/login'
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}
