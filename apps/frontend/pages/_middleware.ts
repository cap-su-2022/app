import {NextRequest, NextResponse} from "next/server";
import {NextURL} from "next/dist/server/web/next-url";

const validateToken = async (accessToken: string): Promise<boolean> => {
  const response = await fetch("http://localhost:5000/api/v1/health/auth", {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });
  if (response.status === 200) {
    const responseData = await response.text();
    if (responseData === 'pong!') {
      return true;
    }
  }
  return false;
}

export async function middleware(req: NextRequest) {

  if (req.url.includes("login")) {
    return NextResponse.next();
  }

  const isValidated = await validateToken(req.cookies['accessToken']);
  if (isValidated) {
    return NextResponse.next();
  } else {
    return NextResponse.next();
  }
}
