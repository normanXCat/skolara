import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

async function testScrape() {
    const browser = await chromium.launch({ headless: true });
    
    try {
        console.log('Testing actualites...');
        const page = await browser.newPage();
        await page.goto("https://www.education.gouv.fr/actualites", { waitUntil: 'networkidle' });
        const html = await page.content();
        const $ = cheerio.load(html);
        
        console.log("fr-card count:", $('.fr-card').length);
        console.log("article count:", $('article').length);
        console.log("views-row count:", $('.views-row').length);
        
        console.log('Testing calendrier-scolaire...');
        await page.goto("https://www.education.gouv.fr/calendrier-scolaire", { waitUntil: 'networkidle' });
        const html2 = await page.content();
        const $2 = cheerio.load(html2);
        
        console.log("fr-table count:", $2('.fr-table').length);
        console.log("table count:", $2('table').length);
    } finally {
        await browser.close();
    }
}
testScrape().catch(console.error);
