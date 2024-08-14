'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function useSelectSex() {
    const [wantedSex, setWantedSex] = useState<string>('');

    const firstValue = '남성';
    const secondValue = '여성';
    const thirdValue = '성별무관';

    const values = [firstValue, secondValue, thirdValue];

    const SelectWantedSexButton = () => {
        return (
            <div className="flex justify-center items-center mt-2">
                {values.map((value, index) => (
                    <button
                        key={index}
                        onClick={() => setWantedSex(value)}
                        className={twMerge(
                            'text-lg mx-2 px-4 py-1 xl:py-2 rounded-full',
                            wantedSex === value
                                ? 'bg-main-color text-white'
                                : 'bg-gray-100',
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
