import { useEffect } from "react";
import Button from "@/components/atoms/common/Button";
import TripEditModalWrapper from "@/components/atoms/trips/TripEditModalWrapper";
import Left2xlBoldText from "@/components/atoms/write/Left2xlText";
import { useModal } from "@/contexts/modal.context";
import { useTripWrite } from "@/hooks/mypage/useTripWrite";
import { TripWithContract } from "@/types/Trips.types";
import { showAlert } from "@/utils/ui/openCustomAlert";

type TripEditTextProps = {
  handleTripTitleChange: (data: {
    tripTitle: string;
    tripContent: string;
  }) => void;
  trip: TripWithContract;
};

const TripEditText = ({ handleTripTitleChange, trip }: TripEditTextProps) => {
  const { tripTitle, tripContent, handleTitleChange, handleContentChange } =
    useTripWrite({ trip });

  const modal = useModal();

  const handleClose = () => {
    if (tripTitle === "" || tripContent === "") {
      return showAlert("caution", "제목과 내용을 입력해주세요.");
    }
    modal.closeModal();
  };

  useEffect(() => {
    if (tripTitle === "" || tripContent === "") return;
    handleTripTitleChange({ tripTitle, tripContent });
  }, [tripTitle, tripContent, handleTripTitleChange]);

  return (
    <TripEditModalWrapper>
      <div className="mx-auto mt-2 mb-5 flex h-[10%] w-[90%] flex-col justify-start xl:mt-2 xl:w-[70%]">
        <Left2xlBoldText text="모집 글을 작성해봐요!" />
      </div>

      <div className="mx-auto h-[84%] w-[90%] xl:w-[70%]">
        <div>
          <label
            htmlFor="trip-title"
            className="mb-1 block font-medium text-gray-700 text-sm"
          >
            제목
          </label>
          <input
            type="text"
            value={tripTitle}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요."
            maxLength={20}
            className="w-full rounded-xl border border-[#E8E8E8] bg-[#E8E8E8] px-3 py-2"
          />
          <span className="block text-right text-gray-500 text-sm">{`${tripTitle.length}/20`}</span>
        </div>
        <div className="relative mt-0">
          <label
            htmlFor="trip-content"
            className="mb-1 block font-medium text-gray-700 text-sm"
          >
            글 내용
          </label>
          <textarea
            value={tripContent}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요."
            className="h-72 w-full resize-none rounded-xl border border-[#E8E8E8] bg-[#E8E8E8] px-3 py-2 xl:h-96"
          />
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
};

export default TripEditText;
