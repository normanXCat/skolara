import { scrapeArticles } from './articleScraper.js';
import { scrapeCalendar } from './calendarScraper.js';

async function debug() {
    console.log("🐛 Lancement du debug des scrapers en mode standalone...");
    
    try {
        console.log("------------------------------------------");
        const articles = await scrapeArticles();
        console.log(`✅ Articles trouvés : ${articles.length}`);
        if(articles.length > 0) {
            console.log("👉 Premier article (sample):", articles[0]);
        }
        
        console.log("------------------------------------------");
        const events = await scrapeCalendar();
        console.log(`✅ Événements trouvés : ${events.length}`);
        if(events.length > 0) {
            console.log("👉 Premier événement (sample):", events[0]);
        }
    } catch (e) {
        console.error("Erreur globale lors du debug :", e);
    }
    
    console.log("🐛 Debug terminé !");
}

debug().catch(console.error);
