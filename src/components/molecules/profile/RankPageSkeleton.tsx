import React from 'react';

const RankPageSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 relative animate-pulse">
      <div className="relative rounded-lg overflow-hidden h-48 bg-gray-300">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-300 bg-gray-300 rounded w-1/3 h-6"></span>
        <div className="bg-gray-300 rounded w-1/4 h-6"></div>
      </div>
    </div>
  );
};

export default RankPageSkeleton;
