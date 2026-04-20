"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createStudentSchema,
    CreateStudentInput,
} from "@/lib/validations/students";
import InputReusable from "@/components/ui/input-reusable";
import SelectReusable from "@/components/ui/select-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import {
    IconArrowLeft,
    IconUserPlus,
    IconId,
    IconCalendar,
    IconMapPin,
    IconMail,
    IconPhone,
    IconSchool,
    IconLayoutGrid,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

/**
 * Page de création d'un nouvel élève.
 */
export default function NewStudentPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [classes, setClasses] = useState<
        { value: string | number; label: string }[]
    >([]);
    const [isLoadingClasses, setIsLoadingClasses] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setError,
    } = useForm<CreateStudentInput>({
        resolver: zodResolver(createStudentSchema),
        defaultValues: {
            status: "ACTIVE",
            schoolYear: "2024-2025",
        },
    });

    // Charger les classes disponibles pour le select
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                // Pour l'instant on simule ou on utilise les grades si les classes ne sont pas encore peuplées
                const response = await api.get<any>("/grades");
                if (response.success) {
                    setClasses(
                        response.data.map((g: any) => ({
                            value: g.id,
                            label: `${g.name} (${g.level})`,
                        })),
                    );
                }
            } catch (error) {
                console.error("Erreur chargement classes", error);
            } finally {
                setIsLoadingClasses(false);
            }
        };
        fetchClasses();
    }, []);

    const onSubmit = async (data: CreateStudentInput) => {
        setIsLoading(true);
        try {
            const response = await api.post("/admin/students", data);
            if (response.success) {
                toast.success(
                    "L'élève et son dossier ont été créés avec succès",
                );
                router.push(ROUTES.ADMIN.STUDENTS);
            }
        } catch (error: any) {
            if (error.details) {
                api.handleFormErrors(error.details, setError);
            }
            toast.error(
                error.message || "Une erreur est survenue lors de la création",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold uppercase text-[10px] tracking-widest group"
                >
                    <IconArrowLeft
                        size={14}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    Retour au registre
                </motion.button>

                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tighter">
                        Nouvelle inscription
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        L'inscription manuelle crée automatiquement un compte
                        accès pour le parent.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                    {/* Section 1: Identité */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-background border border-border/50 rounded-[2.5rem] p-10 shadow-sm space-y-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                            <IconId size={120} />
                        </div>

                        <div className="flex items-center gap-3 border-b border-border/30 pb-6">
                            <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                                <IconId size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight text-foreground/90">
                                Identité de l'enfant
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputReusable
                                label="Prénom de l'élève"
                                id="firstName"
                                placeholder="ex: Gabriel"
                                register={register("firstName")}
                                error={errors.firstName?.message}
                            />
                            <InputReusable
                                label="Nom de famille"
                                id="lastName"
                                placeholder="ex: Teheiura"
                                register={register("lastName")}
                                error={errors.lastName?.message}
                            />
                            <InputReusable
                                label="Date de naissance"
                                id="birthDate"
                                type="date"
                                icon={IconCalendar}
                                register={register("birthDate")}
                                error={errors.birthDate?.message}
                            />
                            <Controller
                                name="classId"
                                control={control}
                                render={({ field }) => (
                                    <SelectReusable
                                        label="Classe d'affectation"
                                        id="classId"
                                        placeholder="Sélectionner une classe"
                                        options={classes}
                                        value={field.value?.toString() || ""}
                                        onValueChange={(val) =>
                                            field.onChange(parseInt(val))
                                        }
                                        isLoading={isLoadingClasses}
                                        icon={IconLayoutGrid}
                                        error={errors.classId?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputReusable
                                label="Année scolaire"
                                id="schoolYear"
                                placeholder="2024-2025"
                                icon={IconSchool}
                                register={register("schoolYear")}
                                error={errors.schoolYear?.message}
                            />
                            <InputReusable
                                label="Adresse complète"
                                id="address"
                                placeholder="Commune, quartier..."
                                icon={IconMapPin}
                                register={register("address")}
                                error={errors.address?.message}
                            />
                        </div>
                    </motion.div>

                    {/* Section 2: Parent Responsable */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-background border border-border/50 rounded-[2.5rem] p-10 shadow-sm space-y-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                            <IconUserPlus size={120} />
                        </div>

                        <div className="flex items-center gap-3 border-b border-border/30 pb-6">
                            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20">
                                <IconUserPlus size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight text-foreground/90">
                                Parent responsable
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputReusable
                                label="Nom complet du tuteur"
                                id="parentName"
                                placeholder="Prénom et Nom"
                                register={register("parentName")}
                                error={errors.parentName?.message}
                            />
                            <InputReusable
                                label="Adresse Email"
                                id="parentEmail"
                                type="email"
                                placeholder="exemple@mail.pf"
                                icon={IconMail}
                                register={register("parentEmail")}
                                error={errors.parentEmail?.message}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputReusable
                                label="Numéro de téléphone"
                                id="parentPhone"
                                placeholder="87 XX XX XX"
                                icon={IconPhone}
                                register={register("parentPhone")}
                                error={errors.parentPhone?.message}
                            />
                        </div>

                        <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                            <p className="text-sm font-bold text-primary flex items-center gap-2">
                                <IconMail size={16} />
                                Automatisation du compte
                            </p>
                            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                Un compte parent sera créé. Un email contenant
                                les identifiants de connexion temporaires sera
                                envoyé automatiquement à l'adresse indiquée
                                ci-dessus.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row justify-end gap-4"
                    >
                        <ButtonReusable
                            variant="outline"
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[10px]"
                        >
                            Abandonner
                        </ButtonReusable>
                        <ButtonReusable
                            type="submit"
                            isLoading={isLoading}
                            leftIcon={<IconUserPlus size={20} />}
                            className="rounded-2xl h-14 px-10 shadow-lg shadow-primary/20 min-w-[240px]"
                        >
                            Finaliser l'inscription
                        </ButtonReusable>
                    </motion.div>
                </form>
            </div>
        </AdminLayout>
    );
}
