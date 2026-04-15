"use client";

import { motion } from "framer-motion";

/**
 * Séparateur de section premium avec un effet de faisceau lumineux.
 */
export default function SectionDivider() {
    return (
        <div className="relative flex w-full items-center justify-center py-8">
            {/* Ligne de base */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

            {/* Faisceau de lumière au centre */}
            <motion.div
                initial={{ width: "0%", opacity: 0 }}
                whileInView={{ width: "30%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />

            {/* Diamant central décoratif */}
            <div className="absolute flex h-2 w-2 items-center justify-center">
                <div className="h-full w-full rotate-45 border border-primary/50 bg-background shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
            </div>
        </div>
    );
}
