"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandLinkedin,
  IconDeviceFloppy,
  IconAlertCircle,
} from "@tabler/icons-react";
import InputReusable from "@/components/ui/input-reusable";
import WysiwygReusable from "@/components/shared/WysiwygReusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { Typography } from "@/components/ui/typography";
import { useSettings } from "@/hooks/use-settings";

function SectionCard({
  title,
  description,
  children,
  delay = 0,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative p-8 md:p-10 rounded-3xl bg-card/40 border border-border/40 backdrop-blur-sm space-y-8"
    >
      <div className="space-y-1">
        <Typography variant="h3" className="text-xl font-black tracking-tight">
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body"
            className="text-sm text-muted-foreground/60"
          >
            {description}
          </Typography>
        )}
      </div>
      {children}
    </motion.div>
  );
}

function SettingsSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-8 md:p-10 rounded-3xl bg-card/40 border border-border/40 space-y-6"
        >
          <div className="space-y-2">
            <SkeletonReusable className="h-6 w-48" shape="rounded" />
            <SkeletonReusable className="h-4 w-72" shape="rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonReusable className="h-14 w-full" shape="rounded" />
            <SkeletonReusable className="h-14 w-full" shape="rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SettingsClient() {
  const { form, isLoading, isSaving, isDirty, onSubmit } = useSettings();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const mentionsLegales = watch("mentions_legales");
  const cgu = watch("cgu");

  if (isLoading) return <SettingsSkeleton />;

  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-28">
      {/* Card 1 — School Information */}
      <SectionCard
        title="Informations de l'établissement"
        description="Coordonnées principales affichées sur le site public et le footer."
        delay={0}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputReusable
            id="school_name"
            label="Nom de l'établissement"
            placeholder="Skolara Academy"
            register={register("school_name")}
            error={errors.school_name?.message}
          />
          <InputReusable
            id="phone"
            label="Téléphone"
            placeholder="+261 34 00 000 00"
            register={register("phone")}
            error={errors.phone?.message}
          />
          <InputReusable
            id="email"
            label="Adresse email"
            placeholder="contact@skolara.academy"
            type="email"
            register={register("email")}
            error={errors.email?.message}
          />
          <InputReusable
            id="city"
            label="Ville"
            placeholder="Antananarivo"
            register={register("city")}
            error={errors.city?.message}
          />
          <div className="md:col-span-2">
            <InputReusable
              id="address"
              label="Adresse complète"
              placeholder="Lot IV 123 Bis, Ankorondrano"
              register={register("address")}
              error={errors.address?.message}
            />
          </div>
          <div className="md:col-span-2">
            <InputReusable
              id="google_maps_url"
              label="URL Google Maps (iframe src)"
              placeholder="https://www.google.com/maps/embed?pb=..."
              register={register("google_maps_url")}
              error={errors.google_maps_url?.message}
            />
          </div>
        </div>
      </SectionCard>

      {/* Card 2 — Social Media */}
      <SectionCard
        title="Réseaux sociaux"
        description="Liens vers vos pages sociales — les réseaux non renseignés seront masqués."
        delay={0.1}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputReusable
            id="facebook_url"
            label="Facebook"
            placeholder="https://facebook.com/skolara"
            icon={IconBrandFacebook}
            register={register("facebook_url")}
            error={errors.facebook_url?.message}
          />
          <InputReusable
            id="instagram_url"
            label="Instagram"
            placeholder="https://instagram.com/skolara"
            icon={IconBrandInstagram}
            register={register("instagram_url")}
            error={errors.instagram_url?.message}
          />
          <InputReusable
            id="twitter_url"
            label="Twitter / X"
            placeholder="https://x.com/skolara"
            icon={IconBrandX}
            register={register("twitter_url")}
            error={errors.twitter_url?.message}
          />
          <InputReusable
            id="linkedin_url"
            label="LinkedIn"
            placeholder="https://linkedin.com/company/skolara"
            icon={IconBrandLinkedin}
            register={register("linkedin_url")}
            error={errors.linkedin_url?.message}
          />
        </div>
      </SectionCard>

      {/* Card 3 — Mentions légales */}
      <SectionCard
        title="Mentions légales"
        description="Contenu de la page des mentions légales accessible publiquement."
        delay={0.2}
      >
        <WysiwygReusable
          id="mentions_legales"
          label="Contenu des mentions légales"
          value={mentionsLegales}
          onChange={(val) => setValue("mentions_legales", val, { shouldDirty: true })}
          error={errors.mentions_legales?.message}
          placeholder="Rédigez vos mentions légales ici..."
        />
      </SectionCard>

      {/* Card 4 — CGU */}
      <SectionCard
        title="Conditions Générales d'Utilisation"
        description="Contenu de la page CGU accessible publiquement."
        delay={0.3}
      >
        <WysiwygReusable
          id="cgu"
          label="Contenu des CGU"
          value={cgu}
          onChange={(val) => setValue("cgu", val, { shouldDirty: true })}
          error={errors.cgu?.message}
          placeholder="Rédigez vos conditions générales d'utilisation ici..."
        />
      </SectionCard>

      {/* Sticky Save Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:left-[280px]">
        <AnimatePresence>
          {isDirty && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-center justify-between gap-4 px-8 py-4 bg-background/80 backdrop-blur-xl border-t border-border/40 shadow-2xl"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-amber-500">
                <IconAlertCircle size={18} />
                <span>Modifications non enregistrées</span>
              </div>
              <ButtonReusable
                type="submit"
                isLoading={isSaving}
                rightIcon={<IconDeviceFloppy size={18} />}
              >
                Enregistrer les modifications
              </ButtonReusable>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
