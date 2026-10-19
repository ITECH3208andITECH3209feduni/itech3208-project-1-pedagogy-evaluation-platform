# Sprint 3 — Demo Runbook

Roughly 10 minutes. Each act maps to one of the Sprint 3 requirements, so the
audience sees the requirement and the working feature side by side.

---

## Before you start — 5 minutes, do this the day before

### 1. Apply the migration — the demo does not work without it

Supabase → **SQL Editor → New Query** → paste all of `sprint3-demographics.sql` → **Run**.

Confirm it worked:

```sql
select policyname, cmd from pg_policies where tablename = 'demographics';
```

Three rows = good. **If you skip this, the demographics page will tell the
participant their answers could not be saved, and the dashboard will read
"migration not applied" in front of your audience.**

### 2. Load demo data — otherwise the dashboard is empty

Same SQL Editor → paste all of `demo-seed.sql` → **Run**. Creates eight fictional
participants so every statistic and all three charts have something to show.

After running, the dashboard should read exactly:

| Participants | Started | Completed | Accounts | Completion | In progress | Average | Demographics |
|---|---|---|---|---|---|---|---|
| 8 | 7 | 6 | 7 | 86% | 1 | 65.8% | 5 |

If those numbers match, the seed landed correctly. **Clean-up SQL is at the
bottom of `demo-seed.sql`** — run it when the demo is over.

### 3. Start the site

```bash
python3 -m http.server 5173
```

Open `http://localhost:5173`.

### 4. Clear the browser, or the demo will resume a previous run

DevTools → Console:

```js
localStorage.clear(); sessionStorage.clear(); location.reload();
```

Do this again between rehearsal and the real thing. Answers are cached, so
skipping it means Act 1 starts halfway through the survey.

### 5. Open two tabs

Tab 1 on the landing page, tab 2 on `admin.html` already signed in. Switching
tabs is faster and calmer than signing in live.

---

## Act 1 — Validation · Requirement R3

*"Participants cannot submit unless every question is answered."*

1. Start the assessment and answer questions 1 and 2 normally.
2. On question 3, **click Next without choosing anything.**
   → A red message appears: *"Please select a response before continuing."*
   Point out that it does not advance.
3. Choose an answer — the error clears immediately.
4. Answer a couple more, then click **Review answers** in the top bar.
5. On the review screen, point out the answers grouped by the four Firmin
   categories, each with its own count, and the incomplete rows in red.
6. **Click Submit assessment.** Submission is refused, and the error names the
   exact questions still missing.

> **The line to say:** "Nothing is scored, stored or emailed until all twenty
> questions are answered. This is the only path to submission, so a partial
> response cannot reach the database."

---

## Act 2 — Completion and scoring · Requirement R4

1. Click **Go to question N** in the error, answer it, and work through the rest.
   To move fast, use the number keys **1**–**5** and **Enter**.
2. Back at the review screen the status pill turns green: *20 of 20 answered.*
3. **Submit.** The completion screen appears.
4. Point out the buttons are briefly held with *"Saving your results…"*, then
   *"✓ Your results are saved."*

> **The line to say:** "We hold those buttons until the write confirms, because
> navigating away mid-save was cancelling the request. And it only says saved
> when the database actually confirmed it."

---

## Act 3 — Demographics · Requirement R1

1. On the completion screen, read out the question:
   *"Are you happy to provide demographic information?"*
2. Click **Yes, I'm happy to** → the demographics page opens.
3. **Click Save without choosing anything** — all three fields show an error.
4. Select an age group, then choose **Gender → Other** to show the free-text box.
5. Complete all three and **Save** → results page.

> **The line to say:** "Every question offers *prefer not to say*, so we never
> force disclosure. The answers attach to this assessment record, not to a name.
> If a participant declines we record that too — otherwise we could not report a
> meaningful opt-in rate."

---

## Act 4 — Results and report

1. Show the four category scores and the chart on the results page.
2. Open **View Full Report** and scroll the written interpretation.
3. Click **Export PDF** if time allows.

---

## Act 5 — Admin dashboard · Requirement R2

Switch to tab 2.

1. **Participation band** — walk the four counts the client asked for by name:
   participants, started, completed, accounts created. Note they are different
   numbers, and say what each means.
2. **Engagement band** — completion rate, in progress, average score,
   demographics opt-in.
3. **Category results** — the bar chart, then the table beneath it with mean,
   median, lowest and highest per category.
4. **Demographic summary** — the three bar charts.
5. **Participant table** — point out the mixed statuses, and the green *demo*
   badge on participants who provided demographics.
6. Click any row → the profile opens showing that participant's demographics.
7. Click **Export CSV** and open it to show the four new demographic columns.

> **The line to say:** "Every count is defined explicitly, because *participants*
> could mean several things. We also found sessions that matched no participant
> record were being dropped from the totals entirely — those now appear as
> unattached sessions, so the participant count is honest."

---

## If something goes wrong

| Symptom | Cause | What to do |
|---|---|---|
| Demographics says it could not be saved | Migration not applied | Say so plainly and carry on — the flow still demonstrates. Run the migration afterwards |
| Dashboard says "migration not applied" | Same | Same |
| Dashboard is empty | `demo-seed.sql` not run, or run before the migration | Run the migration, then the seed, then hit **Refresh** |
| Survey starts mid-way | Browser storage not cleared | Run the clear command in step 4 |
| Completion screen says "Saved on this device" | No connection to the database | Check wi-fi. The survey still works; only the save failed |

---

## After the demo

Run the cleanup block at the bottom of `demo-seed.sql` to remove the eight
fictional participants. It deletes only rows whose ids begin `ddddddd`, so real
participant data is untouched.
