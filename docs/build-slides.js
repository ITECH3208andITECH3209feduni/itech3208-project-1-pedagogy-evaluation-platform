// Build SPRINT3_Slides.pptx — Sprint 3 review deck for the Pedagogy Evaluation Platform.
// Dark editorial styling, matching the platform and the written report.
// Motif: copper-outlined circular chips + rounded surface cards. No accent stripes.

const pptxgen = require('pptxgenjs');
const path = require('path');

const OUT = process.argv[2] || 'SPRINT3_Slides.pptx';

// ---- palette -------------------------------------------------------------
const BG      = '0D0B08';
const SURFACE = '19160F';
const BORDER  = '332C24';
const CREAM   = 'F5F0E8';
const MUTED   = '958C80';
const COPPER  = 'C17F3A';
const COPPERL = 'E8A84E';
const BLUE    = 'BCD0EF';
const PLUM    = 'DCBDED';
const FOREST  = 'B6DCC4';

const HEAD = 'Arial';
const BODY = 'Calibri';

// ---- geometry ------------------------------------------------------------
const M = 0.7;                 // page margin
const W = 13.333 - M * 2;      // usable width = 11.93
const col4 = 2.83, gap = 0.2;
const X4 = [M, M + col4 + gap, M + (col4 + gap) * 2, M + (col4 + gap) * 3];
const col2 = (W - gap) / 2;
const X2 = [M, M + col2 + gap];

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';           // MUST precede addSlide
pres.author = 'Mushfiqur Rahman, Shafiullah Anik, Albin Roy, Merajun Nabi';
pres.title  = 'Pedagogy Evaluation Platform — Sprint 3';

// ---- helpers -------------------------------------------------------------
const ONLY = process.env.ONLY ? parseInt(process.env.ONLY, 10) : 0;
let slideNo = 0;
const NOOP = new Proxy({}, { get: () => () => NOOP, set: () => true });

function newSlide(notes) {
  slideNo++;
  if (ONLY && slideNo !== ONLY) return NOOP;   // QA: build one slide in isolation
  const s = pres.addSlide();
  s.background = { color: BG };
  if (notes) s.addNotes(notes);
  return s;
}

function kicker(s, text) {
  s.addText(text.toUpperCase(), {
    x: M, y: 0.46, w: W, h: 0.28,
    fontFace: HEAD, fontSize: 10.5, bold: true, color: COPPER,
    charSpacing: 3, margin: 0, valign: 'middle',
  });
}

// Title with an italic copper tail, e.g. head("Eight numbers, ", "each defined.")
function title(s, lead, tail) {
  const runs = [{ text: lead, options: { color: CREAM } }];
  if (tail) runs.push({ text: tail, options: { color: COPPER, italic: true } });
  s.addText(runs, {
    x: M, y: 0.85, w: W, h: 0.95,
    fontFace: HEAD, fontSize: 34, bold: true, margin: 0, valign: 'top',
  });
}

function footer(s, label, num) {
  s.addShape(pres.ShapeType.line, {
    x: M, y: 6.83, w: W, h: 0, line: { color: BORDER, width: 1 },
  });
  s.addText(label.toUpperCase(), {
    x: M, y: 6.92, w: W / 2, h: 0.3,
    fontFace: HEAD, fontSize: 9, color: '5B5348', charSpacing: 2, margin: 0,
  });
  s.addText(String(num).padStart(2, '0'), {
    x: M + W / 2, y: 6.92, w: W / 2, h: 0.3,
    fontFace: HEAD, fontSize: 9, color: '5B5348', charSpacing: 2, align: 'right', margin: 0,
  });
}

// Rounded surface card.
function card(s, x, y, w, h) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.09,
    fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
  });
}

// The motif: a copper-outlined circular chip carrying a short label.
function chip(s, x, y, text, color) {
  const d = 0.52;
  s.addShape(pres.ShapeType.ellipse, {
    x, y, w: d, h: d,
    fill: { color: BG }, line: { color: color || COPPER, width: 1.25 },
  });
  s.addText(text, {
    x, y, w: d, h: d,
    fontFace: HEAD, fontSize: 12, bold: true, color: color || COPPERL,
    align: 'center', valign: 'middle', margin: 0,
  });
}

