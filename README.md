# Plumbline — website

A plain static website. No framework, no build step, no Node, no database.
Seven HTML files, one stylesheet, one small script. Any web host that can serve
files will serve it, and you edit it in Notepad if you want to.

---

## 1. What is in the folder

```
index.html        Home — leads with the TRIRIGA migration
migration.html    The TRIRIGA → Maximo case. Your main search-traffic page.
services.html     What you do and what the client receives
approach.html     How the work is done, and the honest line on accuracy
about.html        The practice's expertise
contact.html      The form and the booking link
404.html          Shown when a visitor hits an address that does not exist

assets/
  style.css       Every colour, font and layout rule on the site
  site.js         Mobile menu, dark-mode toggle, footer year, form submit
  favicon.svg     The tab icon — a plumb bob on its line

robots.txt        Tells search engines they may index the site
sitemap.xml       Lists your pages for search engines
README.md         This file
```

---

## 2. Before you upload — five things to change

Search the whole folder for each of these and replace it. In Windows,
Notepad++ or VS Code will search across all files at once (Ctrl+Shift+F).

| Find this | Replace with | Where |
|---|---|---|
| `PASTE_YOUR_FORM_ENDPOINT` | Your form service URL | `contact.html` |
| `PASTE_YOUR_BOOKING_LINK` | Your Calendly / Cal.com URL | `contact.html` |
| `hello@plumblinelease.com` | Your real email | `contact.html`, every footer |
| `(000) 000-0000` and `+10000000000` | Your real number | `contact.html`, every footer |
| `https://plumblinelease.com` | Your domain, if different | every page's `<link rel="canonical">`, `sitemap.xml`, `robots.txt` |

### Making the form actually work

The form posts to whatever URL is in its `action`. Two free options:

**Formspree** — go to formspree.io, create a form, copy the endpoint it gives
you (it looks like `https://formspree.io/f/abcdwxyz`) and paste it in place of
`PASTE_YOUR_FORM_ENDPOINT`. Five minutes. Free tier is 50 submissions a month.

**Netlify Forms** — only if you host on Netlify. Add `netlify` to the `<form>`
tag and Netlify collects submissions itself, with no third party involved.

Until you do one of these, the form tells the visitor honestly that it is not
connected and points them at your email address. It never pretends to have sent
a message it did not send.

---

## 3. Uploading it

### Option A — ordinary web hosting with cPanel (most registrars)

1. Log in to your hosting control panel and open **File Manager**.
2. Go into `public_html` (sometimes `www` or `htdocs`). This is the folder the
   domain serves.
3. Upload **the contents** of this folder — not the folder itself. `index.html`
   must sit directly in `public_html`, with `assets/` beside it.
4. Visit your domain. It should be live immediately.

To upload the whole thing at once, zip it first, upload the zip, then use the
File Manager's **Extract** command.

### Option B — Netlify (free, recommended if you have no host yet)

1. Go to app.netlify.com and sign up.
2. Drag this entire folder onto the "deploy" area on the dashboard. It goes
   live in about ten seconds on a temporary address.
3. **Domain settings → Add a custom domain →** enter your domain, then follow
   the DNS instructions it gives you at your registrar.
4. HTTPS is switched on automatically and is free.

### Option C — GitHub Pages (free)

1. Create a repository and upload these files to it.
2. **Settings → Pages →** source: your main branch, folder: `/ (root)`.
3. Add your domain under **Custom domain**, and point a CNAME record at
   `yourusername.github.io` at your registrar.

### Make sure HTTPS is on

Whichever route you take, the site must be reachable at `https://` and not just
`http://`. Every host above provides a free certificate. A corporate or
government visitor's browser will warn them off a site without one.

---

## 4. Editing the words

All visible text is plain HTML. Open a page in any text editor, find the
sentence, change it between the tags, save, re-upload that one file.

```html
<h2>What goes wrong</h2>        ← change the words, leave the <h2> tags
```

**If you add a page**, do three things: copy an existing page as your starting
point so the header and footer match, add a link to it in the `<nav>` of
*every* page, and add a `<url>` block for it in `sitemap.xml`.

---

## 5. Changing how it looks

