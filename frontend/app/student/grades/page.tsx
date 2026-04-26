'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  IconChevronDown, 
  IconChevronUp, 
  IconCalendar,
  IconBookmark
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentGradesPage() {
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
    return <div className="space-y-8 animate-pulse p-8">
       <div className="h-12 w-1/4 bg-muted rounded-xl" />
       {[1,2,3].map(i => <div key={i} className="h-24 w-full bg-muted rounded-2xl" />)}
    </div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
        <Typography variant="h2" className="text-2xl font-black">Tes notes ne sont pas disponibles</Typography>
        <p className="text-muted-foreground mt-2">Nous n'avons pas pu récupérer tes résultats pour le moment.</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="mt-6 rounded-xl">
          Actualiser la page
        </Button>
      </div>
    );
  }


  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <Typography variant="h1" className="text-4xl font-black tracking-tight">
          Mes Notes & Résultats
        </Typography>
        <Typography variant="body" className="text-muted-foreground mt-2 font-medium">
          Suivi complet de tes performances par matière
        </Typography>
      </div>

      <div className="space-y-4">
        {data.subjects.map((subject: any) => (
          <Card 
            key={subject.subjectId} 
            className={`overflow-hidden transition-all duration-300 border-border/40 ${
              expandedSubject === subject.subjectId ? 'ring-2 ring-primary/20 shadow-2xl' : 'hover:border-primary/30 shadow-md'
            }`}
          >
            <div 
              className="p-6 cursor-pointer flex items-center justify-between bg-card/30 backdrop-blur-sm"
              onClick={() => setExpandedSubject(expandedSubject === subject.subjectId ? null : subject.subjectId)}
            >
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex flex-col items-center justify-center border border-primary/20">
                  <span className="text-[10px] font-black text-primary uppercase opacity-60">Coef</span>
                  <span className="text-xl font-black text-primary">{subject.coefficient}</span>
                </div>
                <div>
                  <Typography variant="h3" className="text-xl font-black uppercase tracking-tight">{subject.subjectName}</Typography>
                  <div className="flex gap-4 mt-1">
                     <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        S1 : <span className={subject.semester1Average >= 10 ? 'text-emerald-500' : 'text-rose-500'}>{subject.semester1Average || '--'}</span>
                     </span>
                     <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        S2 : <span className={subject.semester2Average >= 10 ? 'text-emerald-500' : 'text-rose-500'}>{subject.semester2Average || '--'}</span>
                     </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black text-muted-foreground uppercase">Note Globale</p>
                  <p className="text-2xl font-black tracking-tighter">
                    {((Number(subject.semester1Average || 0) + Number(subject.semester2Average || 0)) / (subject.semester1Average && subject.semester2Average ? 2 : 1)).toFixed(2)}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground">
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
                  className="bg-muted/10 border-t border-border/10"
                >
                  <div className="p-6">
                    {subject.grades.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground font-medium italic">
                        Aucune note détaillée pour cette matière
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subject.grades.map((grade: any) => (
                          <div key={grade.id} className="p-4 rounded-2xl bg-background/50 border border-border/40 flex items-center justify-between group hover:border-primary/40 transition-colors">
                            <div className="flex items-center gap-4">
                               <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black shadow-sm ${
                                 grade.value >= 10 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                               }`}>
                                 {grade.value}
                               </div>
                               <div>
                                  <div className="flex items-center gap-2">
                                     <span className="text-[10px] font-black uppercase text-muted-foreground leading-none">Semestre {grade.semester}</span>
                                     <Badge variant="outline" className="text-[8px] h-4 border-emerald-500/20 text-emerald-600">Devoir</Badge>
                                  </div>
                                  <p className="text-sm font-bold text-foreground mt-1 line-clamp-1">{grade.comment || "Pas de commentaire"}</p>
                                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                     <IconCalendar size={12} />
                                     {new Date(grade.gradedAt).toLocaleDateString()}
                                  </p>
                               </div>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                               <IconBookmark size={16} />
                            </Button>
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
