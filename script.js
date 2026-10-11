/* =============================================================================
   HYRAARCHITECTS — CLIENT SCRIPT
   -----------------------------------------------------------------------------
   Responsibilities:
     • Hydrate every visible string with values from constants.js
     • Wire up UI interactions: nav, modal, filter, slider, form, counters
     • Add intersection-based reveal animations
     • Manage scroll-aware header
   The script assumes `constants.js` has already loaded (it's included first).
============================================================================= */

(() => {
  "use strict";

  /* ---------- tiny helpers ---------------------------------------------------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const escapeHTML = (str = "") =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);

  const onReady = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  /* Single point of truth for reading the config.
     Falls back to the inner `SITE_CONFIG` if the constants file
     was declared with `const` at top level (not on `window`). */
  const getConfig = () => window.SITE_CONFIG || (typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : null);

  /* ============================================================================
     1.  HYDRATE — pull every value from SITE_CONFIG into the DOM
  ============================================================================== */
  function hydrate() {
    const C = getConfig();
    if (!C) {
      console.warn("[Hyraarchitects] constants.js failed to load — site will run with empty content.");
      return;
    }

    /* ---------- Page meta ------------------------------------------------- */
    document.title = C.PAGE_TITLE;
    const fav = $("#favicon");
    if (fav && C.ASSETS?.favicon) fav.href = C.ASSETS.favicon;

    /* ---------- Brand / preloader ---------------------------------------- */
    $("#brand-name").textContent      = C.COMPANY.name;
    $("#brand-mark").textContent      = (C.COMPANY.shortName || C.COMPANY.name).charAt(0);
    $("#preloader-mark").textContent  = (C.COMPANY.shortName || C.COMPANY.name).charAt(0);
    $("#footer-brand-name").textContent = C.COMPANY.name;
    $("#footer-brand-mark").textContent = (C.COMPANY.shortName || C.COMPANY.name).charAt(0);
    $("#footer-tagline").textContent  = C.COMPANY.tagline;

    /* ---------- Navigation ----------------------------------------------- */
    const navList = $("#nav-list");
    C.NAV_LINKS.forEach((link) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${link.id}" data-nav="${link.id}">${escapeHTML(link.label)}</a>`;
      navList.appendChild(li);
    });
    const footerNav = $("#footer-nav-list");
    C.NAV_LINKS.forEach((link) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${link.id}">${escapeHTML(link.label)}</a>`;
      footerNav.appendChild(li);
    });

    /* ---------- Hero ----------------------------------------------------- */
    $("#hero-bg").style.backgroundImage = `url('${C.ASSETS.heroBg}')`;
    $("#hero-eyebrow").textContent        = C.HERO.eyebrow;
    $("#hero-title").innerHTML            = C.HERO.title;
    $("#hero-subtitle").textContent       = C.HERO.subtitle;
    $("#hero-cta-primary").textContent    = C.HERO.primaryCta.label;
    $("#hero-cta-primary").href           = C.HERO.primaryCta.target;
    $("#hero-cta-secondary").textContent  = C.HERO.secondaryCta.label;
    $("#hero-cta-secondary").href         = C.HERO.secondaryCta.target;
    $("#hero-scroll-hint").querySelector(".hero__scroll-text").textContent = C.HERO.scrollHint;
    $("#nav-cta").href = C.HERO.primaryCta.target;

    /* ---------- About ---------------------------------------------------- */
    const aboutImg   = $("#about-image");
    aboutImg.src     = C.ASSETS.aboutBg;
    aboutImg.alt     = `${C.COMPANY.name} studio`;
    $("#about-founded-year").textContent = C.COMPANY.foundedYear;

    $("#about-eyebrow").textContent = C.ABOUT.eyebrow;
    $("#about-title").textContent   = C.ABOUT.title;

    const paragraphsEl = $("#about-paragraphs");
    C.ABOUT.paragraphs.forEach((para) => {
      const p = document.createElement("p");
      p.textContent = para;
      paragraphsEl.appendChild(p);
    });

    const pillarsEl = $("#about-pillars");
    C.ABOUT.pillars.forEach((pillar) => {
      const div = document.createElement("div");
      div.className = "about__pillar reveal";
      div.innerHTML = `
        <span class="ico">${escapeHTML(pillar.icon || "✦")}</span>
        <h4>${escapeHTML(pillar.title)}</h4>
        <p>${escapeHTML(pillar.text)}</p>
      `;
      pillarsEl.appendChild(div);
    });

    /* ---------- Services ------------------------------------------------- */
    $("#services-eyebrow").textContent   = C.SERVICES.eyebrow;
    $("#services-title").textContent     = C.SERVICES.title;
    $("#services-subtitle").textContent  = C.SERVICES.subtitle;

    const servicesGrid = $("#services-grid");
    C.SERVICES.items.forEach((svc, i) => {
      const card = document.createElement("article");
      card.className = "service-card reveal";
      const bullets = (svc.bullets || [])
        .map((b) => `<li>${escapeHTML(b)}</li>`)
        .join("");
      card.innerHTML = `
        <span class="service-card__index">0${i + 1}</span>
        <h3>${escapeHTML(svc.title)}</h3>
        <p>${escapeHTML(svc.text)}</p>
        <ul>${bullets}</ul>
      `;
      servicesGrid.appendChild(card);
    });

    /* ---------- Project filters + grid ---------------------------------- */
    const filtersEl = $("#project-filters");
    C.PROJECT_FILTERS.forEach((f, idx) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (idx === 0 ? " is-active" : "");
      btn.type = "button";
      btn.dataset.filter = f.id;
      btn.textContent = f.label;
      filtersEl.appendChild(btn);
    });

    const projectsGrid = $("#projects-grid");
    C.PROJECTS.forEach((p) => {
      const card = document.createElement("article");
      card.className = "project-card reveal";
      card.dataset.cat = p.category;
      card.dataset.id  = p.id;
      card.innerHTML = `
        <div class="project-card__media">
          <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)}" loading="lazy" />
        </div>
        <div class="project-card__overlay">
          ${p.tag ? `<span class="project-card__tag">${escapeHTML(p.tag)}</span>` : ""}
          <h3 class="project-card__title">${escapeHTML(p.title)}</h3>
          <div class="project-card__meta">
            <span>${escapeHTML(p.category)}</span>
            <span>${escapeHTML(p.location)}</span>
            <span>${escapeHTML(String(p.year))}</span>
          </div>
        </div>
        <button class="project-card__view" aria-label="View ${escapeHTML(p.title)}">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </button>
      `;
      projectsGrid.appendChild(card);
    });

    /* ---------- Stats ---------------------------------------------------- */
    $("#stats-eyebrow").textContent = C.STATS.eyebrow;
    $("#stats-title").textContent   = C.STATS.title;

    const statsGrid = $("#stats-grid");
    C.STATS.items.forEach((s) => {
      const splitSuffix = (s.suffix === undefined || s.suffix === null) ? "" : s.suffix;
      const div = document.createElement("div");
      div.className = "stat reveal";
      div.innerHTML = `
        <div class="stat__value"
             data-target="${s.value}"
             data-suffix="${escapeHTML(splitSuffix)}">
          <span class="num">0</span><span class="suffix">${escapeHTML(splitSuffix)}</span>
        </div>
        <div class="stat__label">${escapeHTML(s.label)}</div>
      `;
      statsGrid.appendChild(div);
    });

    /* ---------- Team ----------------------------------------------------- */
    $("#team-eyebrow").textContent = C.TEAM.eyebrow;
    $("#team-title").textContent   = C.TEAM.title;

    const teamGrid = $("#team-grid");
    C.TEAM.members.forEach((m) => {
      const card = document.createElement("article");
      card.className = "team-card reveal";
      card.innerHTML = `
        <div class="team-card__photo">
          <img src="${escapeHTML(m.image)}" alt="${escapeHTML(m.name)}" loading="lazy" />
        </div>
        <h4>${escapeHTML(m.name)}</h4>
        <small>${escapeHTML(m.role)}</small>
      `;
      teamGrid.appendChild(card);
    });

    /* ---------- Testimonials -------------------------------------------- */
    $("#testimonials-eyebrow").textContent = C.TESTIMONIALS.eyebrow;
    $("#testimonials-title").textContent   = C.TESTIMONIALS.title;

    const track = $("#testimonials-track");
    C.TESTIMONIALS.items.forEach((t) => {
      const slide = document.createElement("div");
      slide.className = "testimonial";
      slide.innerHTML = `
        <p class="testimonial__quote">${escapeHTML(t.quote)}</p>
        <div class="testimonial__author">
          <strong>${escapeHTML(t.author)}</strong>
          <span>${escapeHTML(t.role)}</span>
        </div>
      `;
      track.appendChild(slide);
    });

    const dotsEl = $("#testimonials-dots");
    C.TESTIMONIALS.items.forEach((_t, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
      if (i === 0) b.classList.add("is-active");
      dotsEl.appendChild(b);
    });

    /* ---------- Contact -------------------------------------------------- */
    $("#contact-eyebrow").textContent  = C.CONTACT.eyebrow;
    $("#contact-title").textContent    = C.CONTACT.title;
    $("#contact-subtitle").textContent = C.CONTACT.subtitle;
    $("#contact-submit-label").textContent = C.CONTACT.submitLabel;
    $("#contact-form").dataset.success = C.CONTACT.successMessage;
    $("#contact-form").dataset.error   = C.CONTACT.errorMessage;

    const fieldsEl = $("#form-fields");
    C.CONTACT.fields.forEach((f) => {
      const wrap = document.createElement("div");
      wrap.className = "form-field" + (f.type === "textarea" ? " full" : "");
      wrap.dataset.field = f.id;
      wrap.dataset.required = f.type === "email" || f.type === "text" || f.type === "textarea" ? "1" : "0";

      let input = "";
      if (f.type === "textarea") {
        input = `<textarea id="f-${f.id}" name="${f.id}" placeholder="${escapeHTML(f.placeholder || "")}" rows="5"></textarea>`;
      } else if (f.type === "select") {
        const opts = (f.options || [])
          .map((o) => `<option value="${escapeHTML(o)}">${escapeHTML(o)}</option>`)
          .join("");
        input = `<select id="f-${f.id}" name="${f.id}"><option value="">Select…</option>${opts}</select>`;
      } else {
        input = `<input id="f-${f.id}" name="${f.id}" type="${escapeHTML(f.type)}" placeholder="${escapeHTML(f.placeholder || "")}" />`;
      }
      wrap.innerHTML = `<label for="f-${f.id}">${escapeHTML(f.label)}</label>${input}`;
      fieldsEl.appendChild(wrap);
    });

    const infoList = $("#contact-info");
    const a = C.COMPANY.address;
    infoList.innerHTML = `
      <li>
        <span class="icon"><i class="fa-solid fa-location-dot"></i></span>
        <div>
          <span class="info-label">Studio</span>
          <span class="info-value">${escapeHTML(a.line1)}<br/>${escapeHTML(a.line2)}<br/>${escapeHTML(a.city)}</span>
        </div>
      </li>
      <li>
        <span class="icon"><i class="fa-solid fa-envelope"></i></span>
        <div>
          <span class="info-label">Email</span>
          <a class="info-value" href="mailto:${escapeHTML(C.COMPANY.email)}">${escapeHTML(C.COMPANY.email)}</a>
        </div>
      </li>
      <li>
        <span class="icon"><i class="fa-solid fa-phone"></i></span>
        <div>
          <span class="info-label">Phone</span>
          <a class="info-value" href="tel:${escapeHTML(C.COMPANY.phone.replace(/\s/g, ""))}">${escapeHTML(C.COMPANY.phone)}</a>
        </div>
      </li>
      <li>
        <span class="icon"><i class="fa-regular fa-clock"></i></span>
        <div>
          <span class="info-label">Hours</span>
          <span class="info-value">${escapeHTML(C.COMPANY.hours.weekdays)}<br/>${escapeHTML(C.COMPANY.hours.weekend)}</span>
        </div>
      </li>
    `;

    /* ---------- Footer / social ----------------------------------------- */
    $("#footer-copyright").textContent = C.FOOTER.copyright;
    $("#footer-rights").textContent    = C.FOOTER.rights;

    const socialEl = $("#footer-social");
    C.SOCIAL.forEach((s) => {
      const a = document.createElement("a");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", s.label);
      a.textContent = s.icon;
      socialEl.appendChild(a);
    });
  }

  /* ============================================================================
     2.  HEADER — scroll-aware class + active link tracking
  ============================================================================== */
  function setupHeader() {
    const header = $("#site-header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Active section on scroll */
    const sections = $$(".section, .hero").filter((s) => s.id);
    const linkMap = new Map(
      $$("[data-nav]").map((a) => [a.dataset.nav, a])
    );
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            linkMap.forEach((a) => a.classList.remove("is-active"));
            const link = linkMap.get(entry.target.id);
            if (link) link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ============================================================================
     3.  MOBILE NAV
  ============================================================================== */
  function setupMobileNav() {
    const toggle = $("#nav-toggle");
    const nav    = $(".primary-nav");
    const close  = () => {
      toggle.classList.remove("is-open");
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-locked");
    };
    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      toggle.classList.toggle("is-open", open);
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("is-locked", open);
    });
    nav.addEventListener("click", (e) => {
      if (e.target.matches("a")) close();
    });
  }

  /* ============================================================================
     4.  REVEAL — fade content into view as it scrolls in
  ============================================================================== */
  function setupReveal() {
    const targets = $$(".reveal");
    if (!("IntersectionObserver" in window) || targets.length === 0) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = (el.dataset.delay || 0) | 0;
            setTimeout(() => el.classList.add("is-visible"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => io.observe(el));
  }

  /* ============================================================================
     5.  PRELOADER — count up to 100 then fade out
  ============================================================================== */
  function setupPreloader() {
    const preloader = $("#preloader");
    const counter   = $("#preloader-count");
    let pct = 0;
    const tick = () => {
      if (pct >= 100) {
        preloader.classList.add("is-done");
        document.body.classList.remove("is-locked");
        return;
      }
      pct += Math.max(4, Math.round((100 - pct) * 0.18));
      if (pct > 100) pct = 100;
      counter.textContent = `${pct}%`;
      setTimeout(tick, 60);
    };
    /* Allow image assets to also drive the counter — when done we force 100 */
    tick();
    window.addEventListener("load", () => {
      pct = 100;
      counter.textContent = "100%";
      setTimeout(() => preloader.classList.add("is-done"), 200);
      document.body.classList.remove("is-locked");
    });
  }

  /* ============================================================================
     6.  PROJECT FILTER
  ============================================================================== */
  function setupProjectFilter() {
    const buttons = $$("#project-filters .filter-btn");
    const cards   = $$("#projects-grid .project-card");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
        cards.forEach((card) => {
          const match = filter === "all" || card.dataset.cat === filter;
          card.classList.toggle("is-hidden", !match);
          /* Re-trigger reveal animation on the visible ones */
          if (match) {
            card.classList.remove("is-visible");
            requestAnimationFrame(() => card.classList.add("is-visible"));
          }
        });
      });
    });
  }

  /* ============================================================================
     7.  PROJECT MODAL
  ============================================================================== */
  function setupProjectModal() {
    const C = getConfig();
    if (!C) return;                  // graceful no-op if config is missing
    const modal    = $("#project-modal");
    const img      = $("#modal-image");
    const tag      = $("#modal-tag");
    const title    = $("#modal-title");
    const category = $("#modal-category");
    const location = $("#modal-location");
    const year     = $("#modal-year");
    const summary  = $("#modal-summary");
    const projects = C.PROJECTS || [];

    const open = (p) => {
      img.src          = p.image;
      img.alt          = p.title;
      tag.textContent  = p.tag || p.category;
      title.textContent= p.title;
      category.textContent = p.category;
      location.textContent = p.location;
      year.textContent     = p.year;
      summary.textContent  = p.summary || "";

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-locked");
    };
    const close = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
    };

    $("#projects-grid").addEventListener("click", (e) => {
      const card = e.target.closest(".project-card");
      if (!card) return;
      const id = Number(card.dataset.id);
      const p = projects.find((x) => x.id === id);
      if (p) open(p);
    });

    modal.addEventListener("click", (e) => {
      if (e.target.matches("[data-close-modal]")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  }

  /* ============================================================================
     8.  TESTIMONIALS SLIDER
  ============================================================================== */
  function setupTestimonials() {
    const track = $("#testimonials-track");
    const dots  = $$("#testimonials-dots button");
    const prev  = $("#test-prev");
    const next  = $("#test-next");
    const total = track.children.length;
    let index = 0;

    const go = (i) => {
      index = (i + total) % total;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle("is-active", idx === index));
    };
    prev.addEventListener("click", () => go(index - 1));
    next.addEventListener("click", () => go(index + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));

    /* Touch swipe */
    let startX = 0, dx = 0;
    track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; dx = 0; }, { passive: true });
    track.addEventListener("touchmove",  (e) => { dx = e.touches[0].clientX - startX; },            { passive: true });
    track.addEventListener("touchend",    () => {
      if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    });

    /* Auto-advance */
    let auto = setInterval(() => go(index + 1), 7000);
    $("#testimonials-viewport").addEventListener("mouseenter", () => clearInterval(auto));
    $("#testimonials-viewport").addEventListener("mouseleave", () => { auto = setInterval(() => go(index + 1), 7000); });
  }

  /* ============================================================================
     9.  STATS COUNTER — animate numbers once visible
  ============================================================================== */
  function setupStatsCounter() {
    const stats = $$(".stat__value");
    const animate = (el) => {
      const target   = Number(el.dataset.target) || 0;
      const suffixEl = el.querySelector(".suffix");
      const numEl    = el.querySelector(".num");
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); /* easeOutCubic */
        numEl.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      void suffixEl;
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    stats.forEach((s) => io.observe(s));
  }

  /* ============================================================================
     10. CONTACT FORM — client-side validation + fake submit
  ============================================================================== */
  function setupContactForm() {
    const form    = $("#contact-form");
    const statusEl= $("#form-status");
    if (!form) return;
    const C = getConfig();
    if (!C) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      statusEl.className = "form-status";
      statusEl.textContent = "";

      const requiredFields = $$(".form-field[data-required='1']", form);
      let valid = true;

      requiredFields.forEach((field) => {
        const input = field.querySelector("input, textarea, select");
        const value = (input?.value || "").trim();
        let ok = value.length > 0;
        if (ok && input?.type === "email") {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        }
        field.classList.toggle("is-error", !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        statusEl.classList.add("is-error");
        statusEl.textContent = form.dataset.error || "Please complete the required fields.";
        return;
      }

      /* Simulated submit */
      const submitBtn = $("#contact-submit");
      submitBtn.disabled = true;
      submitBtn.querySelector("#contact-submit-label").textContent = "Sending…";

      setTimeout(() => {
        statusEl.classList.add("is-success");
        statusEl.textContent = form.dataset.success || "Sent.";
        form.reset();
        submitBtn.disabled = false;
        const labelEl = submitBtn.querySelector("#contact-submit-label");
        if (labelEl) labelEl.textContent = (C.CONTACT && C.CONTACT.submitLabel) || "Send Enquiry";
      }, 1100);
    });

    /* Clear error state on input */
    form.addEventListener("input", (e) => {
      const field = e.target.closest(".form-field");
      if (field) field.classList.remove("is-error");
    });
  }

  /* ============================================================================
     11. BOOT
  ============================================================================== */
  onReady(() => {
    /* Lock scroll while the preloader is up */
    document.body.classList.add("is-locked");
    hydrate();
    setupHeader();
    setupMobileNav();
    setupReveal();
    setupPreloader();
    setupProjectFilter();
    setupProjectModal();
    setupTestimonials();
    setupStatsCounter();
    setupContactForm();
  });
})();
