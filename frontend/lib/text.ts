/**
 * Tronque une chaîne de caractères à un nombre spécifié de mots.
 *
 * @param text - Le texte à tronquer.
 * @param maxWords - Le nombre maximum de mots à conserver.
 * @returns Le texte tronqué suivi de "..." si nécessaire.
 */
export function truncateWords(text: string, maxWords: number): string {
    const words = text.split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
}
