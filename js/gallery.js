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
    galleryGrid.innerHTML = IMAGES.map(function (img) {
      return '<div class="gallery__item">'
        + '<img src="' + esc(img.src) + '" alt="' + esc(img.caption) + '" loading="lazy" onload="if(this.naturalHeight>this.naturalWidth)this.parentNode.classList.add(\'is-tall\')" />'
        + (img.caption ? '<div class="gallery__caption">' + esc(img.caption) + '</div>' : '')
        + '</div>';
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
