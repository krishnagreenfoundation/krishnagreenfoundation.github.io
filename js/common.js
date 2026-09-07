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

/* ---------- footer year ---------- */
var yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();

/* ---------- news ticker ---------- */
(function () {
  var track = document.getElementById("tickerTrack");
  if (!track) return;

  var fallback = [
    { title: "India's forest cover rises for 5th consecutive year — Forest Survey of India 2023", link: "https://fsi.nic.in/" },
    { title: "Andhra Pradesh plants over 1.5 crore saplings under Green AP Mission this monsoon", link: "https://environment.ap.gov.in/" },
    { title: "CAMPA funds: ₹55,000 crore earmarked to restore degraded forest land across India", link: "https://campa.gov.in/" },
    { title: "Supreme Court upholds compensatory afforestation norms — strict compliance directed", link: "#" },
    { title: "Corporate CSR spending on environment and ecology reaches ₹4,200 crore — MCA report", link: "#" },
    { title: "National Agroforestry Policy push: farmers incentivised to plant trees on agricultural bunds", link: "#" },
    { title: "UNESCO recognises community-led forest restoration models from Andhra Pradesh", link: "#" },
    { title: "MoEFCC launches 'Harit Dhara' — national drive to double urban tree canopy cover by 2030", link: "#" },
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

  var RSS_URL = "https://news.google.com/rss/search?q=reforestation+plantation+afforestation+India+forest+restoration&hl=en-IN&gl=IN&ceid=IN:en";
  var API = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(RSS_URL) + "&count=8";

  fetch(API, { cache: "default" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.status !== "ok" || !data.items || !data.items.length) throw new Error();
      var items = data.items.map(function (item) {
        return { title: item.title.replace(/ - [^-]+$/, ""), link: item.link };
      });
      render(items);
    })
    .catch(function () { render(fallback); });
})();
