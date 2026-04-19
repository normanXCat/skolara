import HeroSection from "@/components/layout/hero-section";
import SchoolPresentation from "@/components/layout/school-presentation";
import KeyFigures from "@/components/layout/key-figures";
import SectionDivider from "@/components/ui/section-divider";

export default function Home() {
    return (
        <>
            <HeroSection />
            <SectionDivider />
            <SchoolPresentation />
            <SectionDivider />
            <KeyFigures />
            <SectionDivider />
        </>
    );
}
