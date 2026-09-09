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
returns trigger language plpgsql as $$
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
create view public.public_reports as
  select id, who, place, story, loss_uzs, evidence, author, published_at
  from public.reports
  where status = 'approved'
  order by published_at desc;

grant select on public.public_reports to anon;
