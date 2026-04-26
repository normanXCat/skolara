"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconDeviceFloppy } from "@tabler/icons-react";
import { createSubjectSchema, CreateSubjectInput } from "@/schemas/subject-schema";
import InputReusable from "@/components/ui/input-reusable";
import TextareaReusable from "@/components/ui/textarea-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";

interface SubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    subject?: any | null;
}

export function SubjectModal({ isOpen, onClose, onSuccess, subject }: SubjectModalProps) {
    const [loading, setLoading] = useState(false);
    const isEdit = !!subject;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CreateSubjectInput>({
        resolver: zodResolver(createSubjectSchema),
        defaultValues: {
            name: "",
            code: "",
            coefficient: 1,
            description: ""
        }
    });

    useEffect(() => {
        if (isOpen) {
            if (subject) {
                reset({
                    name: subject.name,
                    code: subject.code,
                    coefficient: subject.coefficient,
                    description: subject.description || ""
                });
            } else {
                reset({
                    name: "",
                    code: "",
                    coefficient: 1,
                    description: ""
                });
            }
        }
    }, [isOpen, subject, reset]);

    const onSubmit = async (data: CreateSubjectInput) => {
        setLoading(true);
        try {
            if (isEdit) {
                await api.put(`/admin/subjects/${subject.id}`, data);
                toast.success("Matière mise à jour avec succès");
            } else {
                await api.post("/admin/subjects", data);
                toast.success("Matière créée avec succès");
            }
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] focus:outline-none"
                            >
                                <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-background shadow-2xl p-8">
                                    <div className="absolute -top-32 -right-32 size-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                                    
                                    <div className="flex justify-between items-center mb-6">
                                        <Dialog.Title asChild>
                                            <Typography variant="h3" className="font-black">
                                                {isEdit ? "Modifier la matière" : "Nouvelle matière"}
                                            </Typography>
                                        </Dialog.Title>
                                        <Dialog.Close asChild>
                                            <button className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors">
                                                <IconX size={20} />
                                            </button>
                                        </Dialog.Close>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputReusable
                                                label="Matière"
                                                id="name"
                                                placeholder="Ex: Mathématiques"
                                                register={register("name")}
                                                error={errors.name?.message}
                                                disabled={loading}
                                            />
                                            <InputReusable
                                                label="Code"
                                                id="code"
                                                placeholder="Ex: MATH"
                                                register={register("code")}
                                                error={errors.code?.message}
                                                disabled={loading}
                                            />
                                        </div>

                                        <InputReusable
                                            label="Coefficient"
                                            id="coefficient"
                                            type="number"
                                            register={register("coefficient", { valueAsNumber: true })}
                                            error={errors.coefficient?.message}
                                            disabled={loading}
                                        />

                                        <TextareaReusable
                                            label="Description (Optionnel)"
                                            id="description"
                                            placeholder="Description courte de la matière..."
                                            register={register("description")}
                                            error={errors.description?.message}
                                            disabled={loading}
                                        />

                                        <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                                            <ButtonReusable
                                                type="button"
                                                variant="outline"
                                                onClick={onClose}
                                                disabled={loading}
                                            >
                                                Annuler
                                            </ButtonReusable>
                                            <ButtonReusable
                                                type="submit"
                                                isLoading={loading}
                                                leftIcon={<IconDeviceFloppy size={18} />}
                                            >
                                                {isEdit ? "Enregistrer" : "Créer"}
                                            </ButtonReusable>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}
