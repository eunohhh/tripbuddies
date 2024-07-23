'use client';

import { useCallback, useState } from 'react';

const useNextButton = ({
    initialStep = 0,
    limit,
    buttonText,
}: {
    initialStep?: number;
    limit: number;
    buttonText: string;
}) => {
    const [step, setStep] = useState(initialStep);

    const handleNext = useCallback(() => {
        if (step < limit) {
            setStep(prevStep => prevStep + 1);
        }
    }, [setStep, step, limit]);

    const NextButton = ({ className }: { className: string }) => (
        <button onClick={handleNext} className={className}>
            {buttonText}
        </button>
    );

    return { NextButton, step, setStep };
};

export default useNextButton;
