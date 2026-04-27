"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api-client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminLessonBookPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get<any>("/api/admin/lesson-book");
        if (res.success) {
          setLessons(res.data.lessons || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Cahier de Texte Global</h1>
          <p className="text-slate-500">Supervision de l'ensemble des leçons enregistrées par les enseignants.</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
         {loading ? (
            <div className="flex justify-center p-12">
               <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
         ) : lessons.length === 0 ? (
            <div className="text-center p-12 text-slate-500">
               Aucune leçon trouvée.
            </div>
         ) : (
            <div className="divide-y">
               {lessons.map((lesson) => (
                  <div key={lesson.id} className="p-6 hover:bg-slate-50 transition-colors">
                     <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="md:w-1/4 space-y-2">
                           <div className="font-semibold text-slate-900">{format(new Date(lesson.lessonDate), "EEEE dd MMMM yyyy", { locale: fr })}</div>
                           <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{lesson.class?.name}</Badge>
                              <Badge variant="secondary">{lesson.subject?.name}</Badge>
                           </div>
                           <div className="text-sm text-slate-500">
                              Ens. {lesson.teacher?.user?.firstName} {lesson.teacher?.user?.name}
                           </div>
                        </div>
                        <div className="md:w-3/4 space-y-4">
                           <div className="prose prose-sm max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: lesson.content }} />
                           
                           {lesson.homework && (
                              <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-4">
                                 <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-amber-900 uppercase">Devoirs & Travaux</span>
                                    {lesson.homeworkDueDate && (
                                       <span className="text-xs text-amber-700 font-medium">
                                          À rendre pour le {format(new Date(lesson.homeworkDueDate), "dd/MM/yyyy")}
                                       </span>
                                    )}
                                 </div>
                                 <div className="prose prose-sm prose-amber max-w-none text-amber-800" dangerouslySetInnerHTML={{ __html: lesson.homework }} />
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
}
