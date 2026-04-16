"use client";

import React from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Typography } from "@/components/ui/typography";
import { ButtonBack } from "@/components/ui/button-back";
import { motion } from "framer-motion";

const BLOG_POSTS = [
    {
        title: "L'éveil par le jeu : l'approche Skolara",
        description:
            "Comment nous transformons chaque moment en une opportunité d'apprentissage unique.",
        date: "12 Avril 2026",
        category: "Pédagogie",
        content: (
            <div className="space-y-6">
                <p>
                    À Skolara Academy, nous croyons que l'éveil d'un enfant
                    passe avant tout par l'exploration et le plaisir. Notre
                    approche pédagogique s'inspire des meilleures méthodes
                    internationales pour offrir un cadre où l'enfant est acteur
                    de son propre savoir.
                </p>
                <p>
                    Utilisation d'outils numériques adaptés, ateliers de
                    manipulation et immersion linguistique : découvrez comment
                    nous préparons les leaders de demain dès aujourd'hui.
                </p>
            </div>
        ),
        image: "/assets/image/blog-hero.png",
    },
    {
        title: "Préparer la première rentrée",
        description:
            "Conseils pratiques pour accompagner votre enfant lors de ses premiers pas à l'école.",
        date: "05 Avril 2026",
        category: "Conseils Parents",
        content: (
            <div className="space-y-6">
                <p>
                    La première séparation est un cap important pour l'enfant
                    comme pour les parents. Notre équipe de psychopédagogues
                    partage avec vous les clés d'une transition réussie vers le
                    monde scolaire.
                </p>
                <ul className="list-disc pl-6 space-y-3 font-medium">
                    <li>Établir des routines rassurantes</li>
                    <li>Encourager l'autonomie à la maison</li>
                    <li>Favoriser le dialogue et l'enthousiasme</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Investir dans l'excellence éducative",
        description:
            "Pourquoi le choix de l'école est le premier investissement pour l'avenir.",
        date: "28 Mars 2026",
        category: "Actualités",
        content: (
            <div className="space-y-6">
                <p>
                    L'éducation est la base de tout succès. Skolara Academy
                    s'engage à maintenir des standards d'excellence élevés, tant
                    au niveau des infrastructures que du corps enseignant.
                </p>
            </div>
        ),
    },
];

function BlogBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    );
}

export default function BlogPage() {
    return (
        <div className="relative flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />
            <BlogBackground />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-20">
                <div className="mb-10 flex items-center justify-between">
                    <ButtonBack />
                </div>

                <header className="mb-20 space-y-6 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography
                            variant="overline"
                            className="text-primary font-black tracking-[0.3em]"
                        >
                            Actualités & Perspectives
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <Typography
                            variant="display"
                            className="leading-none text-balance"
                        >
                            Le Mag <span className="text-primary">Skolara</span>
                        </Typography>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-muted-foreground text-lg md:text-xl font-medium"
                    >
                        Plongez dans nos réflexions sur l'éducation de demain et
                        la vie au sein de notre académie.
                    </motion.p>
                </header>

                <TracingBeam className="px-6 md:px-0">
                    <div className="max-w-3xl mx-auto antialiased pt-4 relative">
                        {BLOG_POSTS.map((item, index) => (
                            <motion.article
                                key={`post-${index}`}
                                className="mb-24 relative group"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.1,
                                }}
                            >
                                {/* Date and Badge */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-sm font-black text-muted-foreground/60 uppercase tracking-widest">
                                        {item.date}
                                    </span>
                                    <div className="h-px flex-1 bg-border/50" />
                                    <span className="bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] px-3 py-1 font-black uppercase">
                                        {item.category}
                                    </span>
                                </div>

                                <Typography
                                    variant="h2"
                                    className="mb-6 group-hover:text-primary transition-colors duration-300"
                                >
                                    {item.title}
                                </Typography>

                                {item.image && (
                                    <div className="relative aspect-video mb-10 overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl group-hover:shadow-primary/5 transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10" />
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
                                        />
                                    </div>
                                )}

                                <div className="text-lg leading-relaxed text-muted-foreground/90 font-medium">
                                    {item.content}
                                </div>

                                <div className="mt-10">
                                    <button className="text-primary font-black uppercase text-xs tracking-widest flex items-center gap-2 group/btn">
                                        Lire la suite
                                        <span className="w-8 h-px bg-primary/30 group-hover/btn:w-12 transition-all duration-300" />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </TracingBeam>
            </main>

            <Footer />
        </div>
    );
}
