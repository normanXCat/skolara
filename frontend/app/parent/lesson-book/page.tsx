"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ParentLessonBookPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get("/api/parent/lesson-book");
        if (res.success) {
          setLessons((res.data as any).lessons || []);
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
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Cahier de Texte</h1>
        <p className="text-slate-500 mt-1">Suivez les cours et les devoirs de vos enfants.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-xl text-slate-500">
          Aucun cours enregistré.
        </div>
      ) : (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-slate-50 border-primary/20 text-primary">
                      {lesson.class?.name}
                    </Badge>
                    <span className="text-sm font-medium text-slate-700">{lesson.subject?.name}</span>
                  </div>
                  <time className="text-xs font-semibold text-slate-500">
                    {format(new Date(lesson.lessonDate), "dd MMM yyyy", { locale: fr })}
                  </time>
                </div>
                <div className="text-xs text-slate-500 italic mb-2">
                  Dispensé par {lesson.teacher?.user?.firstName} {lesson.teacher?.user?.name}
                </div>
                <div
                  className="text-sm text-slate-600 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
                {lesson.homework && (
                  <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-2 flex justify-between items-center">
                      <span>Travail à faire</span>
                      {lesson.homeworkDueDate && (
                        <span className="text-[10px] bg-blue-100 px-2 py-0.5 rounded-full text-blue-800">
                          Pour le{" "}
                          {format(new Date(lesson.homeworkDueDate), "dd MMM", {
                            locale: fr,
                          })}
                        </span>
                      )}
                    </h4>
                    <div
                      className="text-sm text-blue-800 prose prose-sm prose-blue max-w-none"
                      dangerouslySetInnerHTML={{ __html: lesson.homework }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

