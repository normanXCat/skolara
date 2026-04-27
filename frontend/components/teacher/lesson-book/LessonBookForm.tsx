"use client";

import InputReusable from "@/components/ui/input-reusable";
import SelectReusable, { type SelectOption } from "@/components/ui/select-reusable";
import { Typography } from "@/components/ui/typography";
import WysiwygReusable from "@/components/shared/WysiwygReusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { IconBook, IconCalendar, IconSend, IconX } from "@tabler/icons-react";

export interface LessonBookFormValues {
  selectedAssignment: string;
  lessonDate: string;
  content: string;
  homework: string;
  homeworkDueDate: string;
}

export function LessonBookForm(props: {
  assignmentOptions: SelectOption[];
  loadingAssignments?: boolean;
  values: LessonBookFormValues;
  onChange: (patch: Partial<LessonBookFormValues>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}) {
  const {
    assignmentOptions,
    loadingAssignments,
    values,
    onChange,
    onCancel,
    onSubmit,
    isSubmitting,
  } = props;

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-background/40 border border-border/40 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <Typography variant="h4" className="font-black">Nouvelle leçon</Typography>
          <Typography variant="caption">Remplis les champs requis pour publier la leçon.</Typography>
        </div>

        <ButtonReusable variant="outline" onClick={onCancel} leftIcon={<IconX size={18} />}>
          Annuler
        </ButtonReusable>
      </div>

      <div className="flex gap-4">
        <SelectReusable
          label="Classe & Matière"
          id="assignment"
          placeholder={loadingAssignments ? "Chargement..." : "Sélectionnez..."}
          value={values.selectedAssignment}
          onValueChange={(v) => onChange({ selectedAssignment: v })}
          icon={IconBook as any}
          isLoading={!!loadingAssignments}
          options={assignmentOptions}
        />

        <InputReusable
          id="lessonDate"
          label="Date du cours"
          type="date"
          value={values.lessonDate}
          onChange={(e) => onChange({ lessonDate: e.target.value })}
          icon={IconCalendar as any}
          className="lg:pt-[2px]"
        />

        {values.homework && (
        <div className="max-w-md">
          <InputReusable
            id="homeworkDueDate"
            label="Date de rendu des devoirs"
            type="date"
            value={values.homeworkDueDate}
            onChange={(e) => onChange({ homeworkDueDate: e.target.value })}
            icon={IconCalendar as any}
          />
        </div>
      )}
      </div>

      <div className="space-y-2">
        <Typography variant="caption" className="px-1 font-bold text-foreground/70">Contenu du cours</Typography>
        <WysiwygReusable
          id="content"
          value={values.content}
          onChange={(v) => onChange({ content: v })}
          placeholder="Détaillez le travail effectué en classe..."
        />
      </div>

      <div className="space-y-2">
        <Typography variant="caption" className="px-1 font-bold text-foreground/70">Devoirs à faire (optionnel)</Typography>
        <WysiwygReusable
          id="homework"
          value={values.homework}
          onChange={(v) => onChange({ homework: v })}
          placeholder="Décrivez les devoirs à rendre..."
        />
      </div>

      <div className="pt-2 flex justify-end">
        <ButtonReusable
          onClick={onSubmit}
          isLoading={!!isSubmitting}
          loadingText="Publication..."
          leftIcon={!isSubmitting ? <IconSend size={18} /> : undefined}
        >
          Publier
        </ButtonReusable>
      </div>
    </div>
  );
}
