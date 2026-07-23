#!/usr/bin/env python3
"""Build the public AI Workflow Readiness field guide.

Run from the repository root:

    python3 -m venv tmp/pdf-venv
    tmp/pdf-venv/bin/pip install -r scripts/requirements-pdf.txt
    tmp/pdf-venv/bin/python scripts/generate-ai-workflow-guide.py

The generator converts the Inter variable WOFF2 already installed by npm into
temporary static fonts, embeds them in the PDF, and writes the stable public
artifact to public/ai-workflow-guide.pdf.
"""

from __future__ import annotations

import argparse
import tempfile
from pathlib import Path

from fontTools.ttLib import TTFont as FontToolsTTFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.lib import colors
from reportlab.lib.colors import Color
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "public" / "ai-workflow-guide.pdf"
INTER_WOFF2 = (
    ROOT
    / "node_modules"
    / "@fontsource-variable"
    / "inter"
    / "files"
    / "inter-latin-wght-normal.woff2"
)

WIDTH, HEIGHT = letter
MARGIN_X = 54
TOP = HEIGHT - 54
BOTTOM = 48

INK = colors.HexColor("#050608")
PANEL = colors.HexColor("#090B10")
PAPER = colors.HexColor("#F4F6FB")
WHITE = colors.HexColor("#FFFFFF")
DIM = colors.HexColor("#A8ABB7")
FAINT = colors.HexColor("#727786")
RULE = colors.HexColor("#282C36")
LIGHT_RULE = colors.HexColor("#D9DCE5")
LIGHT_PANEL = colors.HexColor("#E9ECF4")
COBALT = colors.HexColor("#2851FF")
ULTRAVIOLET = colors.HexColor("#7139FF")
CORAL = colors.HexColor("#FF604D")

FONT_REGULAR = "Inter"
FONT_MEDIUM = "Inter-Medium"
FONT_SEMIBOLD = "Inter-Semibold"
FONT_BOLD = "Inter-Bold"

READINESS_URL = "https://www.keithstaggers.com/workflow-readiness/"
PROJECT_FIT_URL = "https://www.keithstaggers.com/project-fit/"


def static_font(source: Path, destination: Path, weight: int, style: str) -> None:
    """Create a static TTF instance from the checked-in npm WOFF2 asset."""

    font = FontToolsTTFont(source)
    instance = instantiateVariableFont(font, {"wght": weight}, inplace=False)
    family = "Inter Guide"
    full_name = f"{family} {style}"
    postscript_name = f"InterGuide-{style}"
    name_table = instance["name"]
    names = {
        1: family,
        2: style,
        3: f"{full_name};Keith Staggers Studio",
        4: full_name,
        6: postscript_name,
        16: family,
        17: style,
        21: family,
        22: style,
    }
    for name_id, value in names.items():
        name_table.setName(value, name_id, 3, 1, 0x409)
        name_table.setName(value, name_id, 1, 0, 0)
    instance["OS/2"].usWeightClass = weight
    # Keep the embedded font bytes stable across rebuilds. FontTools otherwise
    # refreshes the OpenType modification timestamp when saving each instance.
    instance.recalcTimestamp = False
    instance["head"].created = 2082844800
    instance["head"].modified = 2082844800
    instance.flavor = None
    instance.save(destination)


def register_fonts(temp_dir: Path) -> None:
    if not INTER_WOFF2.exists():
        raise FileNotFoundError(
            "Inter font asset is missing. Run npm ci before generating the guide."
        )

    weights = (
        (FONT_REGULAR, 400, "Regular"),
        (FONT_MEDIUM, 500, "Medium"),
        (FONT_SEMIBOLD, 600, "Semibold"),
        (FONT_BOLD, 700, "Bold"),
    )
    for name, weight, style in weights:
        target = temp_dir / f"inter-{weight}.ttf"
        static_font(INTER_WOFF2, target, weight, style)
        pdfmetrics.registerFont(TTFont(name, str(target)))


def set_fill(canvas: Canvas, color: Color) -> None:
    canvas.setFillColor(color)


def wrap_lines(text: str, font: str, size: float, width: float) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        if not paragraph:
            lines.append("")
            continue
        words = paragraph.split()
        current = words.pop(0)
        for word in words:
            candidate = f"{current} {word}"
            if pdfmetrics.stringWidth(candidate, font, size) <= width:
                current = candidate
            else:
                lines.append(current)
                current = word
        lines.append(current)
    return lines


