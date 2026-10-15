"""Draws the four proof screens in public/proof/ as crisp SVGs.

They replace blurred screenshots of Ryan's real client trackers. Each one is a
redraw: the layout and the totals come from the real work (287 leads tracked,
170 outreach-ready, 57 high priority, 50 connection requests, 149 Tier A and
78 Tier B in one sourcing batch); every name, practice and contact is a grey
redaction bar. Do not add numbers here that did not come from Ryan.

Run: python3 scripts/make-proofs.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'proof'
W, H = 1200, 760
FONT = "Figtree, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

NAVY = '#0B1E3F'
INK = '#1F2A3D'
MUTED = '#6B7488'
LINE = '#E3E7EE'
GRID = '#EEF1F5'
BG = '#FFFFFF'
REDACT = '#D5DAE3'
REDACT_2 = '#E4E8EF'
ORANGE = '#FF7A1A'
GREEN = '#188038'
BLUE = '#0A66C2'
AMBER = '#F2A100'
PURPLE = '#7C3AED'


def esc(t: str) -> str:
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def text(x, y, t, size=14, weight=500, fill=INK, anchor='start', extra=''):
    return (f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{fill}" '
            f'text-anchor="{anchor}" {extra}>{esc(t)}</text>')


def rect(x, y, w, h, fill, r=0, stroke=None, sw=1):
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"{s}/>'


def bar(x, y, w, h=10, fill=REDACT):
    """A redaction bar standing in for private text."""
    return rect(x, y - h + 1, w, h, fill, r=h / 2)


def pill(x, y, label, color, size=12):
    w = len(label) * size * 0.56 + 18
    return (rect(x, y - size - 3, w, size + 10, color + '1F', r=(size + 10) / 2)
            + text(x + w / 2, y + 1, label, size, 650, color, 'middle'))


def window(title, body, tabs):
    """Spreadsheet-style window: title bar, toolbar strip, body, sheet tabs."""
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="{FONT}">',
        f'<title>{esc(title)} (redrawn, private details hidden)</title>',
        rect(0, 0, W, H, BG, r=18),
        rect(0.5, 0.5, W - 1, H - 1, 'none', r=18, stroke=LINE),
        # title bar
        rect(0, 0, W, 52, '#F6F7FA', r=18), rect(0, 34, W, 18, '#F6F7FA'),
        '<circle cx="26" cy="26" r="6" fill="#FF5F57"/><circle cx="46" cy="26" r="6" fill="#FEBC2E"/><circle cx="66" cy="26" r="6" fill="#28C840"/>',
        text(96, 31, title, 15, 650, INK),
        bar(W - 210, 31, 120, 10, REDACT_2), rect(W - 76, 14, 52, 24, GREEN, r=12),
        text(W - 50, 31, 'Share', 12, 700, '#FFFFFF', 'middle'),
        f'<line x1="0" y1="52" x2="{W}" y2="52" stroke="{LINE}"/>',
        # toolbar strip
        *[rect(24 + i * 34, 64, 22, 14, GRID, r=4) for i in range(14)],
        f'<line x1="0" y1="90" x2="{W}" y2="90" stroke="{LINE}"/>',
        body,
        # sheet tabs
        f'<line x1="0" y1="{H - 40}" x2="{W}" y2="{H - 40}" stroke="{LINE}"/>',
    ]
    x = 24
    for i, t in enumerate(tabs):
        w = len(t) * 7.4 + 28
        if i == 0:
            parts.append(rect(x, H - 34, w, 26, '#E8F0FE', r=6))
            parts.append(text(x + w / 2, H - 16, t, 12.5, 700, BLUE, 'middle'))
        else:
            parts.append(text(x + w / 2, H - 16, t, 12.5, 550, MUTED, 'middle'))
        x += w + 8
    parts.append('</svg>')
    return '\n'.join(parts)


def kpi(x, y, w, value, label, color):
    return (rect(x, y, w, 96, '#FFFFFF', r=12, stroke=LINE)
            + rect(x, y, 5, 96, color, r=2)
            + text(x + 22, y + 50, value, 36, 750, NAVY)
            + text(x + 22, y + 76, label, 13.5, 600, MUTED))


def dashboard():
    b = [rect(24, 104, W - 48, 40, NAVY, r=8),
         text(44, 130, 'Lead generation dashboard', 17, 700, '#FFFFFF'),
         text(W - 44, 130, 'Healthcare credentialing client', 13, 600, '#AFC0DA', 'end')]
    w = (W - 48 - 3 * 16) / 4
    for i, (v, l, c) in enumerate([('287', 'Leads tracked', BLUE), ('170', 'Outreach-ready', GREEN),
                                   ('57', 'High priority', ORANGE), ('50', 'Connection requests sent', PURPLE)]):
        b.append(kpi(24 + i * (w + 16), 160, w, v, l, c))

    # Tier chart
    cx, cy, cw, ch = 24, 272, 560, 200
    b += [rect(cx, cy, cw, ch, '#FFFFFF', r=12, stroke=LINE),
          text(cx + 20, cy + 30, 'Prospects by tier (one sourcing batch)', 14, 700, INK)]
    for i, (lab, val, col) in enumerate([('Tier A', 149, GREEN), ('Tier B', 78, AMBER)]):
        yy = cy + 72 + i * 56
        full = cw - 170
        b += [text(cx + 20, yy + 18, lab, 13.5, 650, INK),
              rect(cx + 90, yy, full, 26, GRID, r=6),
              rect(cx + 90, yy, full * val / 149, 26, col, r=6),
              text(cx + 90 + full * val / 149 - 10, yy + 18, str(val), 13.5, 750, '#FFFFFF', 'end')]

    # Share donut
    dx, dy, dw = 600, 272, W - 24 - 600
    share = 170 / 287
    import math
    r_, c0x, c0y = 62, dx + 110, dy + 104
    circ = 2 * math.pi * r_
    b += [rect(dx, dy, dw, ch, '#FFFFFF', r=12, stroke=LINE),
          text(dx + 20, dy + 30, 'Ready for outreach', 14, 700, INK),
          f'<circle cx="{c0x}" cy="{c0y}" r="{r_}" fill="none" stroke="{GRID}" stroke-width="22"/>',
          f'<circle cx="{c0x}" cy="{c0y}" r="{r_}" fill="none" stroke="{GREEN}" stroke-width="22" '
          f'stroke-dasharray="{circ * share:.1f} {circ:.1f}" transform="rotate(-90 {c0x} {c0y})" stroke-linecap="round"/>',
          text(c0x, c0y + 9, f'{round(share * 100)}%', 26, 750, NAVY, 'middle'),
          text(dx + 210, dy + 86, '170 of 287 tracked leads', 14, 650, INK),
          text(dx + 210, dy + 110, 'verified and outreach-ready', 13.5, 500, MUTED),
          rect(dx + 210, dy + 132, 12, 12, GREEN, r=3), text(dx + 230, dy + 143, 'Outreach-ready', 12.5, 600, MUTED),
          rect(dx + 350, dy + 132, 12, 12, GRID, r=3), text(dx + 370, dy + 143, 'Still verifying', 12.5, 600, MUTED)]

    # Next actions table
    ty = 488
    b += [rect(24, ty, W - 48, 220, '#FFFFFF', r=12, stroke=LINE),
          text(44, ty + 30, 'Next actions', 14, 700, INK)]
    cols = [(44, 'Prospect'), (300, 'Practice'), (560, 'Stage'), (760, 'Priority'), (920, 'Next step')]
    for x, t in cols:
        b.append(text(x, ty + 62, t, 12, 700, MUTED))
    b.append(f'<line x1="44" y1="{ty + 74}" x2="{W - 44}" y2="{ty + 74}" stroke="{LINE}"/>')
    rows = [('Request sent', BLUE, 'High', ORANGE, 'Follow up Thu'),
            ('Connected', GREEN, 'High', ORANGE, 'Send intro email'),
            ('Email sent', PURPLE, 'Medium', AMBER, 'Follow up Mon'),
            ('Request sent', BLUE, 'Medium', AMBER, 'Wait for accept')]
    for i, (st, sc, pr, pc, nx) in enumerate(rows):
        yy = ty + 104 + i * 30
        b += [bar(44, yy - 2, 150 + (i * 23) % 60), bar(300, yy - 2, 170 - (i * 17) % 50, fill=REDACT_2),
              pill(560, yy, st, sc, 11.5), pill(760, yy, pr, pc, 11.5), text(920, yy, nx, 13, 550, INK)]
    return window('Lead Generation Tracker', '\n'.join(b), ['Dashboard', 'Pipeline', 'LinkedIn', 'Newly licensed', 'SOP'])


def linkedin():
    b = [rect(24, 104, W - 48, 40, NAVY, r=8),
         text(44, 130, 'LinkedIn lead tracker', 17, 700, '#FFFFFF')]
    # summary chips in header
    for i, (v, l) in enumerate([('50', 'requests sent'), ('57', 'high priority')]):
        x = W - 44 - (i + 1) * 170 + 10
        b += [text(x, 130, v, 16, 750, ORANGE), text(x + 26, 130, l, 13, 600, '#AFC0DA')]
    groups = [(24, 470, 'Prospect', BLUE), (494, 230, 'Status', GREEN), (724, 160, 'Priority', AMBER), (884, W - 24 - 884, 'Next action', BLUE)]
    for x, w, t, c in groups:
        b += [rect(x, 156, w - 4, 30, c, r=6), text(x + 14, 176, t, 13, 700, '#FFFFFF')]
    sub = [(38, 'Name'), (220, 'Title'), (360, 'Practice'), (508, 'Stage'), (738, 'Level'), (898, 'Step and date')]
    for x, t in sub:
        b.append(text(x, 210, t, 12, 700, MUTED))
    data = [('Request sent', BLUE, 'High', ORANGE, 'Follow up in 3 days'),
            ('Connected', GREEN, 'High', ORANGE, 'Send intro message'),
            ('Messaged', PURPLE, 'High', ORANGE, 'Await reply'),
            ('Request sent', BLUE, 'Medium', AMBER, 'Follow up in 3 days'),
            ('Connected', GREEN, 'Medium', AMBER, 'Share booking link'),
            ('Request sent', BLUE, 'High', ORANGE, 'Follow up in 5 days'),
            ('Messaged', PURPLE, 'Medium', AMBER, 'Await reply'),
            ('Request sent', BLUE, 'Medium', AMBER, 'Follow up in 3 days'),
            ('Connected', GREEN, 'High', ORANGE, 'Send intro message'),
            ('Request sent', BLUE, 'Medium', AMBER, 'Follow up in 5 days'),
            ('Not a fit', MUTED, 'Low', MUTED, 'Archive'),
            ('Request sent', BLUE, 'High', ORANGE, 'Follow up in 3 days')]
    for i, (st, sc, pr, pc, nx) in enumerate(data):
        yy = 246 + i * 37
        if i % 2 == 0:
            b.append(rect(24, yy - 24, W - 48, 37, '#F8FAFC'))
        b += [bar(38, yy - 4, 120 + (i * 29) % 50), bar(220, yy - 4, 100 - (i * 13) % 30, fill=REDACT_2),
              bar(360, yy - 4, 110 - (i * 11) % 40, fill=REDACT_2),
              pill(508, yy, st, sc, 11.5), pill(738, yy, pr, pc, 11.5), text(898, yy, nx, 13, 550, INK)]
    return window('LinkedIn Lead Tracker', '\n'.join(b), ['Tracker', 'Accepted', 'Messages', 'Archive'])


def pipeline():
    YEL = '#FFF8DC'
    b = [rect(24, 104, W - 48, 40, NAVY, r=8),
         text(44, 130, 'Master prospect pipeline', 17, 700, '#FFFFFF'),
         text(W - 44, 130, 'One sourcing batch: 149 Tier A, 78 Tier B', 13, 650, '#FFC48F', 'end')]
    cols = [(38, 'Name'), (210, 'Record type'), (350, 'Specialty'), (480, 'State'), (560, 'Licensed'),
            (670, 'Source'), (820, 'Tier'), (900, 'Next step')]
    b.append(rect(24, 156, W - 48, 32, '#1F3A66', r=6))
    for x, t in cols:
        b.append(text(x, 177, t, 12.5, 700, '#FFFFFF'))
    specs = ['LPC', 'LCSW', 'LMFT', 'PMHNP', 'LPC', 'Psychologist', 'LCSW', 'LMFT', 'LPC', 'LCSW', 'PMHNP', 'LPC', 'LMFT']
    types = ['Individual', 'New practice', 'Individual', 'Individual', 'New practice', 'Individual', 'Individual',
             'New practice', 'Individual', 'Individual', 'New practice', 'Individual', 'Individual']
    states = ['GA', 'GA', 'TX', 'GA', 'GA', 'TX', 'GA', 'GA', 'TX', 'GA', 'GA', 'GA', 'TX']
    srcs = ['State board', 'NPI Registry', 'Sales Navigator', 'State board', 'NPI Registry', 'Practice site',
            'State board', 'Sales Navigator', 'NPI Registry', 'State board', 'Practice site', 'NPI Registry', 'State board']
    tiers = ['A', 'A', 'B', 'A', 'A', 'B', 'A', 'B', 'A', 'A', 'B', 'A', 'B']
    steps = ['Verify email', 'Ready', 'Ready', 'Confirm license', 'Ready', 'Verify email', 'Ready', 'Ready',
             'Confirm license', 'Ready', 'Verify email', 'Ready', 'Ready']
    for i in range(13):
        yy = 214 + i * 36
        b.append(rect(24, yy - 24, W - 48, 36, YEL if i % 2 == 0 else '#FFFDF3'))
        tcol = GREEN if tiers[i] == 'A' else AMBER
        scol = GREEN if steps[i] == 'Ready' else MUTED
        b += [bar(38, yy - 4, 110 + (i * 23) % 45), text(210, yy, types[i], 13, 550, INK),
              text(350, yy, specs[i], 13, 650, INK), text(480, yy, states[i], 13, 550, INK),
              text(560, yy, 'Last 6-12 mo', 13, 550, MUTED), text(670, yy, srcs[i], 13, 550, INK),
              pill(820, yy, tiers[i], tcol, 11.5), text(900, yy, steps[i], 13, 650, scol)]
    return window('Prospect Pipeline', '\n'.join(b), ['Pipeline', 'Dashboard', 'Duplicates check', 'Sources'])


def research():
    LG = '#E7F3EC'
    b = [rect(24, 104, 330, H - 168, '#FBFCFD', r=12, stroke=LINE),
         text(44, 134, 'Lead filters', 15, 700, INK)]
    filters = [('Geography', ['Georgia', 'Texas']), ('Industry', ['Mental health care']),
               ('Seniority', ['Owner / Partner', 'Entry']), ('Years in current role', ['Less than 1 year']),
               ('Keywords', ['Licensed', 'Private practice'])]
    y = 168
    for name, chips in filters:
        b.append(text(44, y, name, 12.5, 700, MUTED))
        x = 44
        y += 14
        for c in chips:
            w = len(c) * 7 + 34
            if x + w > 340:
                x = 44
                y += 34
            b += [rect(x, y, w, 26, LG, r=13), text(x + 12, y + 18, '+ ' + c, 12, 650, GREEN)]
            x += w + 6
        y += 58
    # results
    b += [text(380, 134, 'Search results', 15, 700, INK), text(W - 44, 134, 'Saved to list after review', 12.5, 600, MUTED, 'end'),
          f'<line x1="380" y1="150" x2="{W - 24}" y2="150" stroke="{LINE}"/>']
    for i in range(7):
        yy = 168 + i * 74
        b += [rect(380, yy, W - 24 - 380, 64, '#FFFFFF', r=10, stroke=LINE),
              f'<circle cx="414" cy="{yy + 32}" r="20" fill="{REDACT}"/>',
              bar(448, yy + 28, 150 + (i * 31) % 70), bar(448, yy + 48, 230 - (i * 19) % 80, 8, REDACT_2),
              text(760, yy + 38, ['Georgia', 'Texas', 'Georgia', 'Georgia', 'Texas', 'Georgia', 'Georgia'][i], 12.5, 600, MUTED),
              rect(W - 140, yy + 18, 92, 28, '#FFFFFF', r=14, stroke=BLUE),
              text(W - 94, yy + 37, 'Saved' if i in (0, 2, 3, 5) else 'Save', 12.5, 700, BLUE, 'middle')]
    return window('Sales Navigator search', '\n'.join(b), ['Lead search', 'Saved lists', 'Alerts'])


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in [('dashboard', dashboard), ('linkedin', linkedin), ('pipeline', pipeline), ('sales-navigator', research)]:
        (OUT / f'{name}.svg').write_text(fn())
        print('wrote', name)
