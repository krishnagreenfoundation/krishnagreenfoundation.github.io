/* ---------- data: the real plantation register (single source of truth) ---------- */
var CAT = {
  reserve: "Reserve forest & afforestation",
  park:    "Eco-tourism park",
  urban:   "Urban forest · Nagaravanam"
};
var SITES = [
  {no:"01", name:'Muthayapalame RF — Compartment 1, Plot 1', loc:"Kappalavanipalem", cat:"reserve", acres:27, plants:24150},
  {no:"02", name:'Muthayapalame RF — Compartment 1, Plot 2', loc:"Kappalavanipalem", cat:"reserve", acres:22, plants:20850},
  {no:"03", name:'Motupalli RF — Compartment No. 380',       loc:"Chinnaganjam",     cat:"reserve", acres:35, plants:35000},
  {no:"04", name:'Motupalli Reserve Forest',                 loc:"Chinnaganjam",     cat:"reserve", acres:27, plants:30000},
  {no:"05", name:'Eco-Tourism Park, Kanigiri',               loc:"Kanigiri",         cat:"park",    acres:49, plants:26660},
  {no:"06", name:'Eco-Tourism Park, Chinarikatla',           loc:"Podili",           cat:"park",    acres:49, plants:26660},
  {no:"07", name:'Nagaravanam Yojana, Bapatla',               loc:"Bapatla",          cat:"urban",   acres:37, plants:24142},
  {no:"08", name:'Muthyapalem "A" Beat, Bapatla',            loc:"Bapatla",          cat:"reserve", acres:25, plants:11110},
  {no:"09", name:'Nagaravanam, Chirala',                     loc:"Chirala",          cat:"urban",   acres:25, plants:16095}
];
var fmt = function(n){ return n.toLocaleString("en-IN"); };
var esc = function(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); };

/* ---------- render register ---------- */
var register = document.getElementById("register");
function drawRegister(filter){
  var rows = SITES.filter(function(s){ return filter==="all" || s.cat===filter; });
  register.innerHTML = rows.map(function(s){
    return '<button class="site reveal is-visible" data-no="'+s.no+'" aria-haspopup="dialog">'
      + '<span class="site__no">'+s.no+'</span>'
      + '<span class="site__mid"><span class="site__name">'+esc(s.name)+'</span>'
      + '<span class="site__loc">'+esc(s.loc)+'</span>'
      + '<br><span class="site__tag" data-cat="'+s.cat+'">'+esc(CAT[s.cat])+'</span></span>'
      + '<span class="site__data"><span><b>'+fmt(s.acres)+'</b> ac</span>'
      + '<span><b>'+fmt(s.plants)+'</b> saplings</span>'
      + '<span class="surv">100%</span></span>'
      + '<span class="site__open">Read case study →</span>'
      + '</button>';
  }).join("");

  var totA = rows.reduce(function(a,s){return a+s.acres;},0);
  var totP = rows.reduce(function(a,s){return a+s.plants;},0);
  document.getElementById("regFoot").textContent =
    "Showing "+rows.length+" of 9 sites · "+fmt(totA)+" acres · "+fmt(totP)+" saplings · 100% survival recorded.";
}
drawRegister("all");

/* ---------- filters ---------- */
Array.prototype.forEach.call(document.querySelectorAll(".filters button"), function(btn){
  btn.addEventListener("click", function(){
    document.querySelectorAll(".filters button").forEach(function(b){ b.setAttribute("aria-pressed","false"); });
    btn.setAttribute("aria-pressed","true");
    drawRegister(btn.getAttribute("data-filter"));
  });
});

/* ---------- case-study modal ---------- */
var modal   = document.getElementById("modal");
var mdBody  = document.getElementById("mdBody");
var lastFocus = null;

