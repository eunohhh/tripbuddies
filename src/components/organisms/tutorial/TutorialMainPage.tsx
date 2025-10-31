"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Tuto from "@/components/atoms/tutorial/Tuto";
import ProgressIndicator from "@/components/atoms/write/ProgressIndicator";
import { setCookieAction } from "@/utils/tutorial/setCookieAction";
import ArrowBack from "../../../../public/svg/Arrow_back.svg";

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
    const funnel = searchParams.get("funnel");
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
    <div className="relative flex h-dvh max-h-dvh flex-col bg-white pt-2 xl:py-4">
      <div className="relative flex h-[5%] w-full items-center justify-between px-[20px]">
        {step > 0 ? (
          <ArrowBack onClick={handleBack} className="cursor-pointer" />
        ) : (
          <div className="w-[24px]"></div>
        )}

        {step < 4 && (
          <button
            type="button"
            onClick={handleSkip}
            className="ml-auto rounded px-1 py-1 text-base"
          >
            건너뛰기
          </button>
        )}
      </div>

      <div className="flex h-[80%] w-full flex-col items-center justify-start text-center">
        <Tuto step={step} />
      </div>

      <div className="flex h-[15%] w-full flex-col items-center justify-center">
        <div className="flex items-center justify-center pt-2 pb-3">
          <ProgressIndicator
            className="flex items-center justify-center pt-0"
            step={step}
            counts={5}
          />
        </div>
        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={handleNext}
            className="mb-4 rounded-2xl bg-main-color font-bold text-[18px] text-white"
            style={{ width: "335px", height: "48px" }}
          >
            {step < 4 ? "다음" : "홈으로"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialMainPage;
