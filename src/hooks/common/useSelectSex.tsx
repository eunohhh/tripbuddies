"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function useSelectSex() {
  const [wantedSex, setWantedSex] = useState<string>("");

  const firstValue = "남성";
  const secondValue = "여성";
  const thirdValue = "성별무관";

  const values = [firstValue, secondValue, thirdValue];

  const SelectWantedSexButton = () => {
    return (
      <div className="mt-2 flex items-center justify-center">
        {values.map((value, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setWantedSex(value)}
            className={twMerge(
              "mx-2 rounded-full px-4 py-1 text-[12px] text-lg xl:py-2",
              "xl:w-[100px]",
              wantedSex === value
                ? "bg-main-color text-white"
                : "border-gray-200 bg-gray-200 text-gray-500",
            )}
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  return { SelectWantedSexButton, wantedSex };
}
