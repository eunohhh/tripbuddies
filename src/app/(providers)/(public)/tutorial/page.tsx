'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import Tuto from '@/components/atoms/tutorial/Tuto';

const Tutorial: React.FC = () => {
    const [step, setStep] = React.useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const funnel = searchParams.get('funnel');
        if (funnel) {
            setStep(Number(funnel));
        }
    }, [searchParams]);

    useEffect(() => {
        if (step <= 4) {
            router.push(`/tutorial?funnel=${step}`, { scroll: false });
        } else {
            router.push('/');
        }
    }, [step, router]);

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            router.push('/');
        }
    };

    const handleSkip = () => {
        router.push('/');
    };

    return (
        <div className="relative flex flex-col items-center h-dvh overflow-hidden bg-white">
            {step < 4 ? (
                <button
                    onClick={handleSkip}
                    className="relative w-full text-right text-base py-1 px-1 rounded mb-4"
                >
                    건너뛰기
                </button>
            ) : (
                <button className="relative w-full text-right text-base p-2 rounded mb-4"></button>
            )}

            <section className="flex flex-col items-center justify-center w-full">
                <Tuto step={step + 1} />
            </section>

            <div className="mb-5 xl:mb-12">
                <ProgressIndicator className="pt-5" step={step} counts={5} />
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={handleNext}
                    className="text-2xl bg-main-color font-bold py-2 px-4 rounded-2xl w-11/12 max-w-md mb-4"
                >
                    {step < 4 ? '다음' : '홈으로'}
                </button>
            </div>
        </div>
    );
};

export default Tutorial;
