import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy Next.js pour la protection des routes.
 * (Anciennement middleware)
 * Vérifie la présence d'un refresh token cookie côté serveur.
 *
 * Note : Le vrai contrôle d'accès se fait côté backend (JWT).
 * Ce proxy est un gardien de premier niveau côté navigation.
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(
        `[Proxy] Path: ${pathname}, Cookies:`,
        request.cookies.getAll().map((c) => c.name),
    );

    // 1. Définition des types de routes
    const isPublicPath = pathname === "/" || pathname.startsWith("/blog");
    const isAdminPath = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/login";

    // NB: On a supprimé "/dashboard", donc on ne le protège plus explicitement ici.
    // L'essentiel de la protection est maintenant sur "/admin".
    const isProtected = isAdminPath;

    // 2. Récupérer les cookies de session
    const hasRefreshToken =
        request.cookies.has("refreshToken") ||
        !!request.headers.get("cookie")?.includes("refreshToken=");
    const userRole = request.cookies.get("userRole")?.value;

    // 3. Logique de redirection pour les routes protégées
    if (isProtected && !hasRefreshToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 4. Logique de redirection quand on est déjà connecté (sur la page login)
    if (isLoginPage && hasRefreshToken) {
        if (userRole === "ADMIN") {
            return NextResponse.redirect(
                new URL("/admin/dashboard", request.url),
            );
        }
        // Pour les autres rôles (ou si rôle inconnu), on renvoie vers l'accueil
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

/**
 * Configuration du matcher.
 * On inclut explicitement les routes sensibles.
 * On exclut les assets statiques et l'API pour ne pas ralentir l'app.
 */
export const config = {
    matcher: [
        "/admin/:path*",
        "/login",
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - _next/webpack-hmr (Fast Refresh)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|_next/webpack-hmr).*)",
    ],
};
