
-- ============================================================
-- Drop existing objects (safe to run before re-creating)
-- ============================================================

-- Tables: policies and triggers drop automatically with the table.
drop table if exists public.users;
drop table if exists public.shares;
drop table if exists public.events;

-- Functions are not tied to a table; must be dropped explicitly.
drop function if exists public.set_updated_at();


-- ========
-- events
-- ========

create table public.events (
  id         uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null,
  client_id  text null,
  session_id text not null,
  video_id   text null,
  constraint events_pkey primary key (id)
) tablespace pg_default;

alter table public.events enable row level security;

create policy "insert_anon_auth"
  on public.events for insert
  to anon, authenticated
  with check (
    event_type = any(array['session_start'::text, 'video_load'::text])
  );


-- ========
-- shares
-- ========

create table public.shares (
  id          text not null,
  share_type  text not null,
  video_url   text null,
  video_title text null,
  payload     jsonb not null,
  created_at  timestamptz not null default now(),
  constraint shares_pkey primary key (id)
) tablespace pg_default;

alter table public.shares enable row level security;

create policy "insert_anon_auth"
  on public.shares for insert
  to anon, authenticated
  with check (
    share_type = any(array['loop'::text, 'video'::text])
    and id ~ '^[A-Za-z0-9_-]{8,16}$'
    and length(payload::text) <= 65536
  );

create policy "select_anon_auth"
  on public.shares for select
  to anon, authenticated
  using (true);


-- ========
-- users
-- ========

create table public.users (
  id         uuid not null,
  app_state  jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint users_pkey primary key (id),
  constraint users_id_fkey foreign key (id) references auth.users(id) on delete cascade
) tablespace pg_default;

alter table public.users enable row level security;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at
before update on public.users
for each row execute procedure public.set_updated_at();

create policy "select_auth"
  on public.users for select
  to authenticated
  using (auth.uid() = id);

create policy "insert_auth"
  on public.users for insert
  to authenticated
  with check (
    auth.uid() = id
    and length(app_state::text) <= 524288
  );

create policy "update_auth"
  on public.users for update
  to authenticated
  using (auth.uid() = id)
  with check (length(app_state::text) <= 524288);

create policy "delete_auth"
  on public.users for delete
  to authenticated
  using (auth.uid() = id);

