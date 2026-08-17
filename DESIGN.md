# Aviation Dreamz — Design Direction (built)

**Subject:** Aviation Dreamz — a premier institute for airline careers, established
1996, led by proprietor Fowzia Shaikh, with 5,000+ students placed. Cabin crew is the
training focus.
**Audience:** people who want to be cabin crew and are blocked by spoken English,
interview nerves and not knowing what assessors score. Some have already been rejected.
**Page's single job:** book the free assessment.

Built from **Direction B, The Attitude Indicator** (`comps.html` holds all six
directions), then re-grounded when the subject turned out to be cabin crew rather
than pilots.

---

## Thesis

**Learn the job, and the interview follows.** The page sells complete cabin crew
training from no experience — safety and emergency basics, service flow, grooming
standards, aviation English, and the assessment day — not an English course.

This was corrected once. An earlier version made English the entire thesis (hero
headline "The interview is in English. That's the part we train."), which
under-sold the training and made the institute look like a language school. English
is now **one module of six**, and its sample content sits inside the "What you learn"
section rather than owning a section of its own. Specific things that were rebalanced:

- Hero headline → "Learn the whole job, from the safety drill to the final interview".
- Programmes reordered so *The job itself* and *Safety, service and passengers* come
  first and English is fourth; a real cabin-skills module was added (doors and slides,
  evacuation commands, fire and oxygen, first aid, galley service).
- "Why applications end" leads with **not knowing the job**; English moved to last.
- Hero readout leads with **Experience needed: None** — the objection that actually
  stops people booking.
- FAQ's second question is "Do I need any experience?", with English level folded
  into that answer instead of standing alone.

Keep this balance. If English creeps back into the headline, the page stops selling
the thing that costs six weeks.

## What changed at the cabin-crew pivot

- **Cockpit furniture removed.** The bezel, pitch ladder, bank scale and aircraft
  symbol are pilot instruments. Cabin crew never touch them, so on this page they
  were decoration. Deleted.
- **The cabin window replaced them.** Same tilted horizon, seen through an aircraft
  cabin window — the crew's view, from their side of the door. One shape instead of
  four overlays.
- **Module numbers dropped from programmes.** The copy says take the whole thing or
  just the module you're weak at, so numbering implied an order that doesn't exist.
  01–05 survives only on the assessment-day stages, which really are sequential.

## Color — sampled from ad.jpeg

Every brand value below was read out of the logo file with `GetPixel`, not
estimated. The logo is `ad.jpeg` in the project root and is used as the header
mark, the footer mark and the favicon.

| Token | Hex | Source / role |
|---|---|---|
| `--sky` | `#B2E0F9` | **Logo sky, exact.** The upper half of the hero. |
| `--sky-hi` | `#9FD8F6` | A touch deeper, top of the hero gradient only. |
| `--sky-tint` | `#DFF2FC` | Pale band background. |
| `--sky-line` | `#C9E2EF` | Hairlines, from the sky family. |
| `--sky-text` | `#0B5C86` | Logo hue darkened until readable on white (6.0:1). |
| `--red` | `#E0080A` | **Logo red, exact.** Lower half of the hero, primary CTA, errors. |
| `--red-deep` | `#B00507` | Hover, bottom of the red gradient. |
| `--ink` | `#0F0E0C` | **Logo black.** All type, rules, the window's outer ring. |
| `--ink-soft` | `#4E555B` | Secondary text. |
| `--dark` | `#0E1216` | Dark bands: readout, assessment day, PA card, footer. |
| `--shade` / `--shade-dk` | `#C9C6BE` / `#B4B1A8` | The window shade — a physical object, so warm grey rather than a brand colour. |

**The pale sky is the constraint that shapes the hero.** `#B2E0F9` has a relative
luminance of 0.68, so white text on it is 1.4:1 — unusable. That is why the hero
inverted from the previous deep-blue-with-white-type to **pale sky with black type**,
which is 14.5:1 and also exactly how the logo sets "Aviation". Do not swap in a
deeper blue to get white text back; that undoes the match to the logo.

Consequences worth keeping:

- All running copy in the hero sits **above** the horizon on the pale sky. The
  fine-print line was moved above the buttons for this reason — as plain text it
  cannot cross onto red (dark grey on `#E0080A` is 1.5:1).
