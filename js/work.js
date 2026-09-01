/* ---------- data: the real plantation register (single source of truth) ---------- */
var CAT = {
  reserve: "Reserve forest & afforestation",
  park: "Eco-tourism park",
  urban: "Urban forest · Nagaravanam"
};
var SITES = [
  { no: "01", name: 'Muthayapalame RF — Compartment 1, Plot 1', loc: "Kappalavanipalem", cat: "reserve", acres: 27, plants: 24150 },
  { no: "02", name: 'Muthayapalame RF — Compartment 1, Plot 2', loc: "Kappalavanipalem", cat: "reserve", acres: 22, plants: 20850 },
  { no: "03", name: 'Motupalli RF — Compartment No. 380', loc: "Chinnaganjam", cat: "reserve", acres: 35, plants: 35000 },
  { no: "04", name: 'Motupalli Reserve Forest', loc: "Chinnaganjam", cat: "reserve", acres: 27, plants: 30000 },
  { no: "05", name: 'Eco-Tourism Park, Kanigiri', loc: "Kanigiri", cat: "park", acres: 49, plants: 26660 },
  { no: "06", name: 'Eco-Tourism Park, Chinarikatla', loc: "Podili", cat: "park", acres: 49, plants: 26660 },
  { no: "07", name: 'Nagaravanam Yojana, Bapatla', loc: "Bapatla", cat: "urban", acres: 37, plants: 24142 },
  { no: "08", name: 'Muthyapalem "A" Beat, Bapatla', loc: "Bapatla", cat: "reserve", acres: 25, plants: 11110 },
  { no: "09", name: 'Nagaravanam, Chirala', loc: "Chirala", cat: "urban", acres: 25, plants: 16095 }
];

/* ---------- render register ---------- */
var register = document.getElementById("register");
if (register) {
  function drawRegister(filter) {
    var rows = SITES.filter(function (s) { return filter === "all" || s.cat === filter; });
    register.innerHTML = rows.map(function (s) {
      return '<button class="site reveal is-visible" data-no="' + s.no + '" aria-haspopup="dialog">'
        + '<span class="site__no">' + s.no + '</span>'
        + '<span class="site__mid"><span class="site__name">' + esc(s.name) + '</span>'
        + '<span class="site__loc">' + esc(s.loc) + '</span>'
        + '<br><span class="site__tag" data-cat="' + s.cat + '">' + esc(CAT[s.cat]) + '</span></span>'
        + '<span class="site__data"><span><b>' + fmt(s.acres) + '</b> ac</span>'
        + '<span><b>' + fmt(s.plants) + '</b> saplings</span>'
        + '<span class="surv">100%</span></span>'
        + '<span class="site__open">Read case study →</span>'
        + '</button>';
    }).join("");

    var totA = rows.reduce(function (a, s) { return a + s.acres; }, 0);
    var totP = rows.reduce(function (a, s) { return a + s.plants; }, 0);
    document.getElementById("regFoot").textContent =
      "Showing " + rows.length + " of 9 sites · " + fmt(totA) + " acres · " + fmt(totP) + " saplings · 100% survival recorded.";
  }
  drawRegister("all");

  /* ---------- filters ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".filters button"), function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filters button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      drawRegister(btn.getAttribute("data-filter"));
    });
  });

  /* ---------- case-study modal ---------- */
  var modal = document.getElementById("modal");
  var mdBody = document.getElementById("mdBody");
  var lastFocus = null;

  function challengeText(cat) {
    if (cat === "reserve") return "Open, degraded reserve-forest land with sparse cover and low natural regeneration — the kind of ground that needs dense, deliberate native planting to come back.";
    if (cat === "park") return "A public eco-tourism park needing durable tree cover that can survive footfall and thrive as a living, walk-in green space.";
    return "Land near a growing settlement earmarked for a dense urban forest under the Nagaravanam model — a green lung planted close to where people live.";
  }
  function openCase(no) {
    var s = SITES.filter(function (x) { return x.no === no; })[0];
    if (!s) return;
    lastFocus = document.activeElement;
    mdBody.innerHTML =
      '<div class="md__cat">' + esc(CAT[s.cat]) + ' · Site ' + s.no + '</div>'
      + '<h2 class="md__title" id="md-title">' + esc(s.name) + '</h2>'
      + '<p class="md__result">' + fmt(s.plants) + ' native saplings established across ' + fmt(s.acres) + ' acres, with 100% survival recorded.</p>'
      + '<dl class="md__meta">'
      + '<div><dt>Location</dt><dd>' + esc(s.loc) + '</dd></div>'
      + '<div><dt>Area</dt><dd>' + fmt(s.acres) + ' acres</dd></div>'
      + '<div><dt>Saplings</dt><dd>' + fmt(s.plants) + '</dd></div>'
      + '<div><dt>Survival</dt><dd>100%</dd></div>'
      + '<div><dt>Planting year</dt><dd>[PLANTING_YEAR]</dd></div>'
      + '<div><dt>Status</dt><dd>Completed</dd></div>'
      + '</dl>'
      + '<div class="md__gallery"><div class="md__ph">[SITE PHOTO]<br>replace with real image</div><div class="md__ph">[SITE PHOTO]<br>replace with real image</div></div>'
      + '<section><h4>The challenge</h4><p>' + challengeText(s.cat) + ' <span style="color:#9a9078">[SITE_SPECIFIC_CONTEXT]</span></p></section>'
      + '<section><h4>Our role &amp; approach</h4><ul>'
      + '<li>Surveyed the site and prepared the ground — pitting, soil work and protective fencing.</li>'
      + '<li>Selected native, site-suited species [KEY_SPECIES] raised to plantable size.</li>'
      + '<li>Planted ' + fmt(s.plants) + ' saplings across ' + fmt(s.acres) + ' acres, timed to the monsoon.</li>'
      + '<li>Maintained and monitored through the vulnerable early years [MAINTENANCE_PERIOD].</li>'
      + '</ul></section>'
      + '<section><h4>What we delivered</h4><p>' + fmt(s.acres) + ' acres restored and ' + fmt(s.plants) + ' native saplings established, with survival tracked site-wide and recorded at 100%.</p></section>'
      + '<section><h4>Results &amp; impact</h4><p>100% survival recorded across the site. <span style="color:#9a9078">[Add further verifiable outcomes — canopy, species count, community benefit — only where measured.]</span></p></section>'
      + '<div class="md__cta"><a class="btn btn--gold" href="/contact/" data-close>Discuss a project like this <span class="arw" aria-hidden="true">→</span></a></div>';

    modal.setAttribute("data-open", "true");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.getElementById("modalX").focus();
  }
  function closeCase() {
    modal.setAttribute("data-open", "false");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  register.addEventListener("click", function (e) {
    var b = e.target.closest(".site"); if (b) openCase(b.getAttribute("data-no"));
  });
  document.getElementById("modalX").addEventListener("click", closeCase);
  modal.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) closeCase(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("data-open") === "true") closeCase();
  });
  /* basic focus trap inside modal */
  modal.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" || modal.getAttribute("data-open") !== "true") return;
    var f = modal.querySelectorAll('a[href],button,select,input,textarea,[tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}
