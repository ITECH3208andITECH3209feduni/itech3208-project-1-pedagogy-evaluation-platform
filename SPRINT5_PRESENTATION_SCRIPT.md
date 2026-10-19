# Sprint 5 — Presentation Script

Who says what, slide by slide. Target **17 minutes** including a 3-minute live demo.
Deck: `SPRINT5_Slides.pptx` (speaker notes in Presenter View) or `SPRINT5_Slides.pdf`.
Report: `PEP_Sprint5_Report.pdf`.

**Before you present:** verification codes now arrive — custom SMTP was configured on 13 October
and a live registration received its code (slide 7). Merajun's live run (`SPRINT5_TEST_PLAN.md`
A–B, `QUESTION_BANK_TEST_PLAN.md` B) closes the three remaining criteria: a live claim, sign-in from
the results page, and a real administrator edit. If it has been done, say so on slides 16 and 17 and
treat those rows as met; if it has not, say exactly that — the slides are written for the honest case.

---

## Who covers what

| Speaker | Role | Slides | Approx. |
|---|---|---|---|
| **Shafiullah Anik** | Scrum Master | 1–3, 19–20 | 3 min |
| **Albin Roy** | Product Owner | 4–7 | 4 min |
| **Mushfiqur Rahman** | Lead Developer | 8–15 (incl. live demo) | 7 min |
| **Merajun Nabi** | Tester | 16–18 | 2½ min |
| All four | — | 21 (questions) | — |

**Handover rule:** finish your sentence, say the next person's name, step back. Four handovers.

**The story:** the client confirmed two requirements for the final sprint and added a third
mid-way. All three are live. Albin shows what a participant sees, Mushfiqur shows why it is
safe and how it was built, Merajun shows the proof and what is still to be proved, Shafiullah
closes with what remains before handover.

---

## Slide 1 · Title

@@ Shafiullah Anik · Scrum Master

> *"Good morning. This is our Sprint 5 review for the Pedagogy Evaluation Platform."*

> *"Dr Firmin confirmed two requirements for this sprint — saving an anonymous result to an
> account, and verifying new accounts with an emailed code — and asked for a question bank
> part-way through. All three are built, deployed and live."*

> *"Albin will show what a participant sees, Mushfiqur how it works underneath, Merajun how we
> tested it, and I'll close with handover."*

Under 40 seconds.

---

## Slide 2 · Sprint 5 in numbers

@@ Shafiullah Anik · Scrum Master

> *"These numbers come from the repository and the live system."*

> *"Three of three requirement areas. Fifteen acceptance criteria — twelve verified by the team,
> three waiting on the tester's live run. Seven pull requests, six production
> deployments across the twelfth to the fifteenth of October. One hundred and thirteen automated database checks, forty of them stress checks. Three migrations
> applied to the live database. And zero new credentials: the only key to a result is the random
> id it already had."*

**→ Hand to Albin after slide 3.**

---

## Slide 3 · What the client asked for

@@ Shafiullah Anik · Scrum Master

> *"The client's words, and where you'll see each one. Hold us to the right-hand column."*

> *"One reading we want to be explicit about: requirement one means the result the participant
> has just seen becomes the account's result. Nobody retakes the evaluation to keep it."*

**→ Hand to Albin.**

---

## Slide 4 · Requirement 1 — start with nothing to lose

@@ Albin Roy · Product Owner

Read the client box on slide 3 if you skipped it: *"start anonymously; at the end, offer to
create an account; the completed result is saved to that account."*

> *"Nothing changes for the anonymous participant until their result is on screen. No account,
> nothing stored while they answer, one write when they submit — that's Sprint 4's rule."*

> *"Then the results page makes the offer: save these results to an account. It only appears
> when the result actually reached the server — if it was saved on the device alone, there is
> nothing to attach, so there is no card."*

> *"Two ways in: create an account, or sign in to one you already have. Close the modal and
> nothing happens — still anonymous, card unchanged."*

---

## Slide 5 · Save your results

@@ Albin Roy · Product Owner

> *"This is the same sign-in modal participants already know, but it tells the truth about what
> it's doing. The title is 'Save your results'. There's no Anonymous tab, because they already
> are. Every button says what happens: 'Create account and save', 'Sign in and save results',
> 'Verify and save results'."*

> *"If they refresh half-way through entering the code, the code panel comes back — still in
> save mode."*

---

## Slide 6 · Saved to the account

@@ Albin Roy · Product Owner

> *"After the code, or after signing in: 'Saved to your account', and a link straight to the
> dashboard. The scores they were looking at never moved."*

