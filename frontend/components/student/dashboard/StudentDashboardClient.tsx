'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ButtonReusable } from '@/components/ui/button-reusable';
import { StatCard } from '@/components/admin/StatCard';
import { SkeletonReusable } from '@/components/ui/skeleton-reusable';
import { 
  IconSchool, 
  IconTrophy, 
  IconCalendarEvent, 
  IconAlertTriangle,
  IconArrowUpRight,
  IconClock
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function StudentDashboardClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/student/dashboard');
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="h-20 w-20 rounded-3xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
          <IconAlertTriangle size={40} />
        </div>
        <Typography variant="h2" className="font-black">Oups !</Typography>
        <p className="text-muted-foreground text-center max-w-md">
          Impossible de charger les données du tableau de bord. Vérifie que ton profil élève est bien configuré.
        </p>
        <ButtonReusable onClick={() => window.location.reload()} variant="outline" className="rounded-xl">
          Réessayer
        </ButtonReusable>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Typography variant="h1" className="text-4xl md:text-5xl font-black tracking-tight">
              {loading ? <SkeletonReusable width={300} height={40} className="rounded-xl" /> : 
                <>Bonjour, <span className="text-primary">{data?.student?.firstName}</span> 👋</>
              }
            </Typography>
            <div className="mt-4">
              {loading ? <SkeletonReusable width={250} height={20} className="rounded-lg" /> :
                <Typography variant="body" className="text-muted-foreground text-lg font-medium">
                  Voici un aperçu de ta progression en <span className="text-foreground font-bold">{data?.student?.class || 'N/A'}</span>
                </Typography>
              }
            </div>
          </motion.div>
        </div>

        <div className="flex gap-4">
           {loading ? (
             <SkeletonReusable width={200} height={70} className="rounded-2xl" />
           ) : (
             <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-md">
               <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white">
                 <IconTrophy size={20} />
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase text-primary leading-none">Moyenne Générale</p>
                 <p className="text-xl font-black">{data?.semesterAverages[0]?.average || '--'} / 20</p>
               </div>
             </div>
           )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={IconAlertTriangle} 
          title="Absences" 
          value={loading ? "..." : data?.recentAbsences?.length || 0} 
          description="Ce semestre"
          isLoading={loading}
          delay={0}
        />
        <StatCard 
          icon={IconCalendarEvent} 
          title="Cours aujourd'hui" 
          value={loading ? "..." : data?.todayTimetable?.length || 0} 
          description="Sessions prévues"
          isLoading={loading}
          delay={0.1}
        />
        <StatCard 
          icon={IconSchool} 
          title="Matières" 
          value={loading ? "..." : data?.semesterAverages[0]?.subjects?.length || 0} 
          description="Inscrites"
          isLoading={loading}
          delay={0.2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Planning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-[2rem] border-border/40 bg-card/50 backdrop-blur-xl overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-border/40 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <IconClock size={20} />
                </div>
                <Typography variant="h3" className="font-black">Planning du jour</Typography>
              </div>
              <Link href="/student/timetable" className="text-xs font-bold text-primary hover:underline">
                Voir tout
              </Link>
            </div>
            
            <div className="p-6 flex-1 space-y-4">
              {loading ? (
                <div className="space-y-6 pt-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <SkeletonReusable width={3} height={40} className="rounded-full bg-primary/20 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                           <SkeletonReusable width={120} height={16} />
                           <SkeletonReusable width={60} height={20} className="rounded-lg" />
                        </div>
                        <SkeletonReusable width={150} height={12} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : data?.todayTimetable?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                   <p>Aucun cours prévu aujourd'hui</p>
                </div>
              ) : (
                data?.todayTimetable?.map((slot: any, idx: number) => (
                  <div key={slot.id} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      {idx !== data.todayTimetable.length - 1 && <div className="flex-1 w-[2px] bg-border/40 my-1" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-black text-sm uppercase tracking-tight">{slot.subject.name}</p>
                          <p className="text-xs text-muted-foreground font-medium">
                            {slot.teacher.user.firstName} {slot.teacher.user.name}
                          </p>
                        </div>
                        <Badge variant="outline" className="rounded-lg font-bold border-border/40">
                          {slot.startTime} - {slot.endTime}
                        </Badge>
                      </div>
                      {slot.room && (
                        <div className="mt-2 text-[10px] inline-flex items-center px-2 py-0.5 rounded-md bg-secondary/50 font-bold border border-border/20">
                          Salle {slot.room}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </motion.div>

        {/* Recent Grades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-[2rem] border-border/40 bg-card/50 backdrop-blur-xl overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-border/40 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <IconTrophy size={20} />
                </div>
                <Typography variant="h3" className="font-black">Dernières notes</Typography>
              </div>
              <Link href="/student/grades" className="text-xs font-bold text-primary hover:underline">
                Détails
              </Link>
            </div>
            
            <div className="divide-y divide-border/20">
              {loading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 py-2 border-b border-border/10 last:border-0">
                      <SkeletonReusable width={48} height={48} className="rounded-2xl" />
                      <div className="space-y-2 flex-1">
                        <SkeletonReusable width={100} height={14} />
                        <SkeletonReusable width={140} height={10} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : data?.recentGrades?.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground">
                   Aucune note enregistrée
                </div>
              ) : (
                data?.recentGrades?.map((grade: any) => (
                  <div key={grade.id} className="p-6 hover:bg-primary/5 transition-colors group flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black ${
                        grade.value >= 10 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                      }`}>
                        {grade.value}
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase leading-tight">{grade.subject.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium mt-1">
                          Évalué le {new Date(grade.gradedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <IconArrowUpRight size={18} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

