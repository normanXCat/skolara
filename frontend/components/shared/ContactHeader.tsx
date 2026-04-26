"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface ContactHeaderProps {
  email?: string;
  phone?: string;
}

export function ContactHeader({ email, phone }: ContactHeaderProps) {
  const contactOptions = [
    ...(email
      ? [
          {
            icon: IconMail,
            title: "Email",
            value: email,
            href: `mailto:${email}`,
            color: "bg-blue-500/10 text-blue-500",
          },
        ]
      : []),
    ...(phone
      ? [
          {
            icon: IconPhone,
            title: "Téléphone",
            value: phone,
            href: `tel:${phone.replace(/\s+/g, "")}`,
            color: "bg-blue-500/10 text-blue-500",
          },
        ]
      : []),
  ];

  return (
    <header className="flex-1 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="h-px w-8 bg-primary" />
        <Typography variant="overline" className="text-primary font-black tracking-[0.3em]">
          CONTACTEZ-NOUS
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Typography variant="h1" className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-balance">
          Prêt à rejoindre <span className="text-primary italic font-serif">l'excellence</span> ?
        </Typography>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-xl font-medium max-w-xl leading-relaxed"
      >
        Notre équipe est à votre entière écoute pour vous accompagner dans votre projet éducatif.
      </motion.p>

      {contactOptions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
          {contactOptions.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col p-6 rounded-3xl bg-card/40 border border-border/40 hover:border-primary/30 transition-all duration-300"
            >
              <div className={cn("size-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", item.color)}>
                <item.icon size={20} strokeWidth={1.5} />
              </div>
              <Typography variant="h4" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">
                {item.title}
              </Typography>
              <span className="text-sm font-black truncate">{item.value}</span>
            </motion.a>
          ))}
        </div>
      )}
    </header>
  );
}
