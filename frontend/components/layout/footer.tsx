import { getSettings } from "@/lib/settings";
import { FooterClient } from "./FooterClient";

/**
 * Footer principal de l'application (Server Component).
 * Récupère les paramètres du site côté serveur pour un rendu optimal (SEO/Performance).
 */
export default async function Footer() {
    const settings = await getSettings().catch(() => ({}));
    return <FooterClient settings={settings} />;
}
