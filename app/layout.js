import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/general/Navbar";
import Footer from "../components/general/Footer";
import { Toaster } from "sonner";
import Providers from "../components/general/Providers";
import { Analytics } from "@vercel/analytics/next";
import ScrollToTop from "../components/general/ScrollToTop";
import SessionSyncClient from "../components/general/SessoinClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Healthyconnect",
  description: "Your trusted healthcare partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
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
