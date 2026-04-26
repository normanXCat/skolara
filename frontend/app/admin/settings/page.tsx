"use client";

import SettingsClient from "@/components/admin/settings/SettingsClient";
import { Typography } from "@/components/ui/typography";
import { motion } from "framer-motion";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="h-px w-8 bg-primary" />
        <Typography
          variant="overline"
          className="text-primary font-black tracking-[0.3em]"
        >
          PARAMÈTRES
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
      >
        <Typography
          variant="h1"
          className="text-4xl lg:text-5xl font-black leading-tight tracking-tight"
        >
          Paramètres du{" "}
          <span className="text-primary italic font-serif">Site</span>
        </Typography>
      </motion.div>

      <SettingsClient />
    </div>
  );
}
