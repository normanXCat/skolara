"use client";

import { motion } from "framer-motion";
import {
    IconMail,
    IconLock,
    IconLogin,
    IconShieldLock,
    IconFileText,
} from "@tabler/icons-react";
import Link from "next/link";

import InputReusable from "@/components/ui/input-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { useLoginForm } from "@/hooks/useLoginForm";
import { cn } from "@/lib/utils";

/**
 * Composant de formulaire de connexion Skolara.
 * Utilise le hook useLoginForm pour la logique et les animations Framer Motion pour l'UI.
 */
export const LoginForm = () => {
    const { form, state, onSubmit, loading } = useLoginForm();
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <div className="relative">
            {/* Form */}
            <motion.form
                onSubmit={onSubmit}
                className={cn(
                    "space-y-6 transition-all",
                    loading && "opacity-80",
                )}
                animate={state === "error" ? { x: [0, -8, 8, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
            >
                <fieldset disabled={loading} className="space-y-6">
                    <InputReusable
                        label="Adresse email"
                        id="email"
                        type="email"
                        placeholder="admin@skolara.com"
                        icon={IconMail}
                        register={register("email")}
                        error={errors.email?.message}
                    />

                    <InputReusable
                        label="Mot de passe"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        icon={IconLock}
                        register={register("password")}
                        error={errors.password?.message}
                        forgot={true}
                    />

                    <div className="flex items-center justify-between">
                        <ButtonReusable
                            type="submit"
                            variant="default"
                            size="lg"
                            isLoading={loading}
                            loadingText="Connexion..."
                            leftIcon={<IconLogin className="size-5" />}
                        >
                            Se Connecter
                        </ButtonReusable>
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/privacy"
                                className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-all"
                            >
                                <IconShieldLock
                                    size={14}
                                    className="group-hover:rotate-12 transition-transform"
                                />
                                <span className="hover:underline">
                                    Politique de confidentialité
                                </span>
                            </Link>
                            <Link
                                href="/terms"
                                className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-all"
                            >
                                <IconFileText
                                    size={14}
                                    className="group-hover:rotate-12 transition-transform"
                                />
                                <span className="hover:underline">
                                    Conditions générales d&apos;utilisation
                                </span>
                            </Link>
                        </div>
                    </div>
                </fieldset>
            </motion.form>
        </div>
    );
};
