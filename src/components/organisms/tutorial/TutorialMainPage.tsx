'use client';

import Tuto from '@/components/atoms/tutorial/Tuto';
import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import { setCookieAction } from '@/utils/tutorial/setCookieAction';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ArrowBack from '../../../../public/svg/Arrow_back.svg';

const TutorialMainPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNext = async () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      await setCookieAction();
    }
  };

  const handleBack = async () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSkip = async () => {
    await setCookieAction();
  };

  useEffect(() => {
    const funnel = searchParams.get('funnel');
    if (funnel) {
      setStep(Number(funnel));
    }
  }, [searchParams]);

  useEffect(() => {
    if (step <= 4) {
      router.push(`/tutorial?funnel=${step}`);
    }
  }, [step, router]);

  return (
    <div className="relative flex flex-col bg-white h-dvh max-h-dvh pt-2 xl:py-4">
      <div className="flex justify-between items-center relative w-full px-[20px] h-[5%]">
        {step > 0 ? (
          <ArrowBack onClick={handleBack} className="cursor-pointer" />
        ) : (
          <div className="w-[24px]"></div>
        )}

        {step < 4 && (
          <button onClick={handleSkip} className="text-base py-1 px-1 rounded ml-auto">
            건너뛰기
          </button>
        )}
      </div>

      <div className="flex flex-col items-center justify-start w-full h-[80%] text-center">
        <Tuto step={step} />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-[15%]">
        <div className="flex justify-center items-center pt-2 pb-3">
          <ProgressIndicator
            className="flex justify-center items-center pt-0"
            step={step}
            counts={5}
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleNext}
            className="text-[18px] bg-main-color font-bold rounded-2xl mb-4 text-white"
            style={{ width: '335px', height: '48px' }}
          >
            {step < 4 ? '다음' : '홈으로'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialMainPage;
