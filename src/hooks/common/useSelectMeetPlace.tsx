'use client';

import { useState } from 'react';

export function useSelectMeetPlace() {
  const [meetPlace, setMeetPlace] = useState<string>('');

  const firstValue = '출발지';
  const secondValue = '여행지';

  const values = [firstValue, secondValue];

  const SelectMeetPlaceButton = () => {
    return (
      <div className="flex justify-center items-center mt-4">
        {values.map((value, index) => (
          <button
            key={index}
            onClick={() => setMeetPlace(value)}
            className={`text-lg xl:text-base ${meetPlace === value ? 'bg-main-color text-white' : 'bg-gray-200 text-gray-500 border-gray-200'} w-full mx-2 px-4 py-1 xl:py-2 rounded-full`}
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  return { SelectMeetPlaceButton, meetPlace };
}