// A row of: chip · bold lead · muted detail
function chipRow(s, x, y, w, tag, lead, detail, color) {
  chip(s, x, y, tag, color);
  const tx = x + 0.78;
  const tw = w - 0.78;
  const runs = [{ text: lead, options: { bold: true, color: CREAM } }];
  if (detail) runs.push({ text: '  ' + detail, options: { color: MUTED } });
  s.addText(runs, {
    x: tx, y: y - 0.06, w: tw, h: 0.66,
    fontFace: BODY, fontSize: 14.5, margin: 0, valign: 'middle', lineSpacingMultiple: 1.06,
  });
}

// ==========================================================================
// 1 — Title
// ==========================================================================
{
  const s = newSlide(
    'This is Sprint 3 on the Pedagogy Evaluation Platform. Three things: optional ' +
    'demographic collection, a much bigger admin dashboard, and proper validation on ' +
    'survey completion. Move on quickly — the title slide is not where the value is.');

  // concentric rings, right side — the deck's opening visual
  s.addShape(pres.ShapeType.ellipse, {
    x: 9.15, y: 1.55, w: 3.5, h: 3.5, fill: { color: BG }, line: { color: BORDER, width: 1.25 },
  });
  s.addShape(pres.ShapeType.ellipse, {
    x: 9.72, y: 2.12, w: 2.36, h: 2.36, fill: { color: BG }, line: { color: '5A3F1E', width: 1.25 },
  });
  s.addShape(pres.ShapeType.ellipse, {
    x: 10.44, y: 2.84, w: 0.92, h: 0.92, fill: { color: COPPER }, line: { color: COPPERL, width: 1 },
  });

  s.addText('FEDERATION UNIVERSITY AUSTRALIA  ·  ITECH3208 CAPSTONE', {
    x: M, y: 1.75, w: 8.2, h: 0.3,
    fontFace: HEAD, fontSize: 10.5, bold: true, color: COPPER, charSpacing: 3, margin: 0,
  });
  s.addText([
    { text: 'Pedagogy Evaluation\nPlatform\n', options: { color: CREAM } },
    { text: 'Sprint 3.', options: { color: COPPER, italic: true } },
  ], {
    x: M, y: 2.15, w: 8.2, h: 2.6,
    fontFace: HEAD, fontSize: 40, bold: true, margin: 0, lineSpacingMultiple: 1.0, valign: 'top',
  });
  s.addText('Optional demographic collection  ·  Administrator dashboard  ·  Survey completion validation', {
    x: M, y: 4.95, w: 8.2, h: 0.7,
    fontFace: BODY, fontSize: 14, color: MUTED, margin: 0,
  });
  footer(s, 'Sprint 3 Review', 1);
}

// ==========================================================================
// 2 — The four requirements
// ==========================================================================
{
  const s = newSlide(
    'These came out of the sprint planning meeting. R1 demographics, R2 the dashboard, ' +
    'R3 validation, R4 verify by testing. Do not read the slide aloud — let them read, ' +
    'and summarise in one line.');
  kicker(s, 'What we were asked to build');
  title(s, 'Four ', 'requirements.');

  const rows = [
    ['R1', 'Demographics', 'Ask after the survey whether the participant will provide demographic information. If yes, collect age group, gender and academic level A–E, linked to the same response.', BLUE],
    ['R2', 'Dashboard', 'Focus the sprint on the admin dashboard: participants, started, completed, accounts created, a TP / PD / TA / TPP summary, and demographic charts.', PLUM],
    ['R3', 'Validation', 'Participants cannot submit unless every question is answered, an error is shown when incomplete, and results save only on completion.', FOREST],
    ['R4', 'Testing', 'Verify all of the above by testing.', COPPERL],
  ];
  let y = 2.15;
  rows.forEach(([tag, lead, detail, c]) => {
    chip(s, M, y + 0.12, tag, c);
    s.addText(lead, {
      x: M + 0.78, y: y, w: 2.3, h: 0.36,
      fontFace: HEAD, fontSize: 14, bold: true, color: CREAM, margin: 0, valign: 'middle',
    });
    s.addText(detail, {
      x: M + 0.78, y: y + 0.36, w: W - 0.78, h: 0.72,
      fontFace: BODY, fontSize: 13, color: MUTED, margin: 0, lineSpacingMultiple: 1.1, valign: 'top',
    });
    y += 1.17;
  });
  footer(s, 'Requirements', 2);
}

