"use client";
import React, { forwardRef } from "react";
import Button from "@/components/atoms/common/Button";
import TripEditModalWrapper from "@/components/atoms/trips/TripEditModalWrapper";
import Left2xlBoldText from "@/components/atoms/write/Left2xlText";
import LeftSmGrayText from "@/components/atoms/write/LeftSmGrayText";
import LeftXlBoldText from "@/components/atoms/write/LeftXlBoldText";
import { useModal } from "@/contexts/modal.context";
import { usePreferTheme, useSelectMeetPlace } from "@/hooks";
import { TripThemeData } from "@/types/Trips.types";
import { showAlert } from "@/utils/ui/openCustomAlert";

const TripEditTripTheme = forwardRef<TripThemeData>((props, ref) => {
  const { meetPlace, SelectMeetPlaceButton } = useSelectMeetPlace();

  const [PreferTripThemesToRender, selectedTripThemes] = usePreferTheme({
    mode: "trip",
  });
  const modal = useModal();

  const handleClose = () => {
    if (meetPlace === "")
      return showAlert("caution", "만나실 장소를 선택해주세요.");
    if (selectedTripThemes.length < 3)
      return showAlert("caution", "여정 테마를 3개 선택해주세요.");
    modal.closeModal();
  };

  React.useImperativeHandle(ref, () => ({
    meetPlace,
    selectedTripThemes,
  }));

  return (
    <TripEditModalWrapper>
      <div className="mx-auto mt-2 mb-5 flex h-[10%] w-[90%] flex-col justify-start xl:mt-2 xl:w-[70%]">
        <Left2xlBoldText text="어떤 유형의 여정을 원하세요?" />
        <LeftSmGrayText text="여정 테마를 3개 선택해주세요" />
      </div>
      <div className="mx-auto h-[84%] w-[90%] xl:w-[70%]">
        <div className="mx-2 mb-10">
          <PreferTripThemesToRender />
        </div>
        <div className="mx-2 mb-10">
          <LeftXlBoldText text="어디에서 만날까요?" />
          <SelectMeetPlaceButton />
        </div>
      </div>
      <Button
        className="mx-auto my-2 h-[6%] w-[90%] xl:w-[70%]"
        onClick={handleClose}
      >
        완료
      </Button>
    </TripEditModalWrapper>
  );
});

TripEditTripTheme.displayName = "TripEditTripTheme";

export default TripEditTripTheme;
