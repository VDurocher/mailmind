/**
 * Routes centralisées — évite les chaînes de caractères dispersées dans l'app.
 */

export const ROUTES = {
  /** Pages publiques */
  landing: '/',
  login: '/login',
  register: '/register',

  /** App (protégée) */
  dashboard: '/dashboard',
  inbox: '/inbox',
  inboxDetail: (id: string) => `/inbox/${id}`,
  settings: '/settings',
} as const
