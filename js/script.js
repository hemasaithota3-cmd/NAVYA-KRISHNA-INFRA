/* ============================================================
   VERITAS BUILDERS - MAIN SCRIPT
   Handles: mobile navigation, image fallback loading,
   hero background video, gallery lightbox, contact form,
   and scroll-based active navigation highlighting.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------
     1. Mobile Menu Toggle
  ------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  /* ------------------------------------------------------------
     2. Hero Background Video
     The video fades in only once assets/videos/hero-video.mp4
     has loaded successfully. If the file is missing or fails to
     load, the hero section simply keeps its existing background
     image/gradient, so nothing looks broken.
  ------------------------------------------------------------ */
  const heroVideo = document.getElementById('heroVideo');
  const heroVideoWrap = document.getElementById('heroVideoWrap');

  if (heroVideo && heroVideoWrap) {
    heroVideo.addEventListener('loadeddata', () => {
      heroVideoWrap.classList.add('is-loaded');
    });

    heroVideo.addEventListener('error', () => {
      heroVideoWrap.classList.remove('is-loaded');
    });

    // In case the video is already cached/loaded by the time this runs
    if (heroVideo.readyState >= 2) {
      heroVideoWrap.classList.add('is-loaded');
    }
  }

  /* ------------------------------------------------------------
     3. Image Load Failover Handlers
     Tries a list of candidate local paths in order, then falls
     back to a hosted placeholder image if none are found.
  ------------------------------------------------------------ */
  function setupImageFallback(imgId, candidatePaths, defaultFallbackUrl) {
    const imgElem = document.getElementById(imgId);
    if (!imgElem) return;

    let pathIdx = 0;
    function tryNext() {
      if (pathIdx < candidatePaths.length) {
        const current = candidatePaths[pathIdx++];
        imgElem.onerror = tryNext;
        imgElem.src = current;
      } else {
        imgElem.onerror = null;
        imgElem.src = defaultFallbackUrl;
      }
    }
    tryNext();
  }

 setupImageFallback(
    'founderImg',
    ['images/founder/founder.jpeg'],
    ''
);

  // Founder Signature
  const sigImg = document.getElementById('signatureImg');
  const sigFallback = document.getElementById('signatureFallback');
  const sigCandidates = ['images/founder/signature.png', 'images/founder/founder_signature.png'];
  let sigIdx = 0;

  function tryNextSig() {
    if (sigIdx < sigCandidates.length) {
      sigImg.onerror = tryNextSig;
      sigImg.src = sigCandidates[sigIdx++];
    } else {
      sigImg.style.display = 'none';
      sigFallback.style.display = 'block';
    }
  }
  tryNextSig();

  // Project Image
  setupImageFallback(
    'projectImg',
    ['images/projects/project1.jpg', 'images/projects/project1.png'],
   
  );

  // Gallery Images
  document.querySelectorAll('.gallery-item img').forEach((img, idx) => {
    const houseNum = idx + 1;
    const candidates = [
      `images/gallery/house${houseNum}.jpeg`,
      `images/gallery/house${houseNum}.png`
    ];
    let cIdx = 0;
    function tryGallery() {
      if (cIdx < candidates.length) {
        img.onerror = tryGallery;
        img.src = candidates[cIdx++];
      } else {
        img.onerror = null;
        img.src = img.getAttribute('data-fallback');
      }
    }
    tryGallery();
  });

  /* ------------------------------------------------------------
     4. Active Navbar Link Observer (on scroll)
  ------------------------------------------------------------ */
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ------------------------------------------------------------
     5. Gallery Lightbox Close-on-Background-Click
  ------------------------------------------------------------ */
  const lightboxModal = document.getElementById('lightboxModal');
  lightboxModal.addEventListener('click', (e) => {
    if (e.target.id === 'lightboxModal') {
      closeLightbox();
    }
  });

});

/* ------------------------------------------------------------
   Gallery Lightbox (called via inline onclick handlers in HTML)
------------------------------------------------------------ */
function openLightbox(galleryItem) {
  const img = galleryItem.querySelector('img');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  lightboxImg.src = img.src;
  lightboxModal.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightboxModal').classList.remove('active');
}

/* ------------------------------------------------------------
   Contact Form Handler (called via inline onsubmit handler in HTML)
------------------------------------------------------------ */
function handleFormSubmit(event) {
    event.preventDefault();

    emailjs.sendForm(
        "service_b7bqayw",
        "template_x5t3868",
        "#contactForm"
    ).then(function () {

        const toast = document.getElementById("toastMessage");
        toast.classList.add("show");

        document.getElementById("contactForm").reset();

        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);

    }).catch(function (error) {
        console.error(error);
        alert("Failed to send inquiry.");
    });
}
