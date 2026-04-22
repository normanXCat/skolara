import dns from "dns/promises";

/**
 * Cache pour les résultats de validation MX par domaine.
 * Permet d'éviter des requêtes DNS redondantes.
 */
const mxCache = new Map<string, { valid: boolean; cachedAt: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 heure

/**
 * Vérifie si une adresse email possède un domaine avec des enregistrements MX valides.
 *
 * @param email - L'adresse email à vérifier
 * @returns true si le domaine possède des serveurs de messagerie (ou en cas d'erreur DNS/timeout - fail open)
 */
export async function checkMxRecord(email: string): Promise<boolean> {
    try {
        const domain = email.split("@")[1]?.toLowerCase();
        if (!domain) return false;

        // Vérifier le cache
        const cached = mxCache.get(domain);
        if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
            return cached.valid;
        }

        // DNS Lookup avec Timeout de 3s
        // On utilise Promise.race pour implémenter le timeout
        const records = await Promise.race([
            dns.resolveMx(domain),
            new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error("timeout")), 3000),
            ),
        ]);

        const valid = Array.isArray(records) && records.length > 0;

        // Mise en cache du résultat
        mxCache.set(domain, { valid, cachedAt: Date.now() });

        return valid;
    } catch (err) {
        // En cas de timeout ou d'erreur DNS (ex: NXDOMAIN), on "fail open"
        // pour ne pas bloquer l'utilisateur si le DNS est temporairement indisponible.
        // On log tout de même un warning pour le monitoring.
        console.warn(`[MX Check] Failed for email: ${email}`, err);
        return true;
    }
}
