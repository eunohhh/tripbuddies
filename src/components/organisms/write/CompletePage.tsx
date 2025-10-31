import MascotImage from "@/components/atoms/common/MascotImage";
import Center2xlTwoLineText from "@/components/atoms/write/Center2xlTwoLineText";

export default function CompletePage() {
  return (
    <div className="relative mt-2 h-full">
      <Center2xlTwoLineText
        className="relative h-[15%]"
        firstText="버디즈 모집 작성 글이"
        secondText="작성 완료되었어요! :)"
      />
      <div className="relative flex h-[40%] items-center justify-center">
        <div className="mx-auto flex h-[230px] w-[300px] justify-center xl:h-[400px] xl:w-[400px]">
          <MascotImage intent="main" className="h-[70%] w-[70%]" />
        </div>
      </div>
    </div>
  );
}
