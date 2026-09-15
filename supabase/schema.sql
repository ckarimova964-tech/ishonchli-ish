-- Ishonchli Ish — firibgarlik xabarlari uchun baza sxemasi.
-- Supabase → SQL Editor'da shu faylni to'liq nusxalab «Run» qiling.
--
-- Xavfsizlik mantiqi:
--   * anon (sayt mehmoni) faqat YANGI xabar QO'SHA oladi, o'qiy olmaydi;
--   * yangi yozuv har doim status = 'pending' bo'lib tushadi;
--   * saytda faqat `public_reports` ko'rinishidagi TASDIQLANGAN yozuvlar chiqadi;
--   * aloqa ma'lumoti (contact) hech qachon saytga chiqmaydi — u ko'rinishga kiritilmagan.

create table if not exists public.reports (
  id           bigint generated always as identity primary key,
  who          text not null check (char_length(who) between 2 and 160),
  place        text check (char_length(place) <= 160),
  story        text not null check (char_length(story) between 20 and 2000),
  loss_uzs     integer not null default 0 check (loss_uzs >= 0 and loss_uzs <= 100000000),
  evidence     text not null check (char_length(evidence) between 3 and 300),
  author       text default 'Anonim' check (char_length(author) <= 80),
  contact      text check (char_length(contact) <= 120),
  status       text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  moderator_note text,
  created_at   timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists reports_status_idx on public.reports (status, published_at desc);

-- `published_at` moderator tasdiqlaganda avtomatik qo'yiladi
create or replace function public.set_published_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.status = 'approved' and (old.status is distinct from 'approved') then
    new.published_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists reports_set_published_at on public.reports;
create trigger reports_set_published_at
  before update on public.reports
  for each row execute function public.set_published_at();

-- ---------- RLS ----------
alter table public.reports enable row level security;

-- Mehmon faqat qo'sha oladi va faqat 'pending' holatida
drop policy if exists "anon can insert pending" on public.reports;
create policy "anon can insert pending"
  on public.reports for insert
  to anon
  with check (status = 'pending' and published_at is null);

-- O'qish, tahrirlash, o'chirish siyosati yo'q => anon uchun butunlay yopiq.
-- Moderatsiya Supabase paneli (Table Editor) yoki service_role kaliti orqali bo'ladi.

-- ---------- Saytga chiqadigan ko'rinish ----------
drop view if exists public.public_reports;
create view public.public_reports with (security_invoker = true) as
  select id, who, place, story, loss_uzs, evidence, author, published_at
  from public.reports
  where status = 'approved'
  order by published_at desc;

grant select on public.public_reports to anon;


-- =====================================================================
-- MUHOKAMA: foydalanuvchilar sayt haqida fikr, savol va taklif yozadi
-- =====================================================================
-- Xavfsizlik mantiqi:
--   * xabar darhol chiqadi (kutish yo'q), lekin baza o'zi firibgarlik belgilarini rad etadi:
--     havola, telefon raqami va @telegram_nomi yozib bo'lmaydi — «vizaga yordam beraman,
--     yozing» degan vositachilar muhokamani reklama joyiga aylantira olmasin;
--   * javoblar faqat bir daraja (xabar → javob);
--   * sayt egasi xabarni Supabase panelida `hidden = true` qilib yashiradi;
--   * mehmon faqat qo'sha oladi; o'qish faqat `public_discussion` ko'rinishi orqali.

create table if not exists public.discussion (
  id         bigint generated always as identity primary key,
  parent_id  bigint references public.discussion (id) on delete cascade,
  topic      text not null default 'fikr' check (topic in ('fikr', 'savol', 'taklif', 'tajriba')),
  author     text not null default 'Mehmon' check (char_length(author) between 1 and 60),
  message    text not null check (char_length(message) between 3 and 1500),
  hidden     boolean not null default false,
  created_at timestamptz not null default now(),
  -- firibgarlikka qarshi: havola, telefon raqami (9+ raqam), @nom.
  -- Maosh kabi sonlar («15 000 000 so'm» — 8 raqam) o'tadi. \y — PostgreSQL'da so'z chegarasi.
  constraint discussion_no_contacts check (
    message !~* '(https?://|www\.|t\.me/|[a-z0-9-]+\.(uz|ru|com|net|org|me)\y|@[a-z0-9_]{4,}|([0-9][ ()-]*){9,})'
    and author !~* '(https?://|www\.|t\.me/|@[a-z0-9_]{4,}|([0-9][ ()-]*){6,})'
  )
);

create index if not exists discussion_created_idx on public.discussion (created_at desc);
create index if not exists discussion_parent_idx on public.discussion (parent_id);

-- Javobga javob bo'lmasin (faqat bir daraja)
create or replace function public.discussion_one_level()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.parent_id is not null and exists (
    select 1 from public.discussion d where d.id = new.parent_id and d.parent_id is not null
  ) then
    raise exception 'Faqat asosiy xabarga javob yozish mumkin';
  end if;
  return new;
end;
$$;

drop trigger if exists discussion_one_level on public.discussion;
create trigger discussion_one_level
  before insert on public.discussion
  for each row execute function public.discussion_one_level();

alter table public.discussion enable row level security;

drop policy if exists "anon can post" on public.discussion;
create policy "anon can post"
  on public.discussion for insert
  to anon
  with check (hidden = false);

drop view if exists public.public_discussion;
create view public.public_discussion with (security_invoker = true) as
  select id, parent_id, topic, author, message, created_at
  from public.discussion
  where hidden = false
  order by created_at desc;

grant select on public.public_discussion to anon;


-- =====================================================================
-- RUXSATLAR (loyiha «Automatically expose new tables» o'chirilgan holda yaratilgan)
-- =====================================================================
-- Jadvallar Data API'ga avtomatik ochilmaydi, shuning uchun mehmonga faqat kerakli
-- minimal huquqni aniq beramiz: jadvalga faqat QO'SHISH, o'qish faqat ko'rinish orqali.
-- RLS siyosatlari (yuqorida) qaysi qatorni qo'shish mumkinligini baribir cheklaydi.
grant usage on schema public to anon;
revoke all on public.reports from anon;
revoke all on public.discussion from anon;
grant insert (who, place, story, loss_uzs, evidence, author, contact) on public.reports to anon;
grant insert (parent_id, topic, author, message) on public.discussion to anon;

-- Ko'rinishlar security_invoker = true: so'rov mehmonning o'z huquqi bilan bajariladi
-- (Supabase Advisor «Security Definer View» ogohlantirishi). Shuning uchun o'qish ham
-- RLS siyosati va ustun darajasidagi ruxsat bilan cheklanadi: telefon (contact) va
-- moderator izohi hech qachon o'qilmaydi, faqat tasdiqlangan / yashirilmagan qatorlar.
drop policy if exists "anon can read approved" on public.reports;
create policy "anon can read approved"
  on public.reports for select
  to anon
  using (status = 'approved');

drop policy if exists "anon can read visible" on public.discussion;
create policy "anon can read visible"
  on public.discussion for select
  to anon
  using (hidden = false);

grant select (id, who, place, story, loss_uzs, evidence, author, published_at, status) on public.reports to anon;
grant select (id, parent_id, topic, author, message, created_at, hidden) on public.discussion to anon;
grant select on public.public_reports to anon;
grant select on public.public_discussion to anon;


-- «Enable automatic RLS» yoqilgan loyihalarda Supabase yaratadigan funksiyani
-- internetdan (anon / authenticated) chaqirib bo'lmasin
do $$
begin
  if exists (select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
             where n.nspname = 'public' and p.proname = 'rls_auto_enable') then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end;
$$;