> *"If they already had an attempt this year, the card says so — it's kept as their previous
> attempt, exactly as if this had been a normal second submission. The two-attempts-a-year rule
> from Sprint 4 applies unchanged."*

> *"And if the save fails for any reason, the card says why, the account still works, and their
> next evaluation saves to it automatically."*

---

## Slide 7 · Requirement 2 — a 6-digit code

@@ Albin Roy · Product Owner

Read the client box: *"a verification code is sent to the email address; the account is verified
by entering that code."*

> *"Register, and a six-digit code goes to the address given. The account can't be used until
> it's entered. A wrong or expired code is refused; codes last an hour; 'Resend' sends a new one
> and only the newest works. Try to sign in before verifying and you're taken back to the code
> screen with a fresh code."*

> *"It works from the home page and from the results page — same code, same panel."*

> *"And it's proven: the sender was configured on the thirteenth of October — codes come from
> noreply at crmpilot dot com dot au on a verified domain — and a registration on the live site
> received its code within a minute. That's the inbox on the right."*

**→ Hand to Mushfiqur.**

---

## Slide 8 · The rules live in the database

@@ Mushfiqur Rahman · Lead Developer

> *"The engineering decision is the same one we made in Sprint 4: the rules are enforced by the
> database, not just the page."*

> *"Attaching a result is one function. It checks the caller is signed in and not an anonymous
> token. It checks the result is complete and still has no owner — and locks the row, so two
> claims can't race. It checks it was completed less than twenty-four hours ago. Then it sets
> the owner, and applies the two-attempts rule exactly as a submission would."*

> *"The only credential is the result's session id — a random identifier returned only to the
> browser that submitted. Nobody can list unclaimed results, and the anonymous role can't call
> the function at all. There's no new table, no token, no email link: nothing new to protect."*

---

## Slide 9 · One modal, any page

@@ Mushfiqur Rahman · Lead Developer

> *"To make the offer on the results page we had to change how sign-in is wired. The modal is
> now rendered by one script instead of being copied into the home page, so any page can open
> it. It's opened with an intent — start the assessment, or save this result — and the intent
> sets the copy and hides the Anonymous tab."*

> *"After sign-in, one event tells the page what happened. The page decides what to do next;
> the script only redirects if nobody takes over."*

> *"And a small function with a big consequence: becoming an account holder used to wipe the
> result from the device, because that's the right thing to do on a shared computer when a
> different person signs in. For the same person keeping their result it was exactly wrong —
> that was the first bug we found."*

---

## Slide 10 · Question bank

@@ Mushfiqur Rahman · Lead Developer

> *"Dr Firmin asked for this on the twelfth of October, and it was live the same day, because
> the admin dashboard and the migration pattern were already there to extend."*

> *"All twenty statements in the admin dashboard — category, a character counter, who last
> edited it. Save, or Control-Enter. Restore original brings back the shipped wording."*

> *"Participants read the database wording first — home page, questionnaire, review screen,
> admin responses — and fall back to the shipped copy if the database can't be reached, so the
> evaluation never waits on it."*

---

## Slide 11 · Only the words can change

@@ Mushfiqur Rahman · Lead Developer

> *"This is the part that matters for the research. Only administrators can edit, by row-level
> security — anyone else's update affects zero rows, and we checked that on the live database.
> Only the wording can change: a trigger refuses any change to category, order, weight or the
> active flag, so five statements per category with equal weights is fixed. Wording has to be a
> real sentence. Every edit is stamped with when and by whom. And answers already recorded are
> untouched — an edit changes what future participants read."*

> *"Whether a reworded statement still means the same thing is a research judgement — the
> platform records who changed what and when, so it can be reported."*

---

## Slide 12 · Forgot password (added after the review build)

@@ Mushfiqur Rahman · Lead Developer

> *"One more thing, added after the review build. The sign-in panel had no way to recover an
> account — forget your password and you lost your dashboard."*

> *"Now: Forgot password, enter your address, and a six-digit code arrives from the same sender
> as registration. The reply is the same for an address that isn't registered, so nobody can use
> the form to find out who is. Enter the code and a new password and you're signed in — and from
> the results page, the result you just saw is saved to the account as well."*

> *"And it's live: built, tested on its preview, the reset email template set in the dashboard,
> merged and deployed as version 2.4 — all on the thirteenth of October."*

---

## Slide 13 · Archive instead of delete (client rule, 14 October)

@@ Mushfiqur Rahman · Lead Developer

