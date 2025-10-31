import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="mx-1 h-[75px] min-w-[200px] animate-pulse rounded border border-gray-200 shadow-md">
      <div className="flex h-full w-[120px] items-center">
        <div className="h-[75px] w-[75px] flex-shrink-0 rounded bg-gray-300"></div>
        <div className="ml-2 flex flex-col space-y-2">
          <span className="h-4 w-24 rounded bg-gray-300 font-bold text-gray-300 text-xs"></span>
          <div className="space-y-2 font-bold text-m">
            <span className="block h-4 w-12 rounded bg-gray-300"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
