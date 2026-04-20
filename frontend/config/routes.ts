/**
 * Centralisation des routes de l'application.
 */
export const ROUTES = {
    HOME: "/",
    BLOG: "/blog",
    CALENDAR: "/calendrier",
    PRE_REGISTRATION: "/pre-registration",
    CONTACT: "/contact",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
