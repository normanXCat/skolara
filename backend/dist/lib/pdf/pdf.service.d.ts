export declare class PdfService {
    private static instance;
    private playwrightAvailable;
    private _browser;
    private constructor();
    static getInstance(): PdfService;
    /**
     * Vérifie si playwright-chromium est disponible.
     */
    private checkDriver;
    /**
     * Retourne ou initialise l'instance partagée du navigateur.
     */
    private getBrowser;
    /**
     * Génère un buffer PDF à partir de HTML.
     */
    generateFromHtml(html: string, options?: Record<string, any>): Promise<Buffer>;
    saveToFile(buffer: Buffer, filePath: string): Promise<string>;
}
declare const _default: PdfService;
export default _default;
//# sourceMappingURL=pdf.service.d.ts.map