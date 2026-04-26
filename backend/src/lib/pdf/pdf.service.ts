/**
 * PdfService — Génération de PDF à partir de HTML.
 *
 * Utilise 'playwright-chromium'. Cette version utilise un singleton de navigateur
 * pour éviter de lancer une nouvelle instance à chaque PDF (plus performant et robuste).
 */
import path from "path";
import fs from "fs";

export class PdfService {
  private static instance: PdfService;
  private playwrightAvailable: boolean | null = null;
  private _browser: any = null;

  private constructor() {}

  public static getInstance(): PdfService {
    if (!PdfService.instance) {
      PdfService.instance = new PdfService();
    }
    return PdfService.instance;
  }

  /**
   * Vérifie si playwright-chromium est disponible.
   */
  private async checkDriver(): Promise<boolean> {
    if (this.playwrightAvailable !== null) return this.playwrightAvailable;
    try {
      // @ts-ignore
      await import("playwright-chromium");
      this.playwrightAvailable = true;
    } catch {
      this.playwrightAvailable = false;
      console.warn(
        "[PdfService] playwright-chromium non installé – les documents seront servis en HTML."
      );
    }
    return this.playwrightAvailable;
  }

  /**
   * Retourne ou initialise l'instance partagée du navigateur.
   */
  private async getBrowser() {
    if (this._browser) return this._browser;
    
    const { chromium } = await import("playwright-chromium");
    this._browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    
    // Fermeture propre au cas où
    process.on("exit", () => this._browser?.close());
    
    return this._browser;
  }

  /**
   * Génère un buffer PDF à partir de HTML.
   */
  async generateFromHtml(html: string, options: Record<string, any> = {}): Promise<Buffer> {
    const isReady = await this.checkDriver();

    if (!isReady) {
      return Buffer.from(html, "utf-8");
    }

    let page;
    try {
      const browser = await this.getBrowser();
      // On utilise une nouvelle page dans le navigateur partagé
      page = await browser.newPage();
      
      await page.setContent(html, { waitUntil: "networkidle" });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20px",
          bottom: "20px",
          left: "20px",
          right: "20px",
        },
        ...options,
      });

      return Buffer.from(pdfBuffer);
    } catch (error) {
      console.error("[PdfService] Erreur lors de la génération PDF:", error);
      // Si le navigateur a planté, on le reset pour la prochaine fois
      this._browser = null;
      return Buffer.from(html, "utf-8");
    } finally {
      if (page) await page.close();
    }
  }

  async saveToFile(buffer: Buffer, filePath: string): Promise<string> {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }
}

export default PdfService.getInstance();
