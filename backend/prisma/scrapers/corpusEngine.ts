import { ScrapedArticle } from './articleScraper';

export class CorpusEngine {
    private text: string = "";
    private words: string[] = [];
    private names: string[] = [];
    private sentences: string[] = [];
    
    constructor(articles: ScrapedArticle[]) {
        this.text = articles.map(a => `${a.title}. ${a.content.replace(/<[^>]+>/g, ' ')}`).join(" ");
        this.sentences = this.text
            .split(/[.!?:;]+/)
            .map(s => s.trim().replace(/^\\s*[-–—»«"']+\\s*/g, ''))
            .filter(s => s.length > 30 && s.length < 300);
        
        // Extract potential names: Words starting with a capital letter
        const allWords = this.text.split(/\\s+/);
        this.words = allWords.map(w => w.replace(/[^a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\\-]/g, ''));
        
        const capitals = this.words.filter(w => /^[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ][a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]+$/.test(w) && w.length > 3);
        
        // Stop words corresponding to usual French capitalizations at beginning of sentences
        const stopWords = new Set(["Le", "La", "Les", "Un", "Une", "Des", "Pour", "Dans", "Afin", "Mais", "Ou", "Et", "Donc", "Or", "Ni", "Car", "Nous", "Vous", "Ils", "Elles", "Il", "Elle", "Ce", "Cette", "Ces", "Cet", "Sur", "Sous", "Vers", "Avec", "Sans", "Son", "Sa", "Ses", "Leur", "Leurs", "Notre", "Votre", "Que", "Qui", "Quoi", "Dont", "Où", "Quand", "Comment", "Pourquoi", "Par", "Au", "Aux", "Du"]);
        
        this.names = Array.from(new Set(capitals.filter(w => !stopWords.has(w))));
        
        // Fallback names if corpus isn't large enough
        if (this.names.length < 20) {
            this.names = [...this.names, "Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent", "Simon", "Michel", "Lefevre", "Dupont", "Roux", "Vincent", "Fournier", "Morel", "Girard", "Andre"];
        }
    }
    
    getFirstName(): string {
        if (this.names.length === 0) return "Jean";
        return this.names[Math.floor(Math.random() * this.names.length)];
    }

    getLastName(): string {
        if (this.names.length === 0) return "Anonyme";
        return this.names[Math.floor(Math.random() * this.names.length)];
    }
    
    getSentence(): string {
        if (this.sentences.length === 0) return "Contenu issu du corpus.";
        return this.sentences[Math.floor(Math.random() * this.sentences.length)] + '.';
    }

    getParagraph(lines: number = 3): string {
        let para = "";
        for (let i = 0; i < lines; i++) {
            para += this.getSentence() + " ";
        }
        return para.trim();
    }
}
