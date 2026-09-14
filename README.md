# Ishonchli Ish

O‘zbekistondagi va xorijdagi **haqiqiy** ish o‘rinlari bitta qidiruvda: uchta rasmiy davlat
bazasi, ish beruvchi bilan to‘g‘ridan-to‘g‘ri aloqa, hujjat yo‘riqnomasi va firibgarlikdan
himoya bo‘limi.

Onlayn versiya (Artifact): https://claude.ai/code/artifact/5399deeb-e3d5-4434-8b4e-81e08bc33bcf

## Ishga tushirish

```bash
npm install
npm run dev
```

Ishlab chiqarish uchun: `npm run build` → `dist/` papkasi.

## Ma'lumot qayerdan keladi

Saytdagi e'lonlar **o‘ylab topilgan emas** — uchta ochiq rasmiy API'dan olinadi:

| Manba | API | Nima olinadi |
| --- | --- | --- |
| **Milliy vakansiyalar bazasi** — ish.mehnat.uz | `ishapi.mehnat.uz/api/v1/vacancies?search=…` | O‘zbekiston bo‘yicha 79 000+ e'lon: firma, lavozim, maosh, viloyat, **telefon**. 36 ta kasb bo‘yicha qidiruv, aniq viloyat va tuman. Jonli so‘raladi; 681 tasi zaxira nusxaga yig‘ilgan |
| **Migratsiya agentligi** — «Xorijda ish» | `lm-api.xorijdaish.uz/api/labour-migration/vacancies` | Rasmiy xorijiy vakansiyalar: ish beruvchi, maosh, o‘rin soni, yosh chegarasi, til talabi, ariza muddati. Sahifa ochilganda jonli yangilanadi |
| **«Работа России»** — RF Mehnat vazirligi | `opendata.trudvsem.ru/api/v1/vacancies?text=…` | telefoni yoki e-pochtasi ochiq, maoshi 55 000 rubldan yuqori 128 ta e'lon |

Har bir kartochka o‘z manbasiga havola qiladi — foydalanuvchi e'lonni birlamchi saytdan
tekshira oladi.

## Ma'lumot qanday yangilanadi

**1. Jonli — avtomatik, hech qanday sozlashsiz.** Sayt ochilganda Migratsiya agentligining
ro‘yxati va milliy bazadagi umumiy son to‘g‘ridan-to‘g‘ri API'dan olinadi. Foydalanuvchi
qidiruv yozganda (3 harfdan ko‘p) milliy baza jonli so‘raladi — ya'ni bazadagi **barcha**
79 000+ e'lon qidiruvga tushadi, faqat yig‘ilgan nusxa emas. Uchala API ham CORS'ga ruxsat
bergan va kalit talab qilmaydi (`src/lib/liveJobs.js`).

**2. Zaxira nusxa — kunlik.** `.github/workflows/update-data.yml` har kuni Toshkent vaqti bilan
06:00 da skriptlarni ishga tushiradi, o‘zgarish bo‘lsa commit qiladi va Netlify saytni qayta
yig‘adi. Bu nusxa internet sekin bo‘lganda yoki API javob bermay qolganda ko‘rinadi — sayt
hech qachon bo‘sh qolmaydi.

Qo‘lda yangilash:

```bash
node scripts/harvest-soato.mjs src/soato.json       # viloyat/tuman ma'lumotnomasi
node scripts/harvest-uz.mjs data/uz-raw.json        # xorijdaish.uz
node scripts/harvest-local.mjs data/local-raw.json  # ish.mehnat.uz (O'zbekiston)
node scripts/harvest-ru.mjs data/ru-raw.json        # trudvsem.ru
node scripts/prepare.mjs . src/vacancies.json       # uchalasini birlashtiradi
```

Sana avtomatik qo‘yiladi — hech narsani qo‘lda o‘zgartirish shart emas.

## Firibgarlik xabarlari (Supabase)

«Xabarlar» bo‘limi — foydalanuvchilar yozadigan, **moderatsiyadan o‘tgandan keyin** chiqadigan
ro‘yxat. Baza ulanmagan bo‘lsa, bo‘lim o‘zi rasmiy murojaat kanaliga yo‘naltiradi — sayt baribir
ishlaydi.

### Ulash (bir marta, ~10 daqiqa)