def draw_text(
    canvas: Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    font: str = FONT_REGULAR,
    size: float = 10.5,
    leading: float | None = None,
    color: Color = INK,
    max_lines: int | None = None,
) -> float:
    leading = leading or size * 1.42
    lines = wrap_lines(text, font, size, width)
    if max_lines is not None and len(lines) > max_lines:
        raise ValueError(f"Text exceeded {max_lines} lines: {text}")
    canvas.setFont(font, size)
    canvas.setFillColor(color)
    for line in lines:
        canvas.drawString(x, y, line)
        y -= leading
    return y


def draw_rule(canvas: Canvas, y: float, color: Color = LIGHT_RULE) -> None:
    canvas.setStrokeColor(color)
    canvas.setLineWidth(0.7)
    canvas.line(MARGIN_X, y, WIDTH - MARGIN_X, y)


def draw_label(
    canvas: Canvas,
    text: str,
    x: float,
    y: float,
    *,
    color: Color = COBALT,
    size: float = 8.3,
) -> None:
    canvas.setFillColor(color)
    canvas.setFont(FONT_BOLD, size)
    canvas.drawString(x, y, text.upper())


def draw_page_shell(
    canvas: Canvas,
    page_number: int,
    section: str,
    *,
    dark: bool = False,
) -> None:
    canvas.setFillColor(PANEL if dark else PAPER)
    canvas.rect(0, 0, WIDTH, HEIGHT, stroke=0, fill=1)
    header_color = DIM if dark else FAINT
    rule_color = RULE if dark else LIGHT_RULE
    draw_label(canvas, "AI WORKFLOW READINESS", MARGIN_X, TOP, color=header_color, size=7.1)
    canvas.setFont(FONT_MEDIUM, 7.1)
    canvas.setFillColor(header_color)
    canvas.drawRightString(WIDTH - MARGIN_X, TOP, f"{section.upper()}  /  {page_number:02d}")
    canvas.setStrokeColor(rule_color)
    canvas.setLineWidth(0.7)
    canvas.line(MARGIN_X, TOP - 14, WIDTH - MARGIN_X, TOP - 14)


def draw_footer(canvas: Canvas, page_number: int, *, dark: bool = False) -> None:
    color = FAINT if dark else FAINT
    canvas.setFillColor(color)
    canvas.setFont(FONT_MEDIUM, 7.1)
    canvas.drawString(MARGIN_X, BOTTOM, "KEITHSTAGGERS.COM")
    canvas.drawRightString(WIDTH - MARGIN_X, BOTTOM, str(page_number))


def draw_title(
    canvas: Canvas,
    eyebrow: str,
    title: str,
    intro: str,
    *,
    dark: bool = False,
) -> float:
    text_color = PAPER if dark else INK
    intro_color = DIM if dark else FAINT
    y = TOP - 62
    draw_label(canvas, eyebrow, MARGIN_X, y, color=COBALT)
    y -= 35
    y = draw_text(
        canvas,
        title,
        MARGIN_X,
        y,
        WIDTH - (MARGIN_X * 2),
        font=FONT_BOLD,
        size=27,
        leading=31,
        color=text_color,
        max_lines=2,
    )
    y -= 8
    canvas.setFillColor(CORAL)
    canvas.rect(MARGIN_X, y, 44, 3, stroke=0, fill=1)
    y -= 24
    y = draw_text(
        canvas,
        intro,
        MARGIN_X,
        y,
        WIDTH - (MARGIN_X * 2),
        font=FONT_REGULAR,
        size=10.6,
        leading=15.5,
        color=intro_color,
        max_lines=4,
    )
    return y


def draw_checkbox(canvas: Canvas, x: float, y: float, label: str) -> None:
    canvas.setStrokeColor(FAINT)
    canvas.setLineWidth(0.9)
    canvas.rect(x, y - 9, 10, 10, stroke=1, fill=0)
    canvas.setFillColor(FAINT)
    canvas.setFont(FONT_MEDIUM, 8.3)
    canvas.drawString(x + 16, y - 7, label)


def draw_evidence_line(canvas: Canvas, x: float, y: float, width: float) -> None:
    canvas.setStrokeColor(LIGHT_RULE)
    canvas.setLineWidth(0.7)
    canvas.line(x, y, x + width, y)