// ==========================================================================
// 3 — All four delivered
// ==========================================================================
{
  const s = newSlide(
    'All four are done and verified. The build is ready for formal testing. I will be ' +
    'honest about what is still outstanding at the end — signalling that early buys ' +
    'credibility for the rest.');
  kicker(s, 'Where we landed');
  title(s, 'All four ', 'delivered.');

  const cards = [
    ['R1 · Demographics', 'Consent step, dedicated page, linked to the response', BLUE],
    ['R2 · Dashboard', 'Eight statistics, category summary, three demographic charts', PLUM],
    ['R3 · Validation', 'Two validation points, one completion gate', FOREST],
    ['R4 · Testing', 'Full test script, plus four defects found and fixed', COPPERL],
  ];
  cards.forEach(([t, d, c], i) => {
    const x = X4[i], y = 2.3, h = 3.1;
    card(s, x, y, col4, h);
    chip(s, x + 0.32, y + 0.34, '✓', c);
    s.addText(t.toUpperCase(), {
      x: x + 0.32, y: y + 1.08, w: col4 - 0.64, h: 0.3,
      fontFace: HEAD, fontSize: 9.5, bold: true, color: c, charSpacing: 2, margin: 0,
    });
    s.addText(d, {
      x: x + 0.32, y: y + 1.46, w: col4 - 0.64, h: 1.3,
      fontFace: BODY, fontSize: 13.5, color: MUTED, margin: 0, lineSpacingMultiple: 1.15, valign: 'top',
    });
  });
  footer(s, 'Summary', 3);
}

// ==========================================================================
// 4 — Validation (R3)
// ==========================================================================
{
  const s = newSlide(
    'Before, if you had not answered, Next was just greyed out with no explanation. Now ' +
    'you are told why. At the end a review screen shows all twenty answers. The important ' +
    'part is the third point: there is a single gate in the code. Nothing is scored, ' +
    'stored or emailed until all twenty questions have an answer.');
  kicker(s, 'R3 · Validation');
  title(s, 'Nothing partial ', 'gets saved.');

  const items = [
    ['1', 'At each question', 'Clicking Next without an answer shows an explicit message, instead of a silently disabled button'],
    ['2', 'At submission', 'A review screen lists all 20 answers by category; submitting while incomplete names the exact questions missing'],
    ['3', 'One gate', 'No score is calculated, stored or emailed until all 20 questions hold a valid answer'],
  ];
  let y = 2.35;
  items.forEach(([n, lead, detail]) => {
    card(s, M, y, W, 1.22);
    chip(s, M + 0.36, y + 0.35, n, COPPERL);
    s.addText(lead, {
      x: M + 1.14, y: y + 0.22, w: 3.0, h: 0.36,
      fontFace: HEAD, fontSize: 15, bold: true, color: CREAM, margin: 0, valign: 'middle',
    });
    s.addText(detail, {
      x: M + 1.14, y: y + 0.6, w: W - 1.6, h: 0.5,
      fontFace: BODY, fontSize: 13.5, color: MUTED, margin: 0, lineSpacingMultiple: 1.1, valign: 'top',
    });
    y += 1.42;
  });
  footer(s, 'Validation', 4);
}

