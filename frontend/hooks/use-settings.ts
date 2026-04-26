"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { updateSettingsSchema, type UpdateSettingsInput } from "@/lib/validations/settings";

const defaultValues: UpdateSettingsInput = {
  school_name: "Skolara",
  phone: "",
  email: "",
  address: "",
  city: "",
  google_maps_url: "",
  facebook_url: "",
  instagram_url: "",
  twitter_url: "",
  linkedin_url: "",
  mentions_legales: "",
  cgu: "",
};

export function useSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<UpdateSettingsInput>({
    resolver: zodResolver(updateSettingsSchema),
    defaultValues,
  });

  const { reset, formState: { isDirty } } = form;

  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get<Record<string, string>>("/admin/settings");
      if (response.success) {
        const data = response.data;
        reset({
          school_name: data.school_name || "Skolara",
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
          city: data.city || "",
          google_maps_url: data.google_maps_url || "",
          facebook_url: data.facebook_url || "",
          instagram_url: data.instagram_url || "",
          twitter_url: data.twitter_url || "",
          linkedin_url: data.linkedin_url || "",
          mentions_legales: data.mentions_legales || "",
          cgu: data.cgu || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
      toast.error("Impossible de charger les paramètres.");
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsSaving(true);
      const response = await api.put("/admin/settings", data);
      if (response.success) {
        toast.success("Paramètres enregistrés avec succès.");
        reset(data); // Reset dirty state
      } else {
        toast.error("Erreur lors de la sauvegarde.");
      }
    } catch (error) {
      console.error("Failed to save settings", error);
      toast.error("Erreur lors de la sauvegarde des paramètres.");
    } finally {
      setIsSaving(false);
    }
  });

  return {
    form,
    isLoading,
    isSaving,
    isDirty,
    onSubmit,
  };
}
