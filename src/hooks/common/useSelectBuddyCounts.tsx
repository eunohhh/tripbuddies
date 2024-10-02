'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

// type useSelectBuddyCountsProps = {
//     buddyCounts: number;
//     handleAddBuddyCounts: () => void;
//     handleSubBuddyCounts: () => void;
//     SelectBuddyCounts: () => React.JSX.Element;
// };

type useSelectBuddyCountsProps = {
  initialCounts?: number;
};

export function useSelectBuddyCounts({ initialCounts = 2 }: useSelectBuddyCountsProps) {
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
          'flex justify-center items-center mx-auto flex-row gap-[2px]',
          isEdit && 'mx-0',
        )}
      >
        <button
          className={twMerge(
            'text-[#647484] w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] bg-[#edeff1] hover:bg-gray-400 flex items-center justify-center cursor-pointer',
            className,
          )}
          onClick={handleSubBuddyCounts}
          disabled={buddyCounts <= initialValue}
        >
          -
        </button>

        <input
          type="hidden"
          className="md:p-2 p-1 text-xs md:text-base focus:outline-none text-center h-[24px]"
          readOnly
          name="custom-input-number"
        />
        <div
          className={twMerge(
            'bg-main-color w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] text-white md:text-base flex items-center justify-center cursor-default',
            className,
          )}
        >
          <span>{buddyCounts}</span>
        </div>

        <button
          className={twMerge(
            'text-[#647484] w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] bg-[#edeff1] hover:bg-gray-400 flex items-center justify-center cursor-pointer',
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