def draw_check_card(
    canvas: Canvas,
    *,
    number: int,
    title: str,
    question: str,
    evidence: str,
    why: str,
    x: float,
    y: float,
    width: float,
    height: float,
) -> None:
    canvas.setFillColor(WHITE)
    canvas.setStrokeColor(LIGHT_RULE)
    canvas.setLineWidth(0.8)
    canvas.roundRect(x, y - height, width, height, 8, stroke=1, fill=1)

    canvas.setFillColor(COBALT)
    canvas.circle(x + 27, y - 28, 16, stroke=0, fill=1)
    canvas.setFillColor(WHITE)
    canvas.setFont(FONT_BOLD, 11)
    canvas.drawCentredString(x + 27, y - 32, f"{number:02d}")

    body_x = x + 54
    body_width = width - 72
    draw_label(canvas, title, body_x, y - 22, color=INK, size=7.4)
    q_y = draw_text(
        canvas,
        question,
        body_x,
        y - 44,
        body_width,
        font=FONT_SEMIBOLD,
        size=13.2,
        leading=17,
        color=INK,
        max_lines=3,
    )
    q_y -= 3
    draw_text(
        canvas,
        why,
        body_x,
        q_y,
        body_width,
        font=FONT_REGULAR,
        size=8.8,
        leading=12.3,
        color=FAINT,
        max_lines=3,
    )

    divider_y = y - height + 72
    canvas.setStrokeColor(LIGHT_RULE)
    canvas.line(body_x, divider_y, x + width - 18, divider_y)
    draw_label(canvas, "EVIDENCE TO LOOK FOR", body_x, divider_y - 18, color=FAINT, size=6.7)
    draw_text(
        canvas,
        evidence,
        body_x,
        divider_y - 34,
        body_width,
        font=FONT_REGULAR,
        size=8.2,
        leading=11,
        color=INK,
        max_lines=2,
    )
    draw_checkbox(canvas, body_x, y - height + 18, "Yes")
    draw_checkbox(canvas, body_x + 72, y - height + 18, "Not yet")


def page_cover(canvas: Canvas) -> None:
    canvas.setFillColor(INK)
    canvas.rect(0, 0, WIDTH, HEIGHT, stroke=0, fill=1)

    # A restrained workflow path. The coral endpoint is the human finish line.
    path_y = 650
    nodes = [86, 190, 294, 398, 502]
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(1.4)
    canvas.line(nodes[0], path_y, nodes[-1], path_y)
    for index, x in enumerate(nodes):
        color = CORAL if index == len(nodes) - 1 else COBALT
        canvas.setFillColor(color)
        canvas.circle(x, path_y, 5 if index < len(nodes) - 1 else 7, stroke=0, fill=1)

    draw_label(canvas, "FREE FIELD GUIDE  /  7 CHECKS", MARGIN_X, 724, color=DIM, size=7.6)
    canvas.setFillColor(DIM)
    canvas.setFont(FONT_MEDIUM, 7.6)
    canvas.drawRightString(WIDTH - MARGIN_X, 724, "NO. 02")

    y = 582
    canvas.setFillColor(PAPER)
    canvas.setFont(FONT_BOLD, 44)
    canvas.drawString(MARGIN_X, y, "AI workflow")
    canvas.setFillColor(COBALT)
    canvas.drawString(MARGIN_X, y - 52, "readiness.")

    y -= 94
    draw_text(
        canvas,
        "Seven questions to decide whether one repeated job is ready for a working AI-assisted system.",
        MARGIN_X,
        y,
        445,
        font=FONT_REGULAR,
        size=15,
        leading=21,
        color=DIM,
        max_lines=3,
    )

    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.8)
    canvas.line(MARGIN_X, 292, WIDTH - MARGIN_X, 292)
    draw_label(canvas, "USE THIS BEFORE YOU BUY A TOOL", MARGIN_X, 265, color=CORAL, size=7.2)
    draw_text(
        canvas,
        "Choose the work. Name the owner. Keep the judgment.",
        MARGIN_X,
        234,
        450,
        font=FONT_SEMIBOLD,
        size=16.5,
        leading=21,
        color=PAPER,
        max_lines=2,
    )

    canvas.setFillColor(PAPER)
    canvas.setFont(FONT_SEMIBOLD, 10)
    canvas.drawString(MARGIN_X, 86, "Keith Staggers")
    canvas.setFillColor(FAINT)
    canvas.setFont(FONT_REGULAR, 8.3)
    canvas.drawString(MARGIN_X, 68, "AI Creator  /  Trainer  /  Workflow Builder")
    canvas.drawRightString(WIDTH - MARGIN_X, 68, "BUILD THE WORKFLOW. KEEP THE JUDGMENT.")
    canvas.showPage()


