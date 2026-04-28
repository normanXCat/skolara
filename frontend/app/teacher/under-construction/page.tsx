"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { IconArrowLeft, IconTool } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";

export default function UnderConstructionPage() {
    const router = useRouter();

    return (
        <div className="flex h-[80vh] w-full items-center justify-center p-6 relative overflow-hidden">
            {/* Background blobs */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] -z-10"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center max-w-lg text-center"
            >
                {/* Floating Icon Card */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                    className="relative mb-8"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10" />
                    <div className="h-24 w-24 rounded-3xl bg-secondary/50 border border-border/50 backdrop-blur-xl flex items-center justify-center shadow-2xl">
                        <IconTool size={48} className="text-primary" strokeWidth={1.5} />
                    </div>
                </motion.div>

                {/* Text Content */}
                <Typography variant="h2" className="text-3xl md:text-4xl font-extrabold mb-4">
                    En cours de construction
                </Typography>
                
                <Typography variant="body" className="text-muted-foreground text-lg mb-8">
                    Notre équipe travaille activement sur cette page. Elle sera bientôt disponible avec de nouvelles fonctionnalités conçues pour vous.
                </Typography>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <ButtonReusable
                        variant="default"
                        leftIcon={<IconArrowLeft size={18} />}
                        onClick={() => router.back()}
                        className="w-full sm:w-auto shadow-xl shadow-primary/20"
                    >
                        Retour
                    </ButtonReusable>
                    <ButtonReusable
                        variant="outline"
                        href={ROUTES.TEACHER.DASHBOARD}
                        className="w-full sm:w-auto bg-background/50 backdrop-blur-lg border-primary/20"
                    >
                        Tableau de bord
                    </ButtonReusable>
                </div>
            </motion.div>
        </div>
    );
}
