import Button from '@/components/atoms/common/Button';
import TripEditModalWrapper from '@/components/atoms/trips/TripEditModalWrapper';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import { useModal } from '@/contexts/modal.context';
import { useTripWrite } from '@/hooks/mypage/useTripWrite';
import { TripWithContract } from '@/types/Trips.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useEffect } from 'react';

type TripEditTextProps = {
  handleTripTitleChange: (data: { tripTitle: string; tripContent: string }) => void;
  trip: TripWithContract;
};

const TripEditText = ({ handleTripTitleChange, trip }: TripEditTextProps) => {
  const { tripTitle, tripContent, handleTitleChange, handleContentChange } = useTripWrite({ trip });

  const modal = useModal();

  const handleClose = () => {
    if (tripTitle === '' || tripContent === '') {
      return showAlert('caution', '제목과 내용을 입력해주세요.');
    }
    modal.closeModal();
  };

  useEffect(() => {
    if (tripTitle === '' || tripContent === '') return;
    handleTripTitleChange({ tripTitle, tripContent });
  }, [tripTitle, tripContent, handleTripTitleChange]);

  return (
    <TripEditModalWrapper>
      <div className="xl:w-[70%] w-[90%] h-[10%] mx-auto flex justify-start flex-col mt-2 mb-5 xl:mt-2">
        <Left2xlBoldText text="모집 글을 작성해봐요!" />
      </div>

      <div className="xl:w-[70%] w-[90%] h-[84%] mx-auto">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            value={tripTitle}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요."
            maxLength={20}
            className="w-full px-3 py-2 bg-[#E8E8E8] border border-[#E8E8E8] rounded-xl"
          />
          <span className="block text-right text-sm text-gray-500">{`${tripTitle.length}/20`}</span>
        </div>
        <div className="relative mt-0">
          <label className="block mb-1 text-sm font-medium text-gray-700">글 내용</label>
          <textarea
            value={tripContent}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요."
            className="w-full h-72 px-3 py-2 bg-[#E8E8E8] border border-[#E8E8E8] rounded-xl resize-none xl:h-96"
          />
        </div>
      </div>

      <Button className="xl:w-[70%] w-[90%] h-[6%] mx-auto my-2" onClick={handleClose}>
        완료
      </Button>
    </TripEditModalWrapper>
  );
};

export default TripEditText;
