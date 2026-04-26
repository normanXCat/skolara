import { Metadata } from "next";
import FAQClient from "./FAQClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "FAQ | Skolara — Académie d'Excellence",
  description: "Trouvez des réponses aux questions fréquemment posées sur la scolarité, les inscriptions et le fonctionnement de Skolara.",
  keywords: ["FAQ", "questions fréquentes", "skolara", "école", "inscription", "scolarité"],
};

export default async function FAQPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <FAQClient />
    </Suspense>
  );
}
