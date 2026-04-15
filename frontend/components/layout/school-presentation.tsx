"use client";

import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import {
    IconSchool,
    IconUsers,
    IconShieldCheck,
    IconTrophy,
    IconChevronRight,
    IconChevronLeft,
} from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StrengthCard } from "@/components/ui/strength-card";

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────

/** Points forts de l'établissement */
const strengths = [
    {
        title: "Qualité de l'enseignement",
        description:
            "Un programme rigoureux et innovant, conçu pour préparer les élèves aux défis du monde moderne tout en cultivant leur curiosité intellectuelle.",
        icon: <IconSchool className="size-7" />,
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/30",
    },
    {
        title: "Encadrement personnalisé",
        description:
            "Un ratio élève-enseignant optimal et un suivi individuel attentif pour accompagner chaque apprenant vers l'excellence.",
        icon: <IconUsers className="size-7" />,
        gradient: "from-violet-500/20 to-purple-500/20",
        border: "border-violet-500/30",
    },
    {
        title: "Discipline & Valeurs",
        description:
            "Un cadre structurant qui forge le caractère, développe l'intégrité et inculque les valeurs fondamentales du respect mutuel.",
        icon: <IconShieldCheck className="size-7" />,
        gradient: "from-emerald-500/20 to-teal-500/20",
        border: "border-emerald-500/30",
    },
    {
        title: "Réussite des élèves",
        description:
            "Des résultats d'excellence constants aux examens nationaux et internationaux, témoins de notre engagement éducatif.",
        icon: <IconTrophy className="size-7" />,
        gradient: "from-amber-500/20 to-orange-500/20",
        border: "border-amber-500/30",
    },
];

/** Images de l'établissement */
const galleryImages = [
    {
        src: "/images/school/exterior.png",
        alt: "Vue extérieure de l'établissement",
        label: "Campus",
    },
    {
        src: "/images/school/classroom.png",
        alt: "Salle de classe moderne",
        label: "Classes",
    },
    {
        src: "/images/school/library.png",
        alt: "Bibliothèque et espace numérique",
        label: "Bibliothèque",
    },
    {
        src: "/images/school/playground.png",
        alt: "Aire de jeux et terrain de sport",
        label: "Activités",
    },
];

// ──────────────────────────────────────────────
// CAROUSEL GLASSMORPHISM
// ──────────────────────────────────────────────

/**
 * Carousel de points forts avec cartes Glassmorphism.
 * Chaque carte possède un dégradé de couleur unique,
 * un effet de verre dépoli et des transitions 3D fluides.
 */
// ──────────────────────────────────────────────
// CAROUSEL CENTER-PEEK GLASSMORPHISM
// ──────────────────────────────────────────────

/**
 * Carousel moderne avec aperçu des cartes adjacentes.
 * Utilise une seule couleur de glassmorphism pour l'unité.
 */
function StrengthCarousel() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextSlide = React.useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % strengths.length);
    }, []);

    const prevSlide = React.useCallback(() => {
        setCurrentIndex(
            (prev) => (prev - 1 + strengths.length) % strengths.length,
        );
    }, []);

    // Auto-play
    React.useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="relative w-full overflow-visible">
            {/* Conteneur Carousel avec Perspective */}
            <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden py-10">
                <div className="relative flex w-full items-center justify-center">
                    <AnimatePresence initial={false} mode="popLayout">
                        {strengths.map((strength, index) => {
                            // Calcul de la position relative
                            let position = index - currentIndex;
                            if (
                                currentIndex === 0 &&
                                index === strengths.length - 1
                            )
                                position = -1;
                            if (
                                currentIndex === strengths.length - 1 &&
                                index === 0
                            )
                                position = 1;

                            // On n'affiche que le centre, gauche et droite
                            if (Math.abs(position) > 1) return null;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        x: position * 300,
                                    }}
                                    animate={{
                                        opacity: position === 0 ? 1 : 0.4,
                                        scale: position === 0 ? 1 : 0.8,
                                        x:
                                            position *
                                            (typeof window !== "undefined" &&
                                            window.innerWidth < 640
                                                ? 250
                                                : 320),
                                        zIndex: position === 0 ? 30 : 10,
                                        filter:
                                            position === 0
                                                ? "blur(0px)"
                                                : "blur(2px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.6,
                                        x: position * 300,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                    className="absolute w-[280px] sm:w-[340px]"
                                >
                                    <StrengthCard
                                        index={index + 1}
                                        title={strength.title}
                                        description={strength.description}
                                        gradient={strength.gradient}
                                        border={strength.border}
                                        className="w-full"
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── CONTRÔLES ── */}
            <div className="mt-4 flex flex-col items-center gap-6">
                {/* Indicateurs de progression */}
                <div className="flex gap-2">
                    {strengths.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                i === currentIndex
                                    ? "w-8 bg-primary"
                                    : "w-1.5 bg-border hover:bg-muted-foreground/30",
                            )}
                        />
                    ))}
                </div>

                {/* Boutons flèches minimalistes */}
                <div className="flex gap-4">
                    <button
                        onClick={prevSlide}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-background/50 text-foreground backdrop-blur-md transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                        <IconChevronLeft className="size-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-background/50 text-foreground backdrop-blur-md transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                        <IconChevronRight className="size-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────
