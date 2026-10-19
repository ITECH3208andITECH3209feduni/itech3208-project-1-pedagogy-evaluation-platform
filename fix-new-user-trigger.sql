-- =============================================================================
-- Fix: "Database error creating new user"
-- Run in: Supabase → SQL Editor → New Query → Run   (safe to re-run)
--
-- Creating an account runs handle_new_user(), which inserts a profile row into
-- public.users. That table has a unique email, so the insert failed when an old
-- profile row still held the same email after its account had been deleted.
-- This version frees the email from such orphaned rows first.
-- =============================================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.email is not null then
    update public.users u
       set email = null
     where lower(u.email) = lower(new.email)
       and u.id <> new.id
       and not exists (select 1 from auth.users a where a.id = u.id);
  end if;

  insert into public.users (id, email, full_name, is_anonymous)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    (new.email is null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Shows any profile rows whose account no longer exists (informational):
select u.id, u.email, u.created_at
  from public.users u
 where not exists (select 1 from auth.users a where a.id = u.id)
 order by u.created_at desc;
