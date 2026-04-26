"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import { IconZoomIn } from "@tabler/icons-react";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { cn } from "@/lib/utils";

const images = [
    {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
        alt: "Étudiants en collaboration",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop",
        alt: "Étudiante à la bibliothèque",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
        alt: "Apprentissage interactif",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
        alt: "Groupe d'étudiants",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2098&auto=format&fit=crop",
        alt: "Étudiants travaillant sur un projet",
        className: "md:col-span-1 md:row-span-1",
    },
];

export default function PhotoGallery() {
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    const handleImageLoad = (src: string) => {
        setLoadedImages((prev) => ({ ...prev, [src]: true }));
    };

    return (
        <WrapperSection className="py-24 md:py-32" id="galerie">
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
                        Immersion
                    </Typography>
                    <Typography
                        variant="h2"
                        className="text-4xl md:text-5xl font-black"
                    >
                        La vie à <span className="text-primary italic">l&apos;académie</span>
                    </Typography>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                {images.map((image, index) => (
                    <motion.div
                        key={image.src}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`group relative overflow-hidden rounded-[32px] border border-white/10 ${image.className}`}
                    >
                        <AnimatePresence>
                            {!loadedImages[image.src] && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-10"
                                >
                                    <SkeletonReusable
                                        variant="shimmer"
                                        height="100%"
                                        className="rounded-[32px]"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <img
                            src={image.src}
                            alt={image.alt}
                            onLoad={() => handleImageLoad(image.src)}
                            className={cn(
                                "absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                                loadedImages[image.src] ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            )}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px] z-20">
                            <div className="size-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-500">
                                <IconZoomIn className="size-6" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </WrapperSection>
    );
}
