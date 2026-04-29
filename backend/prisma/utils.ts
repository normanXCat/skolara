import * as cheerio from 'cheerio';

const months: Record<string, number> = {
  janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11
};

export function parseDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  
  // Try to parse "15 janvier 2026"
  const parts = dateStr.trim().toLowerCase().split(/\s+/);
  if (parts.length >= 3) {
    let day = parseInt(parts[0], 10);
    // Handle "1er"
    if (isNaN(day) && parts[0].startsWith('1')) day = 1;

    const monthName = parts[1].replace('fevrier', 'février').replace('aout', 'août');
    const month = months[monthName];
    const year = parseInt(parts[2], 10);

    if (month !== undefined && !isNaN(day) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return null;
}

export function cleanHtml(rawHtml: string | undefined | null): string {
  if (!rawHtml) return "";
  const $ = cheerio.load(rawHtml, null, false);
  $('script, iframe, style, noscript, ads, object, embed, .social-share').remove();
  
  return $.html();
}

export function resolveUrl(baseUrl: string, relativeUrl: string | undefined): string | null {
    if (!relativeUrl) return null;
    if (relativeUrl.startsWith('http')) return relativeUrl;
    try {
        return new URL(relativeUrl, baseUrl).href;
    } catch {
        return relativeUrl;
    }
}
