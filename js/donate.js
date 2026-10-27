/* ---------- pledge tiers ---------- */
var tiers = document.querySelectorAll(".tier");
var amountInput = document.getElementById("amount");
if (tiers.length && amountInput) {
  Array.prototype.forEach.call(tiers, function (t) {
    t.setAttribute("aria-pressed", "false");
    t.addEventListener("click", function () {
      Array.prototype.forEach.call(tiers, function (b) { b.setAttribute("aria-pressed", "false"); });
      t.setAttribute("aria-pressed", "true");
      amountInput.value = t.getAttribute("data-amount");
    });
  });
}

/* ---------- form validation + submit ---------- */
var form = document.getElementById("donateForm");
if (form) {
  var setErr = function (id, on) { document.getElementById("f-" + id).setAttribute("data-err", String(on)); return !on; };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ok = setErr("name", !document.getElementById("dname").value.trim()) && ok;
    var em = document.getElementById("demail").value.trim();
    ok = setErr("email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) && ok;
    ok = setErr("donortype", !document.getElementById("donortype").value) && ok;
    ok = setErr("consent", !document.getElementById("dconsent").checked) && ok;

    if (!ok) {
      var bad = form.querySelector('[data-err="true"] input, [data-err="true"] select, [data-err="true"] textarea');
      if (bad) bad.focus();
      return;
    }
    var btn = document.getElementById("dsubmit");
    btn.classList.add("is-loading"); btn.textContent = "Sending…";

    var payload = {
      access_key: "65e50926-5407-4095-9402-f95ad4f25e73",
      subject: "Donation pledge from " + document.getElementById("dname").value.trim() +
        " - " + document.getElementById("donortype").value,
      from_name: "Krishna Green Foundation Website - Donate",
      replyto: document.getElementById("demail").value.trim(),
      name: document.getElementById("dname").value.trim(),
      email: document.getElementById("demail").value.trim(),
      donor_type: document.getElementById("donortype").value,
      amount: document.getElementById("amount").value.trim(),
      dedication: document.getElementById("dedication").value.trim(),
      message: document.getElementById("dmsg").value.trim()
    };

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          form.classList.add("is-sent");
          document.getElementById("dok").focus();
        } else {
          btn.classList.remove("is-loading");
          btn.textContent = "Send my pledge →";
          alert("Something went wrong. Please try again or email us directly at krishnagreenfoundation@gmail.com");
        }
      })
      .catch(function () {
        btn.classList.remove("is-loading");
        btn.textContent = "Send my pledge →";
        alert("Network error. Please try again or email us directly at krishnagreenfoundation@gmail.com");
      });
  });
}
