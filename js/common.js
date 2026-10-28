/* ---------- disable right-click context menu ---------- */
document.addEventListener("contextmenu", function (e) { e.preventDefault(); });

/* ---------- shared helpers (loaded on every page) ---------- */
var fmt = function (n) { return n.toLocaleString("en-IN"); };
var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };

/* ---------- mobile nav ---------- */
var nav = document.getElementById("nav"), navToggle = document.getElementById("navToggle");
if (nav && navToggle) {
  navToggle.addEventListener("click", function () {
    var open = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", String(!open));
    navToggle.setAttribute("aria-expanded", String(!open));
    navToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  });
  document.querySelectorAll("#mobileMenu a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.setAttribute("data-open", "false");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- scroll reveal ---------- */
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduce) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
} else {
  document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
}

/* ---------- header gains a hairline + shadow once the page scrolls ---------- */
if (nav) {
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- impact figures count up when they come into view ---------- */
(function () {
  var figs = document.querySelectorAll(".sbar-n, .pb-stat__n, .result-strip__n");
  if (!figs.length || reduce || !("IntersectionObserver" in window)) return;
  function run(el) {
    var node = el.firstChild;                        /* leading text node; a % <span> may follow */
    var m = node && node.nodeType === 3 && node.nodeValue.match(/^([\d,]+)(.*)$/);
    if (!m) return;
    var target = parseInt(m[1].replace(/,/g, ""), 10), rest = m[2], t0 = null, D = 1600;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 4);   /* ease-out quart */
      node.nodeValue = fmt(Math.round(target * e)) + rest;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); cio.unobserve(en.target); } });
  }, { threshold: 0.6 });
  figs.forEach(function (el) { cio.observe(el); });
})();

/* ---------- ambient falling leaves ---------- */
if (!reduce) {
  var LEAF_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6 6 3 11 3 15a9 9 0 0 0 18 0c0-4-3-9-9-13z"/><path d="M12 4v17" stroke="rgba(27,23,18,.28)" stroke-width="1" fill="none"/></svg>';
  var LEAF_COLORS = ["var(--leaf-1)", "var(--leaf-2)", "var(--leaf-3)", "var(--leaf-4)", "var(--leaf-5)"];
  var leaves = document.createElement("div");
  leaves.className = "leaves";
  leaves.setAttribute("aria-hidden", "true");
  for (var i = 0; i < 8; i++) {
    var leaf = document.createElement("span");
    leaf.className = "leaf";
    var dur = 12 + Math.random() * 10;
    leaf.style.setProperty("--size", Math.round(14 + Math.random() * 14) + "px");
    leaf.style.setProperty("--dur", dur.toFixed(1) + "s");
    leaf.style.setProperty("--delay", (-Math.random() * dur).toFixed(1) + "s");
    leaf.style.setProperty("--x", (Math.random() * 100).toFixed(1) + "vw");
    leaf.style.setProperty("--drift", Math.round(Math.random() * 140 - 70) + "px");
    leaf.style.color = LEAF_COLORS[i % LEAF_COLORS.length];
    leaf.innerHTML = LEAF_SVG;
    leaves.appendChild(leaf);
  }
  document.body.insertBefore(leaves, document.body.firstChild);
}

/* ---------- footer year ---------- */
var yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();

/* ---------- news ticker ---------- */
(function () {
  var track = document.getElementById("tickerTrack");
  if (!track) return;

  var fallback = [
    { title: "India's forest cover rises for 5th consecutive year - Forest Survey of India 2023", link: "https://fsi.nic.in/" },
    { title: "Andhra Pradesh plants over 1.5 crore saplings under Green AP Mission this monsoon", link: "https://environment.ap.gov.in/" },
    { title: "CAMPA funds: ₹55,000 crore earmarked to restore degraded forest land across India", link: "https://campa.gov.in/" },
    { title: "Supreme Court upholds compensatory afforestation norms - strict compliance directed", link: "#" },
    { title: "Corporate CSR spending on environment and ecology reaches ₹4,200 crore - MCA report", link: "#" },
    { title: "National Agroforestry Policy push: farmers incentivised to plant trees on agricultural bunds", link: "#" },
    { title: "UNESCO recognises community-led forest restoration models from Andhra Pradesh", link: "#" },
    { title: "MoEFCC launches 'Harit Dhara' - national drive to double urban tree canopy cover by 2030", link: "#" },
  ];

  function render(items) {
    var doubled = items.concat(items);
    var html = doubled.map(function (item, i) {
      var sep = i > 0 ? '<span class="ticker__sep" aria-hidden="true">▸</span>' : "";
      var href = item.link && item.link !== "#" ? esc(item.link) : "#";
      var extra = href !== "#" ? ' target="_blank" rel="noopener noreferrer"' : "";
      return sep + '<a class="ticker__item" href="' + href + '"' + extra + ">" + esc(item.title) + "</a>";
    }).join("");
    track.innerHTML = html;
    /* scale speed to content width so scroll feels consistent */
    var dur = Math.max(40, Math.round(track.scrollWidth / 80));
    track.style.animationDuration = dur + "s";
  }

  /* shortcut: curated headlines only; the old rss2json feed was CORS-blocked on this origin. Live news needs a server-side proxy. */
  render(fallback);
})();
