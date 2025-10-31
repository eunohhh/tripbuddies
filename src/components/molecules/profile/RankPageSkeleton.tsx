import React from "react";

const RankPageSkeleton: React.FC = () => {
  return (
    <div className="relative animate-pulse rounded-lg bg-gray-100 p-4">
      <div className="relative h-48 overflow-hidden rounded-lg bg-gray-300">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="h-6 w-1/3 rounded bg-gray-300 font-bold text-gray-300 text-xl"></span>
        <div className="h-6 w-1/4 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default RankPageSkeleton;
