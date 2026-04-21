"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoginSchema, type LoginFormData } from "@/schemas/login-schema";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { ROUTES } from "@/config/routes";
import { useAuthStore, type AuthUser } from "@/stores/auth-store";

export type LoginState = "idle" | "loading" | "success" | "error";

/**
 * Hook personnalisé pour gérer l'état et la logique du formulaire de connexion.
 */
export const useLoginForm = () => {
    const router = useRouter();
    const [state, setState] = useState<LoginState>("idle");
    const setUser = useAuthStore((s) => s.setUser);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        mode: "onBlur",
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: LoginFormData) => {
        setState("loading");

        try {
            const response = await api.post<{
                accessToken: string;
                user: AuthUser;
            }>("/auth/login", data);

            if (response.success) {
                const user = response.data?.user;
                if (user) {
                    setState("success");
                    setUser(user);
                    const isAdmin = user.role === "ADMIN";
                    router.push(
                        isAdmin ? ROUTES.ADMIN.DASHBOARD : ROUTES.DASHBOARD,
                    );
                } else {
                    setState("error");
                    toast.error("Données utilisateur manquantes");
                }
            } else {
                setState("error");
                toast.error(response.error || "Identifiants invalides");
            }
        } catch {
            setState("error");
            toast.error("Erreur de connexion au serveur");
        }
    };

    return {
        form,
        state,
        onSubmit: form.handleSubmit(onSubmit),
        loading: state === "loading",
    };
};

export default useLoginForm;
