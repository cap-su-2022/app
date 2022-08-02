import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios, { Axios } from 'axios';
import * as fs from 'fs';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.warn(request.nextUrl.pathname);

  // const checkTokenExpirationMiddleware = store => next => action => {
  //   const token =
  //     JSON.parse(localStorage.getItem("user")) &&
  //     JSON.parse(localStorage.getItem("user"))["token"];
  //   if (jwtDecode(token).exp < Date.now() / 1000) {
  //     next(action);
  //     localStorage.clear();
  //   }
  //   next(action);
  // };

  const parseJwt = (token) => {        
    const decode = JSON.parse(atob(token.split('.')[1]));
    if (decode.exp * 1000 < new Date().getTime()) {
        return false
    } else {
      return true
    }
};

// console.log(parseJwt('eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJtZkJPWlYxTnZZRG40TUxoUFQzYTRudkNhU1IxTmNqNjFrYWpkYXJVSG1BIn0.eyJleHAiOjE2NTkzNzI2MTUsImlhdCI6MTY1OTM2OTAxNSwianRpIjoiMDg4MDZhOWItYzYyMS00ZDE4LWIwNTgtMTM0Yjc2NWFlYWM4IiwiaXNzIjoiaHR0cDovLzM0LjE0Mi4xOTMuMTAwOjkwOTAvYXV0aC9yZWFsbXMvYXV0aGVudGljYXRpb24iLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiZjNlMDkzYTktNDg5YS00ZmQyLWE2MTktMmY2NmRjYTE0MjU2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXV0aGVudGljYXRpb24tYXBpIiwic2Vzc2lvbl9zdGF0ZSI6IjIyYTVhYjlhLTNiZGYtNDg1Yi05ZTY5LWExNmUwODljNjQ4OSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1hdXRoZW50aWNhdGlvbiIsIkFQUC1TVEFGRiIsIkFQUC1BRE1JTiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJkZWxldGUtYWNjb3VudCIsIm1hbmFnZS1jb25zZW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMjJhNWFiOWEtM2JkZi00ODViLTllNjktYTE2ZTA4OWM2NDg5IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJMb25nIE5ndXllbiIsInByZWZlcnJlZF91c2VybmFtZSI6ImxvbmdudiIsImdpdmVuX25hbWUiOiJMb25nIiwiZmFtaWx5X25hbWUiOiJOZ3V5ZW4iLCJlbWFpbCI6ImxvbmdudnNlMTQwNTE3QGZwdC5lZHUudm4ifQ.NnTyadXJ3abFeOWAyBE5QPhJiJoj_RBfKCmjZFL8AOz4w41SZGXMNtx9bwyOBX8GzB2fN-DDxZW1qGpgkagfJmImox1ZlNSY-AiiMyDZRmg-l7tDbHukyNUqrUPF4Tjvfs8fovDskIveqoY-HkQ1U7RSA2sLA7FrGcLNERxTdcvAMJiW_HKtqYY37NSCqVt9uhKzjO7NNBRkUA42-VfIBsWicYowq_vqWH6bNDDMdDp2i-1sJxOauwU0-6NBSogyAxLOrh1xBLGC1KpdyL2iT3X8ctnDd2nsIgo_BvRIiG19Xq8dTQTXWHx6blHNDTctlNZGr-brdusy01F3PrW4Xg'))

  if (
    request.nextUrl.pathname !== '/api/v1/login' &&
    !request.nextUrl.pathname.includes('.') &&
    request.nextUrl.pathname !== '/login' &&
    !request.cookies['accessToken']
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }  

  if (request.cookies['accessToken'] && parseJwt(request.cookies['accessToken']) && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
  //return NextResponse.redirect(new URL('/login', request.url))
}
