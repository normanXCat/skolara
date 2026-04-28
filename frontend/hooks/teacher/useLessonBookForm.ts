"use client";

import { useMemo, useState } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { useRouter } from "next/navigation";

export interface LessonBookCreatePayload {
  classId: string;
  subjectId: string;
  lessonDate: string;
  content: string;
  homework?: string;
  homeworkDueDate?: string;
}

export function useLessonBookForm(options?: {
  onSuccess?: () => void;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = options?.redirectTo;

  const submit = async (payload: LessonBookCreatePayload) => {
    if (!payload.classId || !payload.subjectId || !payload.lessonDate || !payload.content) {
      toast.error("Veuillez remplir les informations requises (Classe/Matière, Date, Contenu).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.post("/teacher/lesson-book", payload);
      if (res.success) {
        toast.success("Leçon ajoutée avec succès au cahier de texte.");
        options?.onSuccess?.();
        if (redirectTo) router.push(redirectTo);
      } else {
        toast.error(res.error || "Erreur lors de l'enregistrement.");
      }
    } catch {
      toast.error("Erreur technique survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const actions = useMemo(() => ({ submit }), [redirectTo]);

  return {
    isSubmitting,
    ...actions,
  };
}
