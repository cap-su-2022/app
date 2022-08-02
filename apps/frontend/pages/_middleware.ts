import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios, { Axios } from 'axios';
import * as fs from 'fs';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.warn(request.nextUrl.pathname);

  if (
    request.nextUrl.pathname !== '/api/v1/login' &&
    !request.nextUrl.pathname.includes('.') &&
    request.nextUrl.pathname !== '/login' &&
    !request.cookies['accessToken']
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.cookies['accessToken'] && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
  //return NextResponse.redirect(new URL('/login', request.url))
}