def page_choose_job(canvas: Canvas) -> None:
    page_number = 2
    draw_page_shell(canvas, page_number, "START")
    y = draw_title(
        canvas,
        "FIRST MOVE",
        "Choose one job, not a department.",
        "Readiness is specific. Score one repeated job at a time. If the job is too broad to describe in one sentence, narrow it before you score it.",
    )

    card_top = y - 18
    card_width = (WIDTH - (MARGIN_X * 2) - 14) / 2
    examples = (
        (
            "TOO BROAD",
            "Use AI in operations.",
            "No clear trigger, owner, input, or finish line.",
            FAINT,
        ),
        (
            "READY TO SCORE",
            "Turn an approved meeting transcript into a reviewed client recap.",
            "One job. One output. One named review point.",
            COBALT,
        ),
    )
    for index, (label, example, note, accent) in enumerate(examples):
        x = MARGIN_X + index * (card_width + 14)
        canvas.setFillColor(WHITE)
        canvas.setStrokeColor(LIGHT_RULE)
        canvas.roundRect(x, card_top - 121, card_width, 121, 7, stroke=1, fill=1)
        canvas.setFillColor(accent)
        canvas.rect(x, card_top - 121, 4, 121, stroke=0, fill=1)
        draw_label(canvas, label, x + 18, card_top - 24, color=accent, size=6.8)
        draw_text(
            canvas,
            example,
            x + 18,
            card_top - 48,
            card_width - 34,
            font=FONT_SEMIBOLD,
            size=10.5,
            leading=14,
            color=INK,
            max_lines=3,
        )
        draw_text(
            canvas,
            note,
            x + 18,
            card_top - 94,
            card_width - 34,
            font=FONT_REGULAR,
            size=7.8,
            leading=10.5,
            color=FAINT,
            max_lines=2,
        )

    form_top = card_top - 158
    draw_label(canvas, "NAME YOUR JOB", MARGIN_X, form_top, color=INK, size=7.4)
    prompts = (
        "When this happens...",
        "One owner needs to...",
        "Using this input...",
        "And the job is done when...",
    )
    y_line = form_top - 31
    for prompt in prompts:
        canvas.setFillColor(FAINT)
        canvas.setFont(FONT_MEDIUM, 8.5)
        canvas.drawString(MARGIN_X, y_line, prompt)
        draw_evidence_line(canvas, 190, y_line - 2, WIDTH - MARGIN_X - 190)
        y_line -= 39

    process_y = y_line - 12
    draw_label(canvas, "THE FOUR-PART METHOD", MARGIN_X, process_y, color=INK, size=7.4)
    labels = ("FIND THE WORK", "BOUND THE AI JOB", "KEEP THE HUMAN CHECK", "DOCUMENT NEXT USE")
    track_y = process_y - 42
    track_width = WIDTH - (MARGIN_X * 2)
    segment_width = track_width / 4
    for index, label in enumerate(labels):
        x = MARGIN_X + index * segment_width
        canvas.setFillColor(COBALT if index < 3 else CORAL)
        canvas.circle(x + 6, track_y + 4, 5, stroke=0, fill=1)
        if index < 3:
            canvas.setStrokeColor(RULE)
            canvas.line(x + 12, track_y + 4, x + segment_width - 6, track_y + 4)
        draw_text(
            canvas,
            label,
            x,
            track_y - 18,
            segment_width - 10,
            font=FONT_BOLD,
            size=6.7,
            leading=9,
            color=FAINT,
            max_lines=2,
        )

    draw_footer(canvas, page_number)
    canvas.showPage()


def page_checks_1_2(canvas: Canvas) -> None:
    page_number = 3
    draw_page_shell(canvas, page_number, "CHECKS 01-02")
    y = draw_title(
        canvas,
        "FOUNDATION",
        "Does the work deserve a system?",
        "A workflow install needs a repeatable job and one accountable owner. Without both, the project is still an experiment.",
    )
    x = MARGIN_X
    width = WIDTH - (MARGIN_X * 2)
    draw_check_card(
        canvas,
        number=1,
        title="REPEATED JOB",
        question="Does the same job happen often enough to justify a system?",
        why="Automating a rare or constantly changing task creates more maintenance than value.",
        evidence="List the last five runs. The trigger and core steps should look recognizably similar.",
        x=x,
        y=y - 16,
        width=width,
        height=196,
    )
    draw_check_card(
        canvas,
        number=2,
        title="ACCOUNTABLE OWNER",
        question="Is one person responsible for the outcome and able to approve change?",
        why="A committee can advise. One owner must decide what works, what fails, and what ships.",
        evidence="Write one name and one decision they own. If you need a list of names, this is not ready.",
        x=x,
        y=y - 228,
        width=width,
        height=196,
    )
    draw_footer(canvas, page_number)
    canvas.showPage()


