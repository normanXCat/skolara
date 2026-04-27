"use server";

import { revalidateTag } from "next/cache";

/**
 * Invalide le cache Next.js associé à la clé "settings".
 * Appelée généralement depuis un Client Component (ex: use-settings.ts) après
 * une sauvegarde réussie sur l'API backend.
 */
export async function revalidateSettings() {
    revalidateTag("settings", "max");
}
