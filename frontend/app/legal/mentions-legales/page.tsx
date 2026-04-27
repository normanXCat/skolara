import { Metadata } from "next";
import LegalPageClient from "@/components/shared/LegalPageClient";
import { getSetting } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Mentions Légales | Skolara — Académie d'Excellence",
  description: "Consultez les mentions légales de la plateforme Skolara.",
};

export default async function MentionsLegalesPage() {
  const content = await getSetting("mentions_legales").catch(() => "");

  return (
    <LegalPageClient
      title="Mentions Légales"
      breadcrumbLabel="Mentions légales"
      content={content}
    />
  );
}
