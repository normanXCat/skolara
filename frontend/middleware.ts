import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware Next.js pour la protection des routes.
 * Vérifie la présence d'un refresh token cookie côté serveur.
 *
 * Note : Le vrai contrôle d'accès se fait côté backend (JWT).
 * Ce middleware est un gardien de premier niveau côté navigation.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Routes protégées
    const protectedPaths = ["/dashboard", "/admin"];
    const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path),
    );

    // Route de login
    const isLoginPage = pathname === "/login";

    // Vérifier la présence du cookie refresh token
    const hasRefreshToken = request.cookies.has("refreshToken");

    // Si la route est protégée et pas de cookie → rediriger vers login
    if (isProtected && !hasRefreshToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Si l'utilisateur est déjà connecté et essaie d'accéder à /login → rediriger vers dashboard
    if (isLoginPage && hasRefreshToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

/**
 * Configuration du matcher : routes sur lesquelles le middleware s'applique.
 */
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