// GALERIE FLOATING PANELS
// ──────────────────────────────────────────────

/**
 * Galerie moderne avec panneaux flottants superposés.
 */
function ImageGallery() {
    return (
        <div className="relative h-[550px] w-full">
            {/* Image 1 : Main Campus */}
            <div className="absolute right-0 top-0 h-[70%] w-[80%] overflow-hidden rounded-[40px] border border-white/10 shadow-2xl">
                <Image
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Image 2 : Classrooms */}
            <div className="absolute left-0 top-1/4 z-10 h-[45%] w-[60%] overflow-hidden rounded-[40px] border-4 border-background bg-card shadow-2xl">
                <Image
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Image 3 : Library */}
            <div className="absolute bottom-10 right-10 z-20 h-[30%] w-[40%] overflow-hidden rounded-[32px] border border-white/20 bg-card/60 shadow-xl backdrop-blur-md">
                <Image
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Image 4 : Activities */}
            <div className="absolute bottom-2 left-5 z-30 h-[35%] w-[45%] overflow-hidden rounded-[32px] border-2 border-background shadow-2xl">
                <Image
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Badge de réputation */}
            <div className="absolute -top-6 left-1/4 z-40 flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-primary-foreground shadow-xl shadow-primary/20">
                <div className="h-1.5 w-1.5 rounded-full bg-white opacity-50" />
                <Typography
                    variant="caption"
                    className="font-bold uppercase tracking-widest text-white"
                >
                    Top 1% Éducation
                </Typography>
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────
// SECTION PRINCIPALE
// ──────────────────────────────────────────────

export default function SchoolPresentation() {
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <WrapperSection
            className="relative overflow-hidden py-24 md:py-32"
            id="presentation"
        >
            {/* ── BACKGROUND PREMIUM ── */}
            <div
                className="absolute inset-0 -z-10 overflow-hidden"
                aria-hidden="true"
            >
                {/* Mesh Gradients blobs */}
                <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-violet-500/5 blur-[120px]" />
                <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />

                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div
                ref={containerRef}
                className="grid grid-cols-1 gap-24 lg:grid-cols-2 lg:items-center"
            >
                {/* GAUCHE : Texte & Peek Carousel */}
                <div className="flex flex-col gap-10">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Typography
                                variant="h2"
                                className="text-4xl font-black tracking-tight lg:text-5xl"
                            >
                                Relever les défis de <br />
                                <span className="text-primary italic">
                                    demain
                                </span>
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <Typography
                                variant="body"
                                className="max-w-md text-lg leading-relaxed text-muted-foreground"
                            >
                                Explorez les piliers fondamentaux qui font de
                                notre école un pôle d&apos;excellence reconnu au
                                niveau national.
                            </Typography>
                        </motion.div>
                    </div>

                    <StrengthCarousel />
                </div>

                {/* DROITE : Floating Gallery */}
                <ImageGallery />
            </div>
        </WrapperSection>
    );
}
