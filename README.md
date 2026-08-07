# Veritas Builders — Website

A clean, production-ready, multi-file rebuild of the Veritas Builders
one-page website. The visual design, layout, colors, fonts, animations,
responsiveness, and functionality are **identical** to the original —
only the code organization was improved.

## Project Structure

```
project/
├── index.html                  Main HTML page (no inline CSS/JS)
├── css/
│   ├── style.css                Core styles: variables, layout, components
│   ├── animations.css           Keyframe animations (e.g. toast fade-in)
│   └── responsive.css           Media queries (tablet & mobile breakpoints)
├── js/
│   └── script.js                All site behavior (menu, lightbox, form,
│                                 hero video, image fallbacks, active nav)
├── images/
│   ├── founder/                 Founder photo & signature (optional)
│   ├── projects/                Featured project photo (optional)
│   ├── gallery/                 Gallery photos house1.jpg–house6.jpg (optional)
│   └── logo/                    Reserved for a local logo file (optional)
├── assets/
│   ├── videos/                  Place hero-video.mp4 here (see below)
│   ├── icons/                   Reserved for local icon files
│   └── fonts/                   Reserved for local/self-hosted fonts
└── README.md
```

## Running the Site

Simply open `index.html` in a browser, or serve the folder with any
static file server, e.g.:

```
npx serve .
# or
python3 -m http.server
```

## Hero Background Video

The hero section supports an automatic background video. To enable it,
just add your video file at:

```
assets/videos/hero-video.mp4
```

No code changes are required. The `<video>` element is already wired
up with `autoplay`, `muted`, `loop`, and `playsinline`, and:

- covers the full hero section and stays behind all content
- is fully responsive and keeps its aspect ratio via `object-fit: cover`
- has a dark gradient overlay for text readability (matching the
  site's existing color scheme)
- fades in only after the video successfully loads — if the file is
  missing, the hero section keeps its original background image and
  gradient, so nothing ever looks broken

## Local Images (optional)

The site works out of the box using hosted placeholder images. If you'd
like to use your own photos instead, drop them into the matching
`images/` subfolder using the filenames described in
`images/README.txt`. The page will automatically prefer your local
files and only fall back to the hosted placeholders if a file isn't
found.

## Notes

- All original functionality, animations, colors, spacing, shadows,
  hover effects, and responsive behavior were preserved exactly.
- Google Fonts (Poppins, Great Vibes, Alex Brush) are still loaded via
  the Google Fonts CDN, same as the original.
- The Google Maps embed, WhatsApp floating button, and contact form
  behavior are unchanged.
