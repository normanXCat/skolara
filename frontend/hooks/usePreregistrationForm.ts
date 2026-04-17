import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
    PreregistrationSchema,
    type Preregistration,
} from "@/schemas/pre-registration-schema";
import { UseFormReturn } from "react-hook-form";

const TOTAL_STEPS = 4;

/**
 * Hook personnalisé pour gérer le formulaire de pré-inscription Skolara.
 */
const usePreregistrationForm = () => {
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const form = useForm<Preregistration>({
        mode: "onChange",
        reValidateMode: "onChange",
        shouldFocusError: true,
        resolver: zodResolver(PreregistrationSchema) as any,
        defaultValues: {
            childFirstName: "",
            childLastName: "",
            childDateOfBirth: "",
            gender: undefined as any,
            childEmail: "",
            previousSchool: "",
            desiredGrade: "",
            parentFirstName: "",
            parentFullName: "",
            parentEmail: "",
            parentPhone: "",
            parentAddress: "",
            receiptNumber: "",
            receiptImageUrl: "",
            documentUrls: [],
            status: "PENDING",
        },
    });

    const stepFields: (keyof Preregistration)[][] = [
        [
            "childFirstName",
            "childLastName",
            "childDateOfBirth",
            "gender",
            "childEmail",
            "previousSchool",
            "desiredGrade",
        ],
        [
            "parentFirstName",
            "parentFullName",
            "parentEmail",
            "parentPhone",
            "parentAddress",
        ],
        ["receiptNumber", "receiptImageUrl", "documentUrls"],
        [], // Étape 4 : Confirmation/Sommaire
    ];

    const nextStep = useCallback(async () => {
        const fields = stepFields[currentStep];
        const isValid = await form.trigger(fields);
        if (isValid && currentStep < TOTAL_STEPS - 1) {
            setCurrentStep((prev) => prev + 1);
        }
        return isValid;
    }, [currentStep, form]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    }, [currentStep]);

    return {
        form,
        currentStep,
        setCurrentStep,
        stepFields,
        totalSteps: TOTAL_STEPS,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === TOTAL_STEPS - 1,
        nextStep,
        prevStep,
        loading,
        setLoading,
    };
};

export default usePreregistrationForm;
