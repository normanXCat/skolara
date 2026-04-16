"use client";

import { motion } from "framer-motion";
import PreRegistrationForm from "@/components/pre-registration/pre-registration-form";
import { cn } from "@/lib/utils";
import RegistrationPlayer from "@/components/remotion/RegistrationPlayer";
import { ButtonBack } from "@/components/ui/button-back";

function PageBackground() {
    return (
        <div
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
            aria-hidden="true"
        >
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(oklch(0.66 0.19 250 / 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, oklch(0.66 0.19 250 / 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px",
                }}
            />
        </div>
    );
}
function FloatingElement({
    className,
    delay = 0,
}: {
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0.4, 0.8, 0.4],
                y: [0, -40, 0],
                x: [0, 20, 0],
            }}
            transition={{
                duration: 12,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            }}
            className={cn(
                "fixed rounded-full blur-[100px] -z-10 pointer-events-none",
                className,
            )}
        />
    );
}

export default function PreregistrationPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
            <PageBackground />

            {/* Ambient Background Elements */}
            <FloatingElement
                className="top-[10%] -left-[5%] size-96 bg-primary/20"
                delay={0}
            />
            <FloatingElement
                className="bottom-[10%] right-[5%] size-[500px] bg-primary/10"
                delay={2}
            />

            <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
                <ButtonBack className="z-10" />
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Left Section: Video */}
                    <div className="w-full lg:w-[45%]">
                        <div className="hidden lg:block">
                            <RegistrationPlayer />
                        </div>
                    </div>

                    {/* Right Section: Form Card */}
                    <div className="w-full lg:w-[55%] relative">
                        {/* Decorative Rings around the card */}
                        <div className="absolute -inset-4 rounded-[40px] border border-primary/10 -z-10 animate-pulse" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="relative overflow-hidden rounded-[40px] border border-border/40 bg-card/60 backdrop-blur-2xl shadow-2xl shadow-primary/5"
                        >
                            <PreRegistrationForm />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
