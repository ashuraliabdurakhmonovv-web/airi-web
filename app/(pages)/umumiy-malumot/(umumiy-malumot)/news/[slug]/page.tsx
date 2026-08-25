import NewsDetailClient from "./news-detail-client";
import { notFound } from "next/navigation";
import { getStaticNewsBySlug, getStaticRelatedNews, getAllStaticNews } from "@/lib/news/static-news-repository";

export function generateStaticParams() {
  return getAllStaticNews().map((article) => ({ slug: article.slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getStaticNewsBySlug(slug);
  if (!article) notFound();
  return <NewsDetailClient article={article} related={getStaticRelatedNews(article, 3)} />;
}
