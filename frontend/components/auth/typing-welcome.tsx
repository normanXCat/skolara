"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Composant pour l'effet de frappe du message de bienvenue.
 */
export const TypingWelcome = () => {
    const [index, setIndex] = useState(0);
    const fullText = "Heureux de vous revoir.";

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setIndex((prev) => prev + 1);
            }, 60);
            return () => clearTimeout(timeout);
        }
    }, [index]);

    const currentText = fullText.slice(0, index);
    const breakPoint = 10; // "Heureux de"
    const serifPoint = 16; // "vous "

    return (
        <>
            {currentText.slice(0, breakPoint)}
            {index > breakPoint && <br />}
            {currentText.slice(breakPoint + 1, serifPoint)}
            {index > serifPoint && (
                <span className="text-primary italic font-serif">
                    {currentText.slice(serifPoint)}
                </span>
            )}
            <motion.span
                animate={{
                    opacity: [1, 0, 1],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="inline-block w-[3.5px] h-[0.8em] bg-primary ml-1.5 translate-y-[0.1em] rounded-full shadow-[0_0_12px_var(--primary)] ring-4 ring-primary/10"
            />
        </>
    );
};

export default TypingWelcome;
