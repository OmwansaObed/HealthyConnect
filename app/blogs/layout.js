import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Kenya Job Portal - Career Blog",
    default: "Career Blog | Kenya Job Portal",
  },
  description:
    "Expert career advice, job search tips, and salary negotiation strategies for the Kenyan job market.",
  keywords: [
    "Kenya jobs",
    "career advice",
    "job search tips",
    "salary negotiation",
    "Kenya employment",
  ],
  authors: [{ name: "Kenya Job Portal" }],
  creator: "Kenya Job Portal",
  publisher: "Kenya Job Portal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://yourjobsite.com/blogs",
    siteName: "Kenya Job Portal",
    title: "Career Blog - Job Search Tips for Kenya",
    description:
      "Expert career advice and job search strategies for the Kenyan job market",
    images: [
      {
        url: "/og-blog-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kenya Job Portal Career Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourjobsite",
    creator: "@yourjobsite",
    title: "Career Blog - Job Search Tips for Kenya",
    description:
      "Expert career advice and job search strategies for the Kenyan job market",
    images: ["/og-blog-image.jpg"],
  },
};

export default function BlogLayout({ children }) {
  return <div className={inter.className}>{children}</div>;
}