// ==========================================================================
// 5 — Live demo one
// ==========================================================================
{
  const s = newSlide(
    'Switch to the site. Acts 1 and 2 of DEMO_SCRIPT.md. Answer two questions; on the ' +
    'third click Next with nothing selected so the error appears; select an answer so it ' +
    'clears; open Review answers; submit while incomplete so it is refused; then finish ' +
    'with keys 1-5 and Enter and submit. Budget three minutes.');

  s.addShape(pres.ShapeType.ellipse, {
    x: 6.05, y: 1.95, w: 1.55, h: 1.55, fill: { color: BG }, line: { color: COPPER, width: 2 },
  });
  s.addText('▶', {
    x: 6.05, y: 1.95, w: 1.55, h: 1.55,
    fontFace: HEAD, fontSize: 30, color: COPPERL, align: 'center', valign: 'middle', margin: 0,
  });
  s.addText([
    { text: 'Live demo ', options: { color: CREAM } },
    { text: 'one.', options: { color: COPPER, italic: true } },
  ], {
    x: M, y: 3.85, w: W, h: 0.9,
    fontFace: HEAD, fontSize: 38, bold: true, align: 'center', margin: 0,
  });
  s.addText('Submitting an incomplete survey  ·  the error message  ·  the review screen  ·  completing and scoring', {
    x: 2.0, y: 4.8, w: 9.33, h: 0.6,
    fontFace: BODY, fontSize: 14, color: MUTED, align: 'center', margin: 0,
  });
  footer(s, 'Demo', 5);
}

