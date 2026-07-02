"use client";

import {
    IconDoor,
    IconCalendarTime,
    IconDeviceFloppy,
    IconInfoCircle,
    IconHash
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useClassForm } from "@/hooks/useClassForm";
import InputReusable from "@/components/ui/input-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { Controller } from "react-hook-form";
import { LevelSelect } from "@/components/shared/LevelSelect";
import { TeacherSelect } from "@/components/shared/TeacherSelect";

interface ClassFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export function ClassForm({ initialData, isEdit = false }: ClassFormProps) {
    const router = useRouter();
    const { form, onSubmit, loading, isFromPreReg } = useClassForm({ initialData, isEdit });
    const {
        register,
        control,
        formState: { errors },
    } = form;

    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Essential Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-8 rounded-3xl border-border/50 backdrop-blur-3xl bg-background/50 relative overflow-hidden group">
                            {/* Decorative background flare */}
                            <div className="absolute -top-24 -right-24 size-48 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
                            
                            <div className="space-y-6 relative z-10">
                                <InputReusable
                                    label="Nom de la classe"
                                    id="name"
                                    placeholder="Ex: 6ème A, Terminale S1"
                                    icon={IconDoor}
                                    register={register("name")}
                                    error={errors.name?.message}
                                    disabled={loading}
                                    required
                                    className="rounded-2xl"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Controller
                                        name="level"
                                        control={control}
                                        render={({ field }) => (
                                            <LevelSelect
                                                label="Niveau Scolaire"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={errors.level?.message}
                                                disabled={loading || isFromPreReg}
                                                placeholder="Niveau..."
                                            />
                                        )}
                                    />

                                    <InputReusable
                                        label="Année Scolaire"
                                        id="schoolYear"
                                        placeholder="2024-2025"
                                        icon={IconCalendarTime}
                                        register={register("schoolYear")}
                                        error={errors.schoolYear?.message}
                                        disabled={true}
                                        required
                                        className="rounded-2xl"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputReusable
                                        label="Capacité maximale"
                                        id="maxCapacity"
                                        type="number"
                                        placeholder="30"
                                        icon={IconHash}
                                        register={register("maxCapacity", { valueAsNumber: true })}
                                        error={errors.maxCapacity?.message}
                                        disabled={loading}
                                        required
                                        className="rounded-2xl"
                                    />
                                    
                                    <Controller
                                        name="headTeacherId"
                                        control={control}
                                        render={({ field }) => (
                                            <TeacherSelect
                                                label="Professeur Principal"
                                                value={field.value}
                                                onChange={(val) => field.onChange(val ? parseInt(val, 10) : null)}
                                                error={errors.headTeacherId?.message}
                                                disabled={loading}
                                                placeholder="Assigner plus tard..."
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Actions & Meta */}
                    <div className="space-y-6">
                        <Card className="p-6 rounded-3xl border-border/50 bg-muted/20 backdrop-blur-xl">
                            <div className="space-y-4">
                                <Typography variant="h3" className="font-black mb-2">
                                    {isEdit ? "Modification" : "Finalisation"}
                                </Typography>
                                <Typography variant="caption" className="text-muted-foreground">
                                    {isEdit 
                                        ? "Enregistrez les modifications apportées à la classe."
                                        : "La classe sera créée et vous pourrez ensuite y ajouter des élèves ou modifier les matières enseignées."}
                                </Typography>
                                
                                <div className="pt-4 space-y-3">
                                    <ButtonReusable
                                        type="submit"
                                        className="w-full"
                                        isLoading={loading}
                                        loadingText={isEdit ? "Modification en cours..." : "Création en cours..."}
                                        leftIcon={<IconDeviceFloppy size={20} />}
                                    >
                                        {isEdit ? "Enregistrer les modifications" : "Créer la classe"}
                                    </ButtonReusable>
                                    
                                    <ButtonReusable
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => router.push(ROUTES.ADMIN.CLASSES)}
                                        disabled={loading}
                                    >
                                        Annuler
                                    </ButtonReusable>
                                </div>
                            </div>
                        </Card>

                        {/* Tip/Info Card */}
                        <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10 space-y-3">
                            <div className="flex items-center gap-2 text-secondary">
                                <IconInfoCircle size={18} />
                                <span className="text-xs font-black uppercase tracking-widest">Information</span>
                            </div>
                            <p className="text-md text-muted-foreground leading-relaxed">
                                Le professeur principal est responsable du suivi pédagogique global de la classe. Vous pouvez le modifier à tout moment.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
