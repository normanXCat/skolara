interface BaseTemplateOptions {
    title: string;
    content: string;
    preheader?: string;
}
/**
 * Template de base pour tous les emails de Skolara.
 * Assure une cohérence visuelle et une compatibilité maximale avec les clients mail.
 */
export declare function getBaseTemplate({ title, content, preheader }: BaseTemplateOptions): string;
export {};
//# sourceMappingURL=base.d.ts.map