"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Propriétés du composant Logo.
 *
 * @property {string} [className] - Classes CSS additionnelles pour le conteneur.
 * @property {number} [size] - Taille de l'image du logo (hauteur/largeur).
 * @property {boolean} [showText] - Indique si le texte "Skolara" doit être affiché.
 */
interface LogoProps {
    className?: string;
    size?: number;
    showText?: boolean;
}

/**
 * Composant Logo pour Skolara.
 * Affiche l'image du logo avec une animation Framer Motion et le nom du site.
 *
 * @param props - Les propriétés du composant.
 * @returns Le composant Logo animé.
 */
export default function Logo({
    className,
    size = 40,
    showText = true,
}: LogoProps) {
    return (
        <motion.a
            href="/"
            className={cn("flex items-center gap-3", className)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Conteneur de l'image avec animation de rotation légère au survol */}
            <motion.div
                className="relative overflow-hidden"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
            >
                <Image
                    src="/assets/image/logo/skolara.logo.png"
                    alt="Skolara Logo"
                    width={size}
                    height={size}
                    priority
                    className="h-auto w-full object-contain"
                />
            </motion.div>

            {/* Texte Skolara animé */}
            {showText && (
                <motion.span
                    className="text-2xl font-bold tracking-tight text-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    Skol
                    <span className="text-primary">ara</span>
                </motion.span>
            )}
        </motion.a>
    );
}
