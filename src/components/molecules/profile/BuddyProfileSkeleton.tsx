const BuddyProfileSkeleton = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-[80%] min-h-[208px] p-4 mt-3 xl:mt-8 animate-pulse">
      <div className="relative flex items-center w-full">
        <div className="relative flex flex-col items-center w-[40%]">
          <div className="rounded-full bg-gray-300 w-24 h-24"></div>
          <div className="mt-8 bg-gray-300 rounded w-20 h-8"></div>
        </div>
        <div className="relative ml-4 w-[60%]">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <div className="bg-gray-300 w-32 h-8 rounded"></div>
              <div className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 ml-2 w-20 h-6"></div>
            </div>
            <div className="bg-gray-300 w-full h-6 rounded"></div>
            <div className="bg-gray-300 w-3/4 h-6 rounded"></div>
            <div className="bg-gray-300 w-1/2 h-6 rounded"></div>
            <div className="flex space-x-2 mt-4">
              <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 w-24 h-6"></div>
              <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 w-24 h-6"></div>
              <div className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 w-24 h-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuddyProfileSkeleton;
