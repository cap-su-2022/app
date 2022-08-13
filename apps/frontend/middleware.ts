import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const parseJwt = (token) => {
    const decode = JSON.parse(atob(token?.split('.')[1]));
    if (decode.exp * 1000 < new Date().getTime()) {
      return false;
    } else {
      return true;
    }
  };

  if (
    request.nextUrl.pathname !== '/api/v1/login' &&
    !request.nextUrl.pathname.includes('.') &&
    request.nextUrl.pathname !== '/login' &&
    !request.cookies.get('accessToken')
  ) {
    console.log('dont have token');
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (
    request.cookies.get('accessToken') &&
    request.nextUrl.pathname === '/login'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else if (
    request.cookies.get('accessToken') &&
    !request.nextUrl.pathname.includes('.') &&
    request.nextUrl.pathname !== '/api/v1/login' &&
    request.nextUrl.pathname !== '/login'
  ) {
    if (
      parseJwt(request.cookies.get('accessToken')) &&
      request.nextUrl.pathname === '/login'
    ) {
      console.log('token còn hạn');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (
      !parseJwt(request.cookies.get('accessToken')) &&
      request.nextUrl.pathname !== '/login'
    ) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
  //return NextResponse.redirect(new URL('/login', request.url))
}
