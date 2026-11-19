// ============================================================
// ALL site content lives here. Edit this file to update the site.
// Every placeholder value is marked with "REPLACE ME".
// ============================================================

export const siteData = {
  person: {
    name: "Shady Elagamy", // REPLACE ME (real name)
    initials: "SE", // monogram used in the navbar logo & favicon
    headline: "Odoo Functional Consultant | Accounting & ERP Implementation", // REPLACE ME
    location: "Alexandria, Egypt", // REPLACE ME
    summary:
      "2 years of hands-on experience in Odoo implementation, configuration, customization and support. I turn business requirements into working Odoo systems — configured, tested, trained and supported through go-live.",
    // REPLACE ME: put your transparent PNG cut-out at src/assets/shady.png
    avatar: "/src/assets/shady.png", // REPLACE ME if you use a different path
    openToWork: true,
  },

  // REPLACE ME: update these links
  links: {
    email: "mailto:shadyelagamy921@gmail.com",
    linkedin: "https://www.linkedin.com/in/shady-elagamy/",
    whatsapp: "https://wa.me/201228050845",
    cv: "/cv.pdf", // REPLACE ME: put your CV at public/cv.pdf
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#cases" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    badge: "Open to work · Egypt, Remote, On-site", // REPLACE ME if needed
    title: "Shady Elagamy",
    subtitle: "Odoo Functional Consultant | Accounting & ERP Implementation",
    oneLiner:
      "I turn business requirements into working Odoo systems — configured, customized, tested, trained and supported through go-live.",
    ctaPrimary: "Download CV",
    ctaSecondary: "Contact me",
  },

  about: {
    title: "About me",
    paragraph:
      "I am an Odoo Functional Consultant with around 2 years of hands-on experience in Odoo configuration, customization and implementation. I work closely with clients to understand their processes, configure the right modules, and train their teams so they can run their business smoothly on Odoo. I enjoy problem-solving, troubleshooting and making systems actually work for the people using them.",
    stats: [
      { value: "2", label: "Years of experience" },
      { value: "Odoo", label: "ERP focus" },
      { value: "Accounting", label: "Core module" },
      { value: "Egypt", label: "Based in" },
    ],
  },

  experience: {
    title: "Experience",
    subtitle: "Roles and companies I have worked with.",
    items: [
      {
        role: "Odoo Implementer",
        company: "Ramz",
        status: "Currently working",
        description:
          "End-to-end Odoo implementation projects, from requirements gathering and configuration to testing, training and go-live support; configuring modules to client workflows.",
      },
      {
        role: "Odoo Implementer",
        company: "Transformix",
        status: "", // REPLACE ME if dates needed
        description:
          "Full-cycle implementations across different industries; developed simple custom modules and custom views.",
      },
      {
        role: "Odoo Technical Support",
        company: "ERP Bank",
        status: "",
        description:
          "Troubleshooting, daily operational support, client communication and requirements gathering; helped improve automated workflows and overall system performance.",
      },
      {
        role: "Odoo Implementer & Support",
        company: "I Solutions",
        status: "",
        description:
          "Configured Sales, Inventory, Purchase and HR; customized views and reports; trained users.",
      },
    ],
  },

  showClientNames: true, // set false to hide client names quickly

  projects: {
    title: "Featured Projects",
    subtitle: "Real Odoo projects I have worked on.",
    items: [
      {
        name: "YAM Automotive Spare Parts Company",
        industry: "Auto parts & trading",
        country: "", // REPLACE ME if known
        modules: ["Inventory", "Sales", "Purchase", "Accounting"],
        role: "",
      },
      {
        name: "Xpert Logistics",
        industry: "Logistics & shipping services",
        country: "Saudi Arabia",
        modules: ["Accounting", "Invoicing", "Operations", "Custom Reports"],
        role: "",
      },
      {
        name: "OZ Veterinary Clinic",
        industry: "Medical & veterinary care",
        country: "", // REPLACE ME if known
        modules: ["POS", "Inventory", "Services Invoicing"],
        role: "",
      },
      {
        name: "Mabrouka Restaurant and Rahal Restaurant",
        industry: "Food & beverage",
        country: "", // REPLACE ME if known
        modules: ["Odoo POS", "Accounting", "Inventory Management"],
        role: "",
      },
      {
        name: "Abu El-Khair, Ajiad, Al Marakhia, Al Dawliya",
        industry: "Trade, import & services",
        country: "", // REPLACE ME if known
        modules: ["Sales", "Purchase", "HR", "Accounting"],
        role: "Full-cycle implementation",
      },
    ],
  },

  contact: {
    title: "Contact",
    subtitle: "Have a project or an opportunity? Let's talk.",
    form: {
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message",
      submit: "Send message",
      sending: "Sending...",
      success: "Thanks! Your message has been sent.",
      error: "Something went wrong. Please try again.",
    },
    channels: [
      { label: "Email", href: "mailto:shadyelagamy921@gmail.com", icon: "Mail" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/shady-elagamy/", icon: "Linkedin" },
      { label: "WhatsApp", href: "https://wa.me/201228050845", icon: "MessageCircle" },
    ],
  },

  footer: {
    copyright: "© 2026 Shady Elagamy. All rights reserved.", // REPLACE ME year
    note: "Built with React & Tailwind CSS.",
  },
};

export default siteData;
