"use client";

import React from "react";
import { motion } from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import { NavLink } from "@/components/ui/nav-link";
import { IconChevronRight } from "@tabler/icons-react";

interface LegalPageProps {
  title: string;
  breadcrumbLabel: string;
  content: string;
}

export default function LegalPageClient({ title, breadcrumbLabel, content }: LegalPageProps) {
  return (
    <main className="relative bg-background min-h-screen selection:bg-primary/30 pt-12 pb-24 lg:pt-20 overflow-hidden">
      {/* Background decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
      </div>

      <WrapperSection>
        <div className="w-full max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground/60 mb-12"
          >
            <NavLink href="/" variant="footer" size="sm">Accueil</NavLink>
            <IconChevronRight size={14} />
            <span className="text-foreground font-bold">{breadcrumbLabel}</span>
          </motion.nav>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary" />
              <Typography variant="overline" className="text-primary font-black tracking-[0.3em]">
                INFORMATIONS LÉGALES
              </Typography>
            </div>
            <Typography variant="h1" className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              {title}
            </Typography>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative p-8 md:p-12 rounded-3xl bg-card/40 border border-border/40 backdrop-blur-sm"
          >
            {content && content.trim() !== "" ? (
              <article
                className="wysiwyg-content prose prose-lg dark:prose-invert max-w-none text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="text-center py-16">
                <Typography variant="h3" className="text-muted-foreground/40 font-black">
                  Cette page est en cours de rédaction.
                </Typography>
                <p className="text-sm text-muted-foreground/30 mt-2">
                  Le contenu sera disponible prochainement.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </WrapperSection>
    </main>
  );
}
