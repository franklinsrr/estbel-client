import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RouteGuard } from './lib/routeGuard';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get('refreshToken');

  const routeGuard = new RouteGuard(pathname);

  /**
   * If the user has a refresh token, it means that the user is authenticated
   * If the user is trying to access an auth route, redirect to the dashboard
   * If the user is trying to access a protected route, allow access
   */
  if (refreshToken) {
    if (routeGuard.isAuthRoute()) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  }

  /**
   * If the user does not have a refresh token, it means that the user is not authenticated
   * If the user is trying to access a protected route, redirect to the signin page
   * If the user is trying to access an auth route, allow access
   */
  if (!refreshToken) {
    if (routeGuard.isProtectedRoute()) {
      const signinUrl = new URL('/auth/signin', request.url);
      signinUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
