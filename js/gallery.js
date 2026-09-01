/* ---------- gallery ---------- */
var IMAGES = [
  { src: "../images/1.jpeg", caption: "From the field" },
  { src: "../images/2.jpeg", caption: "From the field" },
  { src: "../images/3.jpeg", caption: "From the field" },
  { src: "../images/4.jpeg", caption: "From the field" },
  { src: "../images/5.jpeg", caption: "From the field" },
  { src: "../images/6.jpeg", caption: "From the field" },
  { src: "../images/7.jpeg", caption: "From the field" },
  { src: "../images/8.jpeg", caption: "From the field" },
  { src: "../images/9.jpeg", caption: "From the field" },
  { src: "../images/10.jpeg", caption: "From the field" },
  { src: "../images/11.jpeg", caption: "From the field" },
  { src: "../images/12.jpeg", caption: "From the field" },
  { src: "../images/13.jpeg", caption: "From the field" },
  { src: "../images/14.jpeg", caption: "From the field" },
  { src: "../images/15.jpeg", caption: "From the field" },
  { src: "../images/16.jpeg", caption: "From the field" },
  { src: "../images/17.jpeg", caption: "From the field" },
  { src: "../images/18.jpeg", caption: "From the field" },
  { src: "../images/19.jpeg", caption: "From the field" },
  { src: "../images/20.jpeg", caption: "From the field" },
  { src: "../images/21.jpeg", caption: "From the field" },
  { src: "../images/22.jpeg", caption: "From the field" },
  { src: "../images/23.jpeg", caption: "From the field" },
  { src: "../images/24.jpeg", caption: "From the field" },
  { src: "../images/25.jpeg", caption: "From the field" },
  { src: "../images/26.jpeg", caption: "From the field" },
  { src: "../images/27.jpeg", caption: "From the field" },
  { src: "../images/28.jpeg", caption: "From the field" },
  { src: "../images/29.jpeg", caption: "From the field" },
  { src: "../images/30.jpeg", caption: "From the field" },
  { src: "../images/31.jpeg", caption: "From the field" },
  { src: "../images/32.jpeg", caption: "From the field" },
  { src: "../images/33.jpeg", caption: "From the field" },
  { src: "../images/34.jpeg", caption: "From the field" },
  { src: "../images/35.jpeg", caption: "From the field" },
  { src: "../images/36.jpeg", caption: "From the field" },
  { src: "../images/37.jpeg", caption: "From the field" },
  { src: "../images/38.jpeg", caption: "From the field" },
  { src: "../images/39.jpeg", caption: "From the field" },
  { src: "../images/40.jpeg", caption: "From the field" },
  { src: "../images/41.jpeg", caption: "From the field" },
  { src: "../images/42.jpeg", caption: "From the field" },
  { src: "../images/43.jpeg", caption: "From the field" },
  { src: "../images/44.jpeg", caption: "From the field" },
  { src: "../images/45.jpeg", caption: "From the field" },
  { src: "../images/46.jpeg", caption: "From the field" },
  { src: "../images/47.jpeg", caption: "From the field" },
  { src: "../images/48.jpeg", caption: "From the field" },
  { src: "../images/49.jpeg", caption: "From the field" },
  { src: "../images/50.jpeg", caption: "From the field" },
  { src: "../images/51.jpeg", caption: "From the field" },
  { src: "../images/52.jpeg", caption: "From the field" },
  { src: "../images/53.jpeg", caption: "From the field" },
  { src: "../images/54.jpeg", caption: "From the field" },
  { src: "../images/55.jpeg", caption: "From the field" },
  { src: "../images/56.jpeg", caption: "From the field" },
  { src: "../images/57.jpeg", caption: "From the field" },
  { src: "../images/58.jpeg", caption: "From the field" },
  { src: "../images/59.jpeg", caption: "From the field" },
  { src: "../images/60.jpeg", caption: "From the field" },
  { src: "../images/61.jpeg", caption: "From the field" },
  { src: "../images/62.jpeg", caption: "From the field" }
];
var galleryGrid = document.getElementById("gallery-grid");
if (galleryGrid) {
  if (IMAGES.length) {
    galleryGrid.innerHTML = IMAGES.map(function (img) {
      return '<div class="gallery__item">'
        + '<img src="' + esc(img.src) + '" alt="' + esc(img.caption) + '" loading="lazy" />'
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
