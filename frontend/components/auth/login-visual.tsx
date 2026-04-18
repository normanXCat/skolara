"use client";

import React from "react";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";
import { Typography } from "@/components/ui/typography";
import { motion } from "framer-motion";
import { IconSparkles, IconCircleCheck } from "@tabler/icons-react";

/**
 * Nouveau composant visuel épuré pour la page de connexion.
 * Thème : Élève isolé (cutout) sur fond de pattern hexagonal.
 * Style : Éditorial, Premium, Neutre (Amber/Slate accent).
 */
export const LoginVisual = () => {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#050505]">
            {/* 1. Background hexagonal minimaliste (Gris neutre) */}
            <div className="absolute inset-0 z-0">
                <HexagonPattern
                    radius={45}
                    className="stroke-slate-200/60 dark:stroke-white/[0.05] [mask-image:radial-gradient(circle_at_center,white,70%,transparent)]"
                />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-16">
                {/* 3. Image de l'élève & Badges design */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.3,
                    }}
                    className="relative w-full flex-1 flex items-end justify-center"
                >
                    {/* Texte de motivation en absolute (Derrière l'image) */}
                    <div className="absolute top-10 left-0 right-0 z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="text-center"
                        >
                            <Typography
                                variant="display"
                                className="text-4xl lg:text-6xl font-black tracking-tight leading-[0.85] text-slate-900 dark:text-white"
                            >
                                Réussite <br />
                                <span className="text-primary font-serif italic font-bold">
                                    Académique
                                </span>
                            </Typography>
                            {/* Soulignement curviligne (Squiggly line) */}
                            <div className="mt-4 flex justify-center">
                                <svg
                                    width="120"
                                    height="12"
                                    viewBox="0 0 120 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-primary"
                                >
                                    <motion.path
                                        d="M2 10C20 10 20 2 38 2C56 2 56 10 74 10C92 10 92 2 118 2"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{
                                            duration: 1.5,
                                            delay: 1.5,
                                        }}
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image étudiante (Par-dessus le texte) */}
                    <img
                        src="/images/student.png"
                        alt="Élève Skolara"
                        className="relative z-20 w-full h-[100%] object-contain object-bottom drop-shadow-[0_32px_64px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_32px_64px_rgba(255,255,255,0.03)] scale-110 origin-bottom hover:scale-[1.12] transition-transform duration-700"
                    />
                </motion.div>
            </div>

            {/* Décoration textuelle subtile de fond (Style high-end fashion/editorial) */}
            <div className="absolute -bottom-10 left-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
                <span className="text-[12rem] font-black tracking-tighter text-slate-900 dark:text-white">
                    SKOLARA
                </span>
            </div>
        </div>
    );
};

export default LoginVisual;