Open `assets/style.css`. Everything you are likely to want is in **section 1,
Design tokens**, at the very top:

```css
--accent:#1d4f72;      /* the blue used for links, buttons and rules */
--ink:#0e141a;         /* heading and body text */
--paper:#f5f7f8;       /* page background */
--serif:"IBM Plex Serif", ...   /* headings */
--sans:"IBM Plex Sans", ...     /* body text */
```

Change a value there and it changes everywhere on the site. The dark theme is
immediately below, in section 2, and uses the same token names.

The rest of the file is grouped and commented: layout, header, components,
forms, footer, responsive, print.

---

## 6. Search engine basics, already done

- A unique `<title>` and `<meta name="description">` on every page
- A `<link rel="canonical">` on every page so duplicates do not compete
- Open Graph tags, so links shared in Slack or LinkedIn show a proper preview
- `ProfessionalService` structured data on the home page
- `sitemap.xml` and `robots.txt`
- One `<h1>` per page, with real heading structure beneath it
- Mobile-friendly, no horizontal scrolling at any width
- Fast: no framework, no tracking, one external request (the typeface)

**After you go live**, do these two things:

1. Add the site to [Google Search Console](https://search.google.com/search-console),
   verify ownership, and submit `https://yourdomain.com/sitemap.xml`.
2. Create a Google Business Profile if you want to appear in local results.

---

## 7. Things deliberately left out

**No tracking or analytics.** Nothing on this site watches visitors. If you want
analytics, add it yourself — and if your buyers include government agencies,
prefer a privacy-respecting option over Google Analytics.

**No client names, logos, testimonials or case studies.** You have none yet.
Adding invented ones is the fastest way to lose a buyer who checks.

**No accuracy percentage.** The approach page explains at length why you will
not quote one until you have measured it on documents nothing was tuned
against. That refusal is a selling point; do not replace it with a number you
cannot defend.

**No named principal.** You asked for the practice's expertise rather than your
name. Worth revisiting: public sector and enterprise buyers often want to know
who is accountable, and a site with no human on it can read as thin. When you
are ready, the About page has a marked comment showing where to add it, along
with your entity name, state of registration and any SAM.gov identifiers.

---

## 8. The pricing section

`services.html` publishes a range of **$180–$320 per lease** with the factors
that move it, and the home page carries the headline figure. This is deliberate:
every competitor in this market quotes on request and publishes nothing, so a
visible number is itself a differentiator.

The range comes from the business plan — $180 is the kill criterion, $320 the
stretch case, both below the published market rate of $375–450. **Replace it with
measured figures after the first ten engagements**, and change it in two places:
the two cards in `services.html` and the line under the hero in `index.html`.

---

## 9. Using the IBM TRIRIGA name — rules to keep

IBM publishes guidance on how others may refer to its product names. The site
already follows it. If you edit the pages, keep these in place:

* **Never use an IBM or TRIRIGA logo.** Text references only. Logos need IBM's
  express written permission.
* **Keep the attribution block in the footer of every page.** IBM requires an
  attribution on first use of each product name, and requires that the nature
  of your relationship to IBM is clear and accurate. Both sentences are there
  for that reason.
* **Write the name as an adjective, preceded by IBM**, with the symbol on its
  first appearance on a page: *IBM TRIRIGA® software*, *the IBM TRIRIGA®
  application* — not *a TRIRIGA* or *TRIRIGAs*.
* **Never put an IBM product name in your company name or your domain.**
  This rules out ever registering something like `tririgamigration.com`.
* **Never imply partnership, certification or endorsement.** If you later join
  IBM PartnerWorld, that changes — and brings its own separate marketing rules.
* Be truthful, do not disparage IBM, and do not mislead.

Reference: ibm.com/legal/copyright-trademark

---

## 10. Checking it still works after you edit

Open each page and check:

- it loads with no missing styles (if everything is plain black on white,
  the path to `assets/style.css` is wrong)
- the menu button works when the window is narrow
- the dark-mode button in the header switches the theme
- the form shows a message when you submit it
- the footer year is the current year

Press **F12** in the browser and look at the **Console** tab. It should be
empty. Anything red there is a broken link or a typo in the HTML.
