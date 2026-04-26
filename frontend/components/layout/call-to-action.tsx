"use client";

import React from "react";
import { motion } from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { ROUTES } from "@/config/routes";
import { IconArrowRight, IconMessage } from "@tabler/icons-react";
import Link from "next/link";

export default function CallToAction() {
    return (
        <WrapperSection className="py-24 md:py-32" id="cta">
            <div className="relative overflow-hidden p-12 md:p-24 text-center">
                {/* Diagonal Lines Background */}
                <div 
                    className="absolute inset-0 opacity-[0.1] pointer-events-none overflow-hidden"
                >
                    {/* First Diagonal Line */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-primary to-transparent -rotate-45"
                    />
                    {/* Second Diagonal Line (Opposite direction) */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent rotate-0"
                    />
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 space-y-10"
                >
                    <div className="space-y-4">
                        <Typography
                            variant="overline"
                            className="text-primary font-black uppercase tracking-[0.4em] text-xs"
                        >
                            Inscriptions Ouvertes
                        </Typography>
                        <Typography
                            variant="display"
                            className="text-foreground text-4xl md:text-7xl font-black leading-[1] tracking-tighter"
                        >
                            Bâtissons le <br />
                            <span className="text-primary italic font-serif">futur</span> ensemble.
                        </Typography>
                    </div>
                    
                    <Typography
                        variant="body"
                        className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
                    >
                        Les pré-inscriptions pour l&apos;année scolaire 2025-2026 sont
                        désormais ouvertes. Donnez à votre enfant les clés de la réussite.
                    </Typography>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
                        <Link href={ROUTES.PRE_REGISTRATION}>
                            <ButtonReusable
                                size="lg"
                                variant="default"
                                rightIcon={<IconArrowRight className="size-6" />}
                            >
                                Se pré-inscrire
                            </ButtonReusable>
                        </Link>
                        <Link href={ROUTES.CONTACT}>
                            <ButtonReusable
                                size="lg"
                                variant="outline"
                                leftIcon={<IconMessage className="size-6" />}
                            >
                                Nous contacter
                            </ButtonReusable>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </WrapperSection>
    );
}
