// ============================================================
// ALL site copy lives here. Components only read from this file.
// TODO items are tracked in CLAUDE.md.
// ============================================================

// The name is defined ONCE here and reused everywhere.
const NAME = "Shady El Agamy";

export const profile = {
  name: NAME,
  role: "Odoo Functional Consultant · Accounting & ERP",
  location: "Alexandria, Egypt",
  availability: "Open to work · Alexandria, Egypt · Remote & on-site",
  intro:
    "I turn business requirements into working Odoo systems — configured, customized, tested, and supported from requirements gathering all the way to go-live.",
  email: "shadyelagamy921@gmail.com",
  // WhatsApp: the number is only used in the link — never displayed as text.
  whatsapp: "https://wa.me/201228050845",
  github: "https://github.com/TODO", // TODO: real GitHub URL
  linkedin: "https://www.linkedin.com/in/shady-elagamy/",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "How it connects", href: "#process" },
];

export const navCta = { label: "Let's talk", href: "#contact" };

// Labels for icon-only buttons and landmarks (screen readers).
export const ui = {
  primaryNav: "Primary",
  mobileNav: "Mobile",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  toDark: "Switch to dark mode",
  toLight: "Switch to light mode",
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Email",
  home: "Back to top",
};

export const hero = {
  ctaPrimary: "Start a project",
  ctaWhatsapp: "WhatsApp",
  dashboard: {
    ariaLabel: "Example Odoo accounting dashboard: revenue vs. expenses chart and posted journal entries",
    title: "Accounting Dashboard",
    subtitle: "Odoo 18 · this month",
    chartTitle: "Revenue vs. expenses",
    legend: ["Revenue", "Expenses"],
    // Bar heights in % of the chart (revenue, expenses) — shapes match the design, no numbers shown.
    bars: [
      [47, 31],
      [60, 38],
      [52, 42],
      [75, 44],
      [69, 40],
      [92, 48],
    ],
    // strip: row marker colour · pill: status pill colour (gold strip only on Stock valuation)
    rows: [
      { label: "Customer invoice", status: "Posted", strip: "purple", pill: "teal" },
      { label: "Vendor bill", status: "Posted", strip: "teal", pill: "teal" },
      { label: "Stock valuation entry", status: "Draft", strip: "gold", pill: "purple" },
    ],
    chipJournal: { title: "Journal entry created", text: "automatically on invoice" },
    chipFlow: ["Sale", "Delivery", "Invoice"],
  },
};

export const stats = [
  { value: "2+", label: "Years hands-on with Odoo" },
  { value: "10", label: "Live implementation projects" },
  { value: "4", label: "Odoo partners worked with" },
  { value: "2", label: "Countries — Egypt & KSA" }, // TODO: Qatar? (confirm with Shady)
];

export const clientsCaption = "Trusted by teams in automotive, logistics, healthcare & F&B";

export const clientsLabel = "Clients";

// Clients only (employers live in `experience`).
// To add a logo later: put the SVG in /public/logos and set e.g. logo: "/logos/yam.svg".
// With a logo the tile shows the image; without one it shows the initials badge + name.
export const clients = [
  { name: "YAM Automotive", initials: "YA", logo: null },
  { name: "Xpert Logistics", initials: "XL", logo: null },
  { name: "OZ Veterinary", initials: "OZ", logo: null },
  { name: "Mabrouka", initials: "MB", logo: null },
  { name: "Daira Rahal", initials: "DR", logo: null },
  { name: "Abu El-Khair", initials: "AK", logo: null },
  { name: "Ajiad", initials: "AJ", logo: null },
  { name: "Al Marakhia", initials: "AM", logo: null },
  { name: "Al Dawliya", initials: "AD", logo: null },
];

export const about = {
  eyebrow: "01 — About me",
  title: "Making Odoo actually work for the people using it.",
  text:
    "I'm an Odoo Implementer and Technical Support Specialist with 2 years of experience in configuration, customization, implementation, user training and business process analysis. I gather requirements, configure the right modules, test, troubleshoot — and stay with clients through go-live.",
  tags: [
    "Accounting & financial flow",
    "Business process analysis",
    "Training & go-live",
    "Client relationship management",
    "Account management",
    "Lead qualification",
    "Technical & functional support",
  ],
  education: { label: "Education", value: "Bachelor of Information Technology" },
  languages: { label: "Languages", value: "Arabic (Native) · English (Good)" },
  chipRole: { title: "Odoo Implementer", text: "Currently at Ramz" },
  chipProjects: { value: "10", text: "live Odoo projects" },
  ctaPrimary: "Work with me",
  ctaGithub: "GitHub",
};

