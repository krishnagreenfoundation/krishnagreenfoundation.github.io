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
