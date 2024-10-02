'use client';
import Button from '@/components/atoms/common/Button';
import TripEditModalWrapper from '@/components/atoms/trips/TripEditModalWrapper';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import SelectedResultRealtimeText from '@/components/organisms/write/SelectedResultRealtimeText';
import { useModal } from '@/contexts/modal.context';
import { useCalendar } from '@/hooks';
import { CalendarData } from '@/types/Trips.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { forwardRef } from 'react';

const TripEditSelectDate = forwardRef<CalendarData>((props, ref) => {
  const modal = useModal();
  const { SelectCalendar, startDateTimestamp, endDateTimestamp } = useCalendar();

  React.useImperativeHandle(ref, () => ({
    startDateTimestamp,
    endDateTimestamp,
  }));

  const handleClose = () => {
    if (startDateTimestamp === '' || endDateTimestamp === '')
      return showAlert('caution', '날짜를 선택해주세요.');
    modal.closeModal();
  };

  return (
    <TripEditModalWrapper>
      <div className="w-[70%] h-[10%] mx-auto flex justify-start flex-col mt-2 mb-5 xl:mt-2">
        <Left2xlBoldText text="날짜를 선택해주세요" />
        <LeftSmGrayText text="여정 시작 날짜와 종료 날짜의 범위를 선택해주세요." />
      </div>
      <div className="w-[70%] h-[84%] mx-auto">
        <div className="flex justify-center">
          <SelectCalendar />
        </div>
        <div>
          {startDateTimestamp && endDateTimestamp ? (
            <SelectedResultRealtimeText
              selectedData={`${startDateTimestamp} ~ ${endDateTimestamp}`}
              firstLabel="선택하신 날짜는"
              secondLabel="입니다."
            />
          ) : (
            <SelectedResultRealtimeText firstLabel="날짜를 선택해주세요" />
          )}
        </div>
      </div>
      <Button className="w-[70%] h-[6%] mx-auto my-2" onClick={handleClose}>
        완료
      </Button>
    </TripEditModalWrapper>
  );
});

TripEditSelectDate.displayName = 'TripEditSelectDate';

export default TripEditSelectDate;
