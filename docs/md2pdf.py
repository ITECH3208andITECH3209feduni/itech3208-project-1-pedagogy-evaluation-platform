#!/usr/bin/env python3
"""Render the Sprint 3 markdown documents to printable PDFs.

    python3 md2pdf.py PRESENTATION_SCRIPT.md DEMO_SCRIPT.md

Handles the subset of markdown these documents use: headings, tables, lists,
blockquotes, fenced code, rules, inline bold/italic/code — plus one extension:

    @@ Name · Role      ->  a speaker badge (used by PRESENTATION_SCRIPT.md)

Inline formatting is applied to each block *after* its lines are joined, so
emphasis that wraps across two source lines still renders.
"""

import html
import re
import subprocess
import sys
from pathlib import Path

CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

CSS = """
@page { size: A4; margin: 15mm; }
body { font-family:-apple-system,"Helvetica Neue",Arial,sans-serif; font-size:10pt;
  line-height:1.5; color:#2F2C27; margin:0; }
h1 { font-size:22pt; letter-spacing:-.02em; margin:0 0 3mm; color:#16130F; }
h2 { font-size:13.5pt; margin:7mm 0 2mm; padding-bottom:1.5mm; color:#16130F;
  border-bottom:1.5px solid #16130F; page-break-after:avoid; }
h3 { font-size:11pt; margin:5mm 0 1.5mm; color:#16130F; page-break-after:avoid; }
p { margin:0 0 2.5mm; }
ul,ol { margin:0 0 3mm; padding-left:6mm; }
li { margin-bottom:1.2mm; }
hr { border:none; border-top:1px solid #D6D0C4; margin:5mm 0; }
code { font-family:"SF Mono",Menlo,monospace; font-size:8.6pt; background:#FAF7F1;
  border:1px solid #EBE6DC; border-radius:2px; padding:.3mm 1mm; color:#74470F; }
pre { background:#FAF7F1; border:1px solid #EBE6DC; border-radius:3px; padding:3mm 4mm;
  page-break-inside:avoid; }
pre code { border:none; background:none; padding:0; font-size:9pt; color:#2F2C27; }
blockquote { margin:2.5mm 0; padding:3mm 5mm; background:#FAF7F1;
  border-left:2px solid #A2661F; page-break-inside:avoid; }
blockquote p:last-child { margin-bottom:0; }
blockquote em { font-style:italic; color:#3A362F; }
table { width:100%; border-collapse:collapse; margin:2mm 0 4mm; page-break-inside:avoid; }
th { text-align:left; font-size:7.4pt; letter-spacing:.12em; text-transform:uppercase;
  color:#6B655C; border-bottom:1px solid #16130F; padding:0 2.5mm 1.5mm 0; font-weight:600; }
td { padding:2mm 2.5mm 2mm 0; border-bottom:1px solid #EBE6DC; vertical-align:top; font-size:9.4pt; }
strong { color:#16130F; }
.speaker { display:flex; align-items:baseline; gap:3mm; margin:1mm 0 3mm;
  padding:2.6mm 4mm; background:#16130F; border-radius:2mm;
  page-break-after:avoid; page-break-inside:avoid; }
.speaker .who { font-size:11.5pt; font-weight:700; color:#fff; letter-spacing:-.01em; }
.speaker .role { font-size:8pt; letter-spacing:.14em; text-transform:uppercase; color:#E8A84E; }
.handoff { font-size:9.5pt; font-weight:700; color:#74470F; margin:3mm 0 0; }
"""

BLOCK_START = re.compile(r'^(#|\||>|@@|```|---+\s*$|\s*[-*]\s|\s*\d+\.\s)')


def inline(text):
    """Inline formatting. Applied to whole blocks, never line by line."""
    t = html.escape(text)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t = re.sub(r'\*\*([^*]+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<!\*)\*([^*]+?)\*(?!\*)', r'<em>\1</em>', t)
    t = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', t)
    return t


