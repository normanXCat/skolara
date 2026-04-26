"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, CreateEventInput } from "@/lib/validations/calendar";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { format } from "date-fns";

interface UseEventFormProps {
  initialData?: any;
  isEdit?: boolean;
  onSuccess?: () => void;
}

export interface CalendarEventType {
  value: string;
  label: string;
  color?: string;
}

/**
 * Hook réutilisable pour la logique de gestion des événements (Calendrier).
 */
export const useEventForm = ({ initialData, isEdit = false, onSuccess }: UseEventFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventTypes, setEventTypes] = useState<CalendarEventType[]>([
    { value: "exam", label: "Examen / Contrôle", color: "bg-destructive text-destructive" },
    { value: "holiday", label: "Vacances / Congé", color: "bg-emerald-500 text-emerald-500" },
    { value: "meeting", label: "Réunion / Conseil", color: "bg-blue-500 text-blue-500" },
    { value: "activity", label: "Activité / Sortie", color: "bg-amber-500 text-amber-500" },
    { value: "other", label: "Autre", color: "bg-primary text-primary" }
  ]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      setIsLoadingTypes(true);
      try {
        const response = await api.get<CalendarEventType[]>("/calendar/event-types");
        if (response.success) {
          setEventTypes(response.data);
          
        }
      } catch (error) {
        console.error("Failed to fetch event types", error);
      } finally {
        setIsLoadingTypes(false);
      }
    };
    fetchTypes();
  }, []);

  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema) as any,
    defaultValues: initialData ? {
      title: initialData.title || "",
      description: initialData.description || "",
      startDate: initialData.startDate ? format(new Date(initialData.startDate), "yyyy-MM-dd'T'HH:mm") : "",
      endDate: initialData.endDate ? format(new Date(initialData.endDate), "yyyy-MM-dd'T'HH:mm") : "",
      eventType: initialData.eventType || "other",
      isPublic: initialData.isPublic ?? true,
    } : {
      title: "",
      description: "",
      startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      eventType: "other" as const,
      isPublic: true,
    },
  });

  const onSubmit = async (data: CreateEventInput) => {
    setIsSubmitting(true);
    try {
      // Transformation des dates en format ISO UTC requis par le backend (z.string().datetime())
      const payload = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      let response;
      if (isEdit && initialData?.id) {
        response = await api.put(`/calendar/admin/${initialData.id}`, payload);
      } else {
        response = await api.post("/calendar/admin", payload);
      }

      if (response.success) {
        toast.success(isEdit ? "Événement mis à jour !" : "Événement créé avec succès !");
        if (onSuccess) onSuccess();
        form.reset();
      } else {
        // Gestion des erreurs riche demandée par l'utilisateur
        if (response.details && response.details.length > 0) {
          // Erreurs avec path : injectées dans les champs
          const fieldErrors = response.details.filter(err => err.path && err.path.length > 0);
          // Erreurs sans path : affichées en toast
          const globalErrors = response.details.filter(err => !err.path || err.path.length === 0);

          if (fieldErrors.length > 0) {
            api.handleFormErrors(fieldErrors, form.setError);
          }

          if (globalErrors.length > 0) {
            globalErrors.forEach(err => toast.error(err.message));
          } else if (fieldErrors.length === 0) {
             toast.error(response.error || "Une erreur de validation est survenue");
          }
        } else {
          toast.error(response.error || "Une erreur est survenue");
        }
      }
    } catch (error) {
      console.error("Failed to save event", error);
      toast.error("Erreur lors de la sauvegarde de l'événement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    isPublic: form.watch("isPublic"),
    eventTypes,
    isLoadingTypes
  };
};

export default useEventForm;
