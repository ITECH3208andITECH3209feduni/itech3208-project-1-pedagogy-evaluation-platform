# Sprint 4 — Presentation Script

Who says what, slide by slide. Target **15–16 minutes** including a 3-minute live demo.
Deck: `SPRINT4_Slides.pptx` (speaker notes in Presenter View) or `SPRINT4_Slides.pdf`.

**Names and roles (confirmed 18 Sep 2026).** Kenny George Joseph has left the team. Albin Roy is
Product Owner and Merajun Nabi is Tester; the technical report and the home page team section
both say so. Change the `@@` lines only if the speaking split differs.

---

## Who covers what

| Speaker | Role | Slides | Approx. |
|---|---|---|---|
| **Shafiullah Anik** | Scrum Master | 1–2, 20–21 | 2½ min |
| **Albin Roy** | Product Owner | 3–7 | 4 min |
| **Mushfiqur Rahman** | Lead Developer | 8–14 (incl. live demo) | 6½ min |
| **Merajun Nabi** | Tester | 15–19 | 3½ min |
| All four | — | 22 (questions) | — |

**Handover rule:** finish your sentence, say the next person's name, step back. Four handovers.

**The story:** the client gave us six requirements with thirteen acceptance criteria. Every
requirement slide shows the client's own words in a "Client asked" box and the screen that
meets it. Slide 3 tells the audience where to look; slide 18 signs every criterion off with
evidence. Read the client's words aloud when you reach them — it makes the match obvious.

---

## Slide 1 · Title

@@ Shafiullah Anik · Scrum Master

> *"Good morning. This is our Sprint 4 review for the Pedagogy Evaluation Platform."*

> *"Dr Firmin gave us six requirements with thirteen acceptance criteria. All of them are met
> and live — and we redesigned every page along the way."*

> *"Albin will walk through the requirements, Mushfiqur will show how they work, Merajun will
> show the proof, and I'll close with handover."*

Under 40 seconds.

---

## Slide 2 · Sprint 4 in numbers

@@ Shafiullah Anik · Scrum Master

> *"These numbers come straight from the repository."*

> *"Six of six requirements. Thirteen of thirteen acceptance criteria. Seven pages redesigned.
> Several production releases, each verified live. Around five and a half thousand lines added
> and three thousand removed. Forty-eight automated database checks. And one production outage
> we had to recover before we could start."*

**→ Hand to Albin.**

---

## Slide 3 · Six requirements — and where you'll see each one

@@ Albin Roy · Product Owner

> *"These are the six requirements from sprint planning with Dr Firmin."*

> *"The last column is our promise: it tells you exactly which slide proves each requirement.
> You can hold us to it."*

Don't read the table — point at the "Shown on" column.

---

## Slide 4 · Redesign — before and after

@@ Albin Roy · Product Owner

> *"On the left, the home page at the start of the sprint — dark, animated, a custom cursor.
> It looked impressive but read like a template."*

> *"This is a research tool academics use once a year, so clarity and trust matter more. On the
> right: light, calm, readable, with colour used only for the four framework categories. Every
> page was rebuilt this way."*

---

## Slide 5 · Home page

@@ Albin Roy · Product Owner

> *"The first statement is right on the home page and carries into the assessment. And we
> explain the choice in plain language: an account gives you a dashboard and history;
> anonymous means nothing is stored until you submit. It works on a phone too."*

---

## Slide 6 · Requirement 3 — two attempts

@@ Albin Roy · Product Owner

Read the client box: *"When there are two attempts, the system should handle the previous and
current result properly."*

> *"This screenshot is from the live site with a real account — not a mock-up."*

> *"The participant has just finished their second attempt this year. The new attempt, 86, is
> now their active result. The previous one, 91, is kept so they can compare. And they decide
> right there: keep both, or delete the previous one."*

> *"We keep up to two a year, and the newest is always the one that counts."*

---

## Slide 7 · Requirement 3 — delete or override

@@ Albin Roy · Product Owner

Read the client box: *"The user should have the option to delete or override the previous
attempt — and then only the current attempt is the active result."*

> *"Top: the dashboard's attempts list — the active result and a previous attempt from March.
> Bottom: after pressing Delete, the previous attempt is gone and the active result is the only
> one that counts for this year."*

> *"And you can't delete your active result by accident — the database refuses."*

**→ Hand to Mushfiqur.**

---

## Slide 8 · Day one — the platform was down

