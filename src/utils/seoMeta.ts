// SEO Meta Tags Utility for React Components
// Use this to set page-specific meta tags

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
  url?: string;
  type?: string;
  author?: string;
}

export const setSEOMeta = (props: SEOProps) => {
  const {
    title,
    description,
    keywords = "skill development, online courses, training",
    imageUrl = "https://arambhaskills.com/og-image.jpg",
    url = "https://arambhaskills.com",
    type = "website",
    author = "Arambha Skill Solutions",
  } = props;

  // Set title
  document.title = `${title} | Arambha Skill Solutions`;

  // Update or create meta tags
  const setMetaTag = (name: string, content: string, property = false) => {
    let element = document.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(property ? "property" : "name", name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  // Primary Meta Tags
  setMetaTag("title", `${title} | Arambha Skill Solutions`);
  setMetaTag("description", description);
  setMetaTag("keywords", keywords);
  setMetaTag("author", author);

  // Open Graph
  setMetaTag("og:type", type, true);
  setMetaTag("og:url", url, true);
  setMetaTag("og:title", `${title} | Arambha Skill Solutions`, true);
  setMetaTag("og:description", description, true);
  setMetaTag("og:image", imageUrl, true);
  setMetaTag("og:site_name", "Arambha Skill Solutions", true);

  // Twitter Card
  setMetaTag("twitter:card", "summary_large_image", true);
  setMetaTag("twitter:url", url, true);
  setMetaTag("twitter:title", `${title} | Arambha Skill Solutions`, true);
  setMetaTag("twitter:description", description, true);
  setMetaTag("twitter:image", imageUrl, true);

  // Canonical URL
  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
};

// Structured Data (JSON-LD) Utilities

export const setOrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arambha Skill Solutions",
    url: "https://arambhaskills.com",
    logo: "https://arambhaskills.com/logo.png",
    description: "Premium skill development platform bridging the gap between learning and earning.",
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
  };
  addJSONLD(schema);
};

export const setCourseSchema = (course: {
  name: string;
  description: string;
  provider: string;
  image?: string;
  duration?: string;
  level?: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "Arambha Skill Solutions",
      url: "https://arambhaskills.com",
    },
    ...(course.image && { image: course.image }),
    ...(course.duration && { duration: course.duration }),
    ...(course.level && { educationLevel: course.level }),
  };
  addJSONLD(schema);
};

export const setEventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  image?: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    ...(event.location && { location: event.location }),
    ...(event.image && { image: event.image }),
    organizer: {
      "@type": "Organization",
      name: "Arambha Skill Solutions",
      url: "https://arambhaskills.com",
    },
  };
  addJSONLD(schema);
};

export const setFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  addJSONLD(schema);
};

export const setReviewSchema = (review: {
  ratingValue: number;
  ratingCount: number;
  reviewCount: number;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arambha Skill Solutions",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: review.ratingValue,
      ratingCount: review.ratingCount,
      reviewCount: review.reviewCount,
    },
  };
  addJSONLD(schema);
};

// Helper function to add JSON-LD to page
const addJSONLD = (schema: any) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
};

// Example usage in React components:
/*
import { useEffect } from 'react';
import { setSEOMeta } from '@/utils/seoMeta';

export default function Home() {
  useEffect(() => {
    setSEOMeta({
      title: "Learn & Earn with Outcome-Driven Programs",
      description: "Premium skill development platform. Join 5000+ students. Spoken English, Full Stack Development, Professional Training.",
      keywords: "skill development, online courses, spoken English, full stack",
      url: "https://arambhaskills.com/",
      type: "website",
    });
  }, []);

  return <Home />;
}
*/
