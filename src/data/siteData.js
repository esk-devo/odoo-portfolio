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

  services: {
    title: "What I do",
    subtitle: "Services I can help with on Odoo projects.",
    items: [
      {
        icon: "Settings",
        title: "Implementation",
        description:
          "End-to-end Odoo implementation: scoping, module selection, configuration and go-live support.",
      },
      {
        icon: "Sliders",
        title: "Customization",
        description:
          "Tailoring Odoo to fit real business processes — workflows, fields, views and reports.",
      },
      {
        icon: "FileText",
        title: "Reports & Views",
        description:
          "Custom reports and view customizations to give users the information they need.",
      },
      {
        icon: "GraduationCap",
        title: "User Training",
        description:
          "Hands-on training for end users and key users to ensure confident adoption.",
      },
      {
        icon: "LifeBuoy",
        title: "Technical Support",
        description:
          "Troubleshooting, bug fixing and day-to-day support after go-live.",
      },
    ],
  },

  skills: {
    title: "Skills",
    subtitle: "What I bring to an Odoo project.",
    items: [
      "Business Process Analysis",
      "Accounting & Financial Flow",
      "Odoo Implementation",
      "Odoo Configuration",
      "Report Customization",
      "Views Editing (XML)",
      "Business Logic (Python, simple custom modules)",
      "Account Management",
      "User Training & Go-Live",
      "Technical & Functional Support",
      "Client Relationship Management",
      "Lead Qualification",
    ],
  },

  modules: {
    title: "Odoo Modules",
    subtitle: "Modules I work with regularly.",
    items: [
      { name: "Accounting", icon: "Calculator" },
      { name: "Sales", icon: "ShoppingCart" },
      { name: "Purchase", icon: "Package" },
      { name: "Inventory", icon: "Warehouse" },
      { name: "CRM", icon: "Users" },
      { name: "HR", icon: "Briefcase" },
    ],
  },

  process: {
    title: "My Process",
    subtitle: "How I take a project from idea to go-live.",
    steps: [
      { title: "Requirements", description: "Gather and analyze business requirements." },
      { title: "Configuration", description: "Configure modules and workflows in Odoo." },
      { title: "Testing", description: "Test scenarios and fix issues before go-live." },
      { title: "Training", description: "Train users and key users." },
      { title: "Go-live", description: "Support the go-live and cutover." },
      { title: "Support", description: "Post-go-live support and improvements." },
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

  education: {
    title: "Education",
    items: [
      {
        degree: "Bachelor of Information Technology", // REPLACE ME if needed
        school: "University name (REPLACE ME)",
        status: "Still studying",
        years: "REPLACE ME",
      },
    ],
    languages: "Arabic (Native), English (Good working proficiency)",
  },

  flow: {
    title: "How it connects",
    subtitle: "How Odoo modules work together in a typical flow.",
    nodes: [
      { name: "Sales", description: "Orders are created and confirmed." },
      { name: "Inventory", description: "Stock is reserved and delivered." },
      { name: "Purchase", description: "Replenishment orders are raised." },
      { name: "Accounting", description: "Invoices and payments are recorded." },
      { name: "Reports", description: "Insights are generated from the data." },
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
