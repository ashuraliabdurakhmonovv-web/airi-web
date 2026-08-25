import newsIndex from "@/src/data/news/news-index.json";
import newsArticles from "@/src/data/news/news-articles.json";

export type StaticNewsIndexItem = (typeof newsIndex)[number];
export type StaticNewsArticle = (typeof newsArticles)[number];

const indexItems = newsIndex as StaticNewsIndexItem[];
const articleItems = newsArticles as StaticNewsArticle[];

export function getAllStaticNews() {
  return indexItems;
}

export function getStaticNewsBySlug(slug: string) {
  return articleItems.find((article) => article.slug === slug);
}

export function getStaticRelatedNews(article: StaticNewsArticle | StaticNewsIndexItem, limit = 3) {
  return [...indexItems]
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const sameCategory = Number(b.category === article.category) - Number(a.category === article.category);
      const featured = Number(b.isFeatured) - Number(a.isFeatured);
      const date = (b.publishedAt ? Date.parse(b.publishedAt) : 0) - (a.publishedAt ? Date.parse(a.publishedAt) : 0);
      return sameCategory || featured || date || a.sourceOrder - b.sourceOrder;
    })
    .slice(0, limit);
}

export function searchStaticNews(query: string) {
  const normalized = query.trim().toLocaleLowerCase("uz");
  if (!normalized) return indexItems;
  return indexItems.filter((item) => {
    const article = articleItems.find((candidate) => candidate.id === item.id);
    return `${item.title} ${item.description} ${article?.content || ""} ${item.category}`.toLocaleLowerCase("uz").includes(normalized);
  });
}

export function filterStaticNewsByCategory(category?: string) {
  return !category || category === "Barchasi" ? indexItems : indexItems.filter((item) => item.category === category);
}

export function getStaticFeaturedNews() {
  return indexItems.filter((item) => item.isFeatured);
}

export function getStaticNewsPage(params: { page?: number; limit?: number; category?: string; search?: string } = {}) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.max(1, params.limit || 20);
  let items = filterStaticNewsByCategory(params.category);
  if (params.search) items = searchStaticNews(params.search).filter((item) => !params.category || params.category === "Barchasi" || item.category === params.category);
  const total = items.length;
  return { data: items.slice((page - 1) * limit, page * limit), total, page, limit, totalPages: Math.ceil(total / limit) };
}
