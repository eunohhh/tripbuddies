import React from "react";
import Title from "@/components/atoms/common/Title";
import OnBoardingInnerWrapper from "@/components/atoms/onboarding/OnBoardinginnerWrapper";
import OnBoardingWrapper from "@/components/atoms/onboarding/OnBoardingWrapper";

type OnBoardingSelectPreferProps = {
  mode: "buddy" | "trip";
  component: React.ReactNode;
};

const OnBoardingSelectPrefer = ({
  mode,
  component,
}: OnBoardingSelectPreferProps) => {
  return (
    <OnBoardingWrapper>
      <Title>
        {mode === "buddy"
          ? "여행할 때 어떤 스타일 이신가요?"
          : "어떤 유형의 여행을 더 선호하세요?"}
      </Title>
      <OnBoardingInnerWrapper>
        <div className="flex w-[90%] justify-center">{component}</div>
      </OnBoardingInnerWrapper>
    </OnBoardingWrapper>
  );
};

export default OnBoardingSelectPrefer;
