import "./globals.css";
import Navbar from "../components/general/Navbar";
import Footer from "../components/general/Footer";
import Providers from "../components/general/Providers";
import { Analytics } from "@vercel/analytics/next";
import ScrollToTop from "../components/general/ScrollToTop";
import SessionSyncClient from "../components/general/SessoinClient";

export const metadata = {
  title: "HealthyConnect | Search & Apply for Medical Jobs",
  description:
    "HealthyConnect is your trusted healthcare partner for online medical job search.Find and apply for jobs in healthcare and connect with top employers.",
  icons: {
    icon: "/logo.png",
  },
  keywords: [
    "HealthyConnect",
    "healthcare jobs",
    "medical job search",
    "apply for healthcare jobs",
    "healthcare recruitment",
    "job opportunities in healthcare",
    "healthcare careers",
    "find healthcare jobs",
    "healthcare job listings",
    "healthcare employment",
    "healthcare job applications",
    "healthcare job portal",
    "healthcare job vacancies",
    "healthcare job search engine",
    "healthcare job board",
    "healthcare job opportunities",
    "nursing jobs",
    "doctor jobs",
    "pharmacist jobs",
    "healthcare job alerts",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ScrollToTop />
          <SessionSyncClient />
          <Navbar />
          <Analytics />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
