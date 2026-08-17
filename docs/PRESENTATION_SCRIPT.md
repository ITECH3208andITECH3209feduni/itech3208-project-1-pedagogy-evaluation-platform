# Sprint 3 — Presentation Script

Who says what, slide by slide. Target **10–12 minutes** including two live demos.

**The speaker split below is a suggestion based on your roles — change the names if
your split differs.** Only the `@@` lines need editing.

---

## Who covers what

| Speaker | Role | Slides | Approx. |
|---|---|---|---|
| **Shafiullah Anik** | Scrum Master | 1, 13 | 1½ min |
| **Albin Roy** | Product Owner | 2, 3, 6, 7 | 3 min |
| **Mushfiqur Rahman** | Lead Developer | 4, 5, 8, 9, 10 | 6 min |
| **Merajun Nabi** | Tester | 11, 12 | 1½ min |
| All four | — | 14 (questions) | — |

**Handover rule:** finish your last sentence, say the next person's name, and step
back. Every section below ends with the cue to use.

**Setup before you start:** slides open in Presenter View, the site in a second tab,
the admin dashboard signed in on a third. Do the browser reset in the Demo Runbook.

---

## Slide 1 · Title

@@ Shafiullah Anik · Scrum Master

> *"Good morning. This is Sprint 3 on the Pedagogy Evaluation Platform. We delivered
> three things this sprint: optional demographic collection, a much bigger admin
> dashboard, and proper validation on survey completion."*

> *"I'll hand over to Albin to cover what we were asked for, then Mushfiqur will show
> you the build working, and Merajun will cover testing."*

Don't linger — the title slide is not where the value is.

**→ Hand to Albin.**

---

## Slide 2 · Four requirements

@@ Albin Roy · Product Owner

> *"These four came out of the sprint planning meeting. R1 demographics, R2 the
> dashboard, R3 validation, and R4 verify it all by testing."*

Don't read the slide aloud — let them read it, and summarise in one line.

> *"I'll take R1 and R2 in a moment. Mushfiqur takes the technical side."*

---

## Slide 3 · All four delivered

@@ Albin Roy · Product Owner

> *"All four are done and verified. The build is ready for formal testing."*

> *"We'll also be straight with you about what's still outstanding at the end —
> there are a few items, and one of them is a database step we run before release."*

Signalling honesty early buys credibility for everything after it.

**→ Hand to Mushfiqur.**

---

## Slide 4 · Validation

@@ Mushfiqur Rahman · Lead Developer

> *"Before this sprint, if you hadn't answered a question the Next button was just
> greyed out. No explanation. Now you're told why."*

> *"At the end there's a review screen showing all twenty answers. If any are
> missing, submission is refused and it names exactly which ones."*

> *"The important part is the third point. There is a single gate in the code —
> nothing is scored, stored or emailed until all twenty questions have an answer. A
> half-finished survey cannot reach the database."*

---

## Slide 5 · Live demo one

@@ Mushfiqur Rahman · Lead Developer — driving

Switch to the site. Acts 1 and 2 of the Demo Runbook. **Budget 3 minutes.**

1. Answer two questions.
2. On the third, click **Next** with nothing selected → the error appears.
3. Select an answer → the error clears.
4. Click **Review answers** → show the grouping and the red incomplete rows.
5. Click **Submit** → refused, missing questions named.
6. Finish fast with keys **1**–**5** and **Enter**, then submit.

> *"Notice the buttons are held for a moment — 'saving your results'. Merajun will
> explain why when he covers what we found in testing."*

If you overrun, skip step 6 by having a completed run ready in another tab.

**→ Hand to Albin.**

---

## Slide 6 · Demographics, asked once

@@ Albin Roy · Product Owner

> *"After finishing, the participant is asked once whether they're happy to give
> demographic details. Yes goes to a page, no goes straight to results. Either way
> they're one click from their results — the optional step never blocks them."*

> *"Three fields. And every single one has a 'prefer not to say' option, so we never
> force anyone to disclose anything."*

---

## Slide 7 · Linked to the response

@@ Albin Roy · Product Owner

This slide answers the actual requirement. Slow down here.

> *"The requirement said the demographics must be linked to the same survey response
> — so they're stored against the same record as the scores."*

> *"The second point is the one I'd highlight. We record declines as well. If we
> didn't, we could never report an opt-in rate, because someone who said no would
> look identical to someone who was never asked."*

> *"Third, the record is write-once. There's no update or delete permission, so even
> with a session ID nobody could alter another participant's answers."*

**→ Hand to Mushfiqur.**

---

## Slide 8 · Eight numbers

@@ Mushfiqur Rahman · Lead Developer