- The two hero buttons **can** cross the horizon, because both carry solid faces:
  red with white text (6.4:1) and white with black text (18:1). The secondary
  button is deliberately white-filled, not transparent — as an outline it would put
  black text on red at 3.4:1.
- The window frame is white with a thin black outer ring, echoing the logo's white
  "Dreamz" against its black keyline.

## Type — unchanged

Barlow Condensed (display, caps) / IBM Plex Sans (body) / IBM Plex Mono (every
number, label and the PA script). Loaded from Google Fonts, which is **why this can't
be published as an Artifact as-is** — that CSP blocks font CDNs. Inline the three
faces as `@font-face` data URIs to publish there.

## Hero background — plain, and the weather lives in the window

The hero background is **one flat field of `--sky`**. No gradient, no diagonal. The
red is a **straight horizontal band** at the foot of the hero, and it does double duty
as the stats strip (white on `#E0080A` is 6.4:1). Blue above, white rule, red below —
the logo's composition squared off.

Everything that was previously a full-bleed tilted horizon now happens **inside the
cabin window**: `.hero-view` is an oversized layer (`inset: -34%`) carrying a sky
gradient, two small high wisps and a six-puff cloud deck, all in CSS gradients, and it
is what rotates with `--p`. Making the window the only place with weather is what
gives it focus; when the background also had a moving horizon, the two competed.

Notes for anyone editing the clouds:

- Each puff is a **circle with a solid core at ~58% of its radius fading to nothing at
  100%**. A single ellipse with a hard stop reads as a lozenge — the first attempt did
  exactly that and had to be redone.
