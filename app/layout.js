import "./globals.css";
import Navbar from "../components/general/Navbar";
import Footer from "../components/general/Footer";
import { Toaster } from "sonner";
import Providers from "../components/general/Providers";
import { Analytics } from "@vercel/analytics/next";
import ScrollToTop from "../components/general/ScrollToTop";
import SessionSyncClient from "../components/general/SessoinClient";

export const metadata = {
  title: "Healthyconnect",
  keywords: [
    "healthcare",
    "medical",
    "appointments",
    "patient management",
    "health records",
    "telemedicine",
    "healthcare technology",
    "patient engagement",
  ],
  description: "Your trusted healthcare partner",
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
