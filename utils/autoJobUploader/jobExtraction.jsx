"use client";
import { useState } from "react";

export default function JobExtractorForm() {
  const [rawText, setRawText] = useState("");
  const [extracted, setExtracted] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/extract-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText }),
      });
      const data = await res.json();
      setExtracted(data);
    } catch (err) {
      console.error("Extraction failed", err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6 p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold text-gray-700">Paste Job Message</h2>

      <textarea
        className="w-full p-3 border rounded-md resize-none h-40"
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        placeholder="Paste WhatsApp job message here..."
      />

      <button
        onClick={handleExtract}
        disabled={loading || !rawText}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Extracting..." : "Extract Job Info"}
      </button>

      {extracted && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-700">Extracted Fields</h3>
          <div className="grid gap-2">
            <label className="block">
              <span className="text-gray-600">Job Title</span>
              <input
                className="w-full border p-2 rounded"
                value={extracted.title}
                onChange={(e) =>
                  setExtracted({ ...extracted, title: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Location</span>
              <input
                className="w-full border p-2 rounded"
                value={extracted.location}
                onChange={(e) =>
                  setExtracted({ ...extracted, location: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Deadline</span>
              <input
                className="w-full border p-2 rounded"
                value={extracted.deadline}
                onChange={(e) =>
                  setExtracted({ ...extracted, deadline: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Apply Link</span>
              <input
                className="w-full border p-2 rounded"
                value={extracted.link}
                onChange={(e) =>
                  setExtracted({ ...extracted, link: e.target.value })
                }
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
