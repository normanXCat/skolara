import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * ─── Backend URL pour les appels serveur-à-serveur ───
 * En middleware, on n'a pas accès au runtime Node, mais on peut utiliser
 * les variables d'environnement. BACKEND_URL doit être l'URL directe du backend.
 */
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

/**
 * Middleware Next.js pour la protection des routes et le rafraîchissement
 * proactif des tokens d'accès.
 *
 * Stratégie :
 * 1. Routes publiques → passer directement
 * 2. Route de login + refreshToken → rediriger vers le dashboard
 * 3. Route protégée + pas de refreshToken → rediriger vers login
 * 4. Route protégée + refreshToken + pas d'accessToken → rafraîchir le token
 *    côté serveur AVANT le rendu du Server Component
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ──── 1. Classification des routes ────
    const isPublicPath =
        pathname === "/" ||
        pathname.startsWith("/blog") ||
        pathname.startsWith("/legal") ||
        pathname.startsWith("/contact") ||
        pathname.startsWith("/calendar") ||
        pathname.startsWith("/pre-registration");

    const isAdminPath = pathname.startsWith("/admin");
    const isTeacherPath = pathname.startsWith("/teacher");
    const isStudentPath = pathname.startsWith("/student");
    const isParentPath = pathname.startsWith("/parent");
    const isLoginPage = pathname === "/login";

    const isProtected = isAdminPath || isTeacherPath || isStudentPath || isParentPath;

    // ──── 2. Récupérer les cookies de session ────
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const accessToken = request.cookies.get("accessToken")?.value;
    const userRole = request.cookies.get("userRole")?.value;

    const hasRefreshToken = !!refreshToken;
    const hasAccessToken = !!accessToken;

    // ──── 3. Routes publiques → passer ────
    if (isPublicPath && !isLoginPage) {
        return NextResponse.next();
    }

    // ──── 4. Page de login + connecté → rediriger vers le bon dashboard ────
    if (isLoginPage && hasRefreshToken) {
        if (userRole === "ADMIN") {
            return NextResponse.redirect(
                new URL("/admin/dashboard", request.url),
            );
        }
        if (userRole === "ENSEIGNANT") {
            return NextResponse.redirect(
                new URL("/teacher/dashboard", request.url),
            );
        }
        if (userRole === "ELEVE") {
            return NextResponse.redirect(
                new URL("/student/dashboard", request.url),
            );
        }
        if (userRole === "PARENT") {
            return NextResponse.redirect(
                new URL("/parent/dashboard", request.url),
            );
        }
        return NextResponse.redirect(new URL("/", request.url));
    }

    // ──── 5. Route protégée sans refreshToken → login ────
    if (isProtected && !hasRefreshToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ──── 6. Route protégée avec refreshToken mais SANS accessToken ────
    //   → On tente un refresh proactif côté serveur avant d'atteindre le Server Component
    if (isProtected && hasRefreshToken && !hasAccessToken) {
        try {
            const refreshResponse = await fetch(
                `${BACKEND_URL}/api/auth/refresh`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `refreshToken=${refreshToken}`,
                    },
                },
            );

            if (refreshResponse.ok) {
                // Extraire les Set-Cookie du backend (pour le navigateur)
                const setCookieHeaders =
                    refreshResponse.headers.getSetCookie?.() ||
                    (refreshResponse.headers as any)
                        .raw?.()
                        ?.["set-cookie"] ||
                    [];

                // On doit aussi mettre à jour les headers de la requête pour que 
                // les Server Components suivants voient les nouveaux cookies.
                const newHeaders = new Headers(request.headers);
                let cookieString = request.headers.get("cookie") || "";

                // Créer la réponse de base
                const response = NextResponse.next({
                    request: {
                        headers: newHeaders,
                    },
                });

                // Propager chaque Set-Cookie du backend vers le navigateur (Response)
                // ET mettre à jour la chaîne de cookies pour la requête (Request)
                for (const cookie of setCookieHeaders) {
                    response.headers.append("Set-Cookie", cookie);

                    // Extraire name=value pour le header Cookie de la requête
                    const match = cookie.match(/^([^=]+)=([^;]*)/);
                    const isProtectedRoute =
                        pathname.startsWith("/admin") ||
                        pathname.startsWith("/teacher") ||
                        pathname.startsWith("/student") ||
                        pathname.startsWith("/parent");
                    if (match) {
                        const name = match[1].trim();
                        const value = match[2].trim();
                        
                        // Mettre à jour dans l'objet response.cookies (pour faire propre)
                        response.cookies.set(name, value, { path: "/", httpOnly: name !== "userRole" });
                        
                        // Mettre à jour manuellement la chaîne de cookies pour les headers de requête
                        // On remplace l'ancien cookie s'il existe, sinon on l'ajoute
                        const cookiePart = `${name}=${value}`;
                        const regex = new RegExp(`${name}=[^;]+`);
                        if (cookieString.match(regex)) {
                            cookieString = cookieString.replace(regex, cookiePart);
                        } else {
                            cookieString += (cookieString ? "; " : "") + cookiePart;
                        }
                    }
                }

                // Injecter la nouvelle chaîne de cookies dans la requête transmise aux Server Components
                newHeaders.set("cookie", cookieString);

                return response;
            }

            // Le refresh a échoué → le token est invalide ou expiré
            // On nettoie tous les cookies et on redirige vers login
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            const response = NextResponse.redirect(loginUrl);

            // Supprimer les cookies obsolètes
            response.cookies.delete("refreshToken");
            response.cookies.delete("accessToken");
            response.cookies.delete("userRole");

            return response;
        } catch (error) {
            // Erreur réseau vers le backend — on laisse passer,
            // le Server Component gérera l'erreur
            console.error(
                "[Middleware] Erreur lors du refresh proactif:",
                error,
            );
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}

/**
 * Configuration du matcher.
 * On cible uniquement les routes qui nécessitent un contrôle d'accès.
 */
export const config = {
    matcher: [
        "/admin/:path*",
        "/teacher/:path*",
        "/student/:path*",
        "/parent/:path*",
        "/login",
    ],
};
