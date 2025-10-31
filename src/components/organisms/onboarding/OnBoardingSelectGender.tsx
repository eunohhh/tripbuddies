"use client";
import React, { useState } from "react";
import Chip from "@/components/atoms/common/Chip";
import Title from "@/components/atoms/common/Title";
import OnBoardingInnerWrapper from "@/components/atoms/onboarding/OnBoardinginnerWrapper";
import OnBoardingWrapper from "@/components/atoms/onboarding/OnBoardingWrapper";

type OnBoardingSelectGenderProps = {
  handleClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const OnBoardingSelectGender: React.FC<OnBoardingSelectGenderProps> = ({
  handleClick,
}) => {
  const [selected, setSelected] = useState<{
    male: boolean;
    female: boolean;
  }>({ male: false, female: false });

  const handleGenderSelect = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    setSelected({
      male: target.innerText === "남자",
      female: target.innerText === "여자",
    });
    handleClick(e);
  };

  return (
    <OnBoardingWrapper>
      <Title align="left">{`성별을 선택해주세요`}</Title>
      <OnBoardingInnerWrapper className="flex-row">
        <Chip
          className="px-16 py-2"
          selected={selected.male}
          intent="onBoarding"
          onClick={handleGenderSelect}
        >
          남자
        </Chip>
        <Chip
          className="px-16 py-2"
          selected={selected.female}
          intent="onBoarding"
          onClick={handleGenderSelect}
        >
          여자
        </Chip>
      </OnBoardingInnerWrapper>
    </OnBoardingWrapper>
  );
};

export default OnBoardingSelectGender;
