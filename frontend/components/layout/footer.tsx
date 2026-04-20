"use client";

import React from "react";
import { motion } from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import Logo from "@/components/common/logo";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandX,
    IconMail,
    IconPhone,
    IconMapPin,
    IconArrowUp,
} from "@tabler/icons-react";
import { NavLink } from "@/components/ui/nav-link";
import { ROUTES } from "@/config/routes";
import { NAVIGATION_LINKS } from "@/config/navigation";

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────

const footerLinks = {
    navigation: {
        title: "Navigation",
        links: NAVIGATION_LINKS,
    },

    ressources: {
        title: "Ressources",
        links: [
            { label: "Inscription", href: ROUTES.PRE_REGISTRATION },
            { label: "Programme Scolaire", href: "/programme" },
            { label: "Vie Scolaire", href: "/vie-scolaire" },
            { label: "FAQ", href: "/faq" },
            { label: "Plan du Site", href: "/sitemap" },
        ],
    },

    legal: {
        title: "Légal",
        links: [
            { label: "Mentions légales", href: "/mentions-legales" },
            { label: "Politique de confidentialité", href: "/confidentialite" },
            { label: "Conditions d'utilisation", href: "/conditions" },
        ],
    },
};

const socials = [
    {
        icon: <IconBrandFacebook className="size-5" />,
        href: "#",
        label: "Facebook",
    },
    {
        icon: <IconBrandInstagram className="size-5" />,
        href: "#",
        label: "Instagram",
    },
    {
        icon: <IconBrandLinkedin className="size-5" />,
        href: "#",
        label: "LinkedIn",
    },
    { icon: <IconBrandX className="size-5" />, href: "#", label: "X" },
];

// ──────────────────────────────────────────────
// BACKGROUND BACKGROUND WORD (Inspired by Hero)
// ──────────────────────────────────────────────

function FooterSkolaraBG() {
    return (
        <div
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
            aria-hidden="true"
        >
            {/* SVG Hatch Patterns (copied from hero for consistency) */}
            <svg className="absolute h-0 w-0">
                <defs>
                    <pattern
                        id="footer-hatch-light"
                        patternUnits="userSpaceOnUse"
                        width="6"
                        height="6"
                        patternTransform="rotate(45)"
                    >
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="6"
                            stroke="oklch(0.66 0.19 250 / 0.4)"
                            strokeWidth="1.2"
                        />
                    </pattern>
                    <pattern
                        id="footer-hatch-dark"
                        patternUnits="userSpaceOnUse"
                        width="6"
                        height="6"
                        patternTransform="rotate(45)"
                    >
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="6"
                            stroke="oklch(0.66 0.19 250 / 0.25)"
                            strokeWidth="1.5"
                        />
                    </pattern>
                </defs>
            </svg>

            <div className="flex h-full items-center justify-center opacity-50 dark:opacity-30">
                <span
                    className="relative font-extrabold tracking-tighter"
                    style={{ fontSize: "clamp(10rem, 20vw, 25rem)" }}
                >
                    {/* Stroke Layer */}
                    <span
                        className="absolute inset-0 text-transparent"
                        style={{
                            WebkitTextStroke: "1px oklch(0.66 0.19 250 / 0.2)",
                        }}
                    >
                        Skolara
                    </span>
                    {/* Hatched Fill Layer */}
                    <svg className="h-[1em] w-[4em] overflow-visible">
                        <text
                            x="50%"
                            y="50%"
                            dominantBaseline="central"
                            textAnchor="middle"
                            className="fill-[url(#footer-hatch-light)] dark:fill-[url(#footer-hatch-dark)]"
                            style={{ fontSize: "1em", fontWeight: 800 }}
                        >
                            Skolara
                        </text>
                    </svg>
                </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
    );
}

// ──────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ──────────────────────────────────────────────

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative overflow-hidden border-t border-border/30 bg-background/50 backdrop-blur-sm">
            <FooterSkolaraBG />

            {/* ── SECTION PRINCIPALE ── */}
            <WrapperSection className="pt-20 pb-10">
                <div className="relative">
                    {/* ── HEADER DU FOOTER ── */}
                    <div className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                        {/* Logo + Tagline */}
                        <div className="max-w-md space-y-6">
                            <Logo size={44} />

                            <Typography
                                variant="body"
                                className="text-base leading-relaxed text-muted-foreground/80"
                            >
                                L&apos;excellence éducative au service de
                                l&apos;avenir. Skolara accompagne les familles
                                et les établissements dans le parcours scolaire
                                et préscolaire.
                            </Typography>

                            {/* Réseaux sociaux (Using ButtonReusable) */}
                            <div className="flex items-center gap-3">
                                {socials.map((social, i) => (
                                    <ButtonReusable
                                        key={social.label}
                                        href={social.href}
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-md text-muted-foreground hover:text-primary transition-all"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </ButtonReusable>
                                ))}
                            </div>
                        </div>

                        {/* Bouton Retour en haut (Using ButtonReusable) */}
                        <ButtonReusable
                            variant="outline"
                            size="icon-lg"
                            onClick={scrollToTop}
                            aria-label="Retour en haut"
                        >
                            <IconArrowUp className="size-5" />
                        </ButtonReusable>
                    </div>

                    {/* ── GRILLE DE LIENS ── */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
                        {/* Colonnes de liens (Navbar Style) */}
                        {Object.values(footerLinks).map(
                            (section, sectionIdx) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: sectionIdx * 0.1 }}
                                >
                                    <Typography
                                        variant="caption"
                                        className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/30"
                                    >
                                        {section.title}
                                    </Typography>
                                    <ul className="flex flex-col items-start gap-4">
                                        {section.links.map((link) => (
                                            <li key={link.href}>
                                                <NavLink
                                                    href={link.href}
                                                    variant="footer"
                                                    size="sm"
                                                >
                                                    {link.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ),
                        )}

                        {/* Contact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Typography
                                variant="caption"
                                className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/30"
                            >
                                Contact
                            </Typography>
                            <ul className="space-y-5">
                                <li>
                                    <NavLink
                                        href="mailto:contact@skolara.com"
                                        variant="footer"
                                        size="sm"
                                        showUnderline={false}
                                        className="gap-3"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary/60 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                            <IconMail className="size-4" />
                                        </div>
                                        contact@skolara.com
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        href="tel:+212500000000"
                                        variant="footer"
                                        size="sm"
                                        showUnderline={false}
                                        className="gap-3"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary/60 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                            <IconPhone className="size-4" />
                                        </div>
                                        +212 5 00 00 00 00
                                    </NavLink>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-semibold text-muted-foreground">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary/60">
                                        <IconMapPin className="size-4" />
                                    </div>
                                    <span className="mt-1.5">
                                        Casablanca, Maroc
                                    </span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* ── BARRE DE COPYRIGHT ── */}
                    <div className="mt-20 flex flex-col items-center justify-center gap-6 border-t border-border/20 pt-10 sm:flex-row">
                        <Typography
                            variant="caption"
                            className="text-xs font-medium text-muted-foreground/40"
                        >
                            © {new Date().getFullYear()} Skolara. Tous droits
                            réservés.
                        </Typography>
                    </div>
                </div>
            </WrapperSection>
        </footer>
    );
}