// ==========================================================================
// 6 — Demographics: asked once
// ==========================================================================
{
  const s = newSlide(
    'After finishing, the participant is asked once whether they are happy to give ' +
    'demographic details. Yes goes to a page, no goes straight to results. Either way ' +
    'they are one click from their results — the optional step never blocks them. Three ' +
    'fields, and every one has a prefer-not-to-say option, so we never force disclosure.');
  kicker(s, 'R1 · Demographics');
  title(s, 'Asked once, ', 'never forced.');

  // left — the branch
  const branch = [
    ['Yes', 'A dedicated page opens'],
    ['No thanks', 'Straight to their results'],
    ['Either way', 'Results are one click away'],
  ];
  let y = 2.4;
  branch.forEach(([lead, detail], i) => {
    chipRow(s, M, y, col2, String(i + 1), lead, '', COPPERL);
    s.addText(detail, {
      x: M + 0.78, y: y + 0.34, w: col2 - 0.78, h: 0.4,
      fontFace: BODY, fontSize: 13.5, color: MUTED, margin: 0, valign: 'top',
    });
    y += 1.05;
  });

  // right — what is collected
  card(s, X2[1], 2.3, col2, 2.95);
  s.addText('WHAT WE COLLECT', {
    x: X2[1] + 0.4, y: 2.62, w: col2 - 0.8, h: 0.3,
    fontFace: HEAD, fontSize: 9.5, bold: true, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addText([
    { text: 'Age group', options: { bold: true, color: CREAM } },
    { text: '  —  six bands', options: { color: MUTED, breakLine: true } },
    { text: 'Gender', options: { bold: true, color: CREAM } },
    { text: '  —  with free text for “other”', options: { color: MUTED, breakLine: true } },
    { text: 'Academic level', options: { bold: true, color: CREAM } },
    { text: '  —  A to E', options: { color: MUTED } },
  ], {
    x: X2[1] + 0.4, y: 3.05, w: col2 - 0.8, h: 1.6,
    fontFace: BODY, fontSize: 14.5, margin: 0, lineSpacingMultiple: 1.45, valign: 'top',
  });
  s.addText([
    { text: 'Every question offers ', options: { color: MUTED } },
    { text: 'prefer not to say', options: { color: COPPERL, italic: true } },
    { text: '.', options: { color: MUTED } },
  ], {
    x: X2[1] + 0.4, y: 4.62, w: col2 - 0.8, h: 0.5,
    fontFace: BODY, fontSize: 14, margin: 0, valign: 'top',
  });
  footer(s, 'Demographics', 6);
}

// ==========================================================================
// 7 — Linked to the response
// ==========================================================================
{
  const s = newSlide(
    'This is the slide that answers the actual requirement — slow down. The requirement ' +
    'said demographics must be linked to the same survey response, so they are stored ' +
    'against the same session as the scores. Second point is the one to highlight: we ' +
    'record declines too. Without that we could never report an opt-in rate, because ' +
    'someone who said no would look identical to someone never asked.');
  kicker(s, 'R1 · Demographics');
  title(s, 'Linked to the response, ', 'not the person.');

  const rows = [
    ['Joined by session', 'Demographics attach to the same record as the scores — exactly what the requirement asked for'],
    ['Declines recorded too', 'Otherwise “85% opted in” is unmeasurable: a decline would look identical to never being asked'],
    ['Write-once', 'No update or delete permission exists, so knowing a session ID does not let anyone alter someone’s answers'],
    ['Anonymous included', 'No account is needed to contribute demographic data'],
  ];
  let y = 2.3;
  rows.forEach(([lead, detail], i) => {
    chip(s, M, y + 0.1, String(i + 1), COPPERL);
    s.addText(lead, {
      x: M + 0.78, y: y, w: 3.1, h: 0.36,
      fontFace: HEAD, fontSize: 14.5, bold: true, color: CREAM, margin: 0, valign: 'middle',
    });
    s.addText(detail, {
      x: M + 4.0, y: y, w: W - 4.0, h: 0.78,
      fontFace: BODY, fontSize: 13.5, color: MUTED, margin: 0, lineSpacingMultiple: 1.12, valign: 'top',
    });
    y += 1.08;
  });
  footer(s, 'Demographics · data', 7);
}

// ==========================================================================
// 8 — Eight numbers
// ==========================================================================
{
  const s = newSlide(
    'The dashboard now has the four counts asked for by name, plus four more. What ' +
    'mattered was defining them, because “participants” could mean several different ' +
    'things. Each one on screen has a stated definition. If asked why started and ' +
    'completed differ: someone can open the assessment and not finish — that gap is the ' +
    'completion rate.');
  kicker(s, 'R2 · Dashboard');
  title(s, 'Eight numbers, ', 'each defined.');

  const stats = [
    ['Participants', 'Everyone non-admin, registered or anonymous'],
    ['Started', 'Has at least one session'],
    ['Completed', 'Has at least one finished session'],
    ['Accounts created', 'Registered, not anonymous'],
    ['Completion rate', 'Completed ÷ started'],
    ['In progress', 'Started, not finished'],
    ['Average score', 'Mean across completed'],
    ['Demographics', 'Provided, declined, opt-in rate'],
  ];
  stats.forEach(([t, d], i) => {
    const x = X4[i % 4];
    const y = i < 4 ? 2.3 : 4.42;
    card(s, x, y, col4, 1.92);
    s.addText(t.toUpperCase(), {
      x: x + 0.3, y: y + 0.3, w: col4 - 0.6, h: 0.34,
      fontFace: HEAD, fontSize: 10, bold: true, color: COPPERL, charSpacing: 1.6, margin: 0,
    });
    s.addText(d, {
      x: x + 0.3, y: y + 0.72, w: col4 - 0.6, h: 1.0,
      fontFace: BODY, fontSize: 13.5, color: MUTED, margin: 0, lineSpacingMultiple: 1.14, valign: 'top',
    });
  });
  footer(s, 'Dashboard', 8);
}

// ==========================================================================
// 9 — Categories and demographics
// ==========================================================================
{
  const s = newSlide(
    'The category chart now has a table under it — mean, median, lowest, highest. Both ' +
    'read the same set of sessions, so they cannot drift apart and show different numbers ' +
    'for the same thing. Three demographic charts, and the demographic columns are in the ' +
    'CSV export so the data can be analysed properly outside the tool.');
  kicker(s, 'R2 · Dashboard');
  title(s, 'Categories and ', 'demographics.');

  // left column — category analysis
  card(s, X2[0], 2.3, col2, 3.5);
  s.addText('CATEGORY RESULTS', {
    x: X2[0] + 0.4, y: 2.6, w: col2 - 0.8, h: 0.3,
    fontFace: HEAD, fontSize: 9.5, bold: true, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addText([
    { text: 'The bar chart now sits above a table giving responses, mean, median, lowest and highest for each category.', options: { breakLine: true } },
    { text: '' , options: { breakLine: true } },
    { text: 'Both read the same sessions, so the chart and the table can never disagree with each other.', options: {} },
  ], {
    x: X2[0] + 0.4, y: 3.05, w: col2 - 0.8, h: 2.4,
    fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, lineSpacingMultiple: 1.2, valign: 'top',
  });
  ['TP', 'PD', 'TA', 'TPP'].forEach((c, i) => {
    const cols = [BLUE, PLUM, FOREST, COPPERL];
    s.addShape(pres.ShapeType.roundRect, {
      x: X2[0] + 0.4 + i * 0.92, y: 4.95, w: 0.78, h: 0.42, rectRadius: 0.06,
      fill: { color: SURFACE }, line: { color: cols[i], width: 1 },
    });
    s.addText(c, {
      x: X2[0] + 0.4 + i * 0.92, y: 4.95, w: 0.78, h: 0.42,
      fontFace: HEAD, fontSize: 11, bold: true, color: cols[i],
      align: 'center', valign: 'middle', margin: 0,
    });
  });

  // right column — demographic charts
  card(s, X2[1], 2.3, col2, 3.5);
  s.addText('DEMOGRAPHIC SUMMARY', {
    x: X2[1] + 0.4, y: 2.6, w: col2 - 0.8, h: 0.3,
    fontFace: HEAD, fontSize: 9.5, bold: true, color: MUTED, charSpacing: 2, margin: 0,
  });
  const bars = [['Age group', 0.86], ['Gender', 0.62], ['Academic level', 0.98]];
  bars.forEach(([label, frac], i) => {
    const by = 3.15 + i * 0.72;
    s.addText(label, {
      x: X2[1] + 0.4, y: by, w: 1.7, h: 0.3,
      fontFace: BODY, fontSize: 12.5, color: CREAM, margin: 0, valign: 'middle',
    });
    const trackX = X2[1] + 2.2, trackW = col2 - 2.6;
    s.addShape(pres.ShapeType.roundRect, {
      x: trackX, y: by + 0.06, w: trackW, h: 0.2, rectRadius: 0.1,
      fill: { color: '241F19' }, line: { color: BORDER, width: 0.5 },
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: trackX, y: by + 0.06, w: trackW * frac, h: 0.2, rectRadius: 0.1,
      fill: { color: COPPER }, line: { color: COPPERL, width: 0.5 },
    });
  });
  s.addText('Empty categories are dropped, so small samples stay readable. Four demographic columns added to the CSV export.', {
    x: X2[1] + 0.4, y: 5.15, w: col2 - 0.8, h: 0.55,
    fontFace: BODY, fontSize: 12.5, color: MUTED, margin: 0, lineSpacingMultiple: 1.12, valign: 'top',
  });
  footer(s, 'Dashboard · analysis', 9);
}

// ==========================================================================
// 10 — Live demo two
// ==========================================================================
{
  const s = newSlide(
    'Switch to the site. Acts 3 and 5 of DEMO_SCRIPT.md. Demographics page — submit empty ' +
    'to show validation, then fill it in. Switch to the admin tab: walk the two bands of ' +
    'statistics, the category table, the demographic charts, click a participant row for ' +
    'their profile, then export the CSV and show the new columns. Budget three minutes.');

  s.addShape(pres.ShapeType.ellipse, {
    x: 6.05, y: 1.95, w: 1.55, h: 1.55, fill: { color: BG }, line: { color: COPPER, width: 2 },
  });
  s.addText('▶', {
    x: 6.05, y: 1.95, w: 1.55, h: 1.55,
    fontFace: HEAD, fontSize: 30, color: COPPERL, align: 'center', valign: 'middle', margin: 0,
  });
  s.addText([
    { text: 'Live demo ', options: { color: CREAM } },
    { text: 'two.', options: { color: COPPER, italic: true } },
  ], {
    x: M, y: 3.85, w: W, h: 0.9,
    fontFace: HEAD, fontSize: 38, bold: true, align: 'center', margin: 0,
  });
  s.addText('The demographics page  ·  then the admin dashboard, statistics, category summary and demographic charts', {
    x: 1.6, y: 4.8, w: 10.13, h: 0.6,
    fontFace: BODY, fontSize: 14, color: MUTED, align: 'center', margin: 0,
  });
  footer(s, 'Demo', 10);
}

// ==========================================================================
// 11 — Four defects
// ==========================================================================
{
  const s = newSlide(
    'Do not rush past this — finding your own defects is a strength, not an admission. ' +
    'The first is the one worth knowing: the database client reports failures by return ' +
    'value rather than by throwing, and we were not checking it. A failed save looked ' +
    'like a success and the participant was told their results were saved when they were ' +
    'not. Fixed — it only claims saved when the database confirms. The second is why ' +
    'those buttons were held during the demo.');
  kicker(s, 'Quality assurance');
  title(s, 'Four defects found ', 'before testing.');

  const defects = [
    ['Save failures reported as successes', 'The database client reports errors by return value, not by throwing. A rejected write passed unnoticed and the participant was told it saved.'],
    ['Navigating away cancelled the save', 'Buttons are now held until the write confirms, capped at six seconds.'],
    ['Errors attached to the wrong question', 'Two question panels coexist during the slide animation.'],
    ['Review returned you to question 20', 'Rather than to the question you left off at.'],
  ];
  let y = 2.3;
  defects.forEach(([lead, detail], i) => {
    chip(s, M, y + 0.08, String(i + 1), COPPERL);
    s.addText(lead, {
      x: M + 0.78, y: y, w: 4.3, h: 0.36,
      fontFace: HEAD, fontSize: 14, bold: true, color: CREAM, margin: 0, valign: 'middle',
    });
    s.addText(detail, {
      x: M + 5.2, y: y, w: W - 5.2, h: 0.8,
      fontFace: BODY, fontSize: 13, color: MUTED, margin: 0, lineSpacingMultiple: 1.12, valign: 'top',
    });
    y += 1.08;
  });
  footer(s, 'Quality', 11);
}

// ==========================================================================
// 12 — What we verified
// ==========================================================================
{
  const s = newSlide(
    'Scores were checked against a manual calculation, not just eyeballed. The dashboard ' +
    'counts were checked by hand against a known data set. And the dashboard degrades ' +
    'properly — if the demographics table is not there yet, it still loads and tells you ' +
    'why rather than breaking. There is a written test script ready for the tester ' +
    'covering every one of these.');
  kicker(s, 'R4 · Testing');
  title(s, 'What we ', 'verified.');

  const left = [
    ['Incomplete submission', 'Refused, nothing written'],
    ['Error messages', 'Correct question, clears on answer'],
    ['Scoring', 'Checked against manual calculation'],
    ['Demographics', 'Accept, decline and skip paths'],
  ];
  const right = [
    ['Dashboard', 'All eight counts checked by hand'],
    ['Degraded mode', 'Loads and explains, never breaks'],
    ['Keyboard and mobile', 'Verified down to 375px'],
    ['Formal test script', 'Written, ready for the tester'],
  ];
  [left, right].forEach((colItems, ci) => {
    card(s, X2[ci], 2.3, col2, 3.5);
    let y = 2.62;
    colItems.forEach(([lead, detail]) => {
      s.addShape(pres.ShapeType.ellipse, {
        x: X2[ci] + 0.4, y: y + 0.13, w: 0.16, h: 0.16,
        fill: { color: COPPER }, line: { color: COPPER, width: 0.5 },
      });
      s.addText(lead, {
        x: X2[ci] + 0.72, y: y, w: col2 - 1.1, h: 0.32,
        fontFace: HEAD, fontSize: 13.5, bold: true, color: CREAM, margin: 0, valign: 'middle',
      });
      s.addText(detail, {
        x: X2[ci] + 0.72, y: y + 0.32, w: col2 - 1.1, h: 0.36,
        fontFace: BODY, fontSize: 13, color: MUTED, margin: 0, valign: 'top',
      });
      y += 0.79;
    });
  });
  footer(s, 'Testing', 12);
}

// ==========================================================================
// 13 — Outstanding items
// ==========================================================================
{
  const s = newSlide(
    'Say these plainly, do not apologise for them. The database migration is written and ' +
    'reviewed and gets run before release. Then formal testing. Then deployment after ' +
    'test sign-off — we do not publish straight to the live site. And the results email ' +
    'still points at a development address so we are not sending test data out; that ' +
    'switches before we recruit real participants.');
  kicker(s, 'Sequenced next');
  title(s, 'Outstanding ', 'items.');

  const items = [
    ['Database migration', 'Written and reviewed. Additive — creates one table and alters nothing existing.'],
    ['Testing phase', 'The build enters formal testing against the written script.'],
    ['Deployment', 'Follows test sign-off. We do not publish straight to the live site.'],
    ['Email recipient', 'Switches from the development address before participants are recruited.'],
  ];
  let y = 2.26;
  items.forEach(([lead, detail], i) => {
    card(s, M, y, W, 0.96);
    chip(s, M + 0.34, y + 0.22, String(i + 1), COPPERL);
    s.addText(lead, {
      x: M + 1.12, y: y + 0.12, w: 3.4, h: 0.34,
      fontFace: HEAD, fontSize: 14.5, bold: true, color: CREAM, margin: 0, valign: 'middle',
    });
    s.addText(detail, {
      x: M + 1.12, y: y + 0.47, w: W - 1.6, h: 0.38,
      fontFace: BODY, fontSize: 13, color: MUTED, margin: 0, valign: 'top',
    });
    y += 1.08;   // last card now ends at 6.50", clear of the 6.83" footer rule
  });
  footer(s, 'Next', 13);
}

// ==========================================================================
// 14 — Questions
// ==========================================================================
{
  const s = newSlide(
    'Likely questions. Is it live yet — no, complete and verified locally, goes live ' +
    'after testing signs off. Is the demographic data anonymous — attached to the ' +
    'assessment record, not a name, but not anonymised in the formal research sense. ' +
    'Why require an answer if optional — the step is optional, but on the page we ask ' +
    'for a definite choice and prefer-not-to-say is always available. Can we ' +
    'cross-tabulate scores by age group — not yet, that is first for the next sprint.');

  s.addShape(pres.ShapeType.ellipse, {
    x: 5.99, y: 1.85, w: 1.35, h: 1.35, fill: { color: BG }, line: { color: BORDER, width: 1.25 },
  });
  s.addShape(pres.ShapeType.ellipse, {
    x: 6.42, y: 2.28, w: 0.5, h: 0.5, fill: { color: COPPER }, line: { color: COPPERL, width: 1 },
  });
  s.addText('SPRINT 3  ·  PEDAGOGY EVALUATION PLATFORM', {
    x: M, y: 3.45, w: W, h: 0.3,
    fontFace: HEAD, fontSize: 10.5, bold: true, color: COPPER, charSpacing: 3,
    align: 'center', margin: 0,
  });
  s.addText('Questions?', {
    x: M, y: 3.85, w: W, h: 1.0,
    fontFace: HEAD, fontSize: 44, bold: true, color: CREAM, align: 'center', margin: 0,
  });
  s.addText('Mushfiqur Rahman  ·  Shafiullah Anik  ·  Albin Roy  ·  Merajun Nabi', {
    x: M, y: 4.95, w: W, h: 0.5,
    fontFace: BODY, fontSize: 14, color: MUTED, align: 'center', margin: 0,
  });
  footer(s, 'Thank you', 14);
}

pres.writeFile({ fileName: OUT }).then(f => console.log('wrote', f));
