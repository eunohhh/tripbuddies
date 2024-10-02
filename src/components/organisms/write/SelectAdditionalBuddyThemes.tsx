'use client';

import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import LeftXlBoldText from '@/components/atoms/write/LeftXlBoldText';
import LeftXsmGrayText from '@/components/atoms/write/LeftXsmGrayText';
import SelectAgesRange from '@/components/atoms/write/SelectAgesRange';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type SelectAdditionalBuddyThemesProps = {
  PreferThemeToRender: React.FC;
  SelectWantedSexButton: React.FC;
  startAge: number;
  endAge: number;
  handleStartAge: (value: number) => void;
  handleEndAge: (value: number) => void;
};

export default function SelectAdditionalBuddyThemes({
  PreferThemeToRender,
  SelectWantedSexButton,
  startAge,
  endAge,
  handleStartAge,
  handleEndAge,
}: SelectAdditionalBuddyThemesProps) {
  const isMini = window.innerHeight < 659;

  return (
    <div className="relative flex flex-col xl:flex-row">
      <div className={twMerge('mb-0 xl:mb-2 xl:w-[40%]', isMini && 'mb-0')}>
        <Left2xlBoldText className="xl:text-xl" text="원하는 버디즈의 특성을 알려주세요" />
        <LeftSmGrayText text="모두 필수 선택 항목입니다" />
      </div>
      <div className={twMerge('xl:w-[60%]', isMini && 'mb-0')}>
        <div className={twMerge('mb-2', isMini && 'mb-0')}>
          <LeftXlBoldText text="성별" />
          <SelectWantedSexButton />
        </div>
        <div className={twMerge('mb-5', isMini && 'mb-0')}>
          <LeftXlBoldText text="나이" />
          <SelectAgesRange
            startAge={startAge}
            endAge={endAge}
            handleStartAge={handleStartAge}
            handleEndAge={handleEndAge}
          />
        </div>
        <div className={twMerge('mb-5', isMini && 'mb-1')}>
          <LeftXlBoldText text="버디즈 성향" />
          <LeftXsmGrayText text="3개를 선택해주세요" />
        </div>
        <div className={twMerge('mx-2', isMini && 'mb-1')}>
          <PreferThemeToRender />
        </div>
      </div>
    </div>
  );
}
