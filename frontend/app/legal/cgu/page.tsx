import { Metadata } from "next";
import LegalPageClient from "@/components/shared/LegalPageClient";
import { getSetting } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | Skolara — Académie d'Excellence",
  description: "Consultez les conditions générales d'utilisation de la plateforme Skolara.",
};

export default async function CGUPage() {
  const content = await getSetting("cgu");
  return (
    <LegalPageClient
      title="Conditions Générales d'Utilisation"
      breadcrumbLabel="Conditions Générales d'Utilisation"
      content={content}
    />
  );
}
