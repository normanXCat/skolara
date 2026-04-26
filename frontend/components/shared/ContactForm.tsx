"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconSend, IconCheck } from "@tabler/icons-react";
import InputReusable from "@/components/ui/input-reusable";
import TextareaReusable from "@/components/ui/textarea-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { useContactForm } from "@/hooks/use-contact-form";

export function ContactForm() {
  const { form, onSubmit, isSubmitting, isSuccess, error } = useContactForm();
  const { register, formState: { errors } } = form;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative p-8 md:p-12 rounded-3xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] -z-10 rounded-full" />
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputReusable
            id="fullName"
            label="Nom Complet"
            placeholder="Jean Dupont"
            register={register("fullName")}
            error={errors.fullName?.message}
          />
          <InputReusable
            id="email"
            label="Adresse Email"
            placeholder="jean.dupont@email.com"
            type="email"
            register={register("email")}
            error={errors.email?.message}
          />
        </div>

        <InputReusable
          id="subject"
          label="Sujet"
          placeholder="Comment pouvons-nous vous aider ?"
          register={register("subject")}
          error={errors.subject?.message}
        />

        <TextareaReusable
          id="message"
          label="Votre Message"
          placeholder="Décrivez votre demande en quelques mots..."
          className="min-h-[150px]"
          register={register("message")}
          error={errors.message?.message}
        />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-destructive text-sm font-bold bg-destructive/10 p-4 rounded-2xl border border-destructive/20"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <ButtonReusable
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
          disabled={isSuccess}
          rightIcon={isSuccess ? <IconCheck size={24} /> : <IconSend size={20} />}
        >
          {isSuccess ? "Message Envoyé" : "Envoyer le message"}
        </ButtonReusable>
      </form>
    </motion.div>
  );
}
