"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

import { Typography } from "@/components/ui/typography";
import { LoginForm } from "@/components/auth/login-form";
import { LoginVisual } from "@/components/auth/login-visual";
import Logo from "@/components/common/logo";
import ButtonBack from "@/components/ui/button-back";
import SectionDivider from "@/components/ui/section-divider";
import TypingWelcome from "./typing-welcome";

/**
 * Composant client pour le contenu de la page de connexion.
 */
export const LoginContent = () => {
    // Variants for staggered entry animations
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className="relative min-h-screen flex text-foreground overflow-hidden">
            {/* Left Content: Login Form Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full lg:w-[45%] flex flex-col items-center justify-center p-8 sm:p-12 z-10 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#080808]"
            >
                <div className="relative z-10 w-full flex flex-col justify-between py-8">
                    {/* Header with Back Link & Logo */}
                    <div className="relative space-y-4 rounded-3xl">
                        {/* Background Grid Lines stylé - Limité à l'en-tête */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
                        </div>

                        {/* Logo & Back button */}
                        <div className="flex justify-between items-center">
                            <Logo />
                            <ButtonBack text="Revenir" />
                        </div>

                        {/* Séparateur interne stylé */}
                        <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent opacity-60" />

                        {/* Welcome Message (Shortened with Typing Effect) */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                        >
                            <Typography
                                variant="h1"
                                className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight min-h-[2.2em]"
                            >
                                <TypingWelcome />
                            </Typography>
                            <p className="text-muted-foreground text-base font-medium">
                                Heureux de vous revoir sur Skolara.
                            </p>
                        </motion.div>
                    </div>

                    <SectionDivider />

                    {/* Form Component Wrapper */}
                    <motion.div variants={itemVariants}>
                        <LoginForm />
                    </motion.div>

                    <SectionDivider />
                </div>
            </motion.div>

            {/* Right Content: Premium Visual Section */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex w-[55%] relative"
            >
                <LoginVisual />
            </motion.div>
        </div>
    );
};

export default LoginContent;
