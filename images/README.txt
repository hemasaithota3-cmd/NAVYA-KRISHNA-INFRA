Local image folders used by the site (optional — the site works without
them, since remote fallback images are used automatically when a local
file is missing):

  images/founder/
    founder.jpg or founder.png     -> Founder photo shown in the "Message
                                       From Our Founder" section
    signature.png                  -> Founder's signature image

  images/projects/
    project1.jpg or project1.png   -> Featured project photo

  images/gallery/
    house1.jpg ... house6.jpg      -> Gallery photos (jpg or png)

  images/logo/
    (reserved for a local logo file, if you want to replace the
    remotely-hosted logo referenced in index.html)

If a file is missing, the site automatically tries the next candidate
path, and finally falls back to a hosted placeholder image — see
js/script.js (setupImageFallback) for the exact logic.
