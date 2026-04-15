import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/layout/hero-section";
import SchoolPresentation from "@/components/layout/school-presentation";
import KeyFigures from "@/components/layout/key-figures";
import Footer from "@/components/layout/footer";

import SectionDivider from "@/components/ui/section-divider";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <HeroSection />
                <SectionDivider />
                <SchoolPresentation />
                <SectionDivider />
                <KeyFigures />
            </main>
            <SectionDivider />
            <Footer />
        </div>
    );
}
