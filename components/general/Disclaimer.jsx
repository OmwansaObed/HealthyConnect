import React from "react";

const Disclaimer = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-t border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl bg-red-200 font-bold text-red-700 mb-4">
            Disclaimer
          </h2>
          <p className="text-gray-600">
            Apart from jobs with deadlines, all other jobs are usually relevant
            on the day of posting, applying after a day renders lower chances of
            getting the job.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
