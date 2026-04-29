import { Metadata } from "next";
import SitemapClient from "./SitemapClient";

export const metadata: Metadata = {
    title: "Plan du Site | Skolara — Académie d'Excellence",
    description: "Explorez l'arborescence et la structure du site Skolara.",
};

export default function SitemapPage() {
    return <SitemapClient />;
}
