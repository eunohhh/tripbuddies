'use client';
import Button from '@/components/atoms/common/Button';
import TripEditModalWrapper from '@/components/atoms/trips/TripEditModalWrapper';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import LeftXlBoldText from '@/components/atoms/write/LeftXlBoldText';
import { useModal } from '@/contexts/modal.context';
import { usePreferTheme, useSelectMeetPlace } from '@/hooks';
import { TripThemeData } from '@/types/Trips.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { forwardRef } from 'react';

const TripEditTripTheme = forwardRef<TripThemeData>((props, ref) => {
  const { meetPlace, SelectMeetPlaceButton } = useSelectMeetPlace();

  const [PreferTripThemesToRender, selectedTripThemes] = usePreferTheme({
    mode: 'trip',
  });
  const modal = useModal();

  const handleClose = () => {
    if (meetPlace === '') return showAlert('caution', '만나실 장소를 선택해주세요.');
    if (selectedTripThemes.length < 3) return showAlert('caution', '여정 테마를 3개 선택해주세요.');
    modal.closeModal();
  };

  React.useImperativeHandle(ref, () => ({
    meetPlace,
    selectedTripThemes,
  }));

  return (
    <TripEditModalWrapper>
      <div className="xl:w-[70%] w-[90%] h-[10%] mx-auto flex justify-start flex-col mt-2 mb-5 xl:mt-2">
        <Left2xlBoldText text="어떤 유형의 여정을 원하세요?" />
        <LeftSmGrayText text="여정 테마를 3개 선택해주세요" />
      </div>
      <div className="xl:w-[70%] w-[90%] h-[84%] mx-auto">
        <div className="mb-10 mx-2">
          <PreferTripThemesToRender />
        </div>
        <div className="mb-10 mx-2">
          <LeftXlBoldText text="어디에서 만날까요?" />
          <SelectMeetPlaceButton />
        </div>
      </div>
      <Button className="xl:w-[70%] w-[90%] h-[6%] mx-auto my-2" onClick={handleClose}>
        완료
      </Button>
    </TripEditModalWrapper>
  );
});

TripEditTripTheme.displayName = 'TripEditTripTheme';

export default TripEditTripTheme;
