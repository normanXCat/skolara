"use client";

import React from "react";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import InputReusable from "@/components/ui/input-reusable";
import TextareaReusable from "@/components/ui/textarea-reusable";
import { SelectReusable } from "@/components/ui/select-reusable";
import { 
  IconPlus, 
  IconDeviceFloppy, 
  IconTrash, 
  IconCheck,
  IconX,
  IconCalendarEvent
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useEventForm } from "@/hooks/admin/calendar/useEventForm";

interface EventFormProps {
  initialData?: any;
  isEdit?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  onDelete?: (id: number) => void;
}

/**
 * Composant de formulaire pour la création et l'édition d'événements.
 * Séparé pour être réutilisable et maintenable.
 */
export function EventForm({ initialData, isEdit, onSuccess, onCancel, onDelete }: EventFormProps) {
  const { form, onSubmit, isSubmitting, isPublic, eventTypes, isLoadingTypes } = useEventForm({
    initialData,
    isEdit,
    onSuccess,
  });

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = form;

  return (
    <form id="event-form" onSubmit={onSubmit} className="space-y-8">
      <InputReusable 
        id="title"
        label="Titre de l'événement"
        placeholder="Ex: Examen Final de Mathématiques"
        register={register("title")}
        error={errors.title?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputReusable 
          id="startDate"
          label="Date de début"
          type="datetime-local"
          register={register("startDate")}
          error={errors.startDate?.message}
        />
        <InputReusable 
          id="endDate"
          label="Date de fin"
          type="datetime-local"
          register={register("endDate")}
          error={errors.endDate?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="eventType"
          control={control}
          render={({ field }) => (
            <SelectReusable
              id="eventType"
              label="Type d'événement"
              placeholder="Sélectionner un type"
              value={field.value}
              onValueChange={field.onChange}
              ref={field.ref}
              isLoading={isLoadingTypes}
              error={errors.eventType?.message}
              icon={IconCalendarEvent}
              options={eventTypes.length > 0 ? eventTypes : [
                { value: "other", label: "Autre" }
              ]}
            />
          )}
        />
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground/70 px-1">Visibilité</label>
          <div 
            onClick={() => setValue("isPublic", !isPublic)}
            className={cn(
              "flex items-center h-14 gap-4 px-6 rounded-full border transition-all cursor-pointer select-none",
              isPublic 
                ? "bg-primary/5 border-primary/30 ring-4 ring-primary/5 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]" 
                : "bg-muted/30 border-border/40 text-muted-foreground opacity-60 hover:opacity-100"
            )}
          >
            <div className={cn(
              "size-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
              isPublic 
                ? "bg-primary border-primary scale-110 shadow-lg shadow-primary/30" 
                : "border-muted-foreground/30 bg-transparent"
            )}>
              <AnimatePresence mode="wait">
                {isPublic && (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                  >
                    <IconCheck size={14} className="text-white stroke-[4]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-sm font-black uppercase tracking-tight">Public sur le portail</span>
          </div>
          {errors.isPublic && <p className="text-xs text-destructive font-bold px-1">{errors.isPublic.message}</p>}
        </div>
      </div>

      <TextareaReusable 
        id="description"
        label="Description détaillée (Optionnelle)"
        placeholder="Ajoutez des précisions sur le lieu, les participants, ou les ressources nécessaires..."
        rows={4}
        register={register("description")}
        className="rounded-3xl"
        error={errors.description?.message}
      />

      {/* Footer intégré au formulaire pour un alignement parfait */}
      <div className="flex items-center justify-between pt-6 border-t border-border/10">
        {isEdit && initialData?.id && onDelete ? (
          <button 
            type="button"
            onClick={() => onDelete(initialData.id)}
            className="text-destructive font-black uppercase text-xs tracking-[0.2em] flex items-center gap-2 hover:bg-destructive/10 px-6 py-3 rounded-2xl transition-all"
          >
            <IconTrash size={18} /> Supprimer
          </button>
        ) : (
          <div /> 
        )}
        
        <div className="flex gap-3">
          {onCancel && (
            <ButtonReusable type="button" variant="outline" onClick={onCancel} className="font-bold">
              Annuler
            </ButtonReusable>
          )}
          <ButtonReusable 
            type="submit"
            isLoading={isSubmitting}
            className="px-10 font-bold"
            leftIcon={isEdit ? <IconDeviceFloppy size={18} /> : <IconPlus size={18} />}
          >
            {isEdit ? "Enregistrer" : "Créer l'événement"}
          </ButtonReusable>
        </div>
      </div>
    </form>
  );
}
