import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * URL directe du backend pour les appels serveur-à-serveur.
 * On ne passe PAS par le rewrite Next.js (qui utilise `/api`)
 * mais directement vers le backend pour éviter les boucles.
 */
const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

/**
 * Type de réponse standard de l'API.
 */
export type ServerApiResponse<T> =
    | { success: true; data: T; message: string }
    | { success: false; error: string; details?: any };

/**
 * Effectue un appel API depuis un Server Component avec gestion
 * automatique des cookies et du rafraîchissement de token.
 *
 * Avantages par rapport à `api.get()` direct :
 * - Forward automatique des cookies de la requête vers le backend
 * - Gestion transparente du 401 : tente un refresh avant d'échouer
 * - URL absolue vers le backend (pas de boucle via rewrite)
 * - Pas de singleton client-side avec état mutable
 *
 * @param endpoint - Endpoint API (ex: "/admin/stats")
 * @param options - Options fetch supplémentaires
 * @returns La réponse typée de l'API
 */
export async function serverFetch<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<ServerApiResponse<T>> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const cleanEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;
    const url = `${BACKEND_URL}/api${cleanEndpoint}`;

    const config: RequestInit = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader,
            ...options.headers,
        },
        cache: options.cache || "no-store",
    };

    try {
        let response = await fetch(url, config);

        // Si 401, tenter un refresh avec le refreshToken du cookie
        if (response.status === 401) {
            const refreshed = await attemptServerRefresh(cookieHeader);

            if (refreshed) {
                // Rejouer la requête avec les nouveaux cookies
                // Le middleware aura déjà mis à jour les cookies, mais au cas
                // où on arrive ici sans passer par le middleware (ISR, etc.)
                const newCookieStore = await cookies();
                const newConfig: RequestInit = {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: newCookieStore.toString(),
                        ...options.headers,
                    },
                    cache: options.cache || "no-store",
                };

                response = await fetch(url, newConfig);
            }
        }

        // Toujours un 401 après le refresh → session expirée
        if (response.status === 401) {
            return { success: false, error: "Session expirée" };
        }

        if (response.status >= 500) {
            return {
                success: false,
                error: "Erreur serveur interne. Veuillez réessayer plus tard.",
            };
        }

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: result.error || "Une erreur est survenue",
                details: result.details,
            };
        }

        return {
            success: true,
            data: result.data as T,
            message: result.message || "Opération réussie",
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Erreur de connexion au serveur",
        };
    }
}

/**
 * Tente un refresh de token côté serveur.
 * Retourne true si le refresh a réussi.
 */
async function attemptServerRefresh(cookieHeader: string): Promise<boolean> {
    try {
        const refreshRes = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieHeader,
            },
        });

        return refreshRes.ok;
    } catch {
        return false;
    }
}

/**
 * Helper pour les Server Components : fetch + redirect automatique si session expirée.
 *
 * @param endpoint - Endpoint API
 * @param redirectOnError - Chemin de redirection si non-auth (défaut: la page d'accueil du rôle)
 * @returns Les données typées, ou redirect si erreur auth
 */
export async function serverFetchOrRedirect<T>(
    endpoint: string,
    redirectOnError: string = "/login",
    options: RequestInit = {},
): Promise<T> {
    const result = await serverFetch<T>(endpoint, options);

    if (!result.success) {
        if (result.error === "Session expirée") {
            redirect("/login");
        }
        redirect(redirectOnError);
    }

    return result.data;
}
