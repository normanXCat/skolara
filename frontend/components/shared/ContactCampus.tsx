"use client";

import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/shared/LeafletMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted/20 animate-pulse rounded-3xl" />,
});

interface ContactCampusProps {
  address?: string;
  city?: string;
  googleMapsUrl?: string;
}

export function ContactCampus({ address, city, googleMapsUrl }: ContactCampusProps) {
  const displayAddress = address || "Lot IV 123 Bis, Ankorondrano";
  const displayCity = city || "Antananarivo 101, Madagascar";
  const hasMap = !!googleMapsUrl && googleMapsUrl.trim() !== "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      <div className="lg:col-span-1 space-y-12">
        <div className="space-y-4">
          <Typography variant="h2" className="text-4xl font-black leading-tight">
            Notre <span className="text-primary italic font-serif">Campus</span>
          </Typography>
          <p className="text-muted-foreground text-lg leading-relaxed">
            De la maternelle au lycée, notre campus accueille vos enfants dans un cadre moderne dédié à l'épanouissement et à la réussite scolaire.
          </p>
        </div>

        <div className="space-y-4 relative">
          <div className="absolute left-6 top-10 bottom-10 w-px bg-gradient-to-b from-primary/50 via-primary/5 to-transparent hidden sm:block" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-0 sm:pl-16 group"
          >
            <div className="absolute left-4 top-1 size-4 rounded-full border-4 border-background bg-primary shadow-sm z-10 hidden sm:block group-hover:scale-125 transition-transform" />
            <div className="p-6 rounded-3xl bg-card/30 border border-border/40 group-hover:border-primary/30 transition-all duration-300">
              <Typography variant="h4" className="text-xs font-black text-primary mb-3">
                Localisation
              </Typography>
              <Typography className="text-lg font-black leading-snug">
                {displayAddress}<br />
                {displayCity}
              </Typography>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative pl-0 sm:pl-16 group"
          >
            <div className="absolute left-4 top-1 size-4 rounded-full border-4 border-background bg-muted z-10 hidden sm:block group-hover:bg-primary transition-colors" />
            <div className="p-6 rounded-3xl bg-card/30 border border-border/40 group-hover:border-primary/30 transition-all duration-300">
              <Typography variant="h4" className="text-xs font-black text-muted-foreground/60 mb-3">
                Horaires d'ouverture
              </Typography>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="opacity-60">Lundi — Vendredi</span>
                  <span className="text-primary">08h - 17h</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="opacity-60">Samedi</span>
                  <span className="text-muted-foreground">Fermé</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-10 bg-primary/10 blur-[120px] -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative h-[500px] w-full overflow-hidden border border-border/40">
            {hasMap ? (
              <iframe
                src={googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps — Campus Skolara"
              />
            ) : (
              <LeafletMap
                center={[-18.8791902, 47.5079051]}
                zoom={15}
                markerLabel="Skolara Academy"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