def page_checks_3_4(canvas: Canvas) -> None:
    page_number = 4
    draw_page_shell(canvas, page_number, "CHECKS 03-04")
    y = draw_title(
        canvas,
        "BOUNDARIES",
        "Can you see the start and the finish?",
        "Good workflows have a stable trigger, a usable input, and an observable finish line. If those move every time, the system cannot be tested honestly.",
    )
    x = MARGIN_X
    width = WIDTH - (MARGIN_X * 2)
    draw_check_card(
        canvas,
        number=3,
        title="STABLE INPUT",
        question="Does the job begin with an input you can name, access, and inspect?",
        why="The system needs a dependable starting point, not details scattered across memory, messages, and tabs.",
        evidence="Name the trigger and input: a form, approved transcript, report, request, or structured file.",
        x=x,
        y=y - 16,
        width=width,
        height=196,
    )
    draw_check_card(
        canvas,
        number=4,
        title="CLEAR FINISH LINE",
        question="Can two people agree on what done means?",
        why="Speed is useless when no one can tell whether the output is complete, correct, and ready to use.",
        evidence="Write the observable result, required fields, format, destination, and unacceptable misses.",
        x=x,
        y=y - 228,
        width=width,
        height=196,
    )
    draw_footer(canvas, page_number)
    canvas.showPage()


def page_checks_5_6(canvas: Canvas) -> None:
    page_number = 5
    draw_page_shell(canvas, page_number, "CHECKS 05-06")
    y = draw_title(
        canvas,
        "PROOF",
        "Who checks it, and how will you test?",
        "The AI can accelerate a draft or route. A person remains accountable for facts, exceptions, judgment, and the final decision.",
    )
    x = MARGIN_X
    width = WIDTH - (MARGIN_X * 2)
    draw_check_card(
        canvas,
        number=5,
        title="HUMAN APPROVAL",
        question="Is a named person responsible for reviewing the result before it matters?",
        why="A useful workflow makes the human check explicit. It does not hide responsibility behind the tool.",
        evidence="Name the reviewer, what they verify, the exceptions they own, and the final action they approve.",
        x=x,
        y=y - 16,
        width=width,
        height=196,
    )
    draw_check_card(
        canvas,
        number=6,
        title="REPRESENTATIVE TESTS",
        question="Do you have ten real examples that represent normal work and edge cases?",
        why="A polished demo proves one path. A test set reveals whether the workflow survives actual variation.",
        evidence="Collect normal, incomplete, unusual, high-risk, and unacceptable cases. Remove restricted data first.",
        x=x,
        y=y - 228,
        width=width,
        height=196,
    )
    draw_footer(canvas, page_number)
    canvas.showPage()


