import { PreRegistrationContent } from "@/components/pre-registration/pre-registration-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pré-inscription | Skolara",
    description: "Inscrivez votre enfant à Skolara en quelques étapes simples.",
};

export default function PreregistrationPage() {
    return <PreRegistrationContent />;
}
