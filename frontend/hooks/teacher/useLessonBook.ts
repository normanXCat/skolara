"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";

export interface LessonBookLesson {
  id: number;
  lessonDate: string;
  content: string;
  homework?: string | null;
  homeworkDueDate?: string | null;
  class?: { name: string };
  subject?: { name: string };
}

export interface LessonBookAssignment {
  classId: number;
  subjectId: number;
  class?: { name: string };
  subject?: { name: string };
}

export function useLessonBook() {
  const [assignments, setAssignments] = useState<LessonBookAssignment[]>([]);
  const [lessons, setLessons] = useState<LessonBookLesson[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [assignRes, lessonsRes] = await Promise.all([
        api.get<LessonBookAssignment[]>("/teacher/grades"),
        api.get<{ lessons: LessonBookLesson[] }>("/teacher/lesson-book"),
      ]);

      if (assignRes.success) setAssignments((assignRes.data as any) || []);
      if (lessonsRes.success) setLessons((lessonsRes.data as any)?.lessons || []);
    } catch {
      toast.error("Erreur de chargement des données");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    assignments,
    lessons,
    loading,
    refresh: fetchData,
  };
}
