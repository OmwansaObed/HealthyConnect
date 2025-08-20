export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/about",
        "/contact",
        "/jobs",
        "/interview-tips",
        "/mission",
        "/terms",
      ],
      disallow: ["/admin/", "/api/", "/private/", "/_next/", "/dashboard/"],
    },
    sitemap: "https://healthyconnect.co.ke/sitemap.xml",
    host: "https://healthyconnect.co.ke",
  };
}
