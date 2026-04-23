"use client";

import React from "react";
import {
    IconUser,
    IconMail,
    IconPhone,
    IconBook,
    IconDeviceFloppy,
    IconCheck,
    IconX
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTeacherForm } from "@/hooks/useTeacherForm";
import InputReusable from "@/components/ui/input-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { Controller } from "react-hook-form";
import { SubjectSelect } from "@/components/shared/SubjectSelect";
import api from "@/lib/api-client";

export function TeacherForm() {
    const router = useRouter();
    const { form, onSubmit, loading } = useTeacherForm();
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = form;

    const emailValue = watch("email");
    const [emailStatus, setEmailStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
    const [emailFeedback, setEmailFeedback] = React.useState<string>("");

    React.useEffect(() => {
        if (!emailValue || emailValue.length < 5 || !emailValue.includes("@")) {
            setEmailStatus("idle");
            setEmailFeedback("");
            return;
        }

        setEmailStatus("loading");
        const timer = setTimeout(() => {
            api.get(`/pre-registrations/validate-email?email=${encodeURIComponent(emailValue)}`)
                .then((res: any) => {
                    if (res?.data?.isValid) {
                        setEmailStatus("success");
                        setEmailFeedback("Email valide");
                    } else {
                        setEmailStatus("error");
                        setEmailFeedback("Domaine email invalide (MX)");
                    }
                })
                .catch(() => {
                    // Fail open
                    setEmailStatus("idle");
                    setEmailFeedback("");
                });
        }, 800);

        return () => clearTimeout(timer);
    }, [emailValue]);

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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputReusable
                                        label="Prénom"
                                        id="firstName"
                                        placeholder="Jean"
                                        icon={IconUser}
                                        register={register("firstName")}
                                        error={errors.firstName?.message}
                                        disabled={loading}
                                        required
                                    />
                                    <InputReusable
                                        label="Nom"
                                        id="lastName"
                                        placeholder="Dupont"
                                        icon={IconUser}
                                        register={register("lastName")}
                                        error={errors.lastName?.message}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <InputReusable
                                    label="Adresse Email"
                                    id="email"
                                    type="email"
                                    placeholder="j.dupont@skolara.com"
                                    icon={IconMail}
                                    register={register("email")}
                                    error={errors.email?.message || (emailStatus === "error" ? emailFeedback : undefined)}
                                    success={emailStatus === "success"}
                                    isLoading={emailStatus === "loading"}
                                    disabled={loading}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputReusable
                                        label="Téléphone"
                                        id="phone"
                                        placeholder="+221 77 000 00 00"
                                        icon={IconPhone}
                                        register={register("phone")}
                                        error={errors.phone?.message}
                                        disabled={loading}
                                    />
                                    
                                    <Controller
                                        name="speciality"
                                        control={control}
                                        render={({ field }) => (
                                            <SubjectSelect
                                                label="Spécialité / Matières"
                                                multiple={true}
                                                value={field.value ? field.value.split(',').map((v: string) => v.trim()) : []}
                                                onChange={(val) => {
                                                    // val est string[] (IDs car on a changé SubjectSelect)
                                                    const selectedIds = Array.isArray(val) ? val : [val];
                                                    
                                                    // On met les IDs dans subjectIds
                                                    form.setValue("subjectIds", selectedIds.map(id => parseInt(id, 10)));
                                                    
                                                    // Mais on garde speciality comme texte pour la rétrocompatibilité d'affichage
                                                    // On devrait idéalement passer les noms ici.
                                                    // Vu que SubjectSelect ne passe que val, on va tricher un peu ou modifier SubjectSelect de nouveau.
                                                    field.onChange(selectedIds.join(", ")); 
                                                }}
                                                error={errors.speciality?.message}
                                                disabled={loading}
                                                placeholder="Sélectionner..."
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
                                    Finalisation
                                </Typography>
                                <Typography variant="caption" className="text-muted-foreground">
                                    L&apos;enseignant recevra ses identifiants de connexion par email une fois le compte créé.
                                </Typography>
                                
                                <div className="pt-4 space-y-3">
                                    <ButtonReusable
                                        type="submit"
                                        className="w-full"
                                        isLoading={loading}
                                        loadingText="Création en cours..."
                                        leftIcon={<IconDeviceFloppy size={20} />}
                                    >
                                        Créer le profil
                                    </ButtonReusable>
                                    
                                    <ButtonReusable
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => router.push(ROUTES.ADMIN.TEACHERS)}
                                        disabled={loading}
                                    >
                                        Annuler
                                    </ButtonReusable>
                                </div>
                            </div>
                        </Card>

                        {/* Tip/Info Card */}
                        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-3">
                            <div className="flex items-center gap-2 text-primary">
                                <IconBook size={18} />
                                <span className="text-xs font-black uppercase tracking-widest">Conseil</span>
                            </div>
                            <p className="text-md text-muted-foreground leading-relaxed">
                                Vous pourrez assigner des classes et des matières à cet enseignant immédiatement après sa création depuis sa fiche profil.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
