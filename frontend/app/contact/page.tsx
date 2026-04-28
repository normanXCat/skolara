import React from "react";
import { Metadata } from "next";
import { PageContent } from "@/app/contact/PageContent";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contactez-nous | Skolara Academy",
  description: "Vous avez des questions ou souhaitez inscrire votre enfant ? Contactez Skolara Academy, votre partenaire d'excellence éducative à Antananarivo.",
  keywords: ["contact", "Skolara Academy", "inscription", "école Antananarivo", "excellence éducative"],
  openGraph: {
    title: "Contactez-nous | Skolara Academy",
    description: "Prêt à rejoindre l'excellence ? Notre équipe est à votre écoute.",
    type: "website",
  },
};

export default async function ContactPage() {
  const settings = await getSettings().catch(() => ({}));
  return <PageContent settings={settings} />;
}
