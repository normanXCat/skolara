import { UseFormSetError, FieldValues, Path } from "react-hook-form";

/**
 * Types de réponses de l'API (Discriminated Union)
 */
export type ApiResponse<T> =
    | { success: true; data: T; message: string }
    | {
          success: false;
          error: string;
          details?: Array<{ path: string[]; message: string }>;
      };

/**
 * Interface pour les erreurs de validation backend
 */
export interface ApiValidationError {
    path: string[];
    message: string;
}

/**
 * Options de requête étendues
 */
interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Client API robuste pour Next.js / TypeScript
 */
class ApiClient {
    private async request<T>(
        endpoint: string,
        options: RequestOptions = {},
    ): Promise<ApiResponse<T>> {
        const { params, ...customConfig } = options;

        // Gestion des paramètres de requête (Query String)
        const url = new URL(`${BASE_URL}${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    url.searchParams.append(key, String(value));
                }
            });
        }

        const headers = {
            "Content-Type": "application/json",
            ...customConfig.headers,
        };

        const config: RequestInit = {
            ...customConfig,
            headers,
            credentials: "include", // Support des cookies HttpOnly par défaut
        };

        try {
            const response = await fetch(url.toString(), config);

            // Interception des erreurs HTTP globales
            if (response.status === 401) {
                // Optionnel : Rediriger vers login ou rafraîchir le token
                console.warn("Session expirée (401)");
            }

            if (response.status === 403) {
                console.error("Accès refusé (403)");
            }

            if (response.status >= 500) {
                return {
                    success: false,
                    error: "Erreur serveur interne. Veuillez réessayer plus tard.",
                };
            }

            const result = await response.json();

            // Si c'est une erreur 400 (validation), on renvoie le success: false
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
     * Helper pour injecter les erreurs backend dans react-hook-form
     */
    handleFormErrors<TFieldValues extends FieldValues>(
        details: ApiValidationError[],
        setError: UseFormSetError<TFieldValues>,
    ) {
        details.forEach((err) => {
            // Le path backend est un tableau (ex: ['childFirstName'])
            // On le joint ou on prend le premier élément pour correspondre au champ du formulaire
            const fieldName = err.path.join(".") as Path<TFieldValues>;
            setError(fieldName, {
                type: "server",
                message: err.message,
            });
        });
    }

    // Méthodes HTTP
    get<T>(endpoint: string, params?: RequestOptions["params"]) {
        return this.request<T>(endpoint, { method: "GET", params });
    }

    post<T>(endpoint: string, data?: any) {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    put<T>(endpoint: string, data?: any) {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    patch<T>(endpoint: string, data?: any) {
        return this.request<T>(endpoint, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }

    delete<T>(endpoint: string) {
        return this.request<T>(endpoint, { method: "DELETE" });
    }
}

export const api = new ApiClient();
export default api;
