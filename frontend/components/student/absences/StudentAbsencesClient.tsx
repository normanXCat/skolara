"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api-client";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/StatCard";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import {
  IconCalendarEvent,
  IconCheck,
  IconX,
  IconClock,
  IconFileText,
  IconInfoCircle
} from "@tabler/icons-react";

export function StudentAbsencesClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const response = await api.get("/api/student/absences");
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch absences", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbsences();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard isLoading={true} title="..." value={0} icon={IconClock} />
          <StatCard isLoading={true} title="..." value={0} icon={IconCheck} />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 bg-background/40 backdrop-blur-xl border-border/40 rounded-[2rem]">
              <div className="flex items-center gap-6">
                <SkeletonReusable width={48} height={48} className="rounded-2xl" />
                <div className="space-y-2">
                  <SkeletonReusable width={120} height={16} />
                  <SkeletonReusable width={80} height={12} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-background/40 rounded-[3rem] border border-border/40 border-dashed backdrop-blur-xl">
        <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
          <IconClock size={28} className="text-primary" />
        </div>
        <Typography variant="h2" className="text-2xl font-black">Historique indisponible</Typography>
        <p className="text-muted-foreground mt-2 max-w-md">Impossible de charger la liste de tes absences.</p>
      </div>
    );
  }

  const { absences, stats } = data;

  return (
    <div className="space-y-8 relative z-10 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          icon={IconClock}
          title="Total Absences"
          value={stats.totalAbsences}
          description="Depuis le début de l'année"
          className="border-border/40 bg-background/40 backdrop-blur-xl"
        />
        <StatCard
          icon={IconCheck}
          title="Absences Justifiées"
          value={stats.justifiedAbsences}
          badge={{ label: `${Math.round((stats.justifiedAbsences / (stats.totalAbsences || 1)) * 100)}%`, variant: "default" }}
          description="Avec motif ou certificat"
          className="border-border/40 bg-background/40 backdrop-blur-xl"
        />
      </div>

      <div className="space-y-4">
        {absences.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-medium italic border border-dashed border-border/40 rounded-[2rem] bg-background/30 backdrop-blur-md">
            Parfait ! Tu n'as aucune absence enregistrée.
          </div>
        ) : (
          absences.map((absence: any) => {
            const date = new Date(absence.date);
            return (
              <Card
                key={absence.id}
                className="overflow-hidden transition-all duration-300 border-border/40 bg-background/40 backdrop-blur-xl rounded-[2rem] hover:border-primary/30 shadow-sm hover:shadow-md"
              >
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className={`h-14 w-14 shrink-0 rounded-2xl flex flex-col items-center justify-center border shadow-sm ${
                        absence.isJustified 
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                    }`}>
                      {absence.isJustified ? <IconCheck size={28} /> : <IconX size={28} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Typography variant="h3" className="text-lg font-black tracking-tight flex items-center gap-2">
                          <IconCalendarEvent size={18} className="opacity-60" />
                          {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </Typography>
                        {absence.isJustified ? (
                           <Badge variant="outline" className="text-[9px] text-emerald-600 border-emerald-500/30 uppercase tracking-widest px-2 h-5 rounded-full">Justifiée</Badge>
                        ) : (
                           <Badge variant="outline" className="text-[9px] text-rose-600 border-rose-500/30 uppercase tracking-widest px-2 h-5 rounded-full">Non Justifiée</Badge>
                        )}
                      </div>
                      <Typography variant="body" className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                        <IconInfoCircle size={14} className="opacity-50" />
                        {absence.reason || "Aucun motif précisé"}
                      </Typography>
                      {absence.parentNotifiedAt && (
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-2 italic font-bold">
                           <IconFileText size={12} className="opacity-70" />
                           Parents notifiés le {new Date(absence.parentNotifiedAt).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
