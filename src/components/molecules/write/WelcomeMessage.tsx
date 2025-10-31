import { useAuth } from "@/hooks";

export default function WelcomeMessage() {
  const { buddy } = useAuth();
  return (
    <div className="flex h-[20%] flex-col items-center">
      <div className="my-4 flex text-2xl xl:mt-3 xl:mb-5 xl:text-4xl">
        버디즈 모집을 시작해볼까요?
      </div>
      <div className="flex flex-col items-center text-gray-600 xl:mb-10 xl:text-lg">
        <p>{buddy?.buddy_nickname}님과 딱 맞는</p>
        <p>버디즈와 추억을 만들어보세요!</p>
      </div>
    </div>
  );
}