function challengeText(cat){
  if(cat==="reserve") return "Open, degraded reserve-forest land with sparse cover and low natural regeneration — the kind of ground that needs dense, deliberate native planting to come back.";
  if(cat==="park")    return "A public eco-tourism park needing durable tree cover that can survive footfall and thrive as a living, walk-in green space.";
  return "Land near a growing settlement earmarked for a dense urban forest under the Nagaravanam model — a green lung planted close to where people live.";
}
function openCase(no){
  var s = SITES.filter(function(x){return x.no===no;})[0];
  if(!s) return;
  lastFocus = document.activeElement;
  mdBody.innerHTML =
      '<div class="md__cat">'+esc(CAT[s.cat])+' · Site '+s.no+'</div>'
    + '<h2 class="md__title" id="md-title">'+esc(s.name)+'</h2>'
    + '<p class="md__result">'+fmt(s.plants)+' native saplings established across '+fmt(s.acres)+' acres, with 100% survival recorded.</p>'
    + '<dl class="md__meta">'
      + '<div><dt>Location</dt><dd>'+esc(s.loc)+'</dd></div>'
      + '<div><dt>Area</dt><dd>'+fmt(s.acres)+' acres</dd></div>'
      + '<div><dt>Saplings</dt><dd>'+fmt(s.plants)+'</dd></div>'
      + '<div><dt>Survival</dt><dd>100%</dd></div>'
      + '<div><dt>Planting year</dt><dd>[PLANTING_YEAR]</dd></div>'
      + '<div><dt>Status</dt><dd>Completed</dd></div>'
    + '</dl>'
    + '<div class="md__gallery"><div class="md__ph">[SITE PHOTO]<br>replace with real image</div><div class="md__ph">[SITE PHOTO]<br>replace with real image</div></div>'
    + '<section><h4>The challenge</h4><p>'+challengeText(s.cat)+' <span style="color:#9a9078">[SITE_SPECIFIC_CONTEXT]</span></p></section>'
    + '<section><h4>Our role &amp; approach</h4><ul>'
      + '<li>Surveyed the site and prepared the ground — pitting, soil work and protective fencing.</li>'
      + '<li>Selected native, site-suited species [KEY_SPECIES] raised to plantable size.</li>'
      + '<li>Planted '+fmt(s.plants)+' saplings across '+fmt(s.acres)+' acres, timed to the monsoon.</li>'
      + '<li>Maintained and monitored through the vulnerable early years [MAINTENANCE_PERIOD].</li>'
    + '</ul></section>'
    + '<section><h4>What we delivered</h4><p>'+fmt(s.acres)+' acres restored and '+fmt(s.plants)+' native saplings established, with survival tracked site-wide and recorded at 100%.</p></section>'
    + '<section><h4>Results &amp; impact</h4><p>100% survival recorded across the site. <span style="color:#9a9078">[Add further verifiable outcomes — canopy, species count, community benefit — only where measured.]</span></p></section>'
    + '<div class="md__cta"><a class="btn btn--gold" href="#contact" data-close>Discuss a project like this <span class="arw" aria-hidden="true">→</span></a></div>';

  modal.setAttribute("data-open","true");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
  document.getElementById("modalX").focus();
}
function closeCase(){
  modal.setAttribute("data-open","false");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
  if(lastFocus) lastFocus.focus();
}
register.addEventListener("click", function(e){
  var b = e.target.closest(".site"); if(b) openCase(b.getAttribute("data-no"));
});
document.getElementById("modalX").addEventListener("click", closeCase);
modal.addEventListener("click", function(e){ if(e.target.hasAttribute("data-close")) closeCase(); });
document.addEventListener("keydown", function(e){
  if(e.key==="Escape" && modal.getAttribute("data-open")==="true") closeCase();
});
/* basic focus trap inside modal */
modal.addEventListener("keydown", function(e){
  if(e.key!=="Tab" || modal.getAttribute("data-open")!=="true") return;
  var f = modal.querySelectorAll('a[href],button,select,input,textarea,[tabindex]:not([tabindex="-1"])');
  if(!f.length) return;
  var first=f[0], last=f[f.length-1];
  if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
});

/* ---------- mobile nav ---------- */
var nav = document.getElementById("nav"), navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", function(){
  var open = nav.getAttribute("data-open")==="true";
  nav.setAttribute("data-open", String(!open));
  navToggle.setAttribute("aria-expanded", String(!open));
  navToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
});
document.querySelectorAll("#mobileMenu a").forEach(function(a){
  a.addEventListener("click", function(){
    nav.setAttribute("data-open","false");
    navToggle.setAttribute("aria-expanded","false");
  });
});

/* ---------- form validation ---------- */
var form = document.getElementById("form");
function setErr(id, on){ document.getElementById("f-"+id).setAttribute("data-err", String(on)); return !on; }
form.addEventListener("submit", function(e){
  e.preventDefault();
  var ok = true;
  ok = setErr("name",    !document.getElementById("name").value.trim()) && ok;
  var em = document.getElementById("email").value.trim();
  ok = setErr("email",   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) && ok;
  ok = setErr("type",    !document.getElementById("ptype").value) && ok;
  ok = setErr("msg",     !document.getElementById("msg").value.trim()) && ok;
  ok = setErr("consent", !document.getElementById("consent").checked) && ok;

  if(!ok){
    var bad = form.querySelector('[data-err="true"] input, [data-err="true"] select, [data-err="true"] textarea');
    if(bad) bad.focus();
    return;
  }
  var btn = document.getElementById("submit");
  btn.classList.add("is-loading"); btn.textContent = "Sending…";
  setTimeout(function(){ form.classList.add("is-sent"); document.getElementById("ok").focus(); }, 1100);
});

