import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";

/**
 * Récupère tous les paramètres du site.
 * Mis en cache avec Next.js unstable_cache.
 */
export const getSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
    const baseUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";
    const url = `${baseUrl}/api/admin/settings`;
    
    try {
      console.log(`[getSettings] Fetching settings from: ${url}`);
      const res = await fetch(url, {
        cache: 'no-store',
      });

      if (!res.ok) {
        console.error(`[getSettings] API returned error ${res.status}: ${res.statusText}`);
        throw new Error(`API Error: ${res.status}`);
      }

      const json = await res.json();
      console.log(`[getSettings] Settings fetched successfully:`, !!json?.data);
      
      return json?.data || {};
    } catch (error) {
      console.error("[getSettings] Failed to fetch settings:", error);
      // On retourne un objet vide pour ne pas crasher toute l'application.
      // Si cette valeur est mise en cache, elle pourra être revalidée via le panneau d'administration.
      return {};
    }
  },
  ["site-settings-v2"],
  { tags: ["settings"] }
);

/**
 * Récupère un paramètre spécifique par sa clé.
 */
export async function getSetting(key: string): Promise<string> {
  const settings = await getSettings();
  return settings[key] || "";
}