> *"One more rule from Dr Firmin, and it's a good one: administrators archive, they never
> delete. Delete is gone from the dashboard, and the administrator delete policies are gone from
> the database, so an administrator's delete affects zero rows whatever sends it."*

> *"Archive hides a participant from the table, the stats, the charts and the export. Nothing is
> removed. Show archived reveals them, with when and by whom, and Restore brings them back. Only
> administrators can do it, never on their own account, and a participant can't change their own
> state. Twenty database checks."*

> *"The migration is applied, it's merged and live as version 2.5 — all on the fourteenth."*

---

## Slide 14 · Time on task (client request, 15 October)

@@ Mushfiqur Rahman · Lead Developer

> *"One more, from last night: Dr Firmin asked to see how long each participant spends. We
> didn't need any new tracking. Every stored evaluation already records when its ten-minute
> session began and when it was submitted, so the time spent is just the difference."*

> *"It shows as a Time column per participant, totalled across their attempts; a Time on task
> card with the average and the median; the same figure on each session in the profile and in the
> CSV. Older rows from before the ten-minute rule are capped at eleven minutes so they can't skew
> it. Live as version 2.6."*

---

## Slide 15 · Live demo

@@ Mushfiqur Rahman · Lead Developer — driving

Three minutes. **See the Demo Runbook below.**

1. Home → **Or continue anonymously** → answer all twenty → **Review answers** → submit.
   *"Nothing was stored until now. Note the completion line: saved anonymously, and where to
   keep it."*
2. **No thanks, show my results** → point at the card → **Create account & save** → fill in →
   enter the code from the inbox → *"Saved to your account."*
3. **Open my dashboard** → *"Same scores, now the account's active result."*
4. Admin tab → Question bank → change statement 3 → **Save** → home page in the private window →
   *"That's the new wording, for everyone from now on."*

If anything fails: *"We'll use the slides — same build"* and go back to slide 6.

**→ Hand to Merajun.**

---

## Slide 16 · How we tested

@@ Merajun Nabi · Tester

> *"Three levels, same as last sprint. Seventy-three automated database checks in a real Postgres
> engine with sign-in mocked — thirty-two for the claim, twenty-one for the question bank, twenty
> for archive, plus forty stress checks with bulk data, bad inputs and races — and
> they include the refusals a browser never exercises: claiming twice, claiming someone else's
> result, claiming after twenty-four hours, changing a category."*

> *"In the browser: every state of the card and the modal, including a refresh half-way through
> the code. And on the live system, read-only: the site serves version 2.5, the claim, archive and
> question-bank functions exist and refuse the anonymous role, the reset function is gone, and an
> anonymous edit changes zero rows. We also fired eleven hostile requests and a burst of thirty at
> the live service — all refused, nothing written — and walked the whole journey on a phone."*

> *"And a live registration received its code from the project sender on the thirteenth. What I
> still have to run is the claim on the live site and a real administrator save. That's three of
> the fourteen criteria, and it's next."*

If the live run is done, replace the last paragraph with: *"I've run the live scripts: the result
saved to the account and appeared on the dashboard, and an administrator edit reached the home
page."*

---

## Slide 17 · Acceptance criteria

@@ Merajun Nabi · Tester

> *"Our sign-off. Fifteen criteria — twelve from the client's wording plus the three additions.
> Twelve are met with evidence you've seen, a database test, or the live registration. The three marked 'live run' are the claim on
> the live site and the real administrator save — the scripts are written, step by step, and
> they're mine to close."*

Pause two seconds so people can read it. Don't read the rows.

---

## Slide 18 · What we caught

@@ Merajun Nabi · Tester

> *"Five things found in the build, fixed before release. The one worth knowing about: creating
> the account would have wiped the result off the device — the claim would have deleted the very
> id it needed. Caught in the first browser run."*

> *"And one process catch: the question bank was merged seven seconds too early and landed on a
> branch that had already been merged, so the live site stayed at the old version. We check the
> live version after every release — that's how we saw it within minutes, and a third pull
> request fixed it."*

**→ Hand to Shafiullah.**

---

## Slide 19 · Handover status

@@ Shafiullah Anik · Scrum Master

> *"The product is done. What's left is the handover to the university, and here is the plan."*

> *"The verification-code sender is done: codes arrive from a verified domain. Forgot password went
> live on the thirteenth, and archive-instead-of-delete went live on the fourteenth. Merajun's live run is
> scheduled. The results email still has to move to the same sender. Credentials in the
> handover notes must be rotated. The free database pauses after a week idle and keeps no
> backups. And ownership and the written guide are still to come."*

