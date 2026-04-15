"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValueEvent,
    useScroll,
    useMotionValue,
    useMotionTemplate,
    type Variants,
} from "framer-motion";
import {
    IconSearch,
    IconX,
    IconLogin2,
    IconUserPlus,
} from "@tabler/icons-react";
import WrapperSection from "@/components/wrapper-section";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/components/common/logo";

/* ------------------------------------------------------------------ */
/*                          Constantes                                 */
/* ------------------------------------------------------------------ */

/**
 * Liens de navigation principaux affichés dans la barre inférieure.
 */
const NAV_LINKS = [
    { label: "Accueil", href: "/" },
    { label: "Actualités", href: "/actualites" },
    { label: "Calendrier Scolaire", href: "/calendrier" },
    { label: "Préscolaire", href: "/prescolaire" },
    { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/*                    Variantes d'animation                            */
/* ------------------------------------------------------------------ */

/** Animation d'apparition pour les éléments du navbar. */
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.35, ease: "easeOut" },
    }),
};

/** Animation du menu mobile (panneau latéral). */
const mobileMenuVariants: Variants = {
    closed: {
        opacity: 0,
        x: "100%",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40,
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
    open: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40,
            staggerChildren: 0.07,
            delayChildren: 0.2,
        },
    },
};

/** Animation des liens individuels dans le menu mobile. */
const mobileLinkVariants: Variants = {
    closed: { opacity: 0, x: 20, filter: "blur(5px)" },
    open: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

/** Animation de la barre sticky au scroll. */
const stickyBarVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 260, damping: 25 },
    },
};

/* ------------------------------------------------------------------ */
/*                   Sous-composant : NavLink                          */
/* ------------------------------------------------------------------ */

/**
 * Propriétés du composant NavLink.
 *
 * @property {string} href - URL de destination du lien.
 * @property {string} label - Libellé affiché.
 * @property {number} index - Position du lien (utilisé pour le décalage d'animation).
 * @property {() => void} [onClick] - Callback exécuté au clic.
 */
interface NavLinkProps {
    href: string;
    label: string;
    index: number;
    onClick?: () => void;
}

/**
 * Lien de navigation individuel avec animation au survol.
 *
 * @param props - Propriétés du lien.
 * @returns Élément JSX du lien de navigation animé.
 */
function NavLink({ href, label, index, onClick }: NavLinkProps) {
    return (
        <motion.a
            href={href}
            custom={index}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onClick={onClick}
            className="group relative px-2 py-2.5 text-base font-semibold text-foreground/70 transition-all duration-300 hover:text-primary"
        >
            {label}
            {/* Indicateur animé au survol */}
            <span className="absolute inset-x-1 -bottom-px h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </motion.a>
    );
}

/* ------------------------------------------------------------------ */
/*                     Composant principal                             */
/* ------------------------------------------------------------------ */

/**
 * Barre de navigation principale de l'application Skolara.
 *
 * Structure :
 * - **Section supérieure** : Logo à gauche, icône de recherche + boutons
 *   de connexion/inscription à droite.
 * - **Section inférieure** : Liens de navigation horizontaux, devient
 *   fixe (sticky) lors du défilement.
 * - **Menu mobile** : Panneau latéral avec tous les liens et actions,
 *   déclenché par un bouton hamburger.
 *
 * @returns Élément JSX de la barre de navigation complète.
 */