def convert(md):
    out, lines, i = [], md.split('\n'), 0
    while i < len(lines):
        ln = lines[i]

        if ln.startswith('@@'):                                    # speaker badge
            who, _, role = ln[2:].strip().partition('·')
            out.append(f'<div class="speaker"><span class="who">{html.escape(who.strip())}</span>'
                       f'<span class="role">{html.escape(role.strip())}</span></div>')
            i += 1
            continue

        if ln.strip().startswith('**→'):                           # handover cue
            out.append(f'<p class="handoff">{inline(ln.strip())}</p>')
            i += 1
            continue

        if ln.startswith('```'):
            i += 1
            buf = []
            while i < len(lines) and not lines[i].startswith('```'):
                buf.append(html.escape(lines[i]))
                i += 1
            i += 1
            out.append('<pre><code>' + '\n'.join(buf) + '</code></pre>')
            continue

        if ln.startswith('|') and i + 1 < len(lines) and re.match(r'^\|[\s:\-|]+\|?\s*$', lines[i + 1]):
            hdr = [c.strip() for c in ln.strip('|').split('|')]
            i += 2
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                rows.append([c.strip() for c in lines[i].strip('|').split('|')])
                i += 1
            out.append('<table><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in hdr) +
                       '</tr></thead><tbody>' +
                       ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>'
                               for r in rows) + '</tbody></table>')
            continue

        m = re.match(r'^(#{1,4})\s+(.*)', ln)
        if m:
            lv = len(m.group(1))
            out.append(f'<h{lv}>{inline(m.group(2))}</h{lv}>')
            i += 1
            continue

        if re.match(r'^---+\s*$', ln):
            out.append('<hr>')
            i += 1
            continue

        if ln.startswith('>'):
            buf = []
            while i < len(lines) and lines[i].startswith('>'):
                buf.append(lines[i].lstrip('>').strip())
                i += 1
            # join first, THEN format — emphasis often wraps across lines
            out.append('<blockquote><p>' + inline(' '.join(b for b in buf if b)) + '</p></blockquote>')
            continue

        if re.match(r'^\s*[-*]\s+', ln) or re.match(r'^\s*\d+\.\s+', ln):
            ordered = bool(re.match(r'^\s*\d+\.', ln))
            items = []
            while i < len(lines) and (re.match(r'^\s*[-*]\s+', lines[i]) or
                                      re.match(r'^\s*\d+\.\s+', lines[i])):
                items.append(re.sub(r'^\s*(?:[-*]|\d+\.)\s+', '', lines[i]))
                i += 1
            tag = 'ol' if ordered else 'ul'
            out.append(f'<{tag}>' + ''.join(f'<li>{inline(x)}</li>' for x in items) + f'</{tag}>')
            continue

        if ln.strip():
            buf = []
            while i < len(lines) and lines[i].strip() and not BLOCK_START.match(lines[i]):
                buf.append(lines[i])
                i += 1
            out.append('<p>' + inline(' '.join(buf)) + '</p>')
            continue

        i += 1
    return '\n'.join(out)


def render(md_path):
    src = Path(md_path)
    title = src.stem.replace('_', ' ').title()
    body = convert(src.read_text(encoding='utf-8'))
    tmp = src.with_suffix('.tmp.html')
    tmp.write_text(
        f'<!doctype html><html><head><meta charset="utf-8"><title>{html.escape(title)}</title>'
        f'<style>{CSS}</style></head><body>{body}</body></html>', encoding='utf-8')
    pdf = src.with_suffix('.pdf')
    subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-first-run',
                    '--no-pdf-header-footer', f'--print-to-pdf={pdf}',
                    '--virtual-time-budget=3000', f'file://{tmp.resolve()}'],
                   capture_output=True)
    tmp.unlink(missing_ok=True)
    print(f'{src.name} -> {pdf.name}')


if __name__ == '__main__':
    for arg in sys.argv[1:] or ['PRESENTATION_SCRIPT.md', 'DEMO_SCRIPT.md']:
        render(arg)
