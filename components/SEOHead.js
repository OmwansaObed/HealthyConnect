"use client";

import Head from "next/head";

const SEOHead = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  article = null,
}) => {
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
    url: "https://www.healthyconnect.co.ke",
  };

  const seoMeta = {
    title: title || defaultMeta.title,
    description: description || defaultMeta.description,
    keywords: keywords.length > 0 ? keywords : defaultMeta.keywords,
    image: image || defaultMeta.image,
    url: url || defaultMeta.url,
    type: type,
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoMeta.title}</title>
      <meta name="description" content={seoMeta.description} />
      <meta
        name="keywords"
        content={
          Array.isArray(seoMeta.keywords)
            ? seoMeta.keywords.join(", ")
            : seoMeta.keywords
        }
      />
      <meta name="author" content="Your Job Site" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={seoMeta.url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoMeta.title} />
      <meta property="og:description" content={seoMeta.description} />
      <meta property="og:image" content={seoMeta.image} />
      <meta property="og:url" content={seoMeta.url} />
      <meta property="og:type" content={seoMeta.type} />
      <meta property="og:site_name" content="Kenya Job Portal" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoMeta.title} />
      <meta name="twitter:description" content={seoMeta.description} />
      <meta name="twitter:image" content={seoMeta.image} />
      <meta name="twitter:site" content="@healthyconnect" />

      {/* Article-specific meta tags */}
      {article && (
        <>
          <meta property="article:author" content={article.author} />
          <meta
            property="article:published_time"
            content={article.publishedTime}
          />
          <meta
            property="article:modified_time"
            content={article.modifiedTime}
          />
          <meta property="article:section" content={article.section} />
          {article.tags &&
            article.tags.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
        </>
      )}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Additional SEO Meta Tags */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Language and Region */}
      <meta name="language" content="en-KE" />
      <meta name="geo.region" content="KE" />
      <meta name="geo.country" content="Kenya" />
      <meta name="geo.placename" content="Nairobi" />
    </Head>
  );
};

export default SEOHead;
