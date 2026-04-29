import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import { parseDate } from '../utils';

export async function scrapeCalendar(): Promise<ScrapedEvent[]> {
    const targetUrl = process.env.SCRAPE_EVENTS_URL || "https://www.education.gouv.fr/calendrier-scolaire";
    
    console.log(`Scraping événements sur ${targetUrl}...`);
    const events: ScrapedEvent[] = [];
    
    if (process.env.NODE_ENV !== 'production' && process.env.SKIP_SCRAPE !== 'true') {
        const browser = await chromium.launch({ headless: true }).catch(e => {
            console.error("Failed to launch chromium:", e);
            return null;
        });
        
        if (browser) {
            try {
                const context = await browser.newContext({
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                });
                const page = await context.newPage();
                
                await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 15000 }).catch(e => console.warn("Timeout on page.goto", e.message));
                
                const html = await page.content();
                const $ = cheerio.load(html);
                
                const calendarTable = $('.calendar-table, table.vacances').first();
                if (!calendarTable.length) {
                    console.warn("Sélecteur '.calendar-table' introuvable. Cloudflare block détecté ? Utilisation du fallback.");
                } else {
                    const rows = calendarTable.find('tr').toArray();
                    for (const row of rows) {
                        try {
                            const cells = $(row).find('td').toArray();
                            if (cells.length >= 2) {
                                const titleText = $(cells[0]).text().trim();
                                const datesText = $(cells[1]).text().trim(); 
                                
                                if (titleText && datesText) {
                                    const cleanDates = datesText.toLowerCase().replace('du', '').split('au');
                                    let startDate = parseDate(cleanDates[0]) || new Date();
                                    let endDate = startDate;
                                    if (cleanDates.length > 1) {
                                        endDate = parseDate(cleanDates[1]) || startDate;
                                    }
                                    
                                    events.push({
                                        title: titleText,
                                        startDate,
                                        endDate,
                                        eventType: "holiday"
                                    });
                                }
                            }
                        } catch(e) {
                             console.error("Erreur lors de l'extraction d'un événement", e);
                        }
                    }
                }
            } catch(err) {
                 console.error("Erreur scrapeCalendar:", err);
            } finally {
                await browser.close();
            }
        }
    } else {
        console.log("Production environment detected. Skipping Playwright scraping.");
    }
    
    // FALLBACK IF SCRAPING FAILED OR BLOCKED BY CLOUDFLARE
    if (events.length === 0) {
        console.log("Injecting fallback calendar events (Année scolaire 2024-2025)...");
        events.push(
            { title: "Rentrée scolaire", startDate: new Date("2024-09-02"), endDate: new Date("2024-09-02"), eventType: "academic" },
            { title: "Vacances de la Toussaint", startDate: new Date("2024-10-19"), endDate: new Date("2024-11-04"), eventType: "holiday" },
            { title: "Vacances de Noël", startDate: new Date("2024-12-21"), endDate: new Date("2025-01-06"), eventType: "holiday" },
            { title: "Vacances d'Hiver", startDate: new Date("2025-02-15"), endDate: new Date("2025-03-03"), eventType: "holiday" },
            { title: "Vacances de Printemps", startDate: new Date("2025-04-12"), endDate: new Date("2025-04-28"), eventType: "holiday" },
            { title: "Vacances d'Été", startDate: new Date("2025-07-05"), endDate: new Date("2025-09-01"), eventType: "holiday" }
        );
    }
    
    return events;
}

export interface ScrapedEvent {
    title: string;
    startDate: Date;
    endDate: Date;
    eventType: string;
}
