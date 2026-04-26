import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";

/**
 * Récupère tous les paramètres du site.
 * Mis en cache avec Next.js unstable_cache.
 */
export const getSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
    // Sur le serveur, on utilise l'URL absolue du backend
    const baseUrl = process.env.BACKEND_URL || "http://localhost:8000";
  const url = `${baseUrl}/api/admin/settings`;
    
    try {
      console.log(`[getSettings] Fetching settings from: ${url}`);
      const res = await fetch(url, {
        // Pas besoin de tags ici car unstable_cache s'en occupe déjà
        cache: 'no-store', // On laisse unstable_cache gérer le cache au-dessus
      });

      if (!res.ok) {
        console.error(`[getSettings] API returned error ${res.status}: ${res.statusText}`);
        return {};
      }

      const json = await res.json();
      console.log(`[getSettings] Settings fetched successfully:`, !!json?.data);
      
      return json?.data || {};
    } catch (error) {
      console.error("[getSettings] Failed to fetch settings:", error);
      return {};
    }
  },
  ["site-settings"],
  { tags: ["settings"] }
);

/**
 * Récupère un paramètre spécifique par sa clé.
 */
export async function getSetting(key: string): Promise<string> {
  const settings = await getSettings();
  return settings[key] || "";
}

/**
 * Met à jour les paramètres du site et invalide le cache.
 * Note: Cette fonction est principalement destinée à être utilisée côté serveur (ex: Server Actions).
 */
export async function updateSettings(data: Record<string, string>): Promise<void> {
  const baseUrl = process.env.BACKEND_URL || "http://localhost:8000";
  const url = `${baseUrl}/api/admin/settings`;

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (res.ok) {
      revalidateTag("settings", "max");
    }
  } catch (error) {
    console.error("Failed to update settings in updateSettings utility:", error);
    throw error;
  }
}
