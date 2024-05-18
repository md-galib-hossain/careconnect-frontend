import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type TRole = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/doctors",
];
const roleBasedPrivateRoutes = {
  PATIENT: [/^\/dashboard\/patient/],
  DOCTOR: [/^\/dashboard\/doctor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.nextUrl);
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  let decodedData = null;
  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }
  const role = decodedData?.role;
  // if(role === 'ADMIN' && pathname.startsWith('/dashboard/admin')){
  // return NextResponse.next()
  // }
  // if(role === 'DOCTOR' && pathname.startsWith('/dashboard/doctor')){
  // return NextResponse.next()
  // }
  // if(role === 'PATIENT' && pathname.startsWith('/dashboard/patient')){
  // return NextResponse.next()
  // }
  // if(role === 'SUPER_ADMIN' && pathname.startsWith('/dashboard/super-admin')){
  // return NextResponse.next()
  // }
  if (role && roleBasedPrivateRoutes[role as TRole]) {
    const routes = roleBasedPrivateRoutes[role as TRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  //when role & path permission not matched then redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/dashboard/:page*"],
};
