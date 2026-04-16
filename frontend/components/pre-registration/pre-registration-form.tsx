"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "@tabler/icons-react";
import InputReusable from "@/components/ui/input-reusable";
import SelectReusable from "@/components/ui/select-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import usePreregistrationForm from "@/hooks/usePreregistrationForm";

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
        title: "Confirmation",
        description: "Vérifiez vos informations avant de soumettre.",
        icon: IconCheck,
    },
];

const slideVariants: any = {
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

const itemFade: any = {
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
}: {
    currentStep: number;
    totalSteps: number;
}) {
    return (
        <div className="flex items-center justify-center gap-2 mb-10">
            {Array.from({ length: totalSteps }).map((_, i) => (
                <React.Fragment key={i}>
                    <motion.div
                        className={`relative flex items-center justify-center size-10 rounded-full border-2 transition-all duration-500 ${
                            i < currentStep
                                ? "border-primary bg-primary text-primary-foreground"
                                : i === currentStep
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border/40 bg-muted/30 text-muted-foreground/40"
                        }`}
                    >
                        {i < currentStep ? (
                            <IconCheck size={18} stroke={2.5} />
                        ) : (
                            <span className="text-sm font-bold">{i + 1}</span>
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
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

function SummaryRow({
    label,
    value,
    index,
}: {
    label: string;
    value: string;
    index: number;
}) {
    return (
        <motion.div
            custom={index}
            variants={itemFade}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between py-3 px-4 rounded-2xl bg-muted/20 border border-border/20"
        >
            <span className="text-sm font-medium text-muted-foreground">
                {label}
            </span>
            <span className="text-sm font-bold text-foreground truncate max-w-[55%] text-right">
                {value || "—"}
            </span>
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
    } = usePreregistrationForm();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = form;

    const [direction, setDirection] = React.useState(1);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleNext = async () => {
        setDirection(1);
        await nextStep();
    };

    const handlePrev = () => {
        setDirection(-1);
        prevStep();
    };

    const onSubmit = async (data: any) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Preregistration data:", data);
        setLoading(false);
        setIsSubmitted(true);
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
                </div>
                <ButtonReusable
                    variant="outline"
                    size="lg"
                    onClick={() => (window.location.href = "/")}
                >
                    Retour à l&apos;accueil
                </ButtonReusable>
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

            <form onSubmit={handleSubmit(onSubmit)}>
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
                                    />
                                    <InputReusable
                                        label="Nom de l'enfant"
                                        id="childLastName"
                                        placeholder="Benali"
                                        icon={IconUser}
                                        register={register("childLastName")}
                                        error={errors.childLastName?.message}
                                    />
                                </div>

                                <InputReusable
                                    label="Date de naissance"
                                    id="childDateOfBirth"
                                    type="date"
                                    icon={IconCalendar}
                                    register={register("childDateOfBirth")}
                                    error={errors.childDateOfBirth?.message}
                                />

                                <SelectReusable
                                    label="Niveau souhaité"
                                    id="desiredGrade"
                                    placeholder="Sélectionner un niveau"
                                    icon={IconSchool}
                                    options={GRADE_OPTIONS}
                                    value={watchedValues.desiredGrade ?? ""}
                                    onValueChange={(val) =>
                                        setValue("desiredGrade", val, {
                                            shouldValidate: true,
                                        })
                                    }
                                    error={errors.desiredGrade?.message}
                                />
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
                                <InputReusable
                                    label="Nom complet du parent / tuteur"
                                    id="parentFullName"
                                    placeholder="Fatima Benali"
                                    icon={IconUserCircle}
                                    register={register("parentFullName")}
                                    error={errors.parentFullName?.message}
                                />
                                <InputReusable
                                    label="Adresse email"
                                    id="parentEmail"
                                    type="email"
                                    placeholder="fatima@example.com"
                                    icon={IconMail}
                                    register={register("parentEmail")}
                                    error={errors.parentEmail?.message}
                                />
                                <InputReusable
                                    label="Numéro de téléphone"
                                    id="parentPhone"
                                    type="tel"
                                    placeholder="+212 6..."
                                    icon={IconPhone}
                                    register={register("parentPhone")}
                                    error={errors.parentPhone?.message}
                                />
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
                                className="space-y-3 px-8 lg:px-12 pb-2"
                            >
                                <div>
                                    <Typography
                                        variant="overline"
                                        className="text-[10px] mb-3 block"
                                    >
                                        Enfant
                                    </Typography>
                                    <div className="space-y-2">
                                        <SummaryRow
                                            label="Prénom"
                                            value={watchedValues.childFirstName}
                                            index={0}
                                        />
                                        <SummaryRow
                                            label="Nom"
                                            value={watchedValues.childLastName}
                                            index={1}
                                        />
                                        <SummaryRow
                                            label="Niveau"
                                            value={watchedValues.desiredGrade}
                                            index={2}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Typography
                                        variant="overline"
                                        className="text-[10px] mb-3 block"
                                    >
                                        Parent
                                    </Typography>
                                    <div className="space-y-2">
                                        <SummaryRow
                                            label="Nom"
                                            value={watchedValues.parentFullName}
                                            index={3}
                                        />
                                        <SummaryRow
                                            label="Email"
                                            value={watchedValues.parentEmail}
                                            index={4}
                                        />
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
                            loadingText="Envoi..."
                            leftIcon={<IconSparkles className="size-5" />}
                        >
                            Soumettre
                        </ButtonReusable>
                    ) : (
                        <ButtonReusable
                            type="button"
                            variant="default"
                            size="lg"
                            className="ml-auto"
                            onClick={handleNext}
                            rightIcon={<IconArrowRight className="size-5" />}
                        >
                            Suivant
                        </ButtonReusable>
                    )}
                </div>
            </form>
        </div>
    );
}
