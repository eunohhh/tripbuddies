import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="min-w-[200px] h-[75px] mx-1 rounded border border-gray-200 shadow-md animate-pulse">
      <div className="flex items-center w-[120px] h-full">
        <div className="flex-shrink-0 w-[75px] h-[75px] bg-gray-300 rounded"></div>
        <div className="ml-2 flex flex-col space-y-2">
          <span className="text-xs font-bold text-gray-300 w-24 h-4 bg-gray-300 rounded"></span>
          <div className="text-m font-bold space-y-2">
            <span className="block w-12 h-4 bg-gray-300 rounded"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
