import { StudentMessagesClient } from "@/components/student/messages/StudentMessagesClient";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { IconChevronLeft, IconMessagePlus } from "@tabler/icons-react";

export const metadata = {
  title: "Messagerie | Skolara Élève",
  description: "Consultez et envoyez vos messages.",
};

export default function StudentMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard">
              <ButtonReusable variant="outline" size="icon">
                <IconChevronLeft size={20} />
              </ButtonReusable>
            </Link>
            <div className="flex flex-col">
              <Typography variant="h2" className="text-2xl font-black">Messagerie</Typography>
              <Typography
                variant="body"
                className="text-[10px] uppercase font-black text-muted-foreground mt-1 tracking-widest leading-none"
              >
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </Typography>
            </div>
          </div>

          <Link href="/student/messages?compose=1">
            <ButtonReusable leftIcon={<IconMessagePlus size={18} />}>
              Nouveau message
            </ButtonReusable>
          </Link>
        </div>
      </div>

      <Suspense fallback={<div className="animate-pulse h-[600px] rounded-3xl bg-white/5 border border-white/10" />}>
        <StudentMessagesClient />
      </Suspense>
    </div>
  );
}
