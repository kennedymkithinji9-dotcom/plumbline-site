/* ==========================================================================
   PLUMBLINE — site behaviour
   --------------------------------------------------------------------------
   Four small jobs. No framework, no dependencies, nothing to build.

     1. Mobile navigation    show and hide the menu below 860px
     2. Theme toggle         light / dark, remembered in this browser
     3. Footer year          so the copyright line never goes stale
     4. Contact form         post to your form service and show the result
                             without the visitor losing the page

   Loaded with `defer` on every page, so it runs after the HTML is parsed.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. MOBILE NAVIGATION
     The button is hidden by CSS above 860px, so this does nothing on a
     desktop. aria-expanded is kept in step for screen readers.
     -------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
    // Close the menu after following a link to an anchor on the same page.
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });
  }

  /* ----------------------------------------------------------------------
     2. THEME TOGGLE
     Writes data-theme on <html>, which the stylesheet's [data-theme] blocks
     respond to. The choice is stored per browser; every read and write is
     wrapped because localStorage throws in a private window and in some
     embedded views.
     -------------------------------------------------------------------- */
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");

  function readStored() {
    try { return localStorage.getItem("plumbline-theme"); } catch (e) { return null; }
  }
  function store(value) {
    try { localStorage.setItem("plumbline-theme", value); } catch (e) { /* ignore */ }
  }
  function currentlyDark() {
    var set = root.getAttribute("data-theme");
    if (set) return set === "dark";
    return window.matchMedia &&
           window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paintButton() {
    if (!themeBtn) return;
    var dark = currentlyDark();
    themeBtn.textContent = dark ? "☀" : "☾";
    themeBtn.setAttribute("aria-label",
      dark ? "Switch to the light theme" : "Switch to the dark theme");
  }

  var saved = readStored();
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  paintButton();

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentlyDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store(next);
      paintButton();
    });
  }

  /* ----------------------------------------------------------------------
     3. FOOTER YEAR
     -------------------------------------------------------------------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ----------------------------------------------------------------------
     4. CONTACT FORM
     The form posts to whatever service its `action` attribute names —
     Formspree, Netlify Forms, Basin and others all accept this shape.

     Posting with fetch() instead of letting the browser submit normally
     keeps the visitor on the page and lets us show a result in place. If
     fetch fails for any reason, the form falls back to a normal submit so
     the message still gets through.
     -------------------------------------------------------------------- */
  var form = document.querySelector("form[data-contact]");
  if (form) {
    var status = form.querySelector(".form-status");
    var submit = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";

      // Until a real endpoint is pasted in, say so plainly rather than
      // pretending the message was sent.
      if (!action || action.indexOf("PASTE_YOUR") !== -1) {
        e.preventDefault();
        if (status) {
          status.className = "form-status err";
          status.textContent =
            "This form is not connected yet. Please email us instead — " +
            "the address is just below.";
        }
        return;
      }

      e.preventDefault();
      if (status) { status.className = "form-status"; status.textContent = "Sending…"; }
      if (submit) submit.disabled = true;

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (response) {
        if (!response.ok) throw new Error("rejected");
        form.reset();
        if (status) {
          status.className = "form-status ok";
          status.textContent =
            "Thank you — your message has been sent. We reply within one business day.";
        }
      }).catch(function () {
        // Something blocked the request. Submit the form the ordinary way
        // rather than losing what the visitor typed.
        form.removeAttribute("data-contact");
        form.submit();
      }).finally(function () {
        if (submit) submit.disabled = false;
      });
    });
  }
})();