> *"The dashboard now has the four counts that were asked for by name, plus four
> more. What mattered here was defining them, because 'participants' could mean
> several different things. Each one on screen has a stated definition."*

If asked why started and completed differ:
> *"Someone can open the assessment and not finish. That gap is the completion rate."*

---

## Slide 9 · Categories and demographics

@@ Mushfiqur Rahman · Lead Developer

> *"The category chart now has a table under it — mean, median, lowest, highest. Both
> read the same set of sessions, so they can't drift apart and show different numbers
> for the same thing."*

> *"Three demographic charts, and the demographic columns are in the CSV export so
> the data can be analysed properly outside the tool."*

---

## Slide 10 · Live demo two

@@ Mushfiqur Rahman · Lead Developer — driving

Switch to the site. Acts 3 and 5 of the Demo Runbook. **Budget 3 minutes.**

1. Demographics page — submit empty to show validation, then fill it in.
2. Switch to the admin tab. Walk the two bands of statistics.
3. Category table, then the demographic charts.
4. Click a participant row → the profile with their demographics.
5. Export CSV, open it, show the new columns.

> *"One thing worth mentioning — we found sessions that matched no participant record
> were being dropped from the totals entirely. Those now appear as unattached
> sessions, so the participant count is honest."*

**→ Hand to Merajun.**

---

## Slide 11 · Four defects

@@ Merajun Nabi · Tester

Don't rush this. Finding your own defects is a strength, not an admission.

> *"We ran a structured review over the new code before it came to testing, and found
> four problems."*

> *"The first is the one worth knowing about. The database client reports failures by
> return value rather than by throwing an error, and that wasn't being checked. So a
> failed save looked like a success, and the participant was told their results were
> saved when they weren't. That's fixed — it only says saved now when the database
> actually confirms it."*

> *"The second one is why those buttons were held during the demo. Navigating away
> was cancelling the save mid-flight."*

---

## Slide 12 · What we verified

@@ Merajun Nabi · Tester

> *"Scores were checked against a manual calculation, not just eyeballed. The
> dashboard counts were checked by hand against a known data set."*

> *"The dashboard also degrades properly — if the demographics table isn't there yet,
> it still loads and tells you why, rather than breaking."*

> *"There's a written test script covering every one of these, and I'll be working
> through it formally next."*

**→ Hand to Shafiullah.**

---

## Slide 13 · Outstanding items

@@ Shafiullah Anik · Scrum Master

Say these plainly. Do not apologise for them.

> *"Four things remain. The database migration is written and reviewed, and gets run
> before release. Then formal testing. Then deployment, after test sign-off — we
> don't publish straight to the live site."*

> *"And the results email still points at a development address so we're not sending
> test data out. That switches before we recruit real participants."*

> *"Next sprint, the obvious step is cross-tabulating scores against demographic
> groups — which is the analysis this data was collected to support."*

---

## Slide 14 · Questions

@@ All four — whoever owns the area takes the question

Route by topic: requirements and scope to **Albin**, anything technical or about the
build to **Mushfiqur**, testing and defects to **Merajun**, timeline and process to
**Shafiullah**.

---

## Likely questions, and honest answers

**"Is it live yet?"** — Mushfiqur or Shafiullah
> *"No. It's complete and verified locally, and goes live after testing signs off. We
> don't push straight to the live site."*

**"Is the demographic data anonymous?"** — Albin
> *"It's attached to the assessment record, not to a name. Anonymous participants can
> provide it without an account. It isn't anonymised in the formal research sense — a
> registered participant's record could be linked back to their account — so if the
> study needs true anonymity, that's a design decision we should make deliberately."*

**"Why require an answer if the whole thing is optional?"** — Albin
> *"The step is optional — you can decline it entirely, or skip it on the page. But
> if you're on the page we ask for a definite choice, and 'prefer not to say' is
> always one of them. That gives clean data without forcing disclosure."*

**"What if someone closes the browser halfway?"** — Mushfiqur
> *"Their answers are kept on the device and they resume where they left off. Nothing
> is scored or stored on the server until all twenty are answered."*

**"How many participants can it handle?"** — Mushfiqur
> *"We haven't load-tested it. It's a static site against a hosted database, so the
> front end scales fine — but the honest answer is we don't have a number, and we'd
> need to test if you're expecting a large cohort."*

**"Can we cross-tabulate scores by age group?"** — Albin
> *"Not yet. That's the obvious next step now the demographic data exists, and it's
> first on our list for the next sprint."*

**"How long did this take?" / "Are you on track?"** — Shafiullah
> *"Sprint 3 is complete on scope. The remaining items are sequenced, not blocked."*