@@ Mushfiqur Rahman · Lead Developer

> *"Before we could build anything, the live site was broken — sign-in and anonymous mode both
> failed."*

> *"It wasn't our code. The free database had been paused, so its address no longer existed —
> we confirmed it with two DNS resolvers. We restored it, applied the migrations in order and
> verified every rule live. We also replaced 'Failed to fetch' with a message people understand."*

---

## Slide 9 · Requirement 5 — 10-minute session

@@ Mushfiqur Rahman · Lead Developer

Read the client box: *"Each session should have a 10-minute session time, and the system needs
to manage what happens when it expires."*

> *"The clock starts when you begin, is always visible, and survives a refresh. Amber at two
> minutes, red at one, and screen readers are told."*

> *"When it expires — bottom right — the unsubmitted answers are cleared, nothing is stored, and
> you can start again. The database also rejects late submissions, so it can't be bypassed from
> the browser."*

---

## Slide 10 · Requirements 1 and 2 — user dashboard

@@ Mushfiqur Rahman · Lead Developer

Read the client box: *"Create a dashboard for the user, and store and display data for up to
three years."*

> *"The dashboard answers one question: am I improving? Your active result, your overall
> progress against the previous attempt, and how much history is stored and until when."*

---

## Slide 11 · Requirement 4 — improved, decreased or stayed similar

@@ Mushfiqur Rahman · Lead Developer

Read the client box: *"Show whether scores improved, decreased or stayed similar — including
category-wise progress."*

> *"Choose any earlier attempt, and every category gets a label. Here you can see all three:
> Teaching Practice improved, Pedagogical Development decreased, Technology Adoption stayed
> similar. A change of two points or less counts as similar, so small differences aren't
> over-read. The bar chart shows the same comparison."*

---

## Slide 12 · Requirements 2 and 4 — year to year

@@ Mushfiqur Rahman · Lead Developer

Read the client box: *"Compare year-to-year data, displayed with graphs."*

> *"Each year's result for up to three years. Bold line overall, dashed lines per category, and
> the table says in words whether each year improved. After three years, data is purged
> automatically."*

---

## Slide 13 · The rules live in the database

@@ Mushfiqur Rahman · Lead Developer

> *"The key engineering decision: the rules are enforced by the database, not just the page.
> There's one way to store an evaluation — submit_assessment. It checks all twenty answers,
> checks the ten-minute limit, recalculates the scores itself, stores everything in one
> transaction and applies the two-attempt rule."*

> *"On the right is the migration running on the live database."*

---

## Slide 14 · Live demo

@@ Mushfiqur Rahman · Lead Developer — driving

Three minutes. **See the Demo Runbook below.**

1. Home → answer statement 1 → **Or continue anonymously**. *"Notice it starts at question two."*
2. Point at the timer → **Review answers** → submit. *"Only now is anything stored."*
3. Tab with the signed-in test account → **Dashboard** → change **Compare with** → point at a
   trend chip → delete the previous attempt.
4. Admin tab → Refresh → the new result is there.

If anything fails: *"We'll use the slides — same build"* and go back to slide 10.

**→ Hand to Merajun.**

---

## Slide 15 · Requirement 6 — anonymous until completion

@@ Merajun Nabi · Tester

Read the client box: *"The evaluation should remain anonymous while in progress, and data is
stored only after the session is completed."*

> *"I wanted proof, not a promise, so I monitored every network request during a full run. Zero
> requests while answering and reviewing. Exactly one database call on submit, storing the
> session and all twenty answers together. If the session expires, nothing is ever sent."*

---

## Slide 16 · Admin dashboard

@@ Merajun Nabi · Tester

> *"The admin console was redesigned too. When someone keeps a previous attempt, only their
> active attempt counts in the averages — so nobody is counted twice."*

---

## Slide 17 · How we tested

@@ Merajun Nabi · Tester

> *"Three levels. Forty-eight automated database checks in a real Postgres engine. End-to-end
> browser checks — every dashboard state, all three trend labels, deleting the previous attempt,
> every timer threshold. And checks against the live system, including the two-attempt screen
> on a real account."*

---

## Slide 18 · Acceptance criteria — signed off

@@ Merajun Nabi · Tester

> *"This is our sign-off. Every acceptance criterion from the Sprint 4 brief, how it's met, and
> the evidence — a slide you've just seen, a database test, or a live check. Thirteen of
> thirteen."*

