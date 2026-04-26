import { Metadata } from "next";
import { BlogContent } from "@/components/shared/BlogContent";

export const metadata: Metadata = {
    title: "Le Mag Skolara | Actualités & Perspectives",
    description: "Plongez dans nos réflexions sur l'éducation de demain et la vie au sein de notre académie.",
    openGraph: {
        title: "Le Mag Skolara | Actualités & Perspectives",
        description: "Plongez dans nos réflexions sur l'éducation de demain et la vie au sein de notre académie.",
        type: "website",
    },
};

export default function BlogPage() {
    return <BlogContent />;
}
