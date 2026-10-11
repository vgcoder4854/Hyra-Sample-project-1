/**
 * ============================================================================
 *  HYRAARCHITECTS — SITE CONFIGURATION / CONSTANTS
 * ----------------------------------------------------------------------------
 *  Edit any value below to update the entire site.
 *  Sections are grouped by page area for easy editing.
 * ============================================================================
 */

const SITE_CONFIG = {

  /* ---------- COMPANY INFO ------------------------------------------------ */
  COMPANY: {
    name:        "Hyraarchitects",
    shortName:   "Hyra",
    tagline:     "Designing Spaces. Building Legacies.",
    description:
      "Hyraarchitects is a full-service architecture and construction studio crafting residential, commercial, and landmark projects with timeless design and uncompromising build quality.",
    foundedYear: 2009,
    email:       "hello@hyraarchitects.com",
    phone:       "+1 (555) 200-8800",
    address: {
      line1: "128 Meridian Avenue",
      line2: "Suite 04, Design District",
      city:  "San Francisco, CA 94103",
    },
    hours: {
      weekdays: "Mon – Fri  ·  9:00 AM – 6:00 PM",
      weekend:  "Sat  ·  10:00 AM – 2:00 PM  ·  Sun Closed",
    },
  },

  /* ---------- BASE ASSET PATHS ------------------------------------------- */
  ASSETS: {
    logo:        "assets/images/logo.svg",
    logoAlt:     "assets/images/logo-mark.svg",
    favicon:     "assets/images/favicon.ico",
    ogImage:     "assets/images/og-cover.png",
    heroBg:      "assets/images/bgimage.jpg",
    aboutBg:     "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=1400&q=80",
  },

  /* ---------- NAVIGATION ------------------------------------------------- */
  NAV_LINKS: [
    { id: "home",     label: "Home"     },
    { id: "about",    label: "About"    },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "stats",    label: "Numbers"  },
    { id: "team",     label: "Team"     },
    { id: "testimonials", label: "Voices" },
    { id: "contact",  label: "Contact"  },
  ],

  /* ---------- HERO SECTION ----------------------------------------------- */
  HERO: {
    eyebrow:    "Architecture  ·  Construction  ·  Interior",
    title:      "We design buildings that <em>outlive</em> trends.",
    subtitle:
      "A multidisciplinary studio turning briefs into brick-and-mortar stories — from first sketch to final handover.",
    primaryCta:   { label: "Start a Project", target: "#contact" },
    secondaryCta: { label: "See Portfolio",   target: "#projects" },
    scrollHint: "Scroll to explore",
  },

  /* ---------- ABOUT SECTION --------------------------------------------- */
  ABOUT: {
    eyebrow: "About Hyraarchitects",
    title:   "A studio built on craft, code and concrete.",
    paragraphs: [
      "Founded in 2009, Hyraarchitects brings together architects, structural engineers and master builders under one roof. We believe the best projects are born when design and construction speak the same language from day one.",
      "Our process is hands-on: every drawing passes through a buildability review, every site decision loops back to the design intent. The result is architecture that is generous in detail, honest in material and quietly enduring.",
    ],
    pillars: [
      { icon: "✦", title: "Integrated Studio",  text: "Designers and builders seated together — no lost-in-translation moments." },
      { icon: "◆", title: "Material Honesty",    text: "We choose materials that age well, not just photograph well." },
      { icon: "◇", title: "Long-Haul Thinking",  text: "Energy, maintenance and lifecycle are part of every brief." },
    ],
  },

  /* ---------- SERVICES --------------------------------------------------- */
  SERVICES: {
    eyebrow: "What we do",
    title:   "End-to-end design and build.",
    subtitle:
      "From feasibility to fit-out — pick a single service or let us carry the entire project.",
    items: [
      {
        id: "architecture",
        title: "Architecture",
        text:  "Concept, schematic and detailed design across residential, commercial and cultural typologies.",
        bullets: ["Site analysis", "Concept design", "Construction docs", "Permit sets"],
      },
      {
        id: "interior",
        title: "Interior Design",
        text:  "Tailored interiors — material palettes, lighting plans and bespoke joinery.",
        bullets: ["Space planning", "FF&E", "Lighting design", "Bespoke joinery"],
      },
      {
        id: "construction",
        title: "Construction",
        text:  "General contracting with our in-house crews + trusted specialist trades.",
        bullets: ["New build", "Renovation", "Project management", "Site supervision"],
      },
      {
        id: "consultancy",
        title: "Design Consultancy",
        text:  "Pre-purchase feasibility, building code review and sustainability audits.",
        bullets: ["Feasibility", "Code review", "Energy audits", "Cost planning"],
      },
    ],
  },

  /* ---------- STATS / NUMBERS ------------------------------------------- */
  STATS: {
    eyebrow: "By the numbers",
    title:   "Sixteen years. Hundreds of projects. One studio.",
    items: [
      { value: 240,  suffix: "+", label: "Projects delivered"        },
      { value: 38,   suffix: "",  label: "Cities covered"           },
      { value: 42,   suffix: "",  label: "In-house specialists"     },
      { value: 16,   suffix: "",  label: "Years of practice"        },
    ],
  },

  /* ---------- PROJECTS / PORTFOLIO -------------------------------------- */
  /*  Replace the `image` URL with your own path under assets/images/       */
  PROJECTS: [
    {
      id: 1,
      title:    "Meridian House",
      category: "Residential",
      location: "Pacific Heights, SF",
      year:     2024,
      tag:      "Featured",
      image:    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      summary:  "A 5,200 sq.ft. family home cantilevered over a hillside — concrete, oak and glass.",
    },
    {
      id: 2,
      title:    "Atrium Office",
      category: "Commercial",
      location: "SoMa, San Francisco",
      year:     2023,
      tag:      "New",
      image:    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      summary:  "A four-storey creative HQ organised around a daylit central atrium.",
    },
    {
      id: 3,
      title:    "Lumen Pavilion",
      category: "Cultural",
      location: "Napa Valley",
      year:     2023,
      tag:      "Award",
      image:    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
      summary:  "A timber-framed events pavilion wrapped in perforated copper.",
    },
    {
      id: 4,
      title:    "Coastal Retreat",
      category: "Residential",
      location: "Big Sur, CA",
      year:     2022,
      tag:      "",
      image:    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      summary:  "An off-grid weekend home built from reclaimed redwood and weathering steel.",
    },
    {
      id: 5,
      title:    "Foundry Lofts",
      category: "Adaptive Reuse",
      location: "Oakland, CA",
      year:     2022,
      tag:      "",
      image:    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      summary:  "32 loft apartments carved out of a 1908 steel foundry.",
    },
    {
      id: 6,
      title:    "Verdant School",
      category: "Institutional",
      location: "Berkeley, CA",
      year:     2021,
      tag:      "",
      image:    "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1200&q=80",
      summary:  "A net-zero K-8 campus with cross-laminated timber and rooftop labs.",
    },
    {
      id: 7,
      title:    "Indigo Restaurant",
      category: "Hospitality",
      location: "Hayes Valley, SF",
      year:     2024,
      tag:      "Featured",
      image:    "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80",
      summary:  "A 14-seat omakase counter framed in charred cedar and brushed brass.",
    },
    {
      id: 8,
      title:    "Crescent Tower",
      category: "Mixed-Use",
      location: "Downtown LA",
      year:     2025,
      tag:      "Upcoming",
      image:    "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
      summary:  "A 24-storey residential tower with a stepped sky-garden every third floor.",
    },
  ],

  /* ---------- PROJECT FILTER BUTTONS ------------------------------------ */
  PROJECT_FILTERS: [
    { id: "all",          label: "All Work"        },
    { id: "Residential",  label: "Residential"     },
    { id: "Commercial",   label: "Commercial"      },
    { id: "Cultural",     label: "Cultural"        },
    { id: "Institutional",label: "Institutional"   },
    { id: "Hospitality",  label: "Hospitality"     },
    { id: "Adaptive Reuse", label: "Adaptive Reuse" },
    { id: "Mixed-Use",    label: "Mixed-Use"       },
  ],

  /* ---------- TEAM ------------------------------------------------------ */
  TEAM: {
    eyebrow: "The Team",
    title:   "People behind the drawings.",
    members: [
      { name: "Aarav Mehra",      role: "Founding Principal",         image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
      { name: "Selina Ortiz",     role: "Head of Architecture",       image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" },
      { name: "Daniel Park",      role: "Director of Construction",   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
      { name: "Priya Iyer",       role: "Interior Design Lead",       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80" },
    ],
  },

  /* ---------- TESTIMONIALS ---------------------------------------------- */
  TESTIMONIALS: {
    eyebrow: "Client Voices",
    title:   "What it feels like to build with us.",
    items: [
      {
        quote:
          "Hyraarchitects didn't just draw a house — they sat with us through every permit, every supplier visit, every late-night site call. The result is a home that feels unmistakably ours.",
        author: "Naveen & Anjali Rao",
        role:   "Meridian House — Pacific Heights",
      },
      {
        quote:
          "On budget, on time, and the detailing is obsessive in the best way. Our team genuinely looks forward to walking the building every morning.",
        author: "Marisol Tan",
        role:   "VP Real Estate, Atrium Office",
      },
      {
        quote:
          "Their design sensibility elevated a tricky adaptive-reuse brief into something the neighbourhood is genuinely proud of.",
        author: "Caleb Whittle",
        role:   "Foundry Lofts — Oakland",
      },
    ],
  },

  /* ---------- CONTACT --------------------------------------------------- */
  CONTACT: {
    eyebrow: "Start a conversation",
    title:   "Tell us about your project.",
    subtitle:
      "We reply within one working day. The more you can share — site, budget, timeline — the better.",
    fields: [
      { id: "name",    label: "Full Name",     type: "text",     placeholder: "Jane Doe"        },
      { id: "email",   label: "Email",         type: "email",    placeholder: "you@email.com"   },
      { id: "phone",   label: "Phone (optional)", type: "tel",  placeholder: "+1 555 000 0000" },
      { id: "type",    label: "Project Type",  type: "select",   options: [
        "Architecture", "Interior Design", "Construction", "Consultancy", "Other",
      ]},
      { id: "budget",  label: "Budget Range",  type: "select",   options: [
        "Under $250k", "$250k – $1M", "$1M – $5M", "$5M+", "Not sure yet",
      ]},
      { id: "message", label: "Tell us more",  type: "textarea", placeholder: "Site location, timeline, anything you want us to know…" },
    ],
    submitLabel: "Send Enquiry",
    successMessage: "Thanks — we'll be in touch within one working day.",
    errorMessage:   "Please complete the required fields and try again.",
  },

  /* ---------- FOOTER & SOCIAL ------------------------------------------- */
  FOOTER: {
    copyright: "© 2025 Hyraarchitects Studio. All rights reserved.",
    rights:    "Designed & built in San Francisco.",
  },

  SOCIAL: [
    { id: "instagram", label: "Instagram", url: "https://instagram.com/hyraarchitects",  icon: "IG" },
    { id: "linkedin",  label: "LinkedIn",  url: "https://linkedin.com/company/hyraarchitects", icon: "in" },
    { id: "pinterest", label: "Pinterest", url: "https://pinterest.com/hyraarchitects",  icon: "P" },
    { id: "houzz",     label: "Houzz",     url: "https://houzz.com/pro/hyraarchitects",  icon: "Hz" },
  ],

  /* ---------- DOCUMENT <TITLE> ------------------------------------------ */
  PAGE_TITLE: "Hyraarchitects — Designing Spaces · Building Legacies",
};

/* Freeze so a stray script can't break the contract. */
Object.freeze(SITE_CONFIG);
