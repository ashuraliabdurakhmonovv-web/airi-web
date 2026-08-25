<!-- @format -->

# Eski sayt URL'lari va Google indeksi

## Muammo

Qidiruvda `airi.uz/uz/institute/`, `old.airi.uz/ru/institute/` kabi eski
manzillar chiqib turardi. Uchta alohida sabab bor edi:

| # | Sabab | Isbot (migratsiyadan oldin) |
|---|-------|------------------------------|
| 1 | **Soft 404** — mavjud bo'lmagan URL `200 OK` qaytarardi | `curl -I https://airi.uz/uz/institute/` → `200` |
| 2 | **Eski URL'lar hech qayerga yo'naltirilmagan** | `.htaccess` da bitta ham `R=301` yo'q edi |
| 3 | **`www` dublikati** | `https://www.airi.uz/` → `200`, apex'ga 301 qilmasdi |

1-sabab eng muhimi: `.htaccess` dagi `RewriteRule ^ /404.html [L]` **ichki
rewrite** edi (`[R]` yo'q), shuning uchun Apache 404 sahifasini `200 OK`
statusi bilan berardi. Google `200` qaytargan URL'ni indeksdan hech qachon
olib tashlamaydi — shuning uchun eski manzillar "tirik sahifa" bo'lib
turaverdi. Eski domenda 410 (`[G]`) qo'yish bu muammoga ta'sir qilmasdi,
chunki muammo `airi.uz` ning o'zida edi.

## Nima o'zgardi

| Fayl | O'zgarish |
|------|-----------|
| `public/.htaccess` | Soft 404 olib tashlandi (endi haqiqiy 404), `www`→apex 301, trailing-slash 301, `legacy-map` bloki: eski manzillar → yangi sahifalar |
| `scripts/generate-legacy-redirects.mjs` | Yangi. Build'da 108 ta eski yangilik URL'i uchun 301 yasaydi va `deploy/old.airi.uz/.htaccess` ni generatsiya qiladi |
| `package.json` | `build` skriptiga yuqoridagi generator qo'shildi |
| `deploy/old.airi.uz/.htaccess` | Yangi (generatsiya qilinadi). Eski domenlar uchun tayyor fayl |
| `app/_components/seo/organization-jsonld.tsx` | Yangi. Institutning ruscha/inglizcha rasmiy nomlari `alternateName` sifatida |
| `app/layout.tsx` | JSON-LD ulandi, `openGraph.alternateLocale` qo'shildi |

**Moslikni faqat bitta joyda tahrirlang:** `public/.htaccess` dagi
`# BEGIN legacy-map` / `# END legacy-map` orasida. `deploy/old.airi.uz/.htaccess`
o'sha bloklardan avtomatik yasaladi.

## Deploy

### 1. `airi.uz`

```bash
cd web-airi
npm run build
```

`out/` ichidagi hammasini (`.htaccess` bilan birga — yashirin fayl,
FTP mijozida "show hidden files" yoqilgan bo'lsin) `public_html/` ga ko'chiring.

### 2. `old.airi.uz` va `old2.airi.uz`

`deploy/old.airi.uz/.htaccess` faylini har bir eski domenning `public_html/`
papkasiga `.htaccess` nomi bilan yuklang. O'sha papkada boshqa hech narsa
kerak emas.

> **Eski domenda qilmaslik kerak bo'lgan narsalar:**
> - 410 Gone (`[G]`) — Googlebot 301'ni ko'rmaydi, reyting vazni o'tmaydi
> - `robots.txt` da `Disallow: /` — Googlebot 301'ni o'qiy olmaydi, natijada
>   eski manzil indeksda **abadiy** qolib ketadi
> - DNS'ni butunlay o'chirish — 301'ni ko'rsatadigan hech kim qolmaydi
>
> Eski domenlar kamida **6–12 oy** 301 qaytarib turishi kerak.

## Deploydan keyingi tekshiruv

```bash
# 1. Eski manzillar MOS sahifaga 301 qiladimi
curl -sI https://airi.uz/uz/institute/    | grep -iE '^HTTP|^location'
curl -sI https://airi.uz/ru/institute/    | grep -iE '^HTTP|^location'
curl -sI https://old.airi.uz/ru/institute/| grep -iE '^HTTP|^location'
# kutilgan: 301 -> https://airi.uz/umumiy-malumot/institute-abouttheinstitute/

# 2. Eski yangilik URL'i
curl -sI https://airi.uz/news/35488ec1-644a-4fd4-bf80-8fb16aa177b4-protection | grep -iE '^HTTP|^location'
# kutilgan: 301 -> /umumiy-malumot/news/35488ec1-...-protection/

# 3. www dublikati yo'qoldimi
curl -sI https://www.airi.uz/ | grep -iE '^HTTP|^location'
# kutilgan: 301 -> https://airi.uz/

# 4. ENG MUHIMI — mavjud bo'lmagan sahifa HAQIQIY 404 beradimi
curl -sI https://airi.uz/bunday-sahifa-yoq/ | grep -iE '^HTTP'
# kutilgan: 404  (200 bo'lsa — soft 404 qaytib kelgan, .htaccess tekshiring)

# 5. Yangi sahifalar 200 qaytaradimi (redirect zanjiriga tushmaganmi)
curl -sI https://airi.uz/umumiy-malumot/institute-abouttheinstitute/ | grep -iE '^HTTP'
# kutilgan: 200
```

## Google Search Console

Redirectlar o'z-o'zidan ishlaydi, lekin Google qayta indekslashini
tezlashtirish uchun:

1. **`old.airi.uz` va `old2.airi.uz` uchun "Removals" so'rovlarini BEKOR
   QILING** (agar qo'yilgan bo'lsa). Removal Googlebot'ga sahifani
   ko'rsatmaydi — u holda 301 ham o'qilmaydi. Removal 301 dan sekinroq
   ishlaydi va vaqtinchalik (6 oy).
2. **Sitemap'ni yuboring:** `https://airi.uz/sitemap.xml` (214 ta sahifa).
3. **URL Inspection → Request indexing** — eng muhim 10 ta sahifa uchun
   qo'lda so'rov yuboring: bosh sahifa, `institute-abouttheinstitute`,
   `institute-instituteteam`, `institute-structureofinstitute`, `history`,
   `news`, `ilmiy-tadqiqot`, `research-laboratories`, `boglanish`.
4. **Eski manzilni tekshiring:** URL Inspection'ga `https://airi.uz/uz/institute/`
   ni kiriting → "Page changed? Request indexing". Google 301'ni ko'rgach
   eski URL'ni indeksdan chiqaradi.
5. **`old.airi.uz` uchun alohida property oching** (agar yo'q bo'lsa) va
   Settings → **Change of Address** → yangi sayt sifatida `airi.uz` ni
   ko'rsating. Bu eng kuchli signal.
6. **Indexing → Pages** hisobotini 2 haftada bir kuzating: "Not found (404)"
   va "Page with redirect" sonlari o'sib, "Duplicate" kamayishi kerak.

### Qancha vaqt ketadi

- 301'lar **darhol** ishlaydi (foydalanuvchi eski linkni bossa yangi sahifa ochiladi)
- Google natijalarida eski manzil o'rniga yangisi chiqishi: **2–8 hafta**
- To'liq indeks almashinuvi: **3–6 oy**

Sabr qilish kerak — `Request indexing` va `Change of Address` dan boshqa
tezlashtirish usuli yo'q.

## Ochiq qolgan masalalar

1. **Ruscha va inglizcha kontent indekslanmaydi.** Til `localStorage` orqali
   almashadi, URL'da `/ru/` yo'q — shuning uchun Google faqat o'zbekcha
   variantni ko'radi. JSON-LD `alternateName` brend so'rovlarida yordam
   beradi, lekin "нии искусственного интеллекта" kabi umumiy ruscha
   so'rovlarda barqaror o'rin egallash uchun `/ru/...` va `/en/...` URL'lari
   + `hreflang` kerak. Bu 51 ta route va butun i18n qatlamiga tegadigan
   alohida ish — `docs/seo/01-seo-audit.md` §8 ga qarang.
2. **Yangilik slug'larida eski UUID qolgan** (110 tadan 108 tasi
   `7bb24809-034c-...-an-event-dedicated-to...` shaklida). URL'lar uzun,
   inglizcha va o'qilmaydi. Toza o'zbekcha slug'larga o'tilsa, o'sha paytda
   yana bir qavat 301 kerak bo'ladi.
3. **`/umumiy-malumot/news/` sahifasi client-side render qilinadi** —
   statik HTML'da 110 ta maqolaga bitta ham havola yo'q. Maqolalar faqat
   `sitemap.xml` orqali topiladi. `docs/seo/01-seo-audit.md` §9.1.
