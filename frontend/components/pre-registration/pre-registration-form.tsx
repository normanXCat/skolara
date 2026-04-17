"use client";

import React from "react";
import { type Variants, motion, AnimatePresence } from "framer-motion";
import {
    IconUser,
    IconCalendar,
    IconSchool,
    IconMail,
    IconPhone,
    IconUserCircle,
    IconArrowRight,
    IconArrowLeft,
    IconCheck,
    IconSparkles,
    IconReceipt,
    IconGenderMale,
    IconGenderFemale,
    IconBuildings,
    IconPencil,
    IconLoader2,
} from "@tabler/icons-react";
import InputReusable from "@/components/ui/input-reusable";
import { SelectReusable } from "@/components/ui/select-reusable";
import InputUpload from "@/components/ui/input-upload";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import usePreregistrationForm from "@/hooks/usePreregistrationForm";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { cn } from "@/lib/utils";
import { Preregistration } from "@/schemas/pre-registration-schema";
import { UseFormReturn, SubmitHandler } from "react-hook-form";

const GRADE_OPTIONS = [
    { value: "petite-section", label: "Petite Section (3-4 ans)" },
    { value: "moyenne-section", label: "Moyenne Section (4-5 ans)" },
    { value: "grande-section", label: "Grande Section (5-6 ans)" },
    { value: "cp", label: "CP — Cours Préparatoire" },
    { value: "ce1", label: "CE1 — Cours Élémentaire 1" },
    { value: "ce2", label: "CE2 — Cours Élémentaire 2" },
    { value: "cm1", label: "CM1 — Cours Moyen 1" },
    { value: "cm2", label: "CM2 — Cours Moyen 2" },
    { value: "6eme", label: "6ème" },
    { value: "5eme", label: "5ème" },
    { value: "4eme", label: "4ème" },
    { value: "3eme", label: "3ème" },
    { value: "2nde", label: "Seconde" },
    { value: "1ere", label: "Première" },
    { value: "terminale", label: "Terminale" },
];

const SCHOOL_YEAR_OPTIONS = [
    { value: "2024-2025", label: "2024-2025" },
    { value: "2025-2026", label: "2025-2026" },
];

const STEPS_META = [
    {
        title: "Informations de l'enfant",
        description: "Renseignez les informations concernant votre enfant.",
        icon: IconSchool,
    },
    {
        title: "Parent / Tuteur",
        description: "Vos coordonnées pour vous contacter.",
        icon: IconUserCircle,
    },
    {
        title: "Paiement & Justificatif",
        description: "Informations sur le règlement des frais.",
        icon: IconReceipt,
    },
    {
        title: "Confirmation",
        description: "Vérifiez vos informations avant de soumettre.",
        icon: IconCheck,
    },
];

const slideVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 80 : -80,
        opacity: 0,
        filter: "blur(6px)",
    }),
    center: {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 80 : -80,
        opacity: 0,
        filter: "blur(6px)",
        transition: { duration: 0.3 },
    }),
};

const itemFade: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
    }),
};

