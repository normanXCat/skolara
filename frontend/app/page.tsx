"use client";

import HeroSection from "@/components/layout/hero-section";
import SchoolPresentation from "@/components/layout/school-presentation";
import KeyFigures from "@/components/layout/key-figures";
import SectionDivider from "@/components/ui/section-divider";
import { api } from "@/lib/api-client";
import { ButtonReusable } from "@/components/ui/button-reusable";

export default function Home() {
    const handleTestLogout = async () => {
        console.log("Test de déconnexion...");
        await api.post("/auth/logout");
        window.location.reload();
    };

    return (
        <>
            <HeroSection />
            <div className="flex justify-center p-4">
                <ButtonReusable onClick={handleTestLogout} variant="outline">
                    Tester la déconnexion forcée
                </ButtonReusable>
            </div>
            <SectionDivider />
            <SchoolPresentation />
            <SectionDivider />
            <KeyFigures />
            <SectionDivider />
        </>
    );
}
