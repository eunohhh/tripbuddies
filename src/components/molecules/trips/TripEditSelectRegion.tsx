"use client";
import React, { forwardRef } from "react";
import Button from "@/components/atoms/common/Button";
import TripEditModalWrapper from "@/components/atoms/trips/TripEditModalWrapper";
import Left2xlBoldText from "@/components/atoms/write/Left2xlText";
import LeftSmGrayText from "@/components/atoms/write/LeftSmGrayText";
import { useModal } from "@/contexts/modal.context";
import { useSelectRegion } from "@/hooks";
import { SelectRegionPageProps } from "@/types/Location.types";
import { showAlert } from "@/utils/ui/openCustomAlert";
import SelectRegions from "../common/SelectRegion";

const TripEditSelectRegion = forwardRef<Partial<SelectRegionPageProps>>(
  (props, ref) => {
    const { states, actions } = useSelectRegion();
    const modal = useModal();
    React.useImperativeHandle(ref, () => ({
      states: {
        ...states,
        thirdLevelLocation: states.thirdLevelLocation || "",
      },
    }));

    const handleClose = () => {
      if (states.secondLevelLocation === "" || states.thirdLevelLocation === "")
        return showAlert("caution", "지역을 선택해주세요.");
      modal.closeModal();
    };

    return (
      <TripEditModalWrapper>
        <div className="mx-auto mt-2 mb-5 flex h-[10%] w-[90%] flex-col justify-start xl:mt-2 xl:w-[70%]">
          <Left2xlBoldText text="여행지를 선택해주세요" />
          <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
        </div>
        <SelectRegions
          className="mx-auto h-[78%] w-[90%] xl:w-[70%]"
          states={{
            ...states,
            thirdLevelLocation: states.thirdLevelLocation || "",
          }}
          actions={actions}
        />
        <Button
          className="mx-auto my-2 h-[6%] w-[90%] xl:w-[70%]"
          onClick={handleClose}
        >
          완료
        </Button>
      </TripEditModalWrapper>
    );
  },
);

TripEditSelectRegion.displayName = "TripEditSelectRegion";

export default TripEditSelectRegion;

// const TripEditSelectRegion: React.FC = () => {
//     const modal = useModal();
//     return (
//         <TripEditModalWrapper>
//             <div className="w-[70%] h-[10%] mx-auto flex justify-start flex-col mt-2 mb-5 xl:mt-2">
//                 <Left2xlBoldText text="여행지를 선택해주세요" />
//                 <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
//             </div>
//             <SelectRegions className="w-[70%] h-[84%] mx-auto" />
//             <Button
//                 className="w-[70%] h-[6%] mx-auto my-2"
//                 onClick={modal.closeModal}
//             >
//                 완료
//             </Button>
//         </TripEditModalWrapper>
//     );
// };

// export default TripEditSelectRegion;
