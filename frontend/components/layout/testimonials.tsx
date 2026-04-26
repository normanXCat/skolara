"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import { IconQuote, IconStarFilled, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import UserAvatar from "@/components/common/user-avatar";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        name: "Lila Benali",
        role: "Parent d'élève (CE2)",
        content: "Une école qui allie rigueur académique et épanouissement personnel. Mon fils adore aller en classe chaque matin, et les progrès sont visibles.",
        rating: 5,
        initials: "LB",
        color: "bg-blue-500",
    },
    {
        name: "Marc Dupond",
        role: "Ancien élève, promotion 2023",
        content: "Skolara m'a donné les bases solides pour réussir mes études supérieures. L'accompagnement des enseignants est exceptionnel.",
        rating: 5,
        initials: "MD",
        color: "bg-rose-500",
    },
    {
        name: "Sonia Mansouri",
        role: "Parent d'élève (Lycée)",
        content: "Le suivi pédagogique et l'orientation sont les points forts de l'établissement. On sent une réelle implication de toute l'équipe.",
        rating: 4,
        initials: "SM",
        color: "bg-emerald-500",
    },
    {
        name: "Karim Ziani",
        role: "Parent d'élève (Maternelle)",
        content: "Un cadre sécurisant et stimulant pour les plus petits. Les activités d'éveil sont variées et de grande qualité.",
        rating: 5,
        initials: "KZ",
        color: "bg-violet-500",
    },
    {
        name: "Céline Roux",
        role: "Enseignante & Parent",
        content: "En tant que parent et professionnelle, je recommande Skolara pour ses valeurs d'inclusion et son innovation pédagogique constante.",
        rating: 5,
        initials: "CR",
        color: "bg-amber-500",
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
    };

    return (
        <WrapperSection className="py-24 md:py-32 overflow-hidden" id="temoignages">
            <div className="flex flex-col items-center mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <Typography
                        variant="overline"
                        className="text-primary font-bold uppercase tracking-widest"
                    >
                        Témoignages
                    </Typography>
                    <Typography
                        variant="h2"
                        className="text-4xl md:text-5xl font-black"
                    >
                        Ce que <span className="text-primary italic">disent</span> nos parents
                    </Typography>
                </motion.div>
            </div>

            <div className="relative max-w-4xl mx-auto items-center justify-center flex min-h-[400px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="w-full"
                    >
                        <div className="relative bg-card/40 backdrop-blur-xl border rounded-[48px] p-10 md:p-16 text-center">
                            {/* Large Quote Icon */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 size-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                                <IconQuote className="size-6" />
                            </div>

                            <div className="flex flex-col items-center gap-8">
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <IconStarFilled 
                                            key={i} 
                                            className={cn(
                                                "size-5",
                                                i < testimonials[currentIndex].rating ? "text-amber-400" : "text-muted-foreground/20"
                                            )} 
                                        />
                                    ))}
                                </div>

                                <Typography
                                    variant="h3"
                                    className="text-xl md:text-2xl font-medium italic leading-relaxed text-foreground/90"
                                >
                                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                                </Typography>

                                <div className="flex flex-col items-center gap-4">
                                    <UserAvatar 
                                        firstName={testimonials[currentIndex].name.split(' ')[0]} 
                                        lastName={testimonials[currentIndex].name.split(' ')[1] || ""} 
                                        size={56}
                                        className={cn(testimonials[currentIndex].color.replace('bg-', 'bg-'))}
                                    />
                                    <div className="space-y-1">
                                        <Typography variant="body" className="font-bold">
                                            {testimonials[currentIndex].name}
                                        </Typography>
                                        <Typography variant="caption" className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">
                                            {testimonials[currentIndex].role}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 size-12 rounded-full border border-border/50 bg-background/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all backdrop-blur-md z-10"
                    aria-label="Précédent"
                >
                    <IconChevronLeft className="size-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 size-12 rounded-full border border-border/50 bg-background/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all backdrop-blur-md z-10"
                    aria-label="Suivant"
                >
                    <IconChevronRight className="size-6" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > currentIndex ? 1 : -1);
                                setCurrentIndex(i);
                            }}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                i === currentIndex ? "w-8 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/30"
                            )}
                            aria-label={`Aller au témoignage ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </WrapperSection>
    );
}
