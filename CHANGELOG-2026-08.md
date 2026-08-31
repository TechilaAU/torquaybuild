# Torquay Building Supplies — August 2026 update

Working branch against `TechilaAU/torquaybuild`. **Nothing is committed or pushed** —
review, then commit and let Netlify build.

---

## What you asked for

### 1. New logo, correct placement per background

The supplied PDF turned out to be a two-up presentation sheet, not two colourways —
both halves are identical artwork on different background panels. So one transparent
file covers every placement.

Extracted as true vector (paths lifted from the PDF, not traced):

- `images/tbs-logo.svg` — full lockup with tagline → footers
- `images/tbs-logo-shield.svg` — tagline removed → headers, favicon
- `images/tbs-logo-800.png` — raster fallback, used by JSON-LD `logo`
- `favicon.ico`, `images/icon-180/192/512.png`, `site.webmanifest` — the site had none

Swapped on all 12 pages including 404. `images/logo.jpg` deleted.

**Removed a hack you'll want to know about.** The old logo was a JPEG with a baked-in
white background, so the CSS carried `mix-blend-mode: lighten` and
`filter: brightness(1.05)` on `.logo-wrap img` and `.footer-logo img` to hide the white
box against navy. Left in place, those rules washed the transparent SVG out to a pale
grey-blue. Both are gone. Contact and Thanks had the same hack inline; also gone.

### 2. Palette

Retuned `css/shared.css` to the logo colours:

| Token | Value | Note |
|---|---|---|
| `--navy` | `#1C203E` | was `#1A2B4A` |
| `--blue` | `#51ADE5` | logo blue — **navy backgrounds only** |
| `--blue-deep` | `#1B78B1` | **new** — links/labels on light, 4.8:1 |
| `--blue-ink` | `#176697` | **new** — text on `--blue-pale` chips, 5.4:1 |
| `--navy-dark` / `--navy-mid` / greys | retuned | rebalanced to the new navy hue |

The logo blue scores **2.5:1 on white**, well under the WCAG AA floor of 4.5. It was
only ever drawn against navy. Rather than compromise the brand colour, I added two
darker steps at the identical hue (202.7°) and saturation — they read as the same blue.
`.section-label`, `.cat-card-body a`, `.product-tag`, `.why-icon`, `.filter-tab:hover`
and the 404 heading now use them. Shadow rgba values were keyed to the old navy and
were updated too.

### 3. Discontinued products

Six cards deleted — Recycled Concrete ×2, Screeds, Ableflex, Planter Boxes ×2 — plus
every mention in body copy, page titles, meta descriptions, keywords, og/twitter tags
and JSON-LD. Five orphaned images removed.

The homepage described them as "garden planters" rather than "planter boxes", so a
literal search missed it on the first pass. Caught on a second sweep. Final check
across all pages returns zero hits for screed, ableflex, recycled concrete and planter.

### 4. Saturday hours — the inconsistency, found

Two separate causes, both now fixed:

1. **Nine stale duplicate pages at repo root.** `about.html` existed alongside
   `about/index.html`, for every page. The root copies were pre-restructure and said
   **"Saturday: Closed"**. `netlify.toml` redirects them, but Netlify only applies a
   redirect when no file exists at that path unless `force = true` is set — so
   `/contact.html` and `/products.html` were very likely serving "Saturday: Closed"
   live. All nine deleted; the redirects now actually fire.
2. **All six category page footers** also said "Saturday: Closed". These are live
   pages, not shadows — this was the real bug.

Now consistent everywhere: 12 × "Sat 8:00am–12:00pm", 10 × "Saturday: 8:00am–12:00pm",
plus JSON-LD `openingHoursSpecification` at `08:00`. Zero contradictions.

### 5. Delivery — prominent

Full-width navy band, crane truck photo left, copy right. Homepage: directly under the
info strip, first thing after the hero. Contact: above the footer. Three chips
(Crane Truck / Site Delivery / Trade & DIY) and a call button. Stacks cleanly on mobile.

No radius, minimum order or fee is stated, since you haven't given me those. Add them
and the section gets considerably stronger — "free delivery within 20km on orders over
$X" converts far better than "call to arrange".

### 6. Photography

Your six photos replaced the stock imagery. The site was **hotlinking two Unsplash
photos on About plus one in the hero** — a licensing risk and a page-speed cost on
every load. All gone.

| Placement | Photo |
|---|---|
| Homepage + About hero | storefront with truck |
| About body | storefront wide, in-store fixings |
| Tools & Equipment hero | OX tools display |
| Tools & Equipment "Stocked and Ready" | tools display + fixings bay |
| Delivery band (×2 pages) | crane truck |
| Social share, all 10 pages | og-image.jpg |

Social images previously declared `1200×630` in the meta tags while the actual files
were 900×546 and 800×560 — shares were likely rendering as small cards. Now a correctly
sized 1200×630 asset.

---

## Also fixed, unasked

- Contact page footer was still running the original hand-drawn house-icon placeholder
  from the first build, not the real logo.
- Copyright bumped 2025 → 2026 on five pages.
- `sitemap.xml` `lastmod` refreshed to 2026-08-31.
- 404 page had no favicon, no theme-color, and was missed by the main sweep entirely.
- Homepage hero stat changed from "Trade / Accounts Welcome" to "Delivery / Direct To
  Site". Only three slots, and you wanted delivery prominent — say if you'd rather keep
  the trade line.

## Reverted — I got this one wrong

I rewrote the "Trade accounts welcome" CTA on six pages to walk-in messaging, assuming
it contradicted the info strip's "No account required". Then I found the About page
explicitly offers trade accounts with monthly invoicing, meaning the original copy was
accurate and I'd deleted true information. All six reverted to the original wording.

Worth you confirming the account messaging is still current, since the info strip and
the About page pull in slightly different directions.

---

## Verification

- All 12 pages return 200 with zero broken images (headless Chromium)
- All JSON-LD blocks parse
- Zero broken internal links, zero missing local assets
- All 10 sitemap URLs resolve
- No horizontal overflow at 390px
- Delivery band and in-store grid checked at desktop and mobile
- Zero remaining references to `logo.jpg`, Unsplash, or `mix-blend-mode`

---

## Three things that need you

1. **Concrete & Masonry is thin.** Removing three of six cards leaves Concrete Bags,
   Cement and Mortar Mix — with a visible empty slot in the four-column grid. It needs
   another product or two. Tell me what else belongs there.
2. **The hero photo contains your old sign.** The overlay darkens it enough that the
   7.00am hours are genuinely unreadable (I zoomed in to confirm), but it is there. The
   sign itself still needs reprinting — a customer arriving at 7am on the strength of
   the physical sign is the real problem, and no amount of website work fixes that.
3. **Delivery terms** — radius, minimum, fee.

## Deploying

Commit and push; Netlify builds from `publish = "."`. I have no Netlify access.

Two notes:
- The nine deleted root `.html` files were reachable URLs. The `netlify.toml` 301s now
  take over, so any indexed links redirect properly rather than serving stale pages.
- Resubmit `sitemap.xml` in Google Search Console after deploy.
- **Revoke the GitHub token** you pasted in chat. The repo is public, so it was never
  needed.
