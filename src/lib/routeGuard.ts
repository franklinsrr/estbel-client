import { PROTECTED_ROUTES, AUTH_ROUTES } from '@/constants/routes';

export class RouteGuard {
  constructor(private readonly pathname: string) {}

  /**
   * Verifica si la ruta actual está protegida
   * @returns {boolean} true si la ruta está protegida, false en caso contrario
   */
  isProtectedRoute(): boolean {
    return PROTECTED_ROUTES.some(route => this.pathname.startsWith(route));
  }

  /**
   * Verifica si la ruta actual es de autenticación
   * @returns {boolean} true si la ruta es de autenticación, false en caso contrario
   */
  isAuthRoute(): boolean {
    return AUTH_ROUTES.some(route => this.pathname.startsWith(route));
  }
}
