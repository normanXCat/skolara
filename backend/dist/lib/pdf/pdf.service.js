"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
/**
 * PdfService — Génération de PDF à partir de HTML.
 *
 * Utilise 'playwright-chromium'. Cette version utilise un singleton de navigateur
 * pour éviter de lancer une nouvelle instance à chaque PDF (plus performant et robuste).
 */
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class PdfService {
    constructor() {
        this.playwrightAvailable = null;
        this._browser = null;
    }
    static getInstance() {
        if (!PdfService.instance) {
            PdfService.instance = new PdfService();
        }
        return PdfService.instance;
    }
    /**
     * Vérifie si playwright-chromium est disponible.
     */
    async checkDriver() {
        if (this.playwrightAvailable !== null)
            return this.playwrightAvailable;
        try {
            // @ts-ignore
            await Promise.resolve().then(() => __importStar(require("playwright-chromium")));
            this.playwrightAvailable = true;
        }
        catch {
            this.playwrightAvailable = false;
            console.warn("[PdfService] playwright-chromium non installé – les documents seront servis en HTML.");
        }
        return this.playwrightAvailable;
    }
    /**
     * Retourne ou initialise l'instance partagée du navigateur.
     */
    async getBrowser() {
        if (this._browser)
            return this._browser;
        const { chromium } = await Promise.resolve().then(() => __importStar(require("playwright-chromium")));
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
    async generateFromHtml(html, options = {}) {
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
        }
        catch (error) {
            console.error("[PdfService] Erreur lors de la génération PDF:", error);
            // Si le navigateur a planté, on le reset pour la prochaine fois
            this._browser = null;
            return Buffer.from(html, "utf-8");
        }
        finally {
            if (page)
                await page.close();
        }
    }
    async saveToFile(buffer, filePath) {
        const dir = path_1.default.dirname(filePath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        fs_1.default.writeFileSync(filePath, buffer);
        return filePath;
    }
}
exports.PdfService = PdfService;
exports.default = PdfService.getInstance();
//# sourceMappingURL=pdf.service.js.map