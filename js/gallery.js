/* ---------- gallery ---------- */
var IMAGES = [
  { src: "../images/w800/1.webp", caption: "From the field" },
  { src: "../images/w800/2.webp", caption: "From the field" },
  { src: "../images/w800/3.webp", caption: "From the field" },
  { src: "../images/w800/4.webp", caption: "From the field" },
  { src: "../images/w800/5.webp", caption: "From the field" },
  { src: "../images/w800/6.webp", caption: "From the field" },
  { src: "../images/w800/7.webp", caption: "From the field" },
  { src: "../images/w800/8.webp", caption: "From the field" },
  { src: "../images/w800/9.webp", caption: "From the field" },
  { src: "../images/w800/10.webp", caption: "From the field" },
  { src: "../images/w800/11.webp", caption: "From the field" },
  { src: "../images/w800/12.webp", caption: "From the field" },
  { src: "../images/w800/13.webp", caption: "From the field" },
  { src: "../images/w800/14.webp", caption: "From the field" },
  { src: "../images/w800/15.webp", caption: "From the field" },
  { src: "../images/w800/16.webp", caption: "From the field" },
  { src: "../images/w800/17.webp", caption: "From the field" },
  { src: "../images/w800/18.webp", caption: "From the field" },
  { src: "../images/w800/19.webp", caption: "From the field" },
  { src: "../images/w800/20.webp", caption: "From the field" },
  { src: "../images/w800/21.webp", caption: "From the field" },
  { src: "../images/w800/22.webp", caption: "From the field" },
  { src: "../images/w800/23.webp", caption: "From the field" },
  { src: "../images/w800/24.webp", caption: "From the field" },
  { src: "../images/w800/25.webp", caption: "From the field" },
  { src: "../images/w800/26.webp", caption: "From the field" },
  { src: "../images/w800/27.webp", caption: "From the field" },
  { src: "../images/w800/28.webp", caption: "From the field" },
  { src: "../images/w800/29.webp", caption: "From the field" },
  { src: "../images/w800/30.webp", caption: "From the field" },
  { src: "../images/w800/31.webp", caption: "From the field" },
  { src: "../images/w800/32.webp", caption: "From the field" },
  { src: "../images/w800/33.webp", caption: "From the field" },
  { src: "../images/w800/34.webp", caption: "From the field" },
  { src: "../images/w800/35.webp", caption: "From the field" },
  { src: "../images/w800/36.webp", caption: "From the field" },
  { src: "../images/w800/37.webp", caption: "From the field" },
  { src: "../images/w800/38.webp", caption: "From the field" },
  { src: "../images/w800/39.webp", caption: "From the field" },
  { src: "../images/w800/40.webp", caption: "From the field" },
  { src: "../images/w800/41.webp", caption: "From the field" },
  { src: "../images/w800/42.webp", caption: "From the field" },
  { src: "../images/w800/43.webp", caption: "From the field" },
  { src: "../images/w800/44.webp", caption: "From the field" },
  { src: "../images/w800/45.webp", caption: "From the field" },
  { src: "../images/w800/46.webp", caption: "From the field" },
  { src: "../images/w800/47.webp", caption: "From the field" },
  { src: "../images/w800/48.webp", caption: "From the field" },
  { src: "../images/w800/49.webp", caption: "From the field" },
  { src: "../images/w800/50.webp", caption: "From the field" },
  { src: "../images/w800/51.webp", caption: "From the field" },
  { src: "../images/w800/52.webp", caption: "From the field" },
  { src: "../images/w800/53.webp", caption: "From the field" },
  { src: "../images/w800/54.webp", caption: "From the field" },
  { src: "../images/w800/55.webp", caption: "From the field" },
  { src: "../images/w800/56.webp", caption: "From the field" },
  { src: "../images/w800/57.webp", caption: "From the field" },
  { src: "../images/w800/58.webp", caption: "From the field" },
  { src: "../images/w800/59.webp", caption: "From the field" },
  { src: "../images/w800/60.webp", caption: "From the field" },
  { src: "../images/w800/61.webp", caption: "From the field" },
  { src: "../images/w800/62.webp", caption: "From the field" }
];
var galleryGrid = document.getElementById("gallery-grid");
if (galleryGrid) {
  if (IMAGES.length) {
    galleryGrid.innerHTML = IMAGES.map(function (img, i) {
      return '<button type="button" class="gallery__item" data-i="' + i + '" aria-label="Open photo ' + (i + 1) + ' of ' + IMAGES.length + '">'
        + '<img src="' + esc(img.src) + '" alt="' + esc(img.caption) + '" loading="lazy" onload="if(this.naturalHeight>this.naturalWidth)this.parentNode.classList.add(\'is-tall\')" />'
        + (img.caption ? '<div class="gallery__caption">' + esc(img.caption) + '</div>' : '')
        + '</button>';
    }).join("");
  } else {
    galleryGrid.innerHTML = '<p class="gallery__empty">Photos coming soon.</p>';
  }
}

