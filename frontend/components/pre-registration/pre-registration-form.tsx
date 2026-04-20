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
    IconArrowNarrowLeft,
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

// Les options sont désormais récupérées de la base de données via l'API.

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
    const [grades, setGrades] = React.useState<
        { value: string; label: string }[]
    >([]);
    const [gradesLoading, setGradesLoading] = React.useState(true);
    const uploadIdRef = React.useRef(0);

    // Récupérer les grades depuis la base de données
    React.useEffect(() => {
        const fetchGrades = async () => {
            setGradesLoading(true);
            try {
                // Petit délai pour voir le loading
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const response = await api.get("/grades");
                if (response.success && Array.isArray(response.data)) {
                    setGrades(response.data);
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des grades:",
                    error,
                );
            } finally {
                setGradesLoading(false);
            }
        };
        fetchGrades();
    }, []);

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

    const watchedValues = watch();
    const currentMeta = STEPS_META[currentStep];

    // Vérifier si l'étape actuelle est valide
    const isStepValid = React.useMemo(() => {
        const fields = stepFields[currentStep];
        if (!fields || fields.length === 0) return true;

        const requiredFields: (keyof Preregistration)[] = [
            "childFirstName",
            "childLastName",
            "childDateOfBirth",
            "gender",
            "desiredGrade",
            "parentFirstName",
            "parentFullName",
            "parentEmail",
            "parentPhone",
        ];

        return fields.every((field) => {
            const hasError = !!errors[field];
            const value = watchedValues[field];
            const isRequired = requiredFields.includes(field);

            if (hasError) return false;
            if (
                isRequired &&
                (value === undefined || value === null || value === "")
            )
                return false;

            return true;
        });
    }, [currentStep, errors, watchedValues, stepFields]);

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

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="sm:p-8 lg:p-12 pb-0">
                <div className="sm:block hidden">
                    <StepIndicator
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        errors={errors}
                        stepFields={stepFields}
                    />
                </div>

                <motion.div
                    key={`title-${currentStep}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative text-center mb-8 space-y-2 px-10 sm:px-0"
                >
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary">
                            <currentMeta.icon size={20} stroke={1.5} />
                        </div>
                    </div>
                    <Typography
                        variant="h3"
                        className="text-foreground text-xl sm:text-2xl"
                    >
                        {currentMeta.title}
                    </Typography>
                    <Typography
                        variant="caption"
                        className="text-muted-foreground line-clamp-2"
                    >
                        {currentMeta.description}
                    </Typography>

                    {/* Mobile Back Button (Inline below title) */}
                    {!isFirstStep && (
                        <div className="sm:hidden flex justify-center mt-5 mb-2">
                            <ButtonReusable
                                type="button"
                                variant="outline"
                                onClick={handlePrev}
                                className="!w-14 !h-10 !p-0 !min-w-0 z-10"
                                aria-label="Étape précédente"
                            >
                                <IconArrowNarrowLeft size={20} stroke={2.5} />
                            </ButtonReusable>
                        </div>
                    )}
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
                                className="space-y-5 px-2 sm:px-8 lg:px-12 pb-2"
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

                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-foreground/80 px-1 flex items-center gap-2">
                                        <IconUser
                                            size={16}
                                            className="text-primary/70"
                                        />
                                        Genre *
                                    </label>
                                    <div className="relative p-1.5 flex gap-2 bg-muted/40 backdrop-blur-sm border border-border/40 rounded-3xl h-[76px] shadow-inner">
                                        {/* Highlight animated pill */}
                                        <div className="absolute inset-1.5 flex z-0 pointer-events-none w-[calc(100%-12px)]">
                                            <AnimatePresence>
                                                {watchedValues.gender && (
                                                    <motion.div
                                                        layoutId="genderHighlight"
                                                        className={cn(
                                                            "h-full w-1/2 rounded-[1.25rem] shadow-xl border border-white/10",
                                                            watchedValues.gender ===
                                                                "M"
                                                                ? "bg-gradient-to-br from-blue-500/10 to-blue-600/20 border-blue-200/20"
                                                                : "bg-gradient-to-br from-pink-500/10 to-pink-600/20 border-pink-200/20",
                                                        )}
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.95,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                            x:
                                                                watchedValues.gender ===
                                                                "M"
                                                                    ? "0%"
                                                                    : "100%",
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            scale: 0.95,
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 30,
                                                            opacity: {
                                                                duration: 0.2,
                                                            },
                                                        }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setValue("gender", "M", {
                                                    shouldValidate: true,
                                                })
                                            }
                                            className={cn(
                                                "relative z-10 flex-1 flex flex-col items-center justify-center transition-all duration-500 rounded-2xl",
                                                watchedValues.gender === "M"
                                                    ? "text-blue-600 dark:text-blue-400"
                                                    : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-white/5",
                                            )}
                                            disabled={loading}
                                        >
                                            <motion.div
                                                animate={{
                                                    scale:
                                                        watchedValues.gender ===
                                                        "M"
                                                            ? 1.1
                                                            : 1,
                                                    y:
                                                        watchedValues.gender ===
                                                        "M"
                                                            ? -2
                                                            : 0,
                                                }}
                                            >
                                                <IconGenderMale
                                                    size={
                                                        watchedValues.gender ===
                                                        "M"
                                                            ? 24
                                                            : 20
                                                    }
                                                    stroke={2.5}
                                                />
                                            </motion.div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.15em] mt-1.5">
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
                                                "relative z-10 flex-1 flex flex-col items-center justify-center transition-all duration-500 rounded-2xl",
                                                watchedValues.gender === "F"
                                                    ? "text-pink-600 dark:text-pink-400"
                                                    : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-white/5",
                                            )}
                                            disabled={loading}
                                        >
                                            <motion.div
                                                animate={{
                                                    scale:
                                                        watchedValues.gender ===
                                                        "F"
                                                            ? 1.1
                                                            : 1,
                                                    y:
                                                        watchedValues.gender ===
                                                        "F"
                                                            ? -2
                                                            : 0,
                                                }}
                                            >
                                                <IconGenderFemale
                                                    size={
                                                        watchedValues.gender ===
                                                        "F"
                                                            ? 24
                                                            : 20
                                                    }
                                                    stroke={2.5}
                                                />
                                            </motion.div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.15em] mt-1.5">
                                                Féminin
                                            </span>
                                        </button>
                                    </div>
                                    {errors.gender && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-[11px] font-bold text-destructive px-2 mt-1 flex items-center gap-1"
                                        >
                                            <span className="size-1 bg-destructive rounded-full animate-pulse" />
                                            {errors.gender.message as string}
                                        </motion.p>
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

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputReusable
                                        label="École précédente (optionnel)"
                                        id="previousSchool"
                                        placeholder="Nom de l'établissement"
                                        icon={IconBuildings}
                                        register={register("previousSchool")}
                                        error={errors.previousSchool?.message}
                                        disabled={loading}
                                    />
                                    <SelectReusable
                                        label="Niveau souhaité"
                                        id="desiredGrade"
                                        placeholder="Niveau"
                                        icon={IconSchool}
                                        options={grades}
                                        value={watchedValues.desiredGrade ?? ""}
                                        onValueChange={(val) =>
                                            setValue("desiredGrade", val, {
                                                shouldValidate: true,
                                            })
                                        }
                                        error={errors.desiredGrade?.message}
                                        disabled={loading}
                                        isLoading={gradesLoading}
                                        name="desiredGrade"
                                        ref={register("desiredGrade").ref}
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
                                                    label="École précédente"
                                                    value={
                                                        watchedValues.previousSchool
                                                    }
                                                    index={4}
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

                <div className="flex items-center justify-center flex-col sm:flex-row sm:justify-between mt-6 gap-4 px-8 lg:px-12 pb-8 lg:pb-12">
                    {!isFirstStep && (
                        <ButtonReusable
                            type="button"
                            variant="outline"
                            size="lg"
                            className="z-10 hidden sm:flex"
                            onClick={handlePrev}
                            disabled={loading || receiptLoading}
                            leftIcon={
                                <IconArrowNarrowLeft className="size-5" />
                            }
                        >
                            Précédent
                        </ButtonReusable>
                    )}
                    {isLastStep ? (
                        <ButtonReusable
                            type="submit"
                            variant="default"
                            size="lg"
                            className="z-10"
                            isLoading={loading}
                            disabled={receiptLoading || !isStepValid}
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
                            className="z-10"
                            onClick={handleNext}
                            disabled={receiptLoading || loading || !isStepValid}
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