function StepIndicator({
    currentStep,
    totalSteps,
    errors,
    stepFields,
}: {
    currentStep: number;
    totalSteps: number;
    errors: any;
    stepFields: (keyof Preregistration)[][];
}) {
    return (
        <div className="flex items-center justify-center gap-2 mb-10">
            {Array.from({ length: totalSteps }).map((_, i) => {
                // Vérifier si cette étape contient des erreurs
                const hasError = stepFields[i]?.some((field) => errors[field]);

                return (
                    <React.Fragment key={i}>
                        <motion.div
                            className={cn(
                                "relative flex items-center justify-center size-10 rounded-full border-2 transition-all duration-500",
                                i < currentStep
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : i === currentStep
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border/40 bg-muted/30 text-muted-foreground/40",
                                hasError &&
                                    "border-destructive ring-2 ring-destructive/20",
                            )}
                        >
                            {/* Indicateur d'erreur en position absolue */}
                            {hasError && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 size-4 bg-destructive rounded-full border-2 border-background flex items-center justify-center z-10 shadow-lg"
                                >
                                    <div className="size-1.5 bg-white rounded-full animate-pulse" />
                                </motion.div>
                            )}

                            {i < currentStep && !hasError ? (
                                <IconCheck size={18} stroke={2.5} />
                            ) : (
                                <span
                                    className={cn(
                                        "text-sm font-bold",
                                        hasError && "text-destructive",
                                    )}
                                >
                                    {i + 1}
                                </span>
                            )}
                        </motion.div>
                        {i < totalSteps - 1 && (
                            <div className="relative h-0.5 w-12 overflow-hidden rounded-full bg-border/30">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                                    initial={false}
                                    animate={{
                                        width: i < currentStep ? "100%" : "0%",
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                    }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

function SummaryRow({
    label,
    value,
    index,
    onEdit,
}: {
    label: string;
    value?: string;
    index: number;
    onEdit?: () => void;
}) {
    return (
        <motion.div
            custom={index}
            variants={itemFade}
            initial="hidden"
            animate="visible"
            className="group flex items-center justify-between py-2.5 px-4 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all duration-300"
        >
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60 leading-none">
                    {label}
                </span>
                <span className="text-sm font-semibold text-foreground leading-tight">
                    {value || "—"}
                </span>
            </div>
            {onEdit && (
                <button
                    type="button"
                    onClick={onEdit}
                    className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground shadow-sm"
                >
                    <IconPencil size={14} />
                </button>
            )}
        </motion.div>
    );
}

export default function PreregistrationForm() {
    const {
        form,
        currentStep,
        totalSteps,
        isFirstStep,
        isLastStep,
        nextStep,
        prevStep,
        loading,
        setLoading,
        setCurrentStep,
        stepFields,
    } = usePreregistrationForm();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors, isValid },
    } = form as UseFormReturn<Preregistration>;

    const [direction, setDirection] = React.useState(1);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [submissionResult, setSubmissionResult] = React.useState<any>(null);
    const [receiptLoading, setReceiptLoading] = React.useState(false);
    const [hasReachedReview, setHasReachedReview] = React.useState(false);
    const uploadIdRef = React.useRef(0);

    const handleEdit = (step: number, field?: keyof Preregistration) => {
        setDirection(step > currentStep ? 1 : -1);
        setCurrentStep(step);
        if (field) {
            // Attendre la fin de la transition d'étape
            setTimeout(() => {
                form.setFocus(field);
            }, 600);
        }
    };

    const handleFileUpload = async (file: File | null) => {
        const currentId = ++uploadIdRef.current;

        if (!file) {
            setValue("receiptImageUrl", "", { shouldValidate: true });
            return;
        }

        setReceiptLoading(true);
        try {
            const response = await api.upload<{ url: string }>(
                "/upload/single",
                file,
            );

            // Ignorer si un nouvel upload a été lancé
            if (currentId !== uploadIdRef.current) return;

            if (response.success) {
                setValue("receiptImageUrl", response.data.url, {
                    shouldValidate: true,
                });
                toast.success("Reçu téléchargé avec succès");
            } else {
                toast.error(response.error || "Échec du téléchargement");
            }
        } catch (error) {
            toast.error("Erreur lors de l'envoi du fichier");
        } finally {
            if (currentId === uploadIdRef.current) {
                setReceiptLoading(false);
            }
        }
    };

    const handleNext = async (e?: React.BaseSyntheticEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const success = await nextStep();
        if (success) {
            setDirection(1);
            // Si l'étape actuelle est validée ET que tout le formulaire est prêt (isValid)
            // ET qu'on a déjà atteint le sommaire une fois auparavant (mode correction)
            if (isValid && hasReachedReview && currentStep < totalSteps - 1) {
                setCurrentStep(totalSteps - 1);
            }
        }
    };

    const handlePrev = (e?: React.BaseSyntheticEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setDirection(-1);
        prevStep();
    };

    const onValidationError = (errors: any) => {
        console.log("Validation Errors:", errors);
        toast.error("Veuillez corriger les erreurs avant de continuer");
    };

    // Marquer qu'on a atteint la page de résumé pour autoriser le saut intelligent plus tard
    React.useEffect(() => {
        if (currentStep === totalSteps - 1) {
            setHasReachedReview(true);
        }
    }, [currentStep, totalSteps]);

    const onSubmit: SubmitHandler<Preregistration> = async (data) => {
        setLoading(true);
        try {
            const response = await api.post("/pre-registrations", data);
            if (response.success) {
                toast.success(response.message);
                setSubmissionResult(response.data);
                setIsSubmitted(true);
            } else {
                if (response.details) {
                    api.handleFormErrors(response.details, setError, {
                        steps: stepFields,
                        onStepError: (stepIndex) => {
                            setDirection(stepIndex > currentStep ? 1 : -1);
                            setCurrentStep(stepIndex);
                        },
                    });
                    toast.error("Veuillez corriger les erreurs.");
                } else {
                    toast.error(response.error);
                }
            }
        } catch (error) {
            toast.error("Une erreur est survenue lors de l'envoi.");
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
            >
                <div className="flex items-center justify-center mx-auto size-20 rounded-full bg-primary/20 text-primary">
                    <IconCheck size={40} stroke={2.5} />
                </div>
                <div className="space-y-2">
                    <Typography variant="h2" className="text-foreground">
                        Demande envoyée !
                    </Typography>
                    <Typography
                        variant="body"
                        className="max-w-xs mx-auto text-muted-foreground"
                    >
                        Merci pour votre confiance. Nous reviendrons vers vous
                        prochainement.
                    </Typography>
                    {submissionResult?.fileNumber && (
                        <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/20 inline-block mx-auto">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-primary mb-1">
                                Numéro de dossier
                            </p>
                            <p className="text-2xl font-black text-foreground">
                                {submissionResult.fileNumber}
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    <ButtonReusable
                        variant="outline"
                        size="lg"
                        onClick={() => (window.location.href = "/")}
                    >
                        Retour à l&apos;accueil
                    </ButtonReusable>
                </div>
            </motion.div>
        );
    }

    const watchedValues = watch();
    const currentMeta = STEPS_META[currentStep];

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="p-8 lg:p-12 pb-0">
                <StepIndicator
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    errors={errors}
                    stepFields={stepFields}
                />

                <motion.div
                    key={`title-${currentStep}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-8 space-y-2"
                >
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary">
                            <currentMeta.icon size={20} stroke={1.5} />
                        </div>
                    </div>
                    <Typography variant="h3" className="text-foreground">
                        {currentMeta.title}
                    </Typography>
                    <Typography
                        variant="caption"
                        className="text-muted-foreground"
                    >
                        {currentMeta.description}
                    </Typography>
                </motion.div>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onValidationError)}>
                <motion.div
                    animate={{ height: "auto" }}
                    className="relative overflow-hidden"
                >
                    <AnimatePresence mode="wait" custom={direction}>
                        {currentStep === 0 && (
                            <motion.div
                                key="step-0"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="space-y-5 px-8 lg:px-12 pb-2"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputReusable
                                        label="Prénom de l'enfant"
                                        id="childFirstName"
                                        placeholder="Ahmed"
                                        icon={IconUser}
                                        register={register("childFirstName")}
                                        error={errors.childFirstName?.message}
                                        disabled={loading}
                                    />
                                    <InputReusable
                                        label="Nom de l'enfant"
                                        id="childLastName"
                                        placeholder="Benali"
                                        icon={IconUser}
                                        register={register("childLastName")}
                                        error={errors.childLastName?.message}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground/70 px-1">
                                        Genre *
                                    </label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setValue("gender", "M", {
                                                    shouldValidate: true,
                                                })
                                            }
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-2 h-14 rounded-full border-2 transition-all",
                                                watchedValues.gender === "M"
                                                    ? "border-primary bg-primary/10 text-primary"
                                                    : "border-border/40 hover:border-primary/20 text-muted-foreground",
                                            )}
                                            disabled={loading}
                                        >
                                            <IconGenderMale size={20} />
                                            <span className="font-bold">
                                                Masculin
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setValue("gender", "F", {
                                                    shouldValidate: true,
                                                })
                                            }
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-2 h-14 rounded-full border-2 transition-all",
                                                watchedValues.gender === "F"
                                                    ? "border-primary bg-primary/10 text-primary"
                                                    : "border-border/40 hover:border-primary/20 text-muted-foreground",
                                            )}
                                            disabled={loading}
                                        >
                                            <IconGenderFemale size={20} />
                                            <span className="font-bold">
                                                Féminin
                                            </span>
                                        </button>
                                    </div>
                                    {errors.gender && (
                                        <p className="text-xs font-bold text-destructive px-1">
                                            {errors.gender.message as string}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputReusable
                                        label="Date de naissance"
                                        id="childDateOfBirth"
                                        type="date"
                                        icon={IconCalendar}
                                        register={register("childDateOfBirth")}
                                        error={errors.childDateOfBirth?.message}
                                        disabled={loading}
                                    />
                                    <InputReusable
                                        label="Email de l'enfant (optionnel)"
                                        id="childEmail"
                                        type="email"
                                        placeholder="ahmed@example.com"
                                        icon={IconMail}
                                        register={register("childEmail")}
                                        error={errors.childEmail?.message}
                                        disabled={loading}
                                    />
                                </div>

                                <InputReusable
                                    label="École précédente (optionnel)"
                                    id="previousSchool"
                                    placeholder="Nom de l'établissement"
                                    icon={IconBuildings}
                                    register={register("previousSchool")}
                                    error={errors.previousSchool?.message}
                                    disabled={loading}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <SelectReusable
                                        label="Niveau souhaité"
                                        id="desiredGrade"
                                        placeholder="Niveau"
                                        icon={IconSchool}
                                        options={GRADE_OPTIONS}
                                        value={watchedValues.desiredGrade ?? ""}
                                        onValueChange={(val) =>
                                            setValue("desiredGrade", val, {
                                                shouldValidate: true,
                                            })
                                        }
                                        error={errors.desiredGrade?.message}
                                        disabled={loading}
                                        name="desiredGrade"
                                        ref={register("desiredGrade").ref}
                                    />
                                    <SelectReusable
                                        label="Année scolaire cible"
                                        id="targetSchoolYear"
                                        placeholder="Année"
                                        icon={IconCalendar}
                                        options={SCHOOL_YEAR_OPTIONS}
                                        value={
                                            watchedValues.targetSchoolYear ?? ""
                                        }
                                        onValueChange={(val) =>
                                            setValue("targetSchoolYear", val, {
                                                shouldValidate: true,
                                            })
                                        }
                                        error={errors.targetSchoolYear?.message}
                                        disabled={loading}
                                        name="targetSchoolYear"
                                        ref={register("targetSchoolYear").ref}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 1 && (
                            <motion.div
                                key="step-1"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="space-y-5 px-8 lg:px-12 pb-2"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputReusable
                                        label="Prénom du parent"
                                        id="parentFirstName"
                                        placeholder="Fatima"
                                        icon={IconUser}
                                        register={register("parentFirstName")}
                                        error={errors.parentFirstName?.message}
                                        disabled={loading}
                                    />
                                    <InputReusable
                                        label="Nom complet du parent / tuteur"
                                        id="parentFullName"
                                        placeholder="Fatima Benali"
                                        icon={IconUserCircle}
                                        register={register("parentFullName")}
                                        error={errors.parentFullName?.message}
                                        disabled={loading}
                                    />
                                </div>
                                <InputReusable
                                    label="Adresse du domicile"
                                    id="parentAddress"
                                    placeholder="N° 123, Rue des Écoles..."
                                    icon={IconBuildings}
                                    register={register("parentAddress")}
                                    error={errors.parentAddress?.message}
                                    disabled={loading}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputReusable
                                        label="Adresse email"
                                        id="parentEmail"
                                        type="email"
                                        placeholder="fatima@example.com"
                                        icon={IconMail}
                                        register={register("parentEmail")}
                                        error={errors.parentEmail?.message}
                                        disabled={loading}
                                    />
                                    <InputReusable
                                        label="Numéro de téléphone"
                                        id="parentPhone"
                                        type="tel"
                                        placeholder="+212 6..."
                                        icon={IconPhone}
                                        register={register("parentPhone")}
                                        error={errors.parentPhone?.message}
                                        disabled={loading}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step-2"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="space-y-5 px-8 lg:px-12 pb-2"
                            >
                                <InputReusable
                                    label="Numéro de bordereau / reçu"
                                    id="receiptNumber"
                                    placeholder="Ex: 987654321"
                                    icon={IconReceipt}
                                    register={register("receiptNumber")}
                                    error={errors.receiptNumber?.message}
                                    disabled={loading}
                                />

                                <InputUpload
                                    label="Photo du reçu"
                                    name="receiptImageUrl"
                                    accept="image/*,.pdf"
                                    preview={true}
                                    onFileChange={handleFileUpload}
                                    isLoading={receiptLoading}
                                    defaultValue={watchedValues.receiptImageUrl}
                                    error={errors.receiptImageUrl?.message}
                                    className={
                                        loading
                                            ? "opacity-50 pointer-events-none"
                                            : ""
                                    }
                                />
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step-3"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="space-y-4 px-8 lg:px-12 pb-2"
                            >
                                <div className="p-6 rounded-3xl bg-muted/10 border border-border/40 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <IconSchool size={80} />
                                    </div>

                                    <Typography
                                        variant="overline"
                                        className="text-[10px] mb-4 block text-primary font-bold tracking-[0.2em]"
                                    >
                                        FICHE DE PRÉ-INSCRIPTION
                                    </Typography>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 border-b border-border/40 pb-1">
                                                Informations de l'élève
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                                <SummaryRow
                                                    label="Nom complet"
                                                    value={`${watchedValues.childFirstName} ${watchedValues.childLastName}`}
                                                    index={0}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            0,
                                                            "childFirstName",
                                                        )
                                                    }
                                                />
                                                <SummaryRow
                                                    label="Date de naissance"
                                                    value={
                                                        watchedValues.childDateOfBirth
                                                    }
                                                    index={1}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            0,
                                                            "childDateOfBirth",
                                                        )
                                                    }
                                                />
                                                <SummaryRow
                                                    label="Genre"
                                                    value={
                                                        watchedValues.gender ===
                                                        "M"
                                                            ? "Masculin"
                                                            : "Féminin"
                                                    }
                                                    index={2}
                                                    onEdit={() =>
                                                        handleEdit(0, "gender")
                                                    }
                                                />
                                                <SummaryRow
                                                    label="Niveau souhaité"
                                                    value={
                                                        watchedValues.desiredGrade
                                                    }
                                                    index={3}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            0,
                                                            "desiredGrade",
                                                        )
                                                    }
                                                />
                                                <SummaryRow
                                                    label="Année scolaire"
                                                    value={
                                                        watchedValues.targetSchoolYear
                                                    }
                                                    index={4}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            0,
                                                            "targetSchoolYear",
                                                        )
                                                    }
                                                />
                                                <SummaryRow
                                                    label="École précédente"
                                                    value={
                                                        watchedValues.previousSchool
                                                    }
                                                    index={5}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            0,
                                                            "previousSchool",
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 border-b border-border/40 pb-1">
                                                Parent / Tuteur
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                                <SummaryRow
                                                    label="Prénom & Nom"
                                                    value={`${watchedValues.parentFirstName} ${watchedValues.parentFullName}`}
                                                    index={6}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            1,
                                                            "parentFirstName",
                                                        )
                                                    }
                                                />
                                                <SummaryRow
                                                    label="Téléphone"
                                                    value={
                                                        watchedValues.parentPhone
                                                    }
                                                    index={7}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            1,
                                                            "parentPhone",
                                                        )
                                                    }
                                                />
                                                <SummaryRow
                                                    label="Email"
                                                    value={
                                                        watchedValues.parentEmail
                                                    }
                                                    index={8}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            1,
                                                            "parentEmail",
                                                        )
                                                    }
                                                />
                                                <SummaryRow
                                                    label="Adresse"
                                                    value={
                                                        watchedValues.parentAddress
                                                    }
                                                    index={9}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            1,
                                                            "parentAddress",
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 border-b border-border/40 pb-1">
                                                Règlement
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                                <SummaryRow
                                                    label="N° de Bordereau"
                                                    value={
                                                        watchedValues.receiptNumber
                                                    }
                                                    index={10}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            2,
                                                            "receiptNumber",
                                                        )
                                                    }
                                                />
                                                <SummaryRow
                                                    label="Justificatif"
                                                    value={
                                                        watchedValues.receiptImageUrl
                                                            ? "Document joint"
                                                            : "Non fourni"
                                                    }
                                                    index={11}
                                                    onEdit={() =>
                                                        handleEdit(
                                                            2,
                                                            "receiptImageUrl",
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="flex items-center justify-between mt-6 gap-4 px-8 lg:px-12 pb-8 lg:pb-12">
                    {!isFirstStep && (
                        <ButtonReusable
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={handlePrev}
                            disabled={loading || receiptLoading}
                            leftIcon={<IconArrowLeft className="size-5" />}
                        >
                            Précédent
                        </ButtonReusable>
                    )}
                    {isLastStep ? (
                        <ButtonReusable
                            type="submit"
                            variant="default"
                            size="lg"
                            isLoading={loading}
                            disabled={receiptLoading}
                            loadingText="Envoi..."
                            leftIcon={<IconSparkles className="size-5" />}
                        >
                            Soumettre la pré-inscription
                        </ButtonReusable>
                    ) : (
                        <ButtonReusable
                            type="button"
                            variant="default"
                            size="lg"
                            className="ml-auto"
                            onClick={handleNext}
                            disabled={receiptLoading || loading}
                            rightIcon={
                                loading ? (
                                    <IconLoader2 className="animate-spin size-5" />
                                ) : (
                                    <IconArrowRight className="size-5" />
                                )
                            }
                        >
                            {receiptLoading ? "Téléchargement..." : "Suivant"}
                        </ButtonReusable>
                    )}
                </div>
            </form>
        </div>
    );
}
