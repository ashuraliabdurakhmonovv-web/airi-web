import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import type { NewsQueryParams } from "@/types/api";
import { getStaticNewsBySlug, getStaticNewsPage, getStaticRelatedNews } from "@/lib/news/static-news-repository";

/**
 * Yangiliklar ro'yxati.
 *
 * `initialData` ataylab berilgan: ma'lumot `src/data/news/` dagi lokal JSON'da
 * va `getStaticNewsPage` SINXRON ishlaydi — tarmoq so'rovi yo'q. Usiz
 * react-query birinchi renderda `isLoading: true` qaytarardi va statik
 * eksportda `/umumiy-malumot/news/` sahifasi HTML'ga bitta ham maqola
 * chiqarmasdi (faqat skeleton). Natijada Google indekslaydigan kontent yo'q edi.
 *
 * `initialData` funksiya sifatida berilgan, chunki u `params` ga bog'liq:
 * kategoriya yoki sahifa o'zgarsa, kalit ham, boshlang'ich ma'lumot ham
 * o'sha filtrga mos bo'ladi.
 */
export const useNews = (params?: NewsQueryParams) => {
  return useQuery({
    queryKey: queryKeys.news.list(params),
    queryFn: async () => getStaticNewsPage(params),
    initialData: () => getStaticNewsPage(params),
  });
};

export const useNewsById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.news.detail(id),
    queryFn: async () => getStaticNewsBySlug(id),
    enabled: !!id,
  });
};

export const useRelatedNews = (identifier: string, limit = 3) => {
  return useQuery({
    queryKey: ["news", "related", identifier, limit],
    queryFn: async () => {
      const article = getStaticNewsBySlug(identifier);
      return article ? getStaticRelatedNews(article, limit) : [];
    },
    enabled: !!identifier,
  });
};
