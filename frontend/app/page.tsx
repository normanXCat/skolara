import HeroSection from "@/components/layout/hero-section";
import SchoolPresentation from "@/components/layout/school-presentation";
import KeyFigures from "@/components/layout/key-figures";
import SchoolLevels from "@/components/layout/school-levels";
import SchoolValues from "@/components/layout/school-values";
import Testimonials from "@/components/layout/testimonials";
import PhotoGallery from "@/components/layout/photo-gallery";
import CallToAction from "@/components/layout/call-to-action";
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
            <SchoolLevels />
            <SectionDivider />
            <SchoolValues />
            <SectionDivider />
            <Testimonials />
            <SectionDivider />
            <PhotoGallery />
            <SectionDivider />
            <CallToAction />
        </>
    );
}
