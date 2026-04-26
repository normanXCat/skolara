import { Metadata } from "next";
import WrapperSection from "@/components/wrapper-section";
import { CalendarClient } from "@/components/public/calendar/CalendarClient";

export const metadata: Metadata = {
  title: "Calendrier Académique | Skolara - Académie d'Excellence",
  description: "Restez informé des dates clés, des examens, des vacances et des événements culturels de l'Académie Skolara. Planifiez votre réussite avec notre calendrier interactif.",
  openGraph: {
    title: "Calendrier Académique | Skolara",
    description: "Toutes les dates importantes de la vie scolaire à l'Académie Skolara.",
    type: "website",
    url: "https://skolara.com/calendar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendrier Académique | Skolara",
    description: "Toutes les dates importantes de la vie scolaire à l'Académie Skolara.",
  }
};

export default function CalendarPage() {
  return (
    <main className="relative bg-background min-h-screen selection:bg-primary/30 pt-12 pb-24 lg:pt-20 overflow-hidden">
      {/* Background patterns and decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
      </div>

      <WrapperSection>
        <div className="w-full max-w-7xl mx-auto">
          <CalendarClient />
        </div>
      </WrapperSection>
    </main>
  );
}
