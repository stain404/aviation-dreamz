(function () {
  "use strict";

  /* ----------------------------------------------------------
     Mobile menu toggle (below 1020px the nav collapses).
     ---------------------------------------------------------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu";
        menuBtn.focus();
      }
    });
  }

  /* ----------------------------------------------------------
     Numbered photo and video slots. Each points at images/N.jpeg
     or images/N.mp4; until that file exists, drop the
     element so the numbered placeholder shows instead.
     ---------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll(".media > img, .media > video"), function (el) {
    function drop() { if (el.parentNode) { el.parentNode.removeChild(el); } }
    var isVideo = el.tagName === "VIDEO";
    if (isVideo ? (el.error || el.networkState === 3) : (el.complete && el.naturalWidth === 0)) { drop(); return; }
    el.addEventListener("error", drop);
    if (!isVideo) {
      if (el.complete) { frame(el); } else { el.addEventListener("load", function () { frame(el); }); }
    }
  });

  /* If the photo's orientation doesn't match its slot's, cropping it
     would lose most of the picture (a standing person in a panorama
     keeps only their middle), so show it whole instead. */
  function frame(img) {
    var slot = img.parentNode;
    if (!slot || !img.naturalWidth) { return; }
    var photoWide = img.naturalWidth > img.naturalHeight;
    var slotWide = slot.clientWidth > slot.clientHeight;
    slot.classList.toggle("framed", photoWide !== slotWide);
  }

  /* ----------------------------------------------------------
     Boarding pass destination — home page only. Once, on load,
     each letter of "Cabin crew" flicks through the alphabet and
     settles, like a departures board. Each letter's width is fixed
     to its final glyph first so the line never jumps. Skipped
     entirely for reduced motion.
     ---------------------------------------------------------- */
  var flap = document.querySelector("[data-flap]");
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (flap && !still) {
    var word = flap.textContent;
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(function () {
      flap.setAttribute("aria-label", word);
      flap.textContent = "";
      var cells = word.split("").map(function (ch) {
        var s = document.createElement("span");
        s.setAttribute("aria-hidden", "true");
        s.textContent = ch === " " ? " " : ch;
        flap.appendChild(s);
        return s;
      });
      cells.forEach(function (s) { s.style.width = s.getBoundingClientRect().width + "px"; });

      var abc = "abcdefghijklmnopqrstuvwxyz";
      var start = performance.now();
      function tick(now) {
        var done = true;
        cells.forEach(function (s, i) {
          var ch = word.charAt(i);
          if (ch === " ") { return; }
          /* letters settle left to right, 60ms apart, after 350ms of flicking */
          if (now - start < 350 + i * 60) {
            done = false;
            s.textContent = abc.charAt(Math.floor(Math.random() * abc.length));
          } else {
            s.textContent = ch;
          }
        });
        if (!done) { setTimeout(function () { requestAnimationFrame(tick); }, 45); }
      }
      requestAnimationFrame(tick);
    });
  }

  /* ----------------------------------------------------------
     Enquiry form — only on contact.html.
     ---------------------------------------------------------- */
  var form = document.getElementById("enquiryForm");
  if (!form) { return; }
  var status = document.getElementById("status");

  var checks = [
    { wrap: "f-name",  input: "name",  test: function (v) { return v.trim().length > 1; } },
    { wrap: "f-phone", input: "phone", test: function (v) { return v.replace(/[^\d]/g, "").length >= 7; } },
    { wrap: "f-email", input: "email", test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      /* an empty field has no malformed address to complain about */
      message: function (v) {
        return v.trim() === ""
          ? "Please add an email we can reply to."
          : "That address is missing an @ or a domain.";
      } },
    { wrap: "f-city",  input: "city",  test: function (v) { return v.trim().length > 1; } },
    { wrap: "f-stage", input: "stage", test: function (v) { return v !== ""; } }
  ];

  checks.forEach(function (c) {
    var el = document.getElementById(c.input);
    el.addEventListener("input", function () { clear(c); });
    el.addEventListener("change", function () { clear(c); });
  });

  function clear(c) {
    var wrap = document.getElementById(c.wrap);
    var el = document.getElementById(c.input);
    if (wrap.classList.contains("invalid") && c.test(el.value)) {
      wrap.classList.remove("invalid");
      el.removeAttribute("aria-invalid");
    }
  }

  var consent = document.getElementById("consent");
  consent.addEventListener("change", function () {
    if (consent.checked) { document.getElementById("f-consent").classList.remove("invalid"); }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = [];

    checks.forEach(function (c) {
      var wrap = document.getElementById(c.wrap);
      var el = document.getElementById(c.input);
      if (c.test(el.value)) {
        wrap.classList.remove("invalid");
        el.removeAttribute("aria-invalid");
      } else {
        wrap.classList.add("invalid");
        el.setAttribute("aria-invalid", "true");
        if (c.message) { wrap.querySelector(".err").textContent = c.message(el.value); }
        bad.push(c);
      }
    });

    /* consent is a legal requirement for contacting them, so it blocks too */
    var consentBad = !consent.checked;
    document.getElementById("f-consent").classList.toggle("invalid", consentBad);

    if (bad.length || consentBad) {
      if (bad.length && consentBad) {
        status.textContent = "Please complete the highlighted fields and tick the consent box.";
      } else if (consentBad) {
        status.textContent = "Please tick the consent box so we're allowed to call you.";
      } else {
        status.textContent = bad.length === 1
          ? "One field needs your attention."
          : bad.length + " fields need your attention.";
      }
      status.className = "form-status show";
      (bad.length ? document.getElementById(bad[0].input) : consent).focus();
      return;
    }

    status.className = "form-status";
    submitForm(new FormData(form));
  });

  /* ----------------------------------------------------------
     NOT WIRED UP YET.
     Replace the body of this function with a fetch() to your form
     handler (Netlify Forms, Formspree, or your own endpoint) and
     call showSent() only on a successful response.
     ---------------------------------------------------------- */
  function submitForm(data) {
    showSent(
      "NAME   " + data.get("name") + "\n" +
      "PHONE  " + data.get("phone") + "\n" +
      "CITY   " + data.get("city") + "\n" +
      "STAGE  " + data.get("stage")
    );
  }

  function showSent(recap) {
    document.getElementById("recap").textContent = recap;
    form.classList.add("done");
    form.scrollIntoView({ block: "center" });
  }
})();