Pause two seconds so people can read it. Don't read the rows.

---

## Slide 19 · What we caught

@@ Merajun Nabi · Tester

> *"The honest one first: our first attempt migration would have deleted same-year attempts,
> which the refined requirement wanted kept. We caught it before it ran live and rewrote it."*

> *"We also fixed anonymous mode creating records at the start, a sign-up database error caused
> by an old profile row, a card cut off on phones, and a button showing too early."*

**→ Hand to Shafiullah.**

---

## Slide 20 · Handover — it can run for free

@@ Shafiullah Anik · Scrum Master

> *"It can run at no cost: GitHub Pages hosts it, Supabase's free plan covers fifty thousand
> monthly users, and a project email account sends sign-up codes and results."*

> *"Two risks. The free database pauses after a week idle — which is exactly what happened to us
> — so a daily keep-alive ping. And no automatic backups on free, so a monthly CSV export."*

---

## Slide 21 · Sprint 5

@@ Shafiullah Anik · Scrum Master

> *"Next sprint is the handover: email from a university sender to every participant, moving
> ownership to university accounts and rotating keys, a handover guide, and research views by
> demographics. That's Sprint 4 — happy to take questions."*

---

## Slide 22 · Questions

@@ All four — whoever owns the area takes the question

Requirements → **Albin**; technical → **Mushfiqur**; testing → **Merajun**; timeline, handover
and cost → **Shafiullah**.

---

## Likely questions, and honest answers

**"Is it live?"** — Mushfiqur
> *"Yes. Everything on these slides is deployed at lmctpro2026.github.io/pedagogy-evaluation-platform,
> and the database rules are applied."*

**"Can someone get around the ten-minute limit?"** — Mushfiqur
> *"Not by refreshing or opening a new tab — the start time is kept. The database also
> rejects late submissions. Someone technical could fake the start time their browser
> reports, so it's a strong guard for normal use rather than exam-grade proctoring."*

**"Why keep two attempts instead of one?"** — Albin
> *"That was the client's requirement: handle the previous and current result, and let the
> user delete or override the previous one. Keeping it by default means nobody loses data
> they wanted to compare against."*

**"What happens to someone who retakes three times in a year?"** — Albin
> *"The newest two are kept; the oldest is removed. The screen tells them before they start."*

**"Is anonymous data really anonymous?"** — Merajun
> *"Nothing is linked to a name or account, and nothing is stored until submission. The
> optional 'email me my results' box is the participant's choice — it's used to send them a
> copy. It isn't formally anonymised research data, so if the ethics approval needs that,
> it's a decision to make deliberately."*

**"Do verification emails work?"** — Shafiullah or Mushfiqur
> *"Today, email is sent through a test sender that only reliably reaches the account owner.
> For all participants we need a verified university sender — that's first in Sprint 5.
> For the demo we use a test account."*

**"How much will it cost the university?"** — Shafiullah
> *"Nothing on the free plans at this scale. If they want automatic backups and no pausing,
> Supabase Pro is about US$25 a month."*

**"How many users can it handle?"** — Mushfiqur
> *"The free plan allows fifty thousand monthly active users. We haven't load-tested it, so
> if they expect a very large cohort we'd test first."*

---

# Demo Runbook

## Before the presentation (15 minutes, the day before)

1. **Test account.** On the live site, create an account with an email you control and
   verify it. If the code doesn't arrive, turn off *Confirm email* in Supabase →
   Authentication → Sign In / Providers → Email for the demo.
2. **Give it history.** Complete the evaluation **twice** with that account (different
   answers), and choose **Keep both** the second time — so the dashboard has a comparison.
3. **Admin tab.** Sign in at `/admin.html` in a separate browser profile or window.
4. **Clean browser for the anonymous part.** Use a private window.
5. **Wake the database.** Load the site once an hour before — free projects can be slow on
   first request.

## On the day — tabs, left to right

1. Slides (Presenter View)
2. Private window: home page
3. Normal window: signed in as the test account, on the dashboard
4. Admin dashboard, signed in

## If something goes wrong

| Problem | Say | Do |
|---|---|---|
| Site won't load | *"We'll use the screenshots — same build."* | Slides 6–12 |
| Sign-in fails | *"That's the free email setup Shafiullah covers."* | Use tab 3 (already signed in) |
| Timer runs out mid-demo | *"That's requirement five working."* | Show the expired screen, start again |
