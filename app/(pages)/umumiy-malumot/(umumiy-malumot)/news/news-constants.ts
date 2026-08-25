/** @format */

/**
 * Server va client variantlari uchun umumiy konstantalar.
 *
 * Alohida faylda: `"use client"` modulidan eksport qilingan qiymat server
 * komponentga client-reference proksi sifatida yetib boradi, haqiqiy massiv
 * emas — `POPULAR_CATEGORIES.map is not a function` xatosi aynan shundan.
 */

/** Bir sahifada ko'rsatiladigan yangiliklar soni. */
export const PAGE_SIZE = 9;

/** Yon panelda tez o'tish uchun chiqariladigan kategoriyalar. */
export const POPULAR_CATEGORIES = ["Forumlar", "Hamkorlik", "Sun’iy intellekt"] as const;
