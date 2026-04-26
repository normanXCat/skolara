'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  IconTrophy, 
  IconCalendarEvent, 
  IconAlertTriangle,
  IconArrowUpRight,
  IconClock,
  IconUser,
  IconChevronRight
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ParentDashboard() {
  const [data, setData] = useState<any>(null);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async (childId?: number) => {
    try {
      const url = childId ? `/api/parent/dashboard?childId=${childId}` : '/api/parent/dashboard';
      const response = await api.get(url);
      if (response.success) {
        setData(response.data);
        if (!childId && (response.data as any).children?.length > 0) {
          setSelectedChildId((response.data as any).selectedChildData?.student?.id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch parent dashboard', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleChildSelect = (id: number) => {
    if (id === selectedChildId) return;
    setLoading(true);
    setSelectedChildId(id);
    fetchDashboard(id);
  };

  if (!data && loading) {
    return <div className="p-8 animate-pulse space-y-8">
      <div className="h-12 w-1/4 bg-muted rounded-xl" />
      <div className="h-24 w-full bg-muted rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1,2,3].map(i => <div key={i} className="h-32 bg-muted rounded-3xl" />)}
      </div>
    </div>;
  }

  const childData = data?.selectedChildData;

  return (
    <div className="space-y-10">
      {/* Parent Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Typography variant="h1" className="text-4xl font-black tracking-tight">
            Espace <span className="text-primary">Parent</span>
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg mt-1 font-medium">
            Suivi de la scolarité de vos enfants
          </Typography>
        </div>
      </div>

      {/* Children Selection Bar */}
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {data.children.map((child: any) => (
          <button
            key={child.id}
            onClick={() => handleChildSelect(child.id)}
            className={`flex-shrink-0 p-4 rounded-[2rem] border transition-all duration-300 flex items-center gap-4 ${
              selectedChildId === child.id 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                : 'bg-card/50 border-border/40 hover:border-primary/50'
            }`}
          >
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
              selectedChildId === child.id ? 'bg-white/20' : 'bg-primary/10 text-primary'
            }`}>
              <IconUser size={24} />
            </div>
            <div className="text-left pr-4">
              <p className="font-black text-sm uppercase leading-none">{child.firstName}</p>
              <p className={`text-[10px] font-bold mt-1 opacity-70 ${
                selectedChildId === child.id ? 'text-white' : 'text-muted-foreground'
              }`}>
                {child.class}
              </p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[1,2,3].map(i => <div key={i} className="h-32 bg-muted rounded-3xl animate-pulse" />)}
          </motion.div>
        ) : childData ? (
          <motion.div
            key={selectedChildId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                icon={IconAlertTriangle} 
                label="Absences" 
                value={childData.recentAbsences.length} 
                subValue="Somme"
                color="rose"
              />
              <StatCard 
                icon={IconCalendarEvent} 
                label="Cours aujourd'hui" 
                value={childData.todayTimetable.length} 
                subValue="Sessions"
                color="blue"
              />
              <StatCard 
                icon={IconTrophy} 
                label="Moyenne" 
                value={childData.recentGrades.length > 0 ? (childData.recentGrades.reduce((a:any, b:any) => a + b.value, 0) / childData.recentGrades.length).toFixed(1) : '--'} 
                subValue="/ 20"
                color="indigo"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Today's Schedule */}
              <Card className="rounded-[2.5rem] border-border/40 bg-card/40 backdrop-blur-xl overflow-hidden shadow-xl">
                 <div className="p-8 border-b border-border/40 flex justify-between items-center bg-muted/20">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                          <IconClock size={24} />
                       </div>
                       <Typography variant="h3" className="text-xl font-black uppercase tracking-tight">Planning du jour</Typography>
                    </div>
                    <Link href="/parent/timetable">
                       <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary">
                          <IconChevronRight size={24} />
                       </Button>
                    </Link>
                 </div>
                 <div className="p-8 space-y-6">
                    {childData.todayTimetable.length === 0 ? (
                      <div className="text-center py-10 opacity-50 font-medium">Aucun cours aujourd'hui</div>
                    ) : (
                      childData.todayTimetable.map((slot: any) => (
                        <div key={slot.id} className="flex items-center justify-between p-4 rounded-3xl border border-border/20 bg-background/40 hover:border-primary/40 transition-colors group">
                           <div className="flex items-center gap-4">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <div>
                                 <p className="font-black text-sm uppercase">{slot.subject.name}</p>
                                 <p className="text-xs text-muted-foreground">{slot.teacher.user.firstName} {slot.teacher.user.name}</p>
                              </div>
                           </div>
                           <Badge variant="secondary" className="rounded-xl font-black tabular-nums">
                              {slot.startTime} - {slot.endTime}
                           </Badge>
                        </div>
                      ))
                    )}
                 </div>
              </Card>

              {/* Performance / Grades */}
              <Card className="rounded-[2.5rem] border-border/40 bg-card/40 backdrop-blur-xl overflow-hidden shadow-xl">
                 <div className="p-8 border-b border-border/40 flex justify-between items-center bg-muted/20">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                          <IconTrophy size={24} />
                       </div>
                       <Typography variant="h3" className="text-xl font-black uppercase tracking-tight">Dernières Activités</Typography>
                    </div>
                 </div>
                 <div className="divide-y divide-border/10">
                    {childData.recentGrades.map((grade: any) => (
                      <div key={grade.id} className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-black">
                               {grade.value}
                            </div>
                            <div>
                               <p className="font-black text-sm uppercase leading-tight">{grade.subject.name}</p>
                               <p className="text-[10px] text-muted-foreground mt-1 font-medium">Évaluation reçue le {new Date(grade.gradedAt).toLocaleDateString()}</p>
                            </div>
                         </div>
                         <Badge variant="outline" className="border-border/40 uppercase text-[9px] font-black tracking-widest px-2 py-1">
                            Note
                         </Badge>
                      </div>
                    ))}
                    {childData.recentAbsences.map((abs: any) => (
                      <div key={abs.id} className="p-6 flex items-center justify-between hover:bg-rose-500/5 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                               <IconAlertTriangle size={20} />
                            </div>
                            <div>
                               <p className="font-black text-sm uppercase leading-tight">Absence enregistrée</p>
                               <p className="text-[10px] text-muted-foreground mt-1 font-medium">{new Date(abs.date).toLocaleDateString()} • {abs.isJustified ? 'Justifiée' : 'Non justifiée'}</p>
                            </div>
                         </div>
                         <Badge variant="outline" className="border-rose-500/30 text-rose-500 uppercase text-[9px] font-black tracking-widest px-2 py-1">
                            Alerte
                         </Badge>
                      </div>
                    ))}
                 </div>
              </Card>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// Reusing StatCard from Student Dashboard (should be moved to shared components in real project)
function StatCard({ icon: Icon, label, value, subValue, color }: any) {
  const colors: any = {
    rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  };

  return (
    <Card className="p-8 rounded-[2.5rem] border-border/40 bg-background/60 backdrop-blur-xl relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
      <div className="relative z-10">
        <div className={`h-14 w-14 rounded-[1.25rem] flex items-center justify-center mb-6 shadow-lg ${colors[color]}`}>
          <Icon size={28} />
        </div>
        <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">{label}</p>
        <div className="flex items-baseline gap-3">
          <Typography variant="h2" className="text-5xl font-black tracking-tighter tabular-nums">{value}</Typography>
          <span className="text-sm font-bold text-muted-foreground/60">{subValue}</span>
        </div>
      </div>
      <div className={`absolute -right-6 -bottom-6 h-32 w-32 rounded-full blur-[80px] opacity-[0.15] transition-all duration-700 group-hover:scale-150 ${
        color === 'rose' ? 'bg-rose-500' : color === 'blue' ? 'bg-blue-500' : 'bg-primary'
      }`} />
    </Card>
  );
}
