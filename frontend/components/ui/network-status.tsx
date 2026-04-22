"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconWifiOff,
    IconServerOff,
    IconRefresh,
    IconWifi,
} from "@tabler/icons-react";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";

type StatusType = "offline" | "server-error" | null;

/**
 * Composant global qui affiche un overlay lorsque l'utilisateur est hors-ligne
 * ou lorsque le serveur backend ne répond pas (erreur 500).
 */
export function NetworkStatus() {
    const [status, setStatus] = useState<StatusType>(null);
    const [isRetrying, setIsRetrying] = useState(false);
    const [showRecovered, setShowRecovered] = useState(false);

    const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

    // --- Vérifie la santé du backend ---
    const checkServer = useCallback(async () => {
        if (!navigator.onLine) return;
        try {
            const res = await fetch(`${API_URL}/health`, {
                method: "GET",
                cache: "no-store",
                signal: AbortSignal.timeout(5000),
            });
            if (!res.ok) {
                setStatus("server-error");
            } else if (status === "server-error") {
                // Récupération
                setStatus(null);
                setShowRecovered(true);
                setTimeout(() => setShowRecovered(false), 3000);
            }
        } catch {
            setStatus("server-error");
        }
    }, [API_URL, status]);

    // --- Réessayer manuellement ---
    const handleRetry = async () => {
        setIsRetrying(true);
        if (!navigator.onLine) {
            // On ne peut rien faire, on attend
            setTimeout(() => setIsRetrying(false), 1500);
            return;
        }
        await checkServer();
        setIsRetrying(false);
    };

    // --- Écoute online/offline ---
    useEffect(() => {
        const goOffline = () => setStatus("offline");
        const goOnline = () => {
            setStatus(null);
            setShowRecovered(true);
            setTimeout(() => setShowRecovered(false), 3000);
            // Vérifie aussi le serveur au retour
            checkServer();
        };

        window.addEventListener("offline", goOffline);
        window.addEventListener("online", goOnline);

        // État initial
        if (!navigator.onLine) {
            setStatus("offline");
        }

        return () => {
            window.removeEventListener("offline", goOffline);
            window.removeEventListener("online", goOnline);
        };
    }, [checkServer]);

    // --- Polling du serveur toutes les 30s ---
    useEffect(() => {
        const interval = setInterval(checkServer, 30000);
        // Vérification initiale au montage
        checkServer();
        return () => clearInterval(interval);
    }, [checkServer]);

    const config = {
        offline: {
            icon: IconWifiOff,
            title: "Vous êtes hors-ligne",
            description:
                "Vérifiez votre connexion Internet. L'application reprendra automatiquement une fois la connexion rétablie.",
            accent: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            glow: "bg-amber-500/5",
        },
        "server-error": {
            icon: IconServerOff,
            title: "Serveur indisponible",
            description:
                "Le serveur ne répond pas actuellement. Nos équipes sont informées. Veuillez réessayer dans quelques instants.",
            accent: "text-rose-500",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20",
            glow: "bg-rose-500/5",
        },
    };

    const current = status ? config[status] : null;

    return (
        <>
            {/* Overlay d'erreur */}
            <AnimatePresence>
                {current && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                            }}
                            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border/50 bg-background p-10 shadow-2xl"
                        >
                            {/* Motif décoratif */}
                            <div
                                className={`absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 ${current.glow} rounded-full blur-3xl pointer-events-none`}
                            />

                            {/* Pulse animé en fond */}
                            <motion.div
                                className={`absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 ${current.glow} rounded-full blur-3xl pointer-events-none`}
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            <div className="flex flex-col items-center text-center relative z-10">
                                {/* Icône avec animation pulse */}
                                <motion.div
                                    className={`flex h-20 w-20 items-center justify-center rounded-[2rem] mb-8 shadow-inner border ${current.border} ${current.bg} ${current.accent}`}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <current.icon size={40} strokeWidth={1.5} />
                                </motion.div>

                                <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                                    {current.title}
                                </h3>
                                <p className="text-muted-foreground font-medium mb-10 max-w-[300px] leading-relaxed">
                                    {current.description}
                                </p>

                                <ButtonReusable
                                    onClick={handleRetry}
                                    variant="outline"
                                    className="w-full max-w-[240px] text-red-500"
                                    isLoading={isRetrying}
                                    loadingText="Vérification..."
                                    leftIcon={
                                        !isRetrying ? (
                                            <IconRefresh size={18} />
                                        ) : undefined
                                    }
                                >
                                    Réessayer
                                </ButtonReusable>

                                {/* Indicateur de statut en direct */}
                                <div className="flex items-center gap-2 mt-6">
                                    <motion.div
                                        className={`w-2 h-2 rounded-full ${status === "offline" ? "bg-amber-500" : "bg-rose-500"}`}
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}
                                    />
                                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                                        {status === "offline"
                                            ? "Hors-ligne"
                                            : "Serveur injoignable"}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toast de récupération */}
            <AnimatePresence>
                {showRecovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300,
                        }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 rounded-3xl border border-emerald-500/30 bg-background/95 backdrop-blur-xl shadow-xl"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            <IconWifi size={20} />
                        </div>
                        <div>
                            <Typography
                                variant="h3"
                                className="!text-md font-black tracking-tight"
                            >
                                Connexion rétablie
                            </Typography>
                            <Typography
                                variant="body"
                                className="!text-sm text-muted-foreground font-medium"
                            >
                                Tout est de nouveau opérationnel
                            </Typography>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
