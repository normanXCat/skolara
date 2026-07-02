import { PrismaClient } from '../../src/generated/prisma/index.js';
import { scrapeArticles } from '../scrapers/articleScraper.js';

// Custom role casting may be necessary if using string mapping instead of the literal Enum 
type ArticleStatusEnum = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export async function seedArticles(prisma: PrismaClient, adminUserId: number) {
    console.log("🌱 Début du seeder d'articles (avec scraper)...");
    
    const articles = await scrapeArticles();
    if (articles.length === 0) {
        console.warn("⚠️ Aucun article scrappé. (Vérifiez les sélecteurs ou la connexion)");
        return;
    }
    
    let addedCount = 0;
    
    for (const article of articles) {
        const existing = await prisma.article.findFirst({
            where: { title: article.title }
        });
        
        if (!existing) {
            await prisma.article.create({
                data: {
                    title: article.title,
                    content: article.content,
                    imageUrl: article.imageUrl,
                    publishedAt: article.publishedAt,
                    status: "PUBLISHED" as ArticleStatusEnum,
                    category: article.category,
                    authorId: adminUserId,
                }
            });
            addedCount++;
        } else {
            await prisma.article.update({
                where: { id: existing.id },
                data: {
                    content: article.content,
                    imageUrl: article.imageUrl,
                    publishedAt: article.publishedAt,
                    category: article.category,
                }
            });
            addedCount++;
        }
    }
    
    console.log(`✅ Articles mis à jour : ${addedCount} articles insérés ou mis à jour sur ${articles.length} récupérés.`);
}