export default function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const bottomNavRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLElement>(null);

    /* ---- Effet de suivi de souris (Spotlight) ---- */
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // FIX: Déplacer les templates au niveau supérieur (Règles des Hooks)
    const spotlightBackground = useMotionTemplate`
        radial-gradient(
            350px circle at ${mouseX}px ${mouseY}px,
            oklch(var(--primary) / 0.12),
            transparent 80%
        )
    `;

    const stickySpotlightBackground = useMotionTemplate`
        radial-gradient(
            250px circle at ${mouseX}px ${mouseY}px,
            oklch(var(--primary) / 0.1),
            transparent 80%
        )
    `;

    const handleMouseMove = ({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    /* ---- Détection du scroll pour rendre la barre inférieure sticky ---- */
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!bottomNavRef.current || !navbarRef.current) return;

        /** Seuil = position Y de la barre inférieure par rapport au haut du document. */
        const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
        setIsSticky(latest > 0 && navbarBottom <= 0);
    });

    /* ---- Fermer le menu mobile au redimensionnement ---- */
    const handleResize = useCallback(() => {
        if (window.innerWidth >= 768) {
            setIsMobileOpen(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    /* ---- Bloquer le scroll lorsque le menu mobile est ouvert ---- */
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    return (
        <>
            {/* ============================================================= */}
            {/*                       NAVBAR PRINCIPAL                         */}
            {/* ============================================================= */}
            <motion.nav
                ref={navbarRef}
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group/nav relative z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl"
            >
                {/* ---- Décoration : Ligne "Laser" Supérieure Pulsee ---- */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent">
                    <motion.div
                        className="h-full w-full bg-primary/20"
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                {/* ---- Effet Spotlight (Suit la souris) ---- */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/nav:opacity-100"
                    style={{ background: spotlightBackground }}
                />

                {/* ---- Décoration Animée Premium (Border Beam Bottom) ---- */}
                <div className="absolute inset-x-0 bottom-0 h-[1px] overflow-hidden">
                    <motion.div
                        className="h-full w-[30%] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                        animate={{ x: ["-100%", "400%"] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1,
                        }}
                    />
                </div>

                {/* ---- Décoration : Lueur Ambiante Supérieure ---- */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30 dark:via-white/10" />

                {/* ---- Section Supérieure : Logo + Actions ---- */}
                <WrapperSection className="!px-5 md:!px-[5%] 2xl:!px-[10%]">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo Animé */}
                        <motion.div
                            whileHover={{ y: -2, scale: 1.05 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            <Logo size={48} />
                        </motion.div>

                        {/* Actions Desktop */}
                        <motion.div
                            className="hidden items-center gap-3 md:flex"
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: "easeOut",
                            }}
                        >
                            {/* Theme Toggle */}
                            <ThemeToggle />

                            {/* Bouton Recherche */}
                            <ButtonReusable
                                variant="ghost"
                                size="icon"
                                aria-label="Rechercher"
                            >
                                <IconSearch className="size-5" />
                            </ButtonReusable>

                            {/* Séparateur */}
                            <div className="mx-1 h-6 w-px bg-border/60" />

                            {/* Connexion */}
                            <ButtonReusable
                                variant="ghost"
                                size="lg"
                                leftIcon={<IconLogin2 className="size-5" />}
                            >
                                Se connecter
                            </ButtonReusable>

                            {/* Inscription */}
                            <ButtonReusable
                                variant="default"
                                size="lg"
                                leftIcon={<IconUserPlus className="size-5" />}
                            >
                                S&apos;inscrire
                            </ButtonReusable>
                        </motion.div>

                        {/* Bouton hamburger (mobile) */}
                        <motion.button
                            initial={false}
                            animate={isMobileOpen ? "open" : "closed"}
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-primary/5 text-primary transition-colors hover:bg-primary/10 md:hidden"
                            aria-label={
                                isMobileOpen
                                    ? "Fermer le menu"
                                    : "Ouvrir le menu"
                            }
                        >
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: 45, y: 7 },
                                }}
                                className="h-0.5 w-6 rounded-full bg-current transition-all"
                            />
                            <motion.span
                                variants={{
                                    closed: { opacity: 1, x: 0 },
                                    open: { opacity: 0, x: 20 },
                                }}
                                className="h-0.5 w-6 rounded-full bg-current transition-all"
                            />
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -7 },
                                }}
                                className="h-0.5 w-6 rounded-full bg-current transition-all"
                            />
                        </motion.button>
                    </div>
                </WrapperSection>

                {/* ---- Section Inférieure : Liens de navigation (Desktop) ---- */}
                <div ref={bottomNavRef} className="border-t border-border/40">
                    <WrapperSection className="!px-5 md:!px-[5%] 2xl:!px-[10%]">
                        <div className="hidden items-center justify-center gap-2 py-2 md:flex">
                            {NAV_LINKS.map((link, i) => (
                                <NavLink
                                    key={link.href}
                                    href={link.href}
                                    label={link.label}
                                    index={i}
                                />
                            ))}
                        </div>
                    </WrapperSection>
                </div>
            </motion.nav>

            {/* ============================================================= */}
            {/*          BARRE STICKY (apparaît au scroll)                      */}
            {/* ============================================================= */}
            <AnimatePresence>
                {isSticky && (
                    <motion.div
                        variants={stickyBarVariants}
                        onMouseMove={handleMouseMove}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="group/sticky fixed inset-x-0 top-0 z-[100] hidden border-b border-border/40 bg-background/60 shadow-sm backdrop-blur-3xl md:block"
                    >
                        {/* ---- Effet Spotlight Sticky ---- */}
                        <motion.div
                            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/sticky:opacity-100"
                            style={{ background: stickySpotlightBackground }}
                        />

                        {/* ---- Décoration Animée (Border Beam Sticky) ---- */}
                        <div className="absolute inset-x-0 bottom-0 h-[1px] overflow-hidden">
                            <motion.div
                                className="h-full w-[25%] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                                animate={{ x: ["-100%", "400%"] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </div>
                        <WrapperSection className="!px-5 md:!px-[5%] 2xl:!px-[10%]">
                            <div className="flex h-12 items-center justify-between">
                                {/* Logo compact animé */}
                                <div className="flex items-center gap-6">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                        }}
                                    >
                                        <Logo size={32} />
                                    </motion.div>

                                    {/* Séparateur vertical */}
                                    <div className="h-5 w-px bg-border/60" />

                                    {/* Navigation inline */}
                                    <nav className="flex items-center gap-2">
                                        {NAV_LINKS.map((link, i) => (
                                            <motion.a
                                                key={link.href}
                                                href={link.href}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.08 + i * 0.04,
                                                }}
                                                className="group relative px-2.5 py-1.5 text-sm font-semibold text-foreground/60 transition-all duration-300 hover:text-primary"
                                            >
                                                {link.label}
                                                <span className="absolute inset-x-1 -bottom-px h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                            </motion.a>
                                        ))}
                                    </nav>
                                </div>

                                {/* Actions sticky */}
                                <motion.div
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <ThemeToggle />
                                    <ButtonReusable
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Rechercher"
                                        className="rounded-full text-foreground/60 hover:text-primary"
                                    >
                                        <IconSearch className="size-4" />
                                    </ButtonReusable>
                                    <ButtonReusable
                                        variant="default"
                                        size="sm"
                                        leftIcon={
                                            <IconUserPlus className="size-4" />
                                        }
                                    >
                                        S&apos;inscrire
                                    </ButtonReusable>
                                </motion.div>
                            </div>
                        </WrapperSection>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ============================================================= */}
            {/*                      MENU MOBILE                               */}
            {/* ============================================================= */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Overlay sombre */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Panneau latéral */}
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed inset-y-0 right-0 z-50 flex w-[80vw] max-w-sm flex-col bg-background/95 shadow-2xl backdrop-blur-2xl md:hidden"
                        >
                            {/* En-tête du panneau mobile */}
                            <div className="flex h-16 items-center justify-between border-b border-border/30 px-5">
                                <div className="flex items-center gap-4">
                                    <Logo size={36} />
                                    <ThemeToggle />
                                </div>
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                                    aria-label="Fermer le menu"
                                >
                                    <IconX className="size-5 text-foreground/70" />
                                </button>
                            </div>

                            {/* Liens de navigation mobile */}
                            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pt-6">
                                {NAV_LINKS.map((link) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        variants={mobileLinkVariants}
                                        initial="closed"
                                        animate="open"
                                        onClick={() => setIsMobileOpen(false)}
                                        className="group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold text-foreground/80 transition-all duration-300 hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
                                    >
                                        {link.label}
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            whileHover={{ opacity: 1, x: 0 }}
                                            className="text-primary"
                                        >
                                            →
                                        </motion.span>
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Actions mobile (bas du panneau) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.35 }}
                                className="flex flex-col gap-2.5 border-t border-border/30 p-5"
                            >
                                {/* Recherche mobile */}
                                <ButtonReusable
                                    variant="outline"
                                    size="lg"
                                    leftIcon={<IconSearch className="size-4" />}
                                    className="w-full justify-center rounded-xl"
                                >
                                    Rechercher
                                </ButtonReusable>

                                {/* Connexion */}
                                <ButtonReusable
                                    variant="ghost"
                                    size="lg"
                                    leftIcon={<IconLogin2 className="size-5" />}
                                    className="w-full justify-center"
                                >
                                    Se connecter
                                </ButtonReusable>

                                {/* Inscription */}
                                <ButtonReusable
                                    variant="default"
                                    size="lg"
                                    leftIcon={
                                        <IconUserPlus className="size-5" />
                                    }
                                    className="w-full justify-center"
                                >
                                    S&apos;inscrire
                                </ButtonReusable>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
