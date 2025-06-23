import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Constantes para las rutas
const PROTECTED_ROUTES = ['/dashboard'];
const AUTH_ROUTES = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/change-password',
];

/**
 * Verifica si la ruta actual está protegida
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Verifica si la ruta actual es de autenticación
 */
function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get('refreshToken');

  console.log('Middleware - Path:', pathname);
  console.log('Middleware - RefreshToken exists:', !!refreshToken);

  // Si el usuario tiene refreshToken (está autenticado)
  if (refreshToken) {
    // Si intenta acceder a rutas de auth, redirigir al dashboard
    if (isAuthRoute(pathname)) {
      console.log(
        'Usuario autenticado intentando acceder a ruta de auth, redirigiendo al dashboard'
      );
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Si accede a rutas protegidas o cualquier otra ruta, permitir acceso
    return NextResponse.next();
  }

  // Si NO tiene refreshToken (no está autenticado)
  if (!refreshToken) {
    // Si intenta acceder a rutas protegidas, redirigir al signin
    if (isProtectedRoute(pathname)) {
      console.log(
        'Usuario no autenticado intentando acceder a ruta protegida, redirigiendo al signin'
      );
      const signinUrl = new URL('/auth/signin', request.url);
      // Agregar parámetro de redirect para volver después del login
      signinUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signinUrl);
    }

    // Si accede a rutas de auth u otras rutas públicas, permitir acceso
    return NextResponse.next();
  }

  // Fallback: permitir acceso
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
