"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    CreateTeacherSchema,
    type CreateTeacherInput,
} from "@/schemas/teacher-schema";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { ROUTES } from "@/config/routes";

/**
 * Hook personnalisé pour gérer l'état et la logique du formulaire enseignant.
 */
export const useTeacherForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<CreateTeacherInput>({
        resolver: zodResolver(CreateTeacherSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            speciality: "",
            phone: "",
        },
    });

    const onSubmit = async (data: CreateTeacherInput) => {
        setLoading(true);
        try {
            // Nettoyage des données pour l'API
            const payload = {
                ...data,
                email: data.email || undefined,
                speciality: data.speciality || undefined,
                phone: data.phone || undefined,
                subjectIds: data.subjectIds || undefined,
            };

            const response = await api.post("/admin/teachers", payload);

            if (response.success) {
                toast.success("Enseignant créé avec succès !");
                router.push(ROUTES.ADMIN.TEACHERS);
            } else {
                if (response.details) {
                    api.handleFormErrors(response.details, form.setError);
                } else {
                    toast.error(response.error || "Une erreur est survenue");
                }
            }
        } catch (error) {
            toast.error("Erreur lors de la communication avec le serveur");
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        loading,
        setLoading,
    };
};

export default useTeacherForm;
