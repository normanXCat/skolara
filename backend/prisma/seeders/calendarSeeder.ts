import { PrismaClient } from '../../src/generated/prisma/index.js';
import { scrapeCalendar } from '../scrapers/calendarScraper.js';

export async function seedCalendar(prisma: PrismaClient) {
    console.log("🌱 Début du seeder de calendrier (avec scraper)...");
    
    const events = await scrapeCalendar();
    if (events.length === 0) {
        console.warn("⚠️ Aucun événement scrappé. (Vérifiez les sélecteurs ou la connexion)");
        return;
    }
    
    let addedCount = 0;
    
    for (const event of events) {
        const existing = await prisma.calendarEvent.findFirst({
            where: { 
                title: event.title,
                startDate: event.startDate 
            }
        });
        
        if (!existing) {
            await prisma.calendarEvent.create({
                data: {
                    title: event.title,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    eventType: event.eventType,
                    isPublic: true,
                }
            });
            addedCount++;
        }
    }
    
    console.log(`✅ Événements mis à jour : ${addedCount} nouveaux insérés sur ${events.length} récupérés.`);
}
