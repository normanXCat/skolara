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
    private isRefreshing = false;
    private refreshPromise: Promise<boolean> | null = null;
    private refreshQueue: Array<(success: boolean) => void> = [];

    /**
     * Attend la résolution d'un refresh en cours.
     * Utilisé par les requêtes concurrentes pour ne pas lancer de refresh parallèle.
     */
    private waitForRefresh(): Promise<boolean> {
        return new Promise((resolve) => {
            this.refreshQueue.push(resolve);
        });
    }

    /**
     * Tente un refresh du token avec un retry en cas d'erreur réseau.
     */
    private async attemptRefresh(): Promise<boolean> {
        const maxRetries = 2;
        for (let i = 0; i < maxRetries; i++) {
            try {
                const refreshRes = await this.post<{ accessToken: string }>(
                    "/auth/refresh",
                );
                if (refreshRes.success) return true;
                // Si le backend dit explicitement que le token est invalide, on ne retry pas
                return false;
            } catch {
                // Erreur réseau — on attend un peu avant de retenter
                if (i < maxRetries - 1) {
                    await new Promise((r) => setTimeout(r, 500));
                }
            }
        }
        return false;
    }

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
        const isFormData = customConfig.body instanceof FormData;
        const headers = new Headers(customConfig.headers);

        if (!isFormData) {
            headers.set("Content-Type", "application/json");
        }

        const config: RequestInit = {
            ...customConfig,
            headers,
            credentials: "include", // Support des cookies HttpOnly par défaut (Refresh Token)
        };

        try {
            let response = await fetch(url.toString(), config);

            // Interception du 401 pour tentative de refresh
            if (
                response.status === 401 &&
                !endpoint.includes("/auth/refresh") &&
                !endpoint.includes("/auth/login")
            ) {
                // Si un refresh est déjà en cours, on attend sa résolution
                if (this.isRefreshing) {
                    const success = await this.waitForRefresh();
                    if (success) {
                        return this.request<T>(endpoint, options);
                    }
                    return { success: false, error: "Session expirée" };
                }

                // On lance le refresh
                this.isRefreshing = true;
                this.refreshPromise = this.attemptRefresh();

                try {
                    const refreshSuccess = await this.refreshPromise;

                    this.isRefreshing = false;
                    this.processQueue(refreshSuccess);

                    if (refreshSuccess) {
                        // Rejouer la requête initiale avec les nouveaux cookies
                        return this.request<T>(endpoint, options);
                    }

                    // Le refresh a échoué définitivement
                    console.warn(
                        "[ApiClient] Refresh token failed — session expired",
                    );

                    // Rediriger uniquement si on est sur une route protégée
                    if (typeof window !== "undefined") {
                        const path = window.location.pathname;
                        const isProtectedRoute = path.startsWith("/admin");

                        if (isProtectedRoute) {
                            window.location.href = `/login?redirect=${encodeURIComponent(path)}`;
                        }
                    }
                    return { success: false, error: "Session expirée" };
                } catch (err) {
                    this.isRefreshing = false;
                    this.processQueue(false);
                    console.error("[ApiClient] Refresh error:", err);
                    return { success: false, error: "Session expirée" };
                }
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

    private processQueue(success: boolean) {
        this.refreshQueue.forEach((callback) => callback(success));
        this.refreshQueue = [];
    }

    /**
     * Helper pour injecter les erreurs backend dans react-hook-form
     * Gère aussi le saut vers l'étape de la première erreur pour les formulaires par étapes
     */
    handleFormErrors<TFieldValues extends FieldValues>(
        details: ApiValidationError[],
        setError: UseFormSetError<TFieldValues>,
        options?: {
            steps?: string[][];
            onStepError?: (stepIndex: number) => void;
        },
    ) {
        // 1. Injecter les erreurs dans react-hook-form
        details.forEach((err) => {
            const fieldName = err.path.join(".") as Path<TFieldValues>;
            setError(fieldName, {
                type: "server",
                message: err.message,
            });
        });

        // 2. Si c'est un formulaire par étapes, on cherche la première erreur
        if (options?.steps && options?.onStepError && details.length > 0) {
            const firstErrorField = details[0].path.join(".");

            // On trouve l'index de l'étape qui contient ce champ
            const errorStepIndex = options.steps.findIndex((stepFields) =>
                stepFields.some(
                    (field) =>
                        field === firstErrorField ||
                        firstErrorField.startsWith(`${field}.`),
                ),
            );

            if (errorStepIndex !== -1) {
                options.onStepError(errorStepIndex);
            }
        }
    }

    // Méthodes HTTP
    get<T>(endpoint: string, options: RequestOptions = {}) {
        return this.request<T>(endpoint, { ...options, method: "GET" });
    }

    post<T>(endpoint: string, data?: any, options: RequestOptions = {}) {
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: data instanceof FormData ? data : JSON.stringify(data),
        });
    }

    upload<T>(
        endpoint: string,
        file: File | FileList,
        options: RequestOptions = {},
    ) {
        const formData = new FormData();

        if (file instanceof FileList) {
            Array.from(file).forEach((f) => formData.append("files", f));
        } else {
            formData.append("file", file);
        }

        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: formData,
        } as any);
    }

    put<T>(endpoint: string, data?: any, options: RequestOptions = {}) {
        return this.request<T>(endpoint, {
            ...options,
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    patch<T>(endpoint: string, data?: any, options: RequestOptions = {}) {
        return this.request<T>(endpoint, {
            ...options,
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }

    delete<T>(endpoint: string, options: RequestOptions = {}) {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }

    getBaseUrl() {
        return BASE_URL;
    }
}

export const api = new ApiClient();
export default api;
