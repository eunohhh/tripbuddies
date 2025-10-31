"use client";

import { useState } from "react";

export function useSelectMeetPlace() {
  const [meetPlace, setMeetPlace] = useState<string>("");

  const firstValue = "출발지";
  const secondValue = "여행지";

  const values = [firstValue, secondValue];

  const SelectMeetPlaceButton = () => {
    return (
      <div className="mt-4 flex items-center justify-center">
        {values.map((value, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setMeetPlace(value)}
            className={`text-lg xl:text-base ${meetPlace === value ? "bg-main-color text-white" : "border-gray-200 bg-gray-200 text-gray-500"} mx-2 w-full rounded-full px-4 py-1 xl:py-2`}
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  return { SelectMeetPlaceButton, meetPlace };
}
