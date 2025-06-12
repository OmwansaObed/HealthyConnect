// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedAdminPaths = ["/admin"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const isAdminRoute = protectedAdminPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isAdminRoute) {
    if (!token || token.role !== true) {
      const onlyAdmins = new URL("/only-admins", req.url);
      return NextResponse.redirect(onlyAdmins);
    }
  }

  return NextResponse.next();
}
