import newsIndex from "@/src/data/news/news-index.json";

// Only the lightweight index is imported here so the landing page bundle never pulls
// in news-articles.json, which the full static repository needs.
export type NewsHighlight = (typeof newsIndex)[number];

const highlightItems = newsIndex as NewsHighlight[];

export function getNewsHighlights(limit = 6) {
  return highlightItems.slice(0, limit);
}

export function getAvailableNewsCategories() {
  const counts = new Map<string, number>();
  for (const item of highlightItems) {
    if (!item.category) continue;
    counts.set(item.category, (counts.get(item.category) || 0) + 1);
  }
  return counts;
}
