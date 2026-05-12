// SEO Configuration for Arambha Skill Solutions
// Domain: arambhaskills.com

export const SEO_CONFIG = {
  // Domain & URLs
  domain: "https://arambhaskills.com",
  siteName: "Arambha Skill Solutions",
  siteDescription:
    "A premium skill development platform bridging the gap between learning and earning with outcome-driven programs.",

  // Organization Details
  organization: {
    name: "Arambha Skill Solutions",
    email: "arambhaskilldesignsolutions@gmail.com",
    phone: "+91-9108032103",
    logo: "https://arambhaskills.com/logo.png",
    address: {
      country: "IN",
      addressCountry: "India",
    },
  },

  // Social Media
  socialLinks: {
    facebook: "https://www.facebook.com/arambhaskills",
    twitter: "https://www.twitter.com/arambhaskills",
    instagram: "https://www.instagram.com/arambhaskills",
    linkedin: "https://www.linkedin.com/company/arambha-skills",
  },

  // Meta Tags Defaults
  defaultMeta: {
    title: "Arambha Skill Solutions - Learn & Earn with Outcome-Driven Programs",
    description:
      "Premium skill development platform bridging learning and earning. Explore spoken English, full-stack development, and professional programs. Join 5000+ active students.",
    keywords:
      "skill development, online courses, spoken English, full stack development, professional training, career development, learning platform",
    image: "https://arambhaskills.com/og-image.jpg",
    type: "website",
  },

  // Page-Specific Meta Tags
  pages: {
    home: {
      path: "/",
      title: "Learn & Earn with Outcome-Driven Programs",
      description:
        "Arambha Skill Solutions - Premium skill development. Join 5000+ students. Spoken English, Full Stack Development, Professional Training. From Learning to Earning.",
      keywords:
        "skill development, online courses, spoken English, full stack java, career development, professional training",
      priority: 1.0,
      changefreq: "weekly",
    },
    about: {
      path: "/about",
      title: "About Arambha Skill Solutions",
      description:
        "Learn about our mission to bridge learning and earning. Outcome-driven education with expert instructors and real-world projects.",
      keywords: "about us, skill development platform, education, training",
      priority: 0.8,
      changefreq: "monthly",
    },
    programs: {
      path: "/programs",
      title: "Professional Skill Development Programs",
      description:
        "Explore our signature programs: Spoken English Mastery, Campus to Corporate, Full-Stack Java. Enroll now and transform your career.",
      keywords:
        "programming courses, English courses, professional development, online training, skill programs",
      priority: 0.9,
      changefreq: "weekly",
    },
    services: {
      path: "/services",
      title: "Our Services & Solutions",
      description:
        "Comprehensive skill development services including training, certification, placement assistance, and corporate programs.",
      keywords: "services, training, certification, placement, corporate training",
      priority: 0.8,
      changefreq: "monthly",
    },
    gallery: {
      path: "/gallery",
      title: "Student Success Stories & Gallery",
      description:
        "Explore student testimonials, success stories, and gallery showcasing Arambha's learning environment and achievements.",
      keywords: "student testimonials, success stories, gallery, achievements",
      priority: 0.7,
      changefreq: "monthly",
    },
    careers: {
      path: "/careers",
      title: "Careers & Job Opportunities",
      description:
        "Explore job opportunities and career paths with Arambha. Build your career in tech, education, and skill development.",
      keywords: "careers, job opportunities, employment, hiring",
      priority: 0.8,
      changefreq: "weekly",
    },
    legalSupport: {
      path: "/legal-support",
      title: "Legal Support & Contact",
      description:
        "Contact Arambha for support, inquiries, and information about our programs and services.",
      keywords: "contact, support, legal, terms, privacy",
      priority: 0.6,
      changefreq: "monthly",
    },
  },

  // Keywords by Category
  keywords: {
    primary: [
      "skill development platform",
      "online courses India",
      "professional training",
      "spoken English course",
      "full stack development",
      "career coaching",
    ],
    secondary: [
      "web development course",
      "English speaking course",
      "programming bootcamp",
      "career guidance",
      "job training",
      "certification program",
    ],
    tertiary: [
      "online education",
      "learning platform",
      "skill training",
      "professional development",
      "tech education",
      "career transformation",
    ],
  },

  // Schema Types
  schemas: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Arambha Skill Solutions",
      url: "https://arambhaskills.com",
      logo: "https://arambhaskills.com/logo.png",
      description:
        "Premium skill development platform bridging learning and earning.",
      sameAs: [
        "https://www.facebook.com/arambhaskills",
        "https://www.twitter.com/arambhaskills",
        "https://www.instagram.com/arambhaskills",
        "https://www.linkedin.com/company/arambha-skills",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9108032103",
        contactType: "Customer Service",
        email: "arambhaskilldesignsolutions@gmail.com",
      },
    },
  },

  // Analytics
  analytics: {
    googleAnalyticsId: "G-XXXXXXXXXX", // Replace with your ID
    googleSearchConsoleId: "your-gsc-id", // Replace with your ID
  },

  // Sitemap
  sitemap: {
    url: "https://arambhaskills.com/sitemap.xml",
  },

  // Robots.txt
  robots: {
    url: "https://arambhaskills.com/robots.txt",
  },

  // Performance Targets
  performance: {
    targetPageSpeed: 90, // Google PageSpeed target
    targetLighthouse: 90,
    maxPageSize: 3, // MB
    targetFirstInput: 100, // ms
    targetCumulativeLayoutShift: 0.1,
  },
};

// Helper function to get page meta tags
export const getPageMeta = (pageName: keyof typeof SEO_CONFIG.pages) => {
  const pageMeta = SEO_CONFIG.pages[pageName] || SEO_CONFIG.defaultMeta;
  return {
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords,
    url: `${SEO_CONFIG.domain}${pageMeta.path}`,
    image: SEO_CONFIG.defaultMeta.image,
  };
};

// Helper function to generate structured data
export const generateStructuredData = (type: "organization" | "course" | "event", data?: any) => {
  switch (type) {
    case "organization":
      return SEO_CONFIG.schemas.organization;
    case "course":
      return {
        "@context": "https://schema.org",
        "@type": "Course",
        name: data?.name || "Skill Development Program",
        description: data?.description || "",
        provider: {
          "@type": "Organization",
          name: SEO_CONFIG.organization.name,
          url: SEO_CONFIG.domain,
        },
      };
    case "event":
      return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: data?.name || "Event",
        description: data?.description || "",
        startDate: data?.startDate || new Date().toISOString(),
        organizer: {
          "@type": "Organization",
          name: SEO_CONFIG.organization.name,
          url: SEO_CONFIG.domain,
        },
      };
    default:
      return null;
  }
};

export default SEO_CONFIG;
