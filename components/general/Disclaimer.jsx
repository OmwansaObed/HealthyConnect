import { AlertCircle } from "lucide-react";
import React from "react";

const Disclaimer = () => (
  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
    <div className="flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm">
        <p className="font-medium text-amber-800 mb-1">Important Notice</p>
        <p className="text-amber-700 leading-relaxed">
          Newer jobs have better chances of getting considered. Call to inqure.
          Thank me later.
        </p>
      </div>
    </div>
  </div>
);

export default Disclaimer;