/* ---------- gallery carousel ---------- */
(function () {
  var track = document.getElementById("gallery-grid");
  var btnPrev = document.getElementById("galPrev");
  var btnNext = document.getElementById("galNext");
  if (!track || !btnPrev || !btnNext) return;

  function scrollBehavior() { return window.matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth"; }

  function syncArrows() {
    btnPrev.disabled = track.scrollLeft <= 1;
    btnNext.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  btnPrev.addEventListener("click", function () {
    track.scrollBy({ left: -track.clientWidth, behavior: scrollBehavior() });
  });
  btnNext.addEventListener("click", function () {
    track.scrollBy({ left: track.clientWidth, behavior: scrollBehavior() });
  });
  track.addEventListener("scroll", syncArrows, { passive: true });
  syncArrows();
})();

/* ---------- lightbox: click a photo to view it full size, step through, close ---------- */
(function () {
  var track = document.getElementById("gallery-grid");
  if (!track || !IMAGES.length || !window.HTMLDialogElement) return;
  var full = function (src) { return src.replace("/w800/", "/").replace(/\.webp$/, ".jpeg"); };  /* originals for full view */
  var dlg = document.createElement("dialog");
  dlg.className = "lbox"; dlg.setAttribute("aria-label", "Photo viewer");
  dlg.innerHTML = '<figure class="lbox__fig"><img class="lbox__img" alt="" /><figcaption class="lbox__cap"></figcaption></figure>'
    + '<button type="button" class="lbox__btn lbox__prev" aria-label="Previous photo">&#8592;</button>'
    + '<button type="button" class="lbox__btn lbox__next" aria-label="Next photo">&#8594;</button>'
    + '<button type="button" class="lbox__btn lbox__x" aria-label="Close photo viewer">&times;</button>';
  document.body.appendChild(dlg);
  var img = dlg.querySelector(".lbox__img"), cap = dlg.querySelector(".lbox__cap"), cur = 0;

  function show(i) {
    cur = (i + IMAGES.length) % IMAGES.length;            /* wraps at both ends */
    img.src = full(IMAGES[cur].src);
    img.alt = IMAGES[cur].caption || "";
    cap.textContent = (IMAGES[cur].caption ? IMAGES[cur].caption + " · " : "") + (cur + 1) + " / " + IMAGES.length;
    new Image().src = full(IMAGES[(cur + 1) % IMAGES.length].src);   /* warm the next photo */
  }
  track.addEventListener("click", function (e) {
    var b = e.target.closest(".gallery__item"); if (!b) return;
    show(+b.getAttribute("data-i"));
    document.documentElement.style.overflow = "hidden";
    dlg.showModal();
  });
  dlg.querySelector(".lbox__prev").addEventListener("click", function () { show(cur - 1); });
  dlg.querySelector(".lbox__next").addEventListener("click", function () { show(cur + 1); });
  dlg.querySelector(".lbox__x").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });   /* backdrop */
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(cur - 1);
    else if (e.key === "ArrowRight") show(cur + 1);
  });
  dlg.addEventListener("close", function () {
    document.documentElement.style.overflow = "";
    var b = track.querySelector('[data-i="' + cur + '"]');   /* return focus to the photo now shown */
    if (b) { b.focus({ preventScroll: true }); b.scrollIntoView({ block: "nearest", inline: "nearest" }); }
  });
  var x0 = null;   /* touch swipe */
  dlg.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  });
})();
