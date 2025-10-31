"use client";
import React, { forwardRef } from "react";
import Button from "@/components/atoms/common/Button";
import TripEditModalWrapper from "@/components/atoms/trips/TripEditModalWrapper";
import Left2xlBoldText from "@/components/atoms/write/Left2xlText";
import LeftSmGrayText from "@/components/atoms/write/LeftSmGrayText";
import SelectedResultRealtimeText from "@/components/organisms/write/SelectedResultRealtimeText";
import { useModal } from "@/contexts/modal.context";
import { useCalendar } from "@/hooks";
import { CalendarData } from "@/types/Trips.types";
import { showAlert } from "@/utils/ui/openCustomAlert";

const TripEditSelectDate = forwardRef<CalendarData>((props, ref) => {
  const modal = useModal();
  const { SelectCalendar, startDateTimestamp, endDateTimestamp } =
    useCalendar();

  React.useImperativeHandle(ref, () => ({
    startDateTimestamp,
    endDateTimestamp,
  }));

  const handleClose = () => {
    if (startDateTimestamp === "" || endDateTimestamp === "")
      return showAlert("caution", "날짜를 선택해주세요.");
    modal.closeModal();
  };

  return (
    <TripEditModalWrapper>
      <div className="mx-auto mt-2 mb-5 flex h-[10%] w-[70%] flex-col justify-start xl:mt-2">
        <Left2xlBoldText text="날짜를 선택해주세요" />
        <LeftSmGrayText text="여정 시작 날짜와 종료 날짜의 범위를 선택해주세요." />
      </div>
      <div className="mx-auto h-[84%] w-[70%]">
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
      <Button className="mx-auto my-2 h-[6%] w-[70%]" onClick={handleClose}>
        완료
      </Button>
    </TripEditModalWrapper>
  );
});

TripEditSelectDate.displayName = "TripEditSelectDate";

export default TripEditSelectDate;
