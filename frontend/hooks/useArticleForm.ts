"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createArticleSchema, CreateArticleInput } from "@/lib/validations/news";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { ROUTES } from "@/config/routes";

interface UseArticleFormProps {
  initialData?: any;
  isEdit?: boolean;
}

/**
 * Hook personnalisé pour gérer l'état et la logique du formulaire d'article (News).
 */
export const useArticleForm = ({ initialData, isEdit = false }: UseArticleFormProps = {}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const form = useForm<CreateArticleInput>({
    resolver: zodResolver(createArticleSchema) as any,
    defaultValues: initialData ? {
      ...initialData,
      status: initialData.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    } : {
      status: "DRAFT",
      category: "Actualités",
    },
  });

  const onSubmit = async (data: CreateArticleInput) => {
    setIsSubmitting(true);
    try {
      let finalImageUrl = data.imageUrl;

      // Handle file upload if a new file was selected
      if (thumbnailFile) {
        setIsUploading(true);
        const uploadRes = await api.upload<{ url: string }>("/upload/single", thumbnailFile);
        if (uploadRes.success) {
          finalImageUrl = uploadRes.data.url;
        }
        setIsUploading(false);
      }

      const payload = {
        ...data,
        imageUrl: finalImageUrl,
      };

      let response;
      if (isEdit && initialData?.id) {
        response = await api.put(`/news/admin/${initialData.id}`, payload);
      } else {
        response = await api.post("/news/admin", payload);
      }

      if (response.success) {
        toast.success(isEdit ? "Article mis à jour !" : "Article créé avec succès !");
        router.push(ROUTES.ADMIN.NEWS);
        router.refresh();
      } else {
        if (response.details) {
          api.handleFormErrors(response.details, form.setError);
        } else {
          toast.error(response.error || "Une erreur est survenue");
        }
      }
    } catch (error) {
      console.error("Failed to save article", error);
      toast.error("Erreur lors de la sauvegarde de l'article");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    saveArticle: onSubmit, // Raw function for custom button logic
    isSubmitting,
    isUploading,
    thumbnailFile,
    setThumbnailFile,
    currentStatus: form.watch("status"),
  };
};

export default useArticleForm;
