import { ROUTES } from "./routes";

/**
 * Configuration des liens de navigation.
 */
export const NAVIGATION_LINKS = [
    { label: "Accueil", href: ROUTES.HOME },
    { label: "Actualités et Blog", href: ROUTES.BLOG },
    { label: "Calendrier Scolaire", href: ROUTES.CALENDAR },
    { label: "Pré-Inscription", href: ROUTES.PRE_REGISTRATION },
    { label: "Contact", href: ROUTES.CONTACT },
] as const;
