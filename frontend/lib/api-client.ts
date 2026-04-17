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

        const isFormData = customConfig.body instanceof FormData;

        const headers = new Headers(customConfig.headers);

        if (!isFormData) {
            headers.set("Content-Type", "application/json");
        }

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
    get<T>(endpoint: string, params?: RequestOptions["params"]) {
        return this.request<T>(endpoint, { method: "GET", params });
    }

    post<T>(endpoint: string, data?: any) {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    upload<T>(endpoint: string, file: File | FileList) {
        const formData = new FormData();

        if (file instanceof FileList) {
            Array.from(file).forEach((f) => formData.append("files", f));
        } else {
            formData.append("file", file);
        }

        // Pour l'upload, on ne doit pas fixer de Content-Type manuel
        // Le navigateur le fera automatiquement avec le boundary.
        return this.request<T>(endpoint, {
            method: "POST",
            body: formData,
            headers: {
                // On écrase le header par défaut en l'enlevant si possible,
                // ou on laisse le navigateur gérer.
            },
        } as any);
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
