/* ---------- form validation ---------- */
var form = document.getElementById("form");
if (form) {
  var setErr = function (id, on) { document.getElementById("f-" + id).setAttribute("data-err", String(on)); return !on; };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ok = setErr("name", !document.getElementById("name").value.trim()) && ok;
    var em = document.getElementById("email").value.trim();
    ok = setErr("email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) && ok;
    ok = setErr("type", !document.getElementById("ptype").value) && ok;
    ok = setErr("msg", !document.getElementById("msg").value.trim()) && ok;
    ok = setErr("consent", !document.getElementById("consent").checked) && ok;

    if (!ok) {
      var bad = form.querySelector('[data-err="true"] input, [data-err="true"] select, [data-err="true"] textarea');
      if (bad) bad.focus();
      return;
    }
    var btn = document.getElementById("submit");
    btn.classList.add("is-loading"); btn.textContent = "Sending…";

    var payload = {
      access_key: "65e50926-5407-4095-9402-f95ad4f25e73",
      subject: "Enquiry from " + document.getElementById("name").value.trim() +
        " – " + document.getElementById("ptype").value,
      from_name: "Krishna Green Foundation Website",
      replyto: document.getElementById("email").value.trim(),
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      organization: document.getElementById("org").value.trim(),
      project_type: document.getElementById("ptype").value,
      budget: document.getElementById("budget").value,
      message: document.getElementById("msg").value.trim()
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
          document.getElementById("ok").focus();
        } else {
          btn.classList.remove("is-loading");
          btn.textContent = "Send enquiry →";
          alert("Something went wrong. Please try again or email us directly at krishnagreenfoundation@gmail.com");
        }
      })
      .catch(function () {
        btn.classList.remove("is-loading");
        btn.textContent = "Send enquiry →";
        alert("Network error. Please try again or email us directly at krishnagreenfoundation@gmail.com");
      });
  });
}