export const experienceSection = {
  eyebrow: "02 — Experience",
  title: "Where I've implemented Odoo.",
  currentLabel: "Current",
};

export const experience = [
  { role: "Odoo Implementer", company: "Ramz", current: true, text: "End-to-end implementation projects — requirements gathering, configuration, testing, training and go-live support." },
  { role: "Odoo Implementer", company: "Transformix", text: "Full-cycle implementations across industries; simple custom modules and custom views for client operations." },
  { role: "Odoo Technical Support", company: "ERP Bank", text: "Daily operational support and troubleshooting; improved automated workflows and overall system performance." },
  { role: "Odoo Implementer & Support", company: "I Solutions", text: "Configured Sales, Inventory, Purchase and HR; customized views and reports, and trained users." },
];

export const expertiseSection = {
  eyebrow: "03 — Expertise",
  title: "The modules I configure, customize and support.",
  note: "Accounting is the core — everything else is set up so the numbers land in the right place.",
};

export const modules = [
  { key: "accounting", title: "Accounting & Financial Flow", text: "Chart of accounts, taxes, journals, invoicing and reconciliation — wired so every sale, purchase and stock move posts correctly.", featured: true },
  { key: "inventory", title: "Inventory", text: "Warehouses, routes and valuation." },
  { key: "sales", title: "Sales", text: "Quotations, pricelists, orders." },
  { key: "purchase", title: "Purchase", text: "RFQs, vendor bills, replenishment." },
  { key: "pos", title: "Point of Sale", text: "Restaurants, clinics and retail." },
  { key: "hr", title: "HR", text: "Employees, contracts, attendance." },
  {
    key: "studio",
    title: "Studio & customization",
    tags: ["Views editing (XML)", "Business logic (Python)", "Report customization", "User training & go-live", "Process analysis", "Odoo configuration"],
    wide: true,
  },
];

export const flowSection = {
  eyebrow: "04 — How it connects",
  title: "One core system. Every department in sync.",
  subtitle: "A typical flow I set up — each step triggers the next, and accounting updates on its own.",
};

export const flow = [
  { key: "sales", title: "Sales", text: "Quotation becomes an order" },
  { key: "inventory", title: "Inventory", text: "Delivery and stock moves" },
  { key: "purchase", title: "Purchase", text: "Replenishment and vendor bills" },
  { key: "accounting", title: "Accounting", text: "Journal entries post automatically", highlight: true },
  { key: "reports", title: "Reports", text: "P&L and balance sheet, live" },
];

export const projectsSection = {
  eyebrow: "05 — Featured projects",
  title: "Real implementations, real industries.",
  ctaTitle: "Your company could be next.",
  ctaLink: "Discuss your Odoo project",
};

export const countries = { EG: "Egypt", SA: "Saudi Arabia" };

export const projects = [
  { name: "YAM Automotive Spare Parts", industry: "Auto parts & trading", icon: "wrench", country: "EG", modules: ["Inventory", "Sales", "Purchase", "Accounting"] }, // TODO: confirm country
  { name: "Xpert Logistics", industry: "Logistics & shipping", icon: "truck", country: "SA", modules: ["Accounting", "Invoicing", "Operations", "Custom reports"] },
  { name: "OZ Veterinary Clinic", industry: "Veterinary & healthcare", icon: "heart-pulse", country: "EG", modules: ["POS", "Inventory", "Services invoicing"] }, // TODO: confirm country
  { name: "Mabrouka & Daira Rahal", industry: "Restaurants · F&B", icon: "utensils", country: "EG", modules: ["Odoo POS", "Accounting", "Inventory"] }, // TODO: confirm country
  { name: "Abu El-Khair · Ajiad · Al Marakhia · Al Dawliya", industry: "Trading, import & services", icon: "building", country: "EG", modules: ["Full cycle", "Sales", "Purchase", "HR", "Accounting"] }, // TODO: confirm country
];

export const contactSection = {
  eyebrow: "06 — Contact",
  title: "Have an Odoo project or an opportunity? Let's talk.",
  whatsapp: "Chat on WhatsApp",
  email: "Email",
  linkedin: "LinkedIn",
  github: "GitHub",
};

export const footer = {
  rights: "All rights reserved.", // shown as "© {year} {profile.name}. All rights reserved."
  builtBy: { label: "Built by", name: "eskdev", href: "https://eskdev.vercel.app/" },
};
