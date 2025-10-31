const BuddyProfileSkeleton = () => {
  return (
    <div className="relative mt-3 flex min-h-[208px] w-[80%] animate-pulse flex-col items-center justify-center p-4 xl:mt-8">
      <div className="relative flex w-full items-center">
        <div className="relative flex w-[40%] flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-gray-300"></div>
          <div className="mt-8 h-8 w-20 rounded bg-gray-300"></div>
        </div>
        <div className="relative ml-4 w-[60%]">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <div className="h-8 w-32 rounded bg-gray-300"></div>
              <div className="ml-2 h-6 w-20 rounded-full bg-gray-200 px-3 py-1 text-gray-700 text-sm"></div>
            </div>
            <div className="h-6 w-full rounded bg-gray-300"></div>
            <div className="h-6 w-3/4 rounded bg-gray-300"></div>
            <div className="h-6 w-1/2 rounded bg-gray-300"></div>
            <div className="mt-4 flex space-x-2">
              <div className="h-6 w-24 rounded-full bg-gray-200 px-3 py-1 font-semibold text-gray-700 text-sm"></div>
              <div className="h-6 w-24 rounded-full bg-gray-200 px-3 py-1 font-semibold text-gray-700 text-sm"></div>
              <div className="h-6 w-24 rounded-full bg-gray-200 px-3 py-1 font-semibold text-gray-700 text-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuddyProfileSkeleton;