---

## Slide 20 · What's next

@@ Shafiullah Anik · Scrum Master

> *"Five actions, in order: the live run; the results-email sender; rotate every credential and
> transfer ownership to university accounts; a daily keep-alive and a scheduled export; and the
> handover guide, so none of this depends on one person. That's Sprint 5 — happy to take
> questions."*

---

## Slide 21 · Questions

@@ All four — whoever owns the area takes the question

Requirements → **Albin**; technical → **Mushfiqur**; testing → **Merajun**; timeline, handover
and cost → **Shafiullah**.

---

## Likely questions, and honest answers

**"Is it live?"** — Mushfiqur
> *"Yes. Everything on these slides is deployed at pedagogy-eval.vercel.app
> at version 2.5, and all three database migrations are applied."*

**"Did the verification email actually arrive?"** — Merajun
> *"Yes. On the thirteenth of October a registration on the live site received its code within a
> minute, from noreply at crmpilot dot com dot au — that's slide 7. The sender is a verified
> domain with custom SMTP, not the default mailer, so it isn't limited to the team's own
> addresses."*

**"Can someone claim a result that isn't theirs?"** — Mushfiqur
> *"They'd need the result's session id, which is a random identifier returned only to the
> browser that submitted it. Nothing lets anyone list unclaimed results, a result can be claimed
> once, and only within twenty-four hours."*

**"What if I close the tab before saving?"** — Albin
> *"Then the offer is gone — deliberately. We don't leave a claimable id on shared or public
> computers. Next time, create the account first."*

**"Why can't I change a question's category?"** — Mushfiqur
> *"Because the scoring model depends on it — five statements per category, equal weights, from
> Firmin's framework. Changing that would change what every past score means. Wording is the
> client's; the structure is the instrument's."*

**"Does rewording a statement affect old answers?"** — Albin
> *"No. Stored answers keep their values and the statement code. The platform records who
> changed what and when, so it can be reported. Whether the new wording is equivalent is a
> research judgement."*

**"What if someone forgets their password?"** — Mushfiqur
> *"Slide 12: Forgot password sends a six-digit code, they set a new password and they're back
> in. It's live."*

**"How long do people take?"** — Mushfiqur
> *"The dashboard shows it — slide 14. The average and median per evaluation on the card, and a
> total per participant in the table. It comes from the start and finish times every evaluation
> already stores, so it's exact to the second."*

**"Can an administrator delete a participant?"** — Mushfiqur
> *"No. Archive only — slide 13. Delete is gone from the dashboard and from the database
> permissions, so it can't be done by hand either. Archived participants can be restored at any
> time, and their data still expires under the three-year rule."*

**"Why is the sender a company domain, not the university's?"** — Shafiullah
> *"Because it could be verified today. Swapping to a university sender at handover is a change
> to the SMTP settings only — no code changes."*

**"How much will it cost the university?"** — Shafiullah
> *"Nothing on the free plans at this scale. Automatic backups and no pausing would be about
> US$25 a month on Supabase Pro."*

---

# Demo Runbook

## Before the presentation (20 minutes, the day before)

1. **Inbox.** Have an email address you can open on the presentation machine that has **never**
   been registered on the platform. Gmail `+` aliases work (`name+demo1@gmail.com`).
2. **Dry run.** Do the whole demo once: anonymous evaluation → Create account & save → code →
   Saved → dashboard. If the code does not arrive within two minutes, use a different address
   and, as a last resort, turn off *Confirm email* in Supabase → Authentication → Sign In /
   Providers → Email for the demo (turn it back on afterwards).
3. **Admin tab.** Sign in at `/admin.html` in a separate browser profile or window.
4. **Decide the demo wording** for statement 3 and have the original ready to restore
   (Restore original button) after the presentation.
5. **Wake the database.** Load the site once an hour before — free projects can be slow on
   first request.

## On the day — tabs, left to right

1. Slides (Presenter View)
2. Private window: home page
3. Inbox for the demo address
4. Admin dashboard, signed in

## If something goes wrong

| Problem | Say | Do |
|---|---|---|
| Site won't load | *"We'll use the screenshots — same build."* | Slides 4–7, 10 |
| Code doesn't arrive | *"That's the email sender Shafiullah covers."* | Use **I already have an account** with the dry-run account; the result still saves |
| Save fails | *"The account is ready; the next evaluation saves automatically."* | Open the dry-run account's dashboard instead |
| Admin save fails | *"That's the live check Merajun is running."* | Show the edited state without saving |