def page_check_7(canvas: Canvas) -> None:
    page_number = 6
    draw_page_shell(canvas, page_number, "CHECK 07")
    y = draw_title(
        canvas,
        "GUARDRAIL",
        "Can you test it in a safe, owned path?",
        "A workflow is not ready when its first version depends on data, access, or tools your organization has not approved.",
    )

    card_y = y - 12
    canvas.setFillColor(INK)
    canvas.roundRect(MARGIN_X, card_y - 174, WIDTH - (MARGIN_X * 2), 174, 8, stroke=0, fill=1)
    canvas.setFillColor(CORAL)
    canvas.circle(MARGIN_X + 28, card_y - 31, 16, stroke=0, fill=1)
    canvas.setFillColor(WHITE)
    canvas.setFont(FONT_BOLD, 11)
    canvas.drawCentredString(MARGIN_X + 28, card_y - 35, "07")
    draw_label(canvas, "SAFE DATA AND CLIENT-OWNED TOOLS", MARGIN_X + 56, card_y - 26, color=CORAL, size=7.2)
    draw_text(
        canvas,
        "Can you build and test with permitted data inside a path the client controls?",
        MARGIN_X + 56,
        card_y - 53,
        WIDTH - (MARGIN_X * 2) - 78,
        font=FONT_SEMIBOLD,
        size=14,
        leading=18,
        color=PAPER,
        max_lines=2,
    )
    draw_text(
        canvas,
        "Evidence: list the approved tools, access owner, data class, retention rule, and a safe rollback path.",
        MARGIN_X + 56,
        card_y - 108,
        WIDTH - (MARGIN_X * 2) - 78,
        font=FONT_REGULAR,
        size=8.8,
        leading=12.5,
        color=DIM,
        max_lines=3,
    )
    draw_checkbox(canvas, MARGIN_X + 56, card_y - 151, "Yes")
    draw_checkbox(canvas, MARGIN_X + 128, card_y - 151, "Not yet")

    stop_top = card_y - 208
    draw_label(canvas, "STOP SIGNS", MARGIN_X, stop_top, color=INK, size=7.4)
    stop_items = (
        ("Restricted data", "Sensitive, regulated, client, patient, or employee data has no approved test path."),
        ("Hidden access", "The workflow needs shared passwords, personal accounts, or credentials with no named owner."),
        ("No recovery", "There is no manual fallback, version history, or clear way to undo a bad run."),
    )
    y_item = stop_top - 34
    for title, description in stop_items:
        canvas.setFillColor(CORAL)
        canvas.circle(MARGIN_X + 5, y_item + 3, 4, stroke=0, fill=1)
        canvas.setFillColor(INK)
        canvas.setFont(FONT_SEMIBOLD, 9.2)
        canvas.drawString(MARGIN_X + 18, y_item, title)
        draw_text(
            canvas,
            description,
            MARGIN_X + 128,
            y_item,
            WIDTH - MARGIN_X - (MARGIN_X + 128),
            font=FONT_REGULAR,
            size=8.3,
            leading=11,
            color=FAINT,
            max_lines=2,
        )
        y_item -= 47

    canvas.setFillColor(LIGHT_PANEL)
    canvas.roundRect(MARGIN_X, 78, WIDTH - (MARGIN_X * 2), 45, 5, stroke=0, fill=1)
    draw_text(
        canvas,
        "This guide is educational, not legal, privacy, security, or compliance advice. Follow your organization's policies and verify tool terms before using real data.",
        MARGIN_X + 14,
        105,
        WIDTH - (MARGIN_X * 2) - 28,
        font=FONT_REGULAR,
        size=7.4,
        leading=10,
        color=FAINT,
        max_lines=3,
    )
    draw_footer(canvas, page_number)
    canvas.showPage()


def page_scorecard(canvas: Canvas) -> None:
    page_number = 7
    draw_page_shell(canvas, page_number, "SCORE")
    y = draw_title(
        canvas,
        "SCORECARD",
        "Count evidence, not enthusiasm.",
        "Give one point only when you can name the evidence. A confident guess is still not yet. The score tells you the next move, not whether the idea is good.",
    )

    rows = (
        ("01", "Repeated job", "Last five runs look similar"),
        ("02", "Accountable owner", "One name, one decision"),
        ("03", "Stable input", "Trigger and input are named"),
        ("04", "Clear finish line", "Done and failure are observable"),
        ("05", "Human approval", "Reviewer and check are explicit"),
        ("06", "Representative tests", "Ten varied cases are ready"),
        ("07", "Safe owned path", "Approved data, tools, and rollback"),
    )
    table_x = MARGIN_X
    table_top = y - 12
    table_width = WIDTH - (MARGIN_X * 2)
    col_num = 34
    col_title = 145
    col_yes = 44
    col_not = 58
    row_height = 34

    canvas.setFillColor(INK)
    canvas.rect(table_x, table_top - 27, table_width, 27, stroke=0, fill=1)
    headers = (
        (table_x + 10, "#"),
        (table_x + col_num, "CHECK"),
        (table_x + col_num + col_title, "EVIDENCE"),
        (table_x + table_width - col_yes - col_not, "YES"),
        (table_x + table_width - col_not, "NOT YET"),
    )
    for x, header in headers:
        draw_label(canvas, header, x, table_top - 18, color=DIM, size=6.3)

    for index, (number, title, evidence) in enumerate(rows):
        row_top = table_top - 27 - (index * row_height)
        fill = WHITE if index % 2 == 0 else LIGHT_PANEL
        canvas.setFillColor(fill)
        canvas.rect(table_x, row_top - row_height, table_width, row_height, stroke=0, fill=1)
        canvas.setFillColor(COBALT)
        canvas.setFont(FONT_BOLD, 8.4)
        canvas.drawString(table_x + 10, row_top - 23, number)
        canvas.setFillColor(INK)
        canvas.setFont(FONT_SEMIBOLD, 8.4)
        canvas.drawString(table_x + col_num, row_top - 23, title)
        canvas.setFillColor(FAINT)
        canvas.setFont(FONT_REGULAR, 7.6)
        canvas.drawString(table_x + col_num + col_title, row_top - 23, evidence)
        box_y = row_top - 26
        canvas.setStrokeColor(FAINT)
        canvas.rect(table_x + table_width - col_yes - col_not + 8, box_y, 10, 10, stroke=1, fill=0)
        canvas.rect(table_x + table_width - col_not + 17, box_y, 10, 10, stroke=1, fill=0)

    total_y = table_top - 27 - (len(rows) * row_height) - 22
    draw_label(canvas, "TOTAL", table_x, total_y, color=INK, size=7.1)
    canvas.setStrokeColor(INK)
    canvas.line(table_x + 56, total_y - 2, table_x + 91, total_y - 2)
    canvas.setFillColor(FAINT)
    canvas.setFont(FONT_MEDIUM, 8.2)
    canvas.drawString(table_x + 98, total_y - 4, "/ 7")

    bands = (
        ("6-7", "READY FOR FIT", "Only if 05 and 07 are Yes. Then take the full check and send a Project Fit brief.", COBALT),
        ("3-5", "FIX THE GAPS", "Choose the weakest condition. Observe five more runs, then score again.", ULTRAVIOLET),
        ("0-2", "KEEP IT MANUAL", "Narrow the job and document the current path before adding AI.", CORAL),
    )
    band_y = total_y - 24
    for score, label, action, color in bands:
        canvas.setFillColor(color)
        canvas.roundRect(table_x, band_y - 38, 54, 38, 4, stroke=0, fill=1)
        canvas.setFillColor(WHITE)
        canvas.setFont(FONT_BOLD, 12)
        canvas.drawCentredString(table_x + 27, band_y - 24, score)
        canvas.setFillColor(INK)
        canvas.setFont(FONT_BOLD, 7.8)
        canvas.drawString(table_x + 70, band_y - 14, label)
        draw_text(
            canvas,
            action,
            table_x + 70,
            band_y - 29,
            table_width - 70,
            font=FONT_REGULAR,
            size=7.7,
            leading=10,
            color=FAINT,
            max_lines=2,
        )
        band_y -= 46

    draw_footer(canvas, page_number)
    canvas.showPage()


