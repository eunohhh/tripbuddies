'use client';

import React, { useState } from 'react';

export function useSelectAges() {
    const [startAge, setStartAge] = useState<number>(18);
    const [endAge, setEndAge] = useState<number>(30);

    const handleStartAge = (value: number) => {
        if (value < endAge) {
            setStartAge(value);
        }
    };

    const handleEndAge = (value: number) => {
        if (value > startAge) {
            setEndAge(value);
        }
    };

    return {
        startAge,
        endAge,
        handleStartAge,
        handleEndAge,
    };
}
