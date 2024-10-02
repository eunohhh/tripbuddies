import MascotImage from '@/components/atoms/common/MascotImage';
import Center2xlTwoLineText from '@/components/atoms/write/Center2xlTwoLineText';

export default function FailPage() {
  return (
    <div className="relative mt-2 h-full">
      <Center2xlTwoLineText
        className="relative h-[15%]"
        firstText="버디즈 모집 작성 글을"
        secondText="작성 실패했어요 :("
      />
      <div className="relative h-[40%] flex justify-center items-center">
        <div className="flex justify-center h-[230px] w-[300px] xl:h-[400px] xl:w-[400px] mx-auto">
          <MascotImage intent="main" className="w-[70%] h-[70%] filter grayscale" />
        </div>
      </div>
    </div>
  );
}