def page_brief(canvas: Canvas) -> None:
    page_number = 8
    draw_page_shell(canvas, page_number, "BRIEF")
    y = draw_title(
        canvas,
        "ONE-PAGE BRIEF",
        "Turn your score into a buildable brief.",
        "Use this after a six or seven only when checks 05 and 07 are Yes. It is the useful starting point for Project Fit and exposes the exact gap when the job is not ready.",
    )

    prompts = (
        ("JOB", "What repeated job are we changing?"),
        ("OWNER", "Who owns the outcome and approves change?"),
        ("TRIGGER + INPUT", "What starts the job, and what material enters the system?"),
        ("FINISH LINE", "What does done look like, and what counts as failure?"),
        ("HUMAN CHECK", "Who reviews what before the result is used?"),
        ("TEST SET", "Which ten cases represent normal work and edge conditions?"),
        ("BOUNDARIES", "Which tools, data, access, retention, and rollback rules apply?"),
    )

    row_top = y - 10
    row_height = 55
    for index, (label, prompt) in enumerate(prompts):
        top = row_top - (index * row_height)
        canvas.setFillColor(WHITE if index % 2 == 0 else LIGHT_PANEL)
        canvas.roundRect(MARGIN_X, top - 48, WIDTH - (MARGIN_X * 2), 48, 4, stroke=0, fill=1)
        draw_label(canvas, label, MARGIN_X + 12, top - 18, color=COBALT, size=6.3)
        draw_text(
            canvas,
            prompt,
            MARGIN_X + 108,
            top - 18,
            WIDTH - MARGIN_X - (MARGIN_X + 108) - 12,
            font=FONT_REGULAR,
            size=8,
            leading=10.5,
            color=FAINT,
            max_lines=2,
        )
        draw_evidence_line(canvas, MARGIN_X + 108, top - 38, WIDTH - MARGIN_X - (MARGIN_X + 108) - 12)

    cta_y = 82
    canvas.setFillColor(INK)
    canvas.roundRect(MARGIN_X, cta_y, WIDTH - (MARGIN_X * 2), 55, 6, stroke=0, fill=1)
    draw_label(canvas, "READY?", MARGIN_X + 16, cta_y + 34, color=CORAL, size=6.6)
    canvas.setFillColor(PAPER)
    canvas.setFont(FONT_SEMIBOLD, 9.3)
    canvas.drawString(MARGIN_X + 16, cta_y + 17, "Open the online readiness check and send the brief when the evidence is real.")
    canvas.linkURL(
        READINESS_URL,
        (MARGIN_X, cta_y, WIDTH - MARGIN_X, cta_y + 55),
        relative=0,
        thickness=0,
    )
    draw_footer(canvas, page_number)
    canvas.showPage()


