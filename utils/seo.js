// utils/seo.js
import { blogPosts } from "../blogs/data";

// Generate sitemap for better SEO
export function generateSitemap() {
  const baseUrl = "https://yourjobsite.com"; // Replace with your actual domain
  const currentDate = new Date().toISOString();

  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "/jobs", priority: "0.9", changefreq: "daily" },
    { url: "/blogs", priority: "0.8", changefreq: "weekly" },
    { url: "/about", priority: "0.6", changefreq: "monthly" },
    { url: "/contact", priority: "0.6", changefreq: "monthly" },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `/blogs/${post.slug}`,
    priority: "0.7",
    changefreq: "weekly",
    lastmod: post.date,
  }));

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return sitemap;
}

// SEO metadata generator
export function generateSEOMeta(page = {}) {
  const defaultMeta = {
    title: "Find Jobs in Kenya - Top Job Site",
    description:
      "Find the best job opportunities in Kenya. Get career advice, salary negotiation tips, and expert guidance for your job search success.",
    keywords: [
      "jobs Kenya",
      "Kenya employment",
      "career advice",
      "job search",
      "salary negotiation",
    ],
    image: "/og-image.jpg",
    url: "https://yourjobsite.com",
  };

  return {
    title: page.title || defaultMeta.title,
    description: page.description || defaultMeta.description,
    keywords: page.keywords || defaultMeta.keywords,
    image: page.image || defaultMeta.image,
    url: page.url || defaultMeta.url,
    type: page.type || "website",
  };
}

// Structured data generators
export function generateJobPostingStructuredData(job) {
  return {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: job.company,
      value: job.id,
    },
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: job.companyWebsite,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: job.location,
        addressLocality: job.city,
        addressCountry: "KE",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "KES",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: "MONTH",
      },
    },
  };
}

export function generateBreadcrumbStructuredData(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// Analytics and tracking utilities
export function trackPageView(url, title) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "GA_TRACKING_ID", {
      page_title: title,
      page_location: url,
    });
  }
}

export function trackEvent(eventName, parameters = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

// Blog-specific SEO utilities
export function getBlogCategories() {
  return [...new Set(blogPosts.map((post) => post.category))];
}

export function getBlogTags() {
  const allTags = blogPosts.reduce((tags, post) => {
    return [...tags, ...post.tags];
  }, []);
  return [...new Set(allTags)];
}

export function getRelatedPosts(currentPost, limit = 3) {
  return blogPosts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

// Content optimization utilities
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return `${readingTime} min read`;
}

export function extractExcerpt(content, maxLength = 160) {
  const cleanContent = content.replace(/<[^>]*>/g, "").replace(/\n/g, " ");
  return cleanContent.length > maxLength
    ? cleanContent.substring(0, maxLength).trim() + "..."
    : cleanContent;
}

// Search optimization
export function createSearchIndex() {
  return blogPosts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content.toLowerCase(),
    tags: post.tags.join(" ").toLowerCase(),
    category: post.category.toLowerCase(),
    author: post.author.toLowerCase(),
    searchableText: `${post.title} ${post.excerpt} ${
      post.content
    } ${post.tags.join(" ")} ${post.category} ${post.author}`.toLowerCase(),
  }));
}

export function searchPosts(query, posts = blogPosts) {
  if (!query.trim()) return posts;

  const searchTerm = query.toLowerCase();
  const searchIndex = createSearchIndex();

  return searchIndex
    .filter((post) => post.searchableText.includes(searchTerm))
    .map((result) => posts.find((post) => post.id === result.id))
    .filter(Boolean);
}
