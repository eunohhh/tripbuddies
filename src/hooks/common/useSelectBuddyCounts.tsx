"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

// type useSelectBuddyCountsProps = {
//     buddyCounts: number;
//     handleAddBuddyCounts: () => void;
//     handleSubBuddyCounts: () => void;
//     SelectBuddyCounts: () => React.JSX.Element;
// };

type useSelectBuddyCountsProps = {
  initialCounts?: number;
};

export function useSelectBuddyCounts({
  initialCounts = 2,
}: useSelectBuddyCountsProps) {
  const [buddyCounts, setBuddyCounts] = useState<number>(initialCounts);

  const handleAddBuddyCounts = () => {
    // setBuddyCounts(buddyCounts + 1);
    setBuddyCounts((prev) => Math.min(prev + 1, 4));
  };

  const handleSubBuddyCounts = () => {
    // setBuddyCounts(buddyCounts - 1);
    setBuddyCounts((prev) => Math.max(prev - 1, 2));
  };

  // console.log('buddyCounts', buddyCounts);

  const SelectBuddyCounts = ({
    className,
    isEdit = false,
    initialValue = 2,
  }: {
    className?: string;
    isEdit?: boolean;
    initialValue?: number;
  }) => {
    return (
      <div
        className={twMerge(
          "mx-auto flex flex-row items-center justify-center gap-[2px]",
          isEdit && "mx-0",
        )}
      >
        <button
          type="button"
          className={twMerge(
            "flex h-[30px] w-[30px] cursor-pointer items-center justify-center bg-[#edeff1] text-[#647484] hover:bg-gray-400 xl:h-[50px] xl:w-[50px]",
            className,
          )}
          onClick={handleSubBuddyCounts}
          disabled={buddyCounts <= initialValue}
        >
          -
        </button>

        <input
          type="hidden"
          className="h-[24px] p-1 text-center text-xs focus:outline-none md:p-2 md:text-base"
          readOnly
          name="custom-input-number"
        />
        <div
          className={twMerge(
            "flex h-[30px] w-[30px] cursor-default items-center justify-center bg-main-color text-white md:text-base xl:h-[50px] xl:w-[50px]",
            className,
          )}
        >
          <span>{buddyCounts}</span>
        </div>

        <button
          type="button"
          className={twMerge(
            "flex h-[30px] w-[30px] cursor-pointer items-center justify-center bg-[#edeff1] text-[#647484] hover:bg-gray-400 xl:h-[50px] xl:w-[50px]",
            className,
          )}
          onClick={handleAddBuddyCounts}
          disabled={buddyCounts === 4}
        >
          +
        </button>
      </div>
    );
  };

  return {
    buddyCounts,
    handleAddBuddyCounts,
    handleSubBuddyCounts,
    SelectBuddyCounts,
  };
}
