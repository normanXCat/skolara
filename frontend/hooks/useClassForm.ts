"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import {
    CreateClassSchema,
    type CreateClassInput,
} from "@/schemas/class-schema";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { ROUTES } from "@/config/routes";
import { getCurrentSchoolYear } from "@/lib/utils";

/**
 * Hook personnalisé pour gérer l'état et la logique du formulaire de classe.
 */
export const useClassForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const preRegId = searchParams.get("preRegId");
    const levelParam = searchParams.get("level");

    const form = useForm<CreateClassInput>({
        resolver: zodResolver(CreateClassSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            level: levelParam || "",
            schoolYear: getCurrentSchoolYear(),
            maxCapacity: 30,
            headTeacherId: null,
        },
    });

    const onSubmit = async (data: CreateClassInput) => {
        setLoading(true);
        try {
            // On s'assure que l'année est la bonne même si l'input est désactivé côté UI
            const payload = {
                ...data,
                schoolYear: getCurrentSchoolYear()
            };
            const response = await api.post<any>("/admin/classes", payload);

            if (response.success) {
                toast.success("Classe créée avec succès !");

                // Si on vient d'un dossier de pré-inscription, on valide l'élève immédiatement avec cette nouvelle classe
                if (preRegId) {
                    const newClassId = response.data.id;
                    setLoading(true); // Garder l'état chargement pour la conversion
                    
                    try {
                        const convertRes = await api.post(`/admin/pre-registrations/${preRegId}/convert`, {
                            classId: newClassId,
                            createParentAccount: true
                        });
                        
                        if (convertRes.success) {
                            toast.success("Dossier validé et élève assigné à la nouvelle classe !");
                            router.push(ROUTES.ADMIN.STUDENTS);
                            return;
                        } else {
                            toast.error("La classe a été créée mais l'assignation automatique a échoué.");
                        }
                    } catch (err) {
                        toast.error("Erreur lors de la validation automatique.");
                    }
                }

                router.push(ROUTES.ADMIN.CLASSES);
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
        isFromPreReg: !!preRegId,
    };
};

export default useClassForm;
