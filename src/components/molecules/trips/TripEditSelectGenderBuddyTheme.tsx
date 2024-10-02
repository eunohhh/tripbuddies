'use client';

import Button from '@/components/atoms/common/Button';
import TripEditModalWrapper from '@/components/atoms/trips/TripEditModalWrapper';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import LeftXlBoldText from '@/components/atoms/write/LeftXlBoldText';
import LeftXsmGrayText from '@/components/atoms/write/LeftXsmGrayText';
import SelectAgesRange from '@/components/atoms/write/SelectAgesRange';
import { useModal } from '@/contexts/modal.context';
import { usePreferTheme, useSelectAges, useSelectSex } from '@/hooks';
import { BuddyThemeData } from '@/types/Trips.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { forwardRef } from 'react';

const TripEditSelectGenderBuddyTheme = forwardRef<BuddyThemeData>((props, ref) => {
  const { wantedSex, SelectWantedSexButton } = useSelectSex();
  const { startAge, endAge, handleStartAge, handleEndAge } = useSelectAges();
  const [PreferThemesToRender, selectedWantedBuddies] = usePreferTheme({
    mode: 'buddy',
  });
  const modal = useModal();

  const handleClose = () => {
    if (wantedSex === '' || isNaN(startAge) || isNaN(endAge))
      return showAlert('caution', '나이와 성별을 선택해주세요.');

    if (selectedWantedBuddies.length < 3)
      return showAlert('caution', '버디즈 성향을 3개 선택해주세요.');
    modal.closeModal();
  };

  React.useImperativeHandle(ref, () => ({
    wantedSex,
    startAge,
    endAge,
    selectedWantedBuddies,
  }));

  return (
    <TripEditModalWrapper>
      <div className="w-[90%] h-[10%] xl:w-[70%] xl:h-[10%] mx-auto flex justify-start flex-col mt-2 mb-5 xl:mt-2">
        <Left2xlBoldText text="원하는 버디즈의 특성을 알려주세요" />
        <LeftSmGrayText text="모두 필수 선택 항목입니다" />
      </div>

      <div className="w-[90%] h-[84%] xl:w-[70%] xl:h-[84%] mx-auto">
        <div className="flex flex-col justify-center items-center w-full">
          <LeftXlBoldText text="성별" />
          <SelectWantedSexButton />
        </div>
        <div className="flex flex-col justify-center items-center">
          <LeftXlBoldText text="나이" />
          <SelectAgesRange
            startAge={startAge}
            endAge={endAge}
            handleStartAge={handleStartAge}
            handleEndAge={handleEndAge}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <LeftXlBoldText text="버디즈 성향" />
          <LeftXsmGrayText text="3개를 선택해주세요" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <PreferThemesToRender />
        </div>
      </div>
      <Button className="w-[90%] h-[6%] xl:w-[70%] xl:h-[6%] mx-auto my-2" onClick={handleClose}>
        완료
      </Button>
    </TripEditModalWrapper>
  );
});

TripEditSelectGenderBuddyTheme.displayName = 'TripEditSelectGenderBuddyTheme';

export default TripEditSelectGenderBuddyTheme;
