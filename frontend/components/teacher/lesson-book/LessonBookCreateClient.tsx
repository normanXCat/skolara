"use client";

import { Typography } from "@/components/ui/typography";
import { useLessonBook } from "@/hooks/teacher/useLessonBook";
import { LessonBookForm, type LessonBookFormValues } from "@/components/teacher/lesson-book/LessonBookForm";
import { useMemo, useState } from "react";
import { useLessonBookForm } from "@/hooks/teacher/useLessonBookForm";

export function LessonBookCreateClient() {
  const { assignments, loading } = useLessonBook();

  const [values, setValues] = useState<LessonBookFormValues>({
    selectedAssignment: "",
    lessonDate: new Date().toISOString().substring(0, 10),
    content: "",
    homework: "",
    homeworkDueDate: "",
  });

  const assignmentOptions = useMemo(
    () =>
      assignments.map((assignment: any) => ({
        value: `${assignment.classId}-${assignment.subjectId}`,
        label: `${assignment.class?.name ?? ""} - ${assignment.subject?.name ?? ""}`,
      })),
    [assignments]
  );

  const { isSubmitting, submit } = useLessonBookForm({
    redirectTo: "/teacher/lesson-book",
  });

  const handleSubmit = async () => {
    const [classId, subjectId] = values.selectedAssignment.split("-");

    await submit({
      classId,
      subjectId,
      lessonDate: values.lessonDate,
      content: values.content,
      homework: values.homework,
      homeworkDueDate: values.homeworkDueDate,
    });
  };

  return (
    <div className="relative z-10 space-y-10 pb-20">
      <LessonBookForm
        assignmentOptions={assignmentOptions}
        loadingAssignments={loading}
        values={values}
        onChange={(patch) => setValues((prev) => ({ ...prev, ...patch }))}
        onCancel={() => window.history.back()}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
