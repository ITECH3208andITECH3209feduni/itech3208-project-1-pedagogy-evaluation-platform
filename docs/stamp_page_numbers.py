#!/usr/bin/env python3
"""Stamp "Page N of M" onto PEP_Sprint3_Report.pdf.

Chrome's headless printer has no support for CSS paged-media margin boxes, and
its built-in footer prints the local file:// path, which is not acceptable on a
submitted document. This overlays the page numbers instead.

The title page is left unnumbered, by convention.

Usage:  python3 stamp_page_numbers.py [input.pdf] [output.pdf]
"""

import sys
from io import BytesIO

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import Color
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

MM = 72 / 25.4
GREY = Color(0.42, 0.40, 0.36)


def number_overlay(text, size):
    """A single-page PDF containing only the footer text."""
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=size)
    c.setFont("Helvetica", 7.5)
    c.setFillColor(GREY)
    c.drawCentredString(size[0] / 2, 9 * MM, text)
    c.save()
    buf.seek(0)
    return PdfReader(buf).pages[0]


def main(src="PEP_Sprint3_Report.pdf", dest=None):
    dest = dest or src
    reader = PdfReader(src)
    writer = PdfWriter()
    total = len(reader.pages)

    for i, page in enumerate(reader.pages, start=1):
        if i > 1:  # title page stays unnumbered
            box = page.mediabox
            size = (float(box.width), float(box.height))
            page.merge_page(number_overlay(f"Page {i} of {total}", size))
        writer.add_page(page)

    writer.add_metadata({
        "/Title": "Pedagogy Evaluation Platform — Sprint 3 Report",
        "/Author": "Mushfiqur Rahman, Shafiullah Anik, Albin Roy, Merajun Nabi",
        "/Subject": "ITECH3208 IT Capstone Project 1 — Sprint 3",
    })

    with open(dest, "wb") as fh:
        writer.write(fh)
    print(f"Stamped {total} pages -> {dest}")


if __name__ == "__main__":
    main(*sys.argv[1:3])
