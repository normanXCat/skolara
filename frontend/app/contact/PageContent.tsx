"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import WrapperSection from "@/components/wrapper-section";
import SectionDivider from "@/components/ui/section-divider";
import { ContactHeader } from "@/components/shared/ContactHeader";
import { ContactForm } from "@/components/shared/ContactForm";
import { ContactCampus } from "@/components/shared/ContactCampus";

/**
 * Background pattern with grid lines.
 */
function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none" aria-hidden="true">
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

/**
 * Floating blurred elements for ambient effect.
 */
function FloatingElement({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
        y: [0, -30, 0],
        x: [0, 20, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={cn("absolute rounded-full blur-[100px] -z-10 pointer-events-none", className)}
    />
  );
}

interface PageContentProps {
  settings: {
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    google_maps_url?: string;
  };
}

export function PageContent({ settings = {} }: PageContentProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <PageBackground />
      
      <FloatingElement className="top-[10%] -left-[5%] size-80 bg-primary/10" delay={0} />
      <FloatingElement className="bottom-[10%] right-[5%] size-[400px] bg-primary/5" delay={2} />

      <WrapperSection className="py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-4 xl:gap-8">
          <ContactHeader
            email={settings.email || "contact@skolara.academy"}
            phone={settings.phone || "+261 34 00 000 00"}
          />
          <div className="w-full lg:w-[500px] xl:w-[600px]">
            <React.Suspense fallback={<div className="h-[400px] rounded-3xl bg-white/20 animate-pulse border border-white/10" />}>
              <ContactForm />
            </React.Suspense>
          </div>
        </div>

        <SectionDivider className="py-12" />

        <ContactCampus
          address={settings.address}
          city={settings.city}
          googleMapsUrl={settings.google_maps_url}
        />
      </WrapperSection>
    </div>
  );
}