1. [supabase.com](https://supabase.com) da bepul loyiha oching.
2. **SQL Editor** → `supabase/schema.sql` faylini to‘liq nusxalab **Run** bosing.
3. **Project Settings → API** dan `Project URL` va `anon public` kalitini oling.
4. Loyiha ildizida `.env` fayl yarating (namuna: `.env.example`):

   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

5. `npm run dev` — forma ishlay boshlaydi. Netlify/Vercel'da xuddi shu ikki o‘zgaruvchini
   «Environment variables» bo‘limiga qo‘shing.

`anon` kalit ochiq bo‘lishi normal — himoya bazadagi RLS qoidalarida: mehmon faqat **yangi
xabar qo‘sha oladi**, hech narsani o‘qiy olmaydi va tahrirlay olmaydi.

### Moderatsiya

Supabase → **Table Editor → reports**. Har bir yangi qator `status = 'pending'` bo‘lib turadi:

- dalil ishonchli bo‘lsa → `status` ni `approved` ga o‘zgartiring (sana avtomatik qo‘yiladi,
  xabar saytda darhol chiqadi);
- shubhali bo‘lsa → `rejected`, kerak bo‘lsa `moderator_note` ga sababini yozing.

Saytga faqat `public_reports` ko‘rinishi chiqadi — unda `contact` va `moderator_note` ustunlari
umuman yo‘q, ya'ni xabar yozgan odamning telefoni hech qachon ochilmaydi.

**Huquqiy eslatma:** nomi ko‘rsatilgan ayblovni dalilsiz e'lon qilish tuhmat hisoblanadi.
Shuning uchun forma dalilni majburiy so‘raydi va hech bir xabar moderatorsiz chiqmaydi.

## Muhokama

«Muhokama» bo‘limi xuddi shu Supabase bazasi va kalitlar bilan ishlaydi. `supabase/schema.sql`
ni ishga tushirganingizda `discussion` jadvali ham yaratiladi — alohida sozlash shart emas.

- Xabar **darhol chiqadi**, javoblar bir daraja (xabar → javob).
- Baza o‘zi **havola, telefon raqami (9+ raqam) va @nom** yozilgan xabarlarni rad etadi — vizaga
  «yordam beradigan» vositachilar muhokamani reklama joyiga aylantira olmasin. Maosh kabi sonlar
  («15 000 000 so‘m») o‘tadi.
- Nomaqbul xabarni yashirish: Supabase → **Table Editor → discussion** → `hidden` ni `true` qiling.
  Xabarga yozilgan javoblar ham birga yashiriladi.

## Cheklov: Claude Artifact nusxasi

Artifact sahifasi tashqi so‘rov yuborishga ruxsat bermaydi, shuning uchun u yerda **jonli
qidiruv ham, xabar formasi ham ishlamaydi** — yig‘ilgan nusxa ko‘rinadi. To‘liq ishlashi uchun
saytni Netlify/Vercel yoki oddiy hostingga qo‘ying (`netlify.toml` tayyor).

## Fayllar

```
index.html                        — sahifa asosi, shriftlar (Newsreader / IBM Plex Sans / Mono)
src/App.jsx                       — umumiy tuzilma, jonli yangilanish, statistika, footer
src/vacancies.json                — ⚠️ skript hosil qiladi, qo'lda tahrirlamang
src/soato.json                    — 14 viloyat + 205 tuman/shahar rasmiy ro'yxati
src/sources.js                    — rasmiy kanallar, hujjat qadamlari, xavf belgilari
src/styles.css                    — dizayn tizimi: ranglar :root ichida, tungi rejim ham shunda
src/utils.js                      — sana va matn yordamchilari
src/lib/liveJobs.js               — jonli qidiruv va yangilanish (to'g'ridan-to'g'ri API)
src/lib/translit.js               — kirill → lotin o'girish
src/lib/reportsApi.js             — Supabase REST bilan aloqa
src/components/Topbar.jsx         — yuqori panel, ishonch telefoni 1282
src/components/Hero.jsx           — bosh ekran va raqamlar lentasi
src/components/Vacancies.jsx      — qidiruv, filtrlar, jonli natijalar
src/components/JobCard.jsx        — kartochkalar: O'zbekiston / agentlik / Rossiya
src/components/Reports.jsx        — firibgarlik xabarlari va forma
src/components/Channels.jsx       — rasmiy portallar katalogi
src/components/Guide.jsx          — hujjat qadamlari
src/components/Safety.jsx         — firibgarlik belgilari va litsenziya tekshiruvi
scripts/harvest-uz.mjs            — xorijdaish.uz dan yig'ish
scripts/harvest-local.mjs         — ish.mehnat.uz dan yig'ish
scripts/harvest-ru.mjs            — trudvsem.ru dan yig'ish
scripts/harvest-soato.mjs         — viloyat va tumanlar royxati
scripts/prepare.mjs               — uchalasini bitta JSON'ga birlashtiradi
supabase/schema.sql               — jadval, RLS qoidalari va public_reports ko'rinishi
.github/workflows/update-data.yml — kunlik avtomatik yangilanish
netlify.toml                      — Netlify uchun build sozlamasi
```

## Muhim eslatmalar

- Sayt davlat organi emas va hech kimdan pul olmaydi.
- Rossiya e'lonlari — umumiy bandlik bazasidan: e'lon haqiqiy, lekin ish beruvchi chet ellik
  ishchi oladimi, patent masalasi qanday — buni ish beruvchining o‘zidan aniqlash kerak.
- Vositachi haqidagi ayblovlar faqat moderatsiyadan keyin chiqadi. Foydalanuvchi litsenziyani
  rasmiy reyestrdan (`my.gov.uz/uz/reyestr`) o‘zi ham tekshira oladi.
