// components/JsonLD.js - Structured data component for App Router
"use client";
import { useEffect } from "react";

export default function JsonLD({ data }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      // Cleanup when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [data]);

  return null;
}
