"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";

export function CalendarHeader() {
  return (
    <div className="relative mb-16 py-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Background decoration lines - Multiple layers for visibility */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20 opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
      
      <header className="space-y-6 text-center max-w-2xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="overline" className="text-primary font-black tracking-[0.3em]">
            Calendrier Scolaire
          </Typography>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Typography variant="display" className="leading-none italic tracking-tight">
            Planifiez votre <span className="text-primary italic font-serif">Réussite</span>
          </Typography>
        </motion.div>
      </header>
    </div>
  );
}
