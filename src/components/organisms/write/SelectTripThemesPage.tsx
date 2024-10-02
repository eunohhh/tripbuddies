import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import LeftXlBoldText from '@/components/atoms/write/LeftXlBoldText';
import React from 'react';

type SelectTripThemesPageProps = {
  PreferThemeToRender: React.FC;
  SelectMeetPlaceButton: React.FC;
};

export default function SelectTripThemesPage({
  PreferThemeToRender,
  SelectMeetPlaceButton,
}: SelectTripThemesPageProps) {
  return (
    <div>
      <div className="flex flex-col xl:flex-row xl:items-center">
        <div className="mb-10 xl:w-[40%]">
          <Left2xlBoldText className="xl:text-2xl" text="어떤 유형의 여정을 원하세요?" />
          <LeftSmGrayText text="여정 테마를 3개 선택해주세요" />
        </div>
        <div className="mb-10 mx-2 xl:w-[60%] xl:mb-0">
          <PreferThemeToRender />
        </div>
      </div>
      <div className="mb-10 mx-2 flex flex-col xl:flex-row xl:mt-10">
        <div className="xl:w-[40%]">
          <LeftXlBoldText className="xl:text-xl" text="어디에서 만날까요?" />
        </div>
        <div className="xl:w-[60%]">
          <SelectMeetPlaceButton />
        </div>
      </div>
    </div>
  );
}