- The deck's puffs are spaced so their **solid cores overlap**, otherwise it reads as a
  row of cotton balls (the second attempt's failure). A broad low-opacity haze ellipse
  underneath ties them together.
- `.hero-view` is oversized specifically so rotation never exposes a corner.

## Hero layout — a two-column grid, not overlays

The window and the seat-belt sign were originally absolutely positioned at
`--win-x` / `--win-y` percentages, which left the window floating low and unrelated
to the type. They are now **grid items in `.hero-in`**, on a shared set of row lines:

```
row 1   eyebrow          |  seat-belt sign
row 2   headline, sub,   |  cabin window
        buttons, fine
```

With `align-items: start`, the headline's cap line and the window's top edge land on
the same line (verified: both at 175px), and the eyebrow shares its line with the
sign (both at 123px). Because it's a grid rather than percentage offsets, the
alignment holds at every width instead of only at the one it was eyeballed for.
Below 1040px the second column is dropped and the window and sign are hidden.

## Signature — one scroll value drives the whole hero

`.hero` carries `--p`, scroll progress through the hero (0 → 1, reached at 70% of
hero height), written by JS in a rAF-throttled scroll handler. **Three things read
from it, so scrolling back up reverses all of them:**

| At `--p: 0` (top) | At `--p: 1` |
|---|---|
| Window shade fully down, covering the window | Shade fully up, the view revealed |
| Fasten-seat-belt sign lit red | Sign off (class `.is-off` past `--p: 0.55`) |
| The view inside the window banked 8° | View level |

Takeoff into cruise, told with cabin objects rather than cockpit instruments — this
is what makes the page read as cabin crew rather than generically aviation. Verified
in both directions: at scrollY 300 `--p` is 0.70 with the shade 70% up and the sign
off; scrolling back to 100 returns `--p` to 0.23, the shade part-closed and the sign
lit again.

This replaced a load-time animation. **Don't go back to keyframes here** — the
scroll-driven version is reversible, which the animation wasn't, and it needs no
`animation-fill-mode` trickery to survive `prefers-reduced-motion`: the media query
simply sets `.hero { --p: 1 }` and the off-state sign colours, so a reduced-motion
visitor gets the open, level, settled hero with nothing moving.

Supporting content signature: the aviation English sample — candidate phrasings
struck through beside the crew phrasing, plus the boarding PA marked up with pause
and stress notation. It now sits *inside* the "What you learn" section, explicitly
labelled "a sample — one module of six".

## Structure

hero → why applications end (4, unnumbered — not a sequence) → what you learn (two
lists: *In the cabin* / *In the room*, then the English sample) → assessment day (5
numbered stages, compact strip on the dark band) → proof → about → FAQ (5 native
`<details>`, no JS) → form → footer.

**There are no modules.** A "Programmes" section once listed six named modules with
hour counts; the school doesn't sell separate modules, so the whole section was
removed along with every trace of it — the nav item, the footer column, the form's
"what you're interested in" select, the "one module of six" label on the English
sample, and all the hour figures. Verified zero occurrences of "module" and zero
"N hrs" in the rendered page. The offer is **one six-week course**, and the substance
now lives in "What you learn" instead. If a menu of options is ever wanted back, it
needs to describe things that are actually purchasable separately.

**The page was cut back once for being too dense.** Current weight: 1,156 words in
`<main>`, 7,236px tall — the "what you learn" lists added back about 90 words, which
is the cost of selling the training rather than just the interview. What was removed, and why it should stay removed:

- The assessment day was a five-row, two-column layout with a "what we do" block per
  stage. It's now five short cells — name plus one line. This was the single biggest
  saving and the section reads better for it.
- Programmes went from two or three lines per module to one, and lost the
  "included · core" meta column, which repeated itself six times.
- About went from four paragraphs to two; the English swap list from five pairs to
  four; proof from two testimonials to one; FAQ from six questions to five.
- The hero sub-paragraph lost its third sentence, and the readout dropped
  "graduates since 2019" — four stats is the ceiling before the strip stops scanning.

If new content is needed later, add a second page rather than lengthening this one.
The reason to keep it short is that every section between the hero and the form is a
chance to leave.

## Honesty decisions worth keeping

- **The claim is "nobody can promise a *specific* job", not "we don't place you".**
  An earlier draft said "we don't place you into a job — no honest school can", which
  was written before the client's facts arrived and directly contradicted them: the
  institute has placed 5,000+ students. The current wording declines to guarantee an
  individual outcome while pointing at the record. Don't reinstate the old line.
- **The "where graduates went" row is deliberately blank**, with on-page instructions
  to fill it only with carriers that can be evidenced, plus a note that Aviation
  Dreamz isn't affiliated with them. The testimonial carries `[bracketed]`
  attributions so nobody mistakes it for a real review.
- **"Not a recruitment agency" was removed** from the footer for the same reason — it
  conflicted with the placement record. "Not affiliated with any airline" stays.
- **No pronouns for Fowzia Shaikh** — they aren't known. Use the name or "the
  proprietor", never "she" or "he", until confirmed. Verified: zero pronouns in the
  page.

## Quality floor

No horizontal overflow; cabin window hidden below 1040px where it would collide with
copy; nav collapses below 1040px; stages reflow to two columns below 820px; form
single-column below 560px; sky-blue focus ring on every control; five required fields
with `aria-invalid` and a `role="status"` live region; error text adapts (an empty
email doesn't get told it's missing an @).

**Not verified:** mobile rendering has not been seen — the browser tool would not
resize the viewport. Breakpoints are written but unconfirmed visually.

## Confirmed facts — safe to state

Supplied by the client, and now the backbone of the page:

- **Established 1996**, thirty years in airline careers
- **Proprietor: Fowzia Shaikh**
- **5,000+ students placed**, domestic and international airlines
- A premier institute for airline careers

Every invented figure was removed when these arrived — "340 graduates", "71% reached
final interview", "9 years flying", "purser", "CELTA", "groups of eight", "next batch
8 Sept" and all six-week references. Verified: zero occurrences of each. Inventing
credentials was tolerable against a placeholder name; against a real named person it
would not be.

## Still to confirm or replace

- **Course length and price.** The page now claims neither, and the FAQ says
  "REPLACE THIS" in caps. This is the biggest remaining gap — it's the answer a
  serious enquiry looks for first.
- **Whether the free 45-minute assessment exists.** It is the page's primary call to
  action and it was invented as a lead magnet. If it isn't offered, the CTA has to
  become something that is.
- **Whether reach is measured at that assessment**, and **whether the start/end voice
  recording is a real practice** — both are invented pedagogy details.
- Airline names in the proof row; the testimonial; city, address, phone, WhatsApp,
  email; Fowzia Shaikh's photo; and the form endpoint (`submitForm()` at the bottom
  of `index.html`).
