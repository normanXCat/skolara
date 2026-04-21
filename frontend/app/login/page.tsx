import { LoginContent } from "@/components/auth/login-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Connexion | Skolara",
    description:
        "Connectez-vous à votre espace Skolara pour gérer votre scolarité.",
};

export default function LoginPage() {
    return <LoginContent />;
}