def page_back(canvas: Canvas) -> None:
    page_number = 9
    canvas.setFillColor(INK)
    canvas.rect(0, 0, WIDTH, HEIGHT, stroke=0, fill=1)
    draw_page_shell(canvas, page_number, "NEXT", dark=True)

    draw_label(canvas, "ONE REPEATED JOB", MARGIN_X, 638, color=CORAL, size=7.8)
    canvas.setFillColor(PAPER)
    canvas.setFont(FONT_BOLD, 32)
    canvas.drawString(MARGIN_X, 591, "One working system.")
    canvas.setFillColor(COBALT)
    canvas.drawString(MARGIN_X, 551, "One documented handoff.")

    draw_text(
        canvas,
        "The AI Workflow Install Sprint turns one qualified repeated job into a tested system inside a client-owned path. Human approval stays at the decision point.",
        MARGIN_X,
        500,
        454,
        font=FONT_REGULAR,
        size=12,
        leading=17,
        color=DIM,
        max_lines=4,
    )

    button_y = 392
    canvas.setFillColor(CORAL)
    canvas.roundRect(MARGIN_X, button_y, 243, 44, 5, stroke=0, fill=1)
    canvas.setFillColor(INK)
    canvas.setFont(FONT_BOLD, 8.5)
    canvas.drawString(MARGIN_X + 16, button_y + 17, "TAKE THE READINESS CHECK")
    canvas.linkURL(
        READINESS_URL,
        (MARGIN_X, button_y, MARGIN_X + 243, button_y + 44),
        relative=0,
        thickness=0,
    )
    canvas.setFillColor(COBALT)
    canvas.setFont(FONT_MEDIUM, 7.8)
    canvas.drawString(MARGIN_X, button_y - 21, READINESS_URL)

    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.8)
    canvas.line(MARGIN_X, 318, WIDTH - MARGIN_X, 318)

    draw_label(canvas, "ALREADY HAVE THE EVIDENCE?", MARGIN_X, 287, color=DIM, size=6.8)
    canvas.setFillColor(PAPER)
    canvas.setFont(FONT_SEMIBOLD, 10.5)
    canvas.drawString(MARGIN_X, 263, "Send a qualified Project Fit brief.")
    canvas.setFillColor(COBALT)
    canvas.setFont(FONT_BOLD, 8)
    canvas.drawString(MARGIN_X, 238, PROJECT_FIT_URL)
    canvas.linkURL(
        PROJECT_FIT_URL,
        (MARGIN_X, 226, MARGIN_X + 330, 251),
        relative=0,
        thickness=0,
    )

    canvas.setFillColor(PAPER)
    canvas.setFont(FONT_SEMIBOLD, 10)
    canvas.drawString(MARGIN_X, 112, "Keith Staggers")
    canvas.setFillColor(FAINT)
    canvas.setFont(FONT_REGULAR, 8.2)
    canvas.drawString(MARGIN_X, 94, "AI Creator  /  Trainer  /  Workflow Builder")
    canvas.drawRightString(WIDTH - MARGIN_X, 94, "KEITHSTAGGERS.COM")
    canvas.setFillColor(FAINT)
    canvas.setFont(FONT_MEDIUM, 7.1)
    canvas.drawRightString(WIDTH - MARGIN_X, BOTTOM, str(page_number))
    canvas.showPage()


def build_pdf(output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="ai-workflow-guide-fonts-") as font_dir:
        register_fonts(Path(font_dir))
        canvas = Canvas(
            str(output),
            pagesize=letter,
            pageCompression=1,
            invariant=1,
        )
        canvas.setTitle("AI Workflow Readiness")
        canvas.setAuthor("Keith Staggers")
        canvas.setSubject("Seven checks for deciding whether a repeated job is ready for an AI-assisted workflow.")
        canvas.setCreator("Keith Staggers Studio")
        canvas.setKeywords("AI workflow readiness, workflow design, human approval, field guide")

        for page in (
            page_cover,
            page_choose_job,
            page_checks_1_2,
            page_checks_3_4,
            page_checks_5_6,
            page_check_7,
            page_scorecard,
            page_brief,
            page_back,
        ):
            page(canvas)
        canvas.save()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help=f"PDF destination (default: {DEFAULT_OUTPUT})",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    build_pdf(args.output.resolve())
    print(args.output.resolve())


if __name__ == "__main__":
    main()
