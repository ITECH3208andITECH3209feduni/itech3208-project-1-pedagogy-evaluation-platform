-- =============================================================================
-- Sprint 4 demo history for existing test accounts
-- Run in: Supabase → SQL Editor → New Query → Run
--
-- 1. Create the accounts first (Authentication → Users → Add user → Create new user,
--    tick "Auto Confirm User").
-- 2. Put their emails in the two lines below and run this file.
--
-- For each account it adds three completed attempts, with answers that produce
-- exactly the stored scores:
--   10 Sep 2026  active result      (current)
--    2 Mar 2026  previous attempt   (same year → "Keep your previous attempt" case)
--   12 Jun 2025  2025 result        (year-to-year comparison)
-- Safe to re-run: it removes that account's existing attempts first.
-- =============================================================================

create or replace function pg_temp.seed_attempt(p_user uuid, p_email text, p_at timestamptz, p_sums int[])
returns void language plpgsql as $$
declare
  v_sid  uuid;
  v_cats text[] := array['TP','PD','TA','TPP'];
  c int; q int; v_sum int; v_val int;
begin
  insert into public.sessions (user_id, participant_email, score_tp, score_pd, score_ta, score_tpp, created_at, completed_at)
  values (p_user, p_email, p_sums[1] * 4, p_sums[2] * 4, p_sums[3] * 4, p_sums[4] * 4, p_at - interval '6 minutes', p_at)
  returning id into v_sid;

  for c in 1..4 loop
    v_sum := p_sums[c];                       -- category score = sum / 25 × 100
    for q in 1..5 loop
      v_val := (v_sum / 5) + case when q > 5 - (v_sum % 5) then 1 else 0 end;
      insert into public.responses (session_id, question_id, category, answer_value)
      values (v_sid, 'q' || lpad(((c - 1) * 5 + q)::text, 2, '0'), v_cats[c], v_val);
    end loop;
  end loop;
end;
$$;

do $$
declare
  v_emails text[] := array[
    'first.test.account@example.com',     -- ← replace with account 1's email
    'second.test.account@example.com'     -- ← replace with account 2's email (or delete this line)
  ];
  v_email text;
  v_user  uuid;
  v_offset int := 0;
begin
  foreach v_email in array v_emails loop
    select id into v_user from auth.users where lower(email) = lower(v_email);
    if v_user is null then
      raise notice 'Skipped %: no account with that email', v_email;
      continue;
    end if;

    delete from public.sessions where user_id = v_user;

    -- Category sums out of 25 (TP, PD, TA, TPP); the second account is a little different.
    perform pg_temp.seed_attempt(v_user, lower(v_email), '2025-06-12 15:05+10', array[17, 18, 17, 15 - v_offset]);
    perform pg_temp.seed_attempt(v_user, lower(v_email), '2026-03-02 12:40+11', array[19, 17 + v_offset, 20, 16]);
    perform pg_temp.seed_attempt(v_user, lower(v_email), '2026-09-10 13:12+10', array[21, 18, 22 - v_offset, 19]);

    raise notice 'Seeded 3 attempts for %', v_email;
    v_offset := v_offset + 1;
  end loop;
end;
$$;

-- Check:
select u.email, to_char(s.completed_at at time zone 'Australia/Melbourne', 'DD Mon YYYY') as completed,
       s.score_tp, s.score_pd, s.score_ta, s.score_tpp,
       (select count(*) from public.responses r where r.session_id = s.id) as answers
  from public.sessions s join auth.users u on u.id = s.user_id
 where s.completed_at > now() - interval '3 years'
 order by u.email, s.completed_at desc
 limit 20;