/* ---------- gallery ---------- */
var IMAGES = [
  {src:"images/1.jpeg",  caption:"From the field"},
  {src:"images/2.jpeg",  caption:"From the field"},
  {src:"images/3.jpeg",  caption:"From the field"},
  {src:"images/4.jpeg",  caption:"From the field"},
  {src:"images/5.jpeg",  caption:"From the field"},
  {src:"images/6.jpeg",  caption:"From the field"},
  {src:"images/7.jpeg",  caption:"From the field"},
  {src:"images/8.jpeg",  caption:"From the field"},
  {src:"images/9.jpeg",  caption:"From the field"},
  {src:"images/10.jpeg", caption:"From the field"},
  {src:"images/11.jpeg", caption:"From the field"},
  {src:"images/12.jpeg", caption:"From the field"},
  {src:"images/13.jpeg", caption:"From the field"},
  {src:"images/14.jpeg", caption:"From the field"},
  {src:"images/15.jpeg", caption:"From the field"},
  {src:"images/16.jpeg", caption:"From the field"},
  {src:"images/17.jpeg", caption:"From the field"},
  {src:"images/18.jpeg", caption:"From the field"},
  {src:"images/19.jpeg", caption:"From the field"},
  {src:"images/20.jpeg", caption:"From the field"},
  {src:"images/21.jpeg", caption:"From the field"},
  {src:"images/22.jpeg", caption:"From the field"},
  {src:"images/23.jpeg", caption:"From the field"},
  {src:"images/24.jpeg", caption:"From the field"},
  {src:"images/25.jpeg", caption:"From the field"},
  {src:"images/26.jpeg", caption:"From the field"},
  {src:"images/27.jpeg", caption:"From the field"},
  {src:"images/28.jpeg", caption:"From the field"},
  {src:"images/29.jpeg", caption:"From the field"},
  {src:"images/30.jpeg", caption:"From the field"},
  {src:"images/31.jpeg", caption:"From the field"},
  {src:"images/32.jpeg", caption:"From the field"},
  {src:"images/33.jpeg", caption:"From the field"},
  {src:"images/34.jpeg", caption:"From the field"},
  {src:"images/35.jpeg", caption:"From the field"},
  {src:"images/36.jpeg", caption:"From the field"},
  {src:"images/37.jpeg", caption:"From the field"},
  {src:"images/38.jpeg", caption:"From the field"},
  {src:"images/39.jpeg", caption:"From the field"},
  {src:"images/40.jpeg", caption:"From the field"},
  {src:"images/41.jpeg", caption:"From the field"},
  {src:"images/42.jpeg", caption:"From the field"},
  {src:"images/43.jpeg", caption:"From the field"},
  {src:"images/44.jpeg", caption:"From the field"},
  {src:"images/45.jpeg", caption:"From the field"},
  {src:"images/46.jpeg", caption:"From the field"},
  {src:"images/47.jpeg", caption:"From the field"},
  {src:"images/48.jpeg", caption:"From the field"},
  {src:"images/49.jpeg", caption:"From the field"},
  {src:"images/50.jpeg", caption:"From the field"},
  {src:"images/51.jpeg", caption:"From the field"},
  {src:"images/52.jpeg", caption:"From the field"},
  {src:"images/53.jpeg", caption:"From the field"},
  {src:"images/54.jpeg", caption:"From the field"},
  {src:"images/55.jpeg", caption:"From the field"},
  {src:"images/56.jpeg", caption:"From the field"},
  {src:"images/57.jpeg", caption:"From the field"},
  {src:"images/58.jpeg", caption:"From the field"},
  {src:"images/59.jpeg", caption:"From the field"},
  {src:"images/60.jpeg", caption:"From the field"},
  {src:"images/61.jpeg", caption:"From the field"},
  {src:"images/62.jpeg", caption:"From the field"}
];
var galleryGrid = document.getElementById("gallery-grid");
if(galleryGrid){
  if(IMAGES.length){
    galleryGrid.innerHTML = IMAGES.map(function(img){
      return '<div class="gallery__item">'
        + '<img src="'+esc(img.src)+'" alt="'+esc(img.caption)+'" loading="lazy" />'
        + (img.caption ? '<div class="gallery__caption">'+esc(img.caption)+'</div>' : '')
        + '</div>';
    }).join("");
  } else {
    galleryGrid.innerHTML = '<p class="gallery__empty">Photos coming soon.</p>';
  }
}

/* ---------- gallery carousel ---------- */
(function(){
  var track   = document.getElementById("gallery-grid");
  var btnPrev = document.getElementById("galPrev");
  var btnNext = document.getElementById("galNext");
  if(!track || !btnPrev || !btnNext) return;

  function scrollBehavior(){ return window.matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth"; }

  function syncArrows(){
    btnPrev.disabled = track.scrollLeft <= 1;
    btnNext.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  btnPrev.addEventListener("click", function(){
    track.scrollBy({left: -track.clientWidth, behavior: scrollBehavior()});
  });
  btnNext.addEventListener("click", function(){
    track.scrollBy({left: track.clientWidth, behavior: scrollBehavior()});
  });
  track.addEventListener("scroll", syncArrows, {passive:true});
  syncArrows();
})();

/* ---------- scroll reveal ---------- */
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if("IntersectionObserver" in window && !reduce){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, {threshold:0.12, rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });
} else {
  document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("is-visible"); });
}

document.getElementById("yr").textContent = new Date().getFullYear();
