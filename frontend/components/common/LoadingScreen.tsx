"use client";

import { motion } from "framer-motion";
import Logo from "./logo";

/**
 * LoadingScreen (Minimalist Premium Edition)
 * A clean, elegant loading experience focusing on brand identity and fluid motion.
 */
export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden">
            {/* 1. Ambient Background Atmosphere */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Slow moving primary glows for depth */}
                <motion.div
                    animate={{
                        x: ["-10%", "10%", "-10%"],
                        opacity: [0.08, 0.15, 0.08],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full bg-primary/20 blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: ["10%", "-10%", "10%"],
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[100px]"
                />
            </div>

            {/* 2. Central Brand Composition */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center gap-12"
            >
                {/* Logo with Soft Orbital Animation */}
                <div className="relative">
                    {/* Outer soft ring */}
                    <div className="absolute inset-0 -m-8 border border-primary/5 rounded-full" />

                    {/* Rotating accent ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-0 -m-8 border-t-2 border-primary/20 rounded-full"
                    />

                    {/* Logo with breathable pulse */}
                    <motion.div
                        animate={{
                            scale: [1, 1.03, 1],
                            filter: [
                                "drop-shadow(0 0 0px oklch(var(--primary)/0%))",
                                "drop-shadow(0 0 20px oklch(var(--primary)/15%))",
                                "drop-shadow(0 0 0px oklch(var(--primary)/0%))",
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Logo size={100} />
                    </motion.div>
                </div>

                {/* Minimalist Progress Indicator */}
                <div className="relative w-48 h-1 bg-muted/20 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-primary shadow-[0_0_12px_oklch(var(--primary))]"
                    />
                </div>
            </motion.div>

            {/* 3. Subtle Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute size-1 rounded-full bg-primary/10"
                        initial={{
                            left: `${20 + i * 15}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: 0,
                        }}
                        animate={{
                            y: [0, -40],
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
