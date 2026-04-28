"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ButtonReusable } from '@/components/ui/button-reusable';
import { SkeletonReusable } from '@/components/ui/skeleton-reusable';
import { 
  IconChevronDown, 
  IconChevronUp, 
  IconCalendar,
  IconBookmark,
  IconTrophy
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

export function StudentGradesClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await api.get('/api/student/grades');
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch grades', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
         {[1,2,3].map(i => (
           <Card key={i} className="p-6 bg-background/40 backdrop-blur-xl border-border/40 rounded-3xl">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-6">
                 <SkeletonReusable width={56} height={56} className="rounded-2xl" />
                 <div className="space-y-2">
                   <SkeletonReusable width={150} height={20} />
                   <SkeletonReusable width={100} height={14} />
                 </div>
               </div>
               <SkeletonReusable width={60} height={40} />
             </div>
           </Card>
         ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-background/40 rounded-[3rem] border border-border/40 border-dashed backdrop-blur-xl">
        <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
          <IconTrophy size={28} className="text-primary" />
        </div>
        <Typography variant="h2" className="text-2xl font-black">Tes notes ne sont pas disponibles</Typography>
        <p className="text-muted-foreground mt-2 max-w-md">Nous n'avons pas pu récupérer tes résultats pour le moment.</p>
        <ButtonReusable onClick={() => window.location.reload()} variant="outline" className="mt-6">
          Actualiser la page
        </ButtonReusable>
      </div>
    );
  }


  return (
    <div className="space-y-8 relative z-10 pb-20">
      <div className="space-y-4">
        {data.subjects.map((subject: any) => (
          <Card 
            key={subject.subjectId} 
            className={`overflow-hidden transition-all duration-500 border-border/40 bg-background/40 backdrop-blur-xl rounded-[2rem] ${
              expandedSubject === subject.subjectId ? 'ring-2 ring-primary/20 shadow-xl shadow-primary/5' : 'hover:border-primary/30 shadow-md'
            }`}
          >
            <div 
              className="p-6 cursor-pointer flex items-center justify-between group"
              onClick={() => setExpandedSubject(expandedSubject === subject.subjectId ? null : subject.subjectId)}
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/20 shadow-sm flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground group-hover:shadow-primary/20">
                  <span className="text-[9px] font-black uppercase opacity-80 leading-none mb-0.5">Coef</span>
                  <span className="text-xl font-black leading-none">{subject.coefficient}</span>
                </div>
                <div>
                  <Typography variant="h3" className="text-xl font-black uppercase tracking-tight">{subject.subjectName}</Typography>
                  <div className="flex gap-4 mt-1">
                     <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[9px] h-4 rounded-full border-border/60">S1</Badge> 
                        <span className={subject.semester1Average >= 10 ? 'text-emerald-600' : 'text-rose-600 font-black'}>{subject.semester1Average || '--'}</span>
                     </span>
                     <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[9px] h-4 rounded-full border-border/60">S2</Badge> 
                        <span className={subject.semester2Average >= 10 ? 'text-emerald-600' : 'text-rose-600 font-black'}>{subject.semester2Average || '--'}</span>
                     </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">Moyenne</p>
                  <Badge className="text-lg font-black tracking-tighter rounded-xl px-3 py-1" variant={((Number(subject.semester1Average || 0) + Number(subject.semester2Average || 0)) / (subject.semester1Average && subject.semester2Average ? 2 : 1)) >= 10 ? "default" : "destructive"}>
                    {((Number(subject.semester1Average || 0) + Number(subject.semester2Average || 0)) / (subject.semester1Average && subject.semester2Average ? 2 : 1)).toFixed(2)}
                  </Badge>
                </div>
                <div className={`size-10 rounded-2xl flex items-center justify-center transition-colors ${expandedSubject === subject.subjectId ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                   {expandedSubject === subject.subjectId ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedSubject === subject.subjectId && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-muted/10 border-t border-border/20"
                >
                  <div className="p-6">
                    {subject.grades.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground font-medium italic border border-dashed border-border/40 rounded-3xl bg-background/30">
                        Aucune note détaillée enregistrée pour cette matière.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subject.grades.map((grade: any) => (
                          <div key={grade.id} className="p-4 rounded-[1.5rem] bg-background/50 border border-border/40 flex items-center justify-between group hover:border-primary/30 hover:bg-background/80 transition-all shadow-sm">
                            <div className="flex items-center gap-4">
                               <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black shadow-sm text-lg ${
                                 grade.value >= 10 ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                               } border`}>
                                 {grade.value}
                               </div>
                               <div>
                                  <div className="flex items-center gap-2">
                                     <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground leading-none">Semestre {grade.semester}</span>
                                  </div>
                                  <p className="text-sm font-bold text-foreground mt-1 line-clamp-1">{grade.comment || "Évaluation continue"}</p>
                                  <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-1 font-medium italic">
                                     <IconCalendar size={12} className="opacity-70" />
                                     {new Date(grade.gradedAt).toLocaleDateString('fr-FR', {
                                       day: 'numeric',
                                       month: 'long',
                                       year: 'numeric'
                                     })}
                                  </p>
                               </div>
                            </div>
                            <ButtonReusable variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                               <IconBookmark size={16} className="text-muted-foreground hover:text-primary" />
                            </ButtonReusable>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </div>
  );
}
