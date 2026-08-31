# Finish the deploy — 15 files still need deleting

## What happened

Your GitHub commit is `d1eaa9b "Add files via upload"`. That's the web uploader, and it
**adds and overwrites but never deletes**. So all the new work landed correctly, and
every file that was meant to go is still sitting there.

This is also the answer to "you didn't update any other page other than the home" —
every page *was* updated. Checked against your live repo right now:

| Page | New logo | New theme colour |
|---|---|---|
| `index.html` | ✅ | ✅ |
| `about/index.html` | ✅ | ✅ |
| `contact/index.html` | ✅ | ✅ |
| `tools-equipment/index.html` | ✅ | ✅ |

…and the same for the rest. The real pages live in subfolders (`about/index.html`),
which is what `/about/` serves. The loose `.html` files at the root are the old
pre-restructure copies.

## Why it matters

Netlify only applies a redirect when **no file exists** at that path, unless
`force = true`. Those root files exist, so they win over your `netlify.toml` 301s.

Live right now:

- `/contact.html` → **"Saturday: Closed"**
- `/about.html` → old logo, old palette
- and seven more stale pages, all indexable by Google as duplicate content

The correct `/contact/` says `8:00am – 12:00pm`. Both are live simultaneously.

## Delete these 15 files

**Nine stale pages** (root level only — do NOT touch the folders of the same name):

```
about.html
concrete-masonry.html
contact.html
drainage-landscaping.html
finishes-sealers.html
garden-outdoor.html
products.html
steel-reinforcing.html
tools-equipment.html
```

**Six retired images:**

```
images/logo.jpg
images/ableflex.jpg
images/planter-boxes.jpg
images/planter-boxes-garden.jpg
images/recycled-concrete.jpg
images/screeds.jpg
```

Keep `index.html` and `404.html` at root — those are live pages.

### Fastest way (command line)

```bash
git clone https://github.com/TechilaAU/torquaybuild.git
cd torquaybuild

git rm about.html concrete-masonry.html contact.html drainage-landscaping.html \
       finishes-sealers.html garden-outdoor.html products.html \
       steel-reinforcing.html tools-equipment.html
git rm images/logo.jpg images/ableflex.jpg images/planter-boxes.jpg \
       images/planter-boxes-garden.jpg images/recycled-concrete.jpg images/screeds.jpg

git commit -m "Remove stale root pages and retired product images"
git push
```

### Or in the browser

Open each file on github.com → the `...` menu top right → **Delete file** →
**Commit changes**. Fifteen times. Slower, same result.

## Also in this drop: one CSS change

`css/shared.css` — the product grid was `repeat(auto-fill, ...)`, which holds empty
columns open. With three cards left on Concrete & Masonry that left a visible gap on
the right. Switched to `auto-fit` with a card width cap so short rows centre and don't
stretch. Checked against the 16-card Tools grid and the 5-card Garden grid — both
unchanged.

Replace `css/shared.css` with the one in this drop.

## Verify after deploying

1. Visit `/contact.html` — should now **redirect** to `/contact/`, not load a page
2. Visit `/contact/` — Saturday reads 8:00am – 12:00pm
3. Header logo is the new shield on navy, no pale washed-out box
4. Resubmit `sitemap.xml` in Search Console
5. Update Google Business Profile to Saturday 8:00am–12:00pm

## Still open

- **Concrete & Masonry has only 3 products.** The grid now looks tidy, but the page is
  thin. Tell me what else you stock in that category and I'll add cards.
- **Delivery terms** — radius, minimum order, fee.
- **Trade accounts** — About sells them, the homepage info strip says "no account
  required". Not contradictory, but worth aligning.
- **The 7am sign** still needs reprinting.
- **Revoke that GitHub token.**
