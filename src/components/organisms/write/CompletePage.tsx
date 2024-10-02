import MascotImage from '@/components/atoms/common/MascotImage';
import Center2xlTwoLineText from '@/components/atoms/write/Center2xlTwoLineText';

export default function CompletePage() {
  return (
    <div className="relative mt-2 h-full">
      <Center2xlTwoLineText
        className="relative h-[15%]"
        firstText="버디즈 모집 작성 글이"
        secondText="작성 완료되었어요! :)"
      />
      <div className="relative h-[40%] flex justify-center items-center">
        <div className="flex justify-center h-[230px] w-[300px] xl:h-[400px] xl:w-[400px] mx-auto">
          <MascotImage intent="main" className="w-[70%] h-[70%]" />
        </div>
      </div>
    </div>
  );
}
