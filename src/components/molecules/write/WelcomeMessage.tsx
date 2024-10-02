import { useAuth } from '@/hooks';

export default function WelcomeMessage() {
  const { buddy } = useAuth();
  return (
    <div className="flex flex-col items-center h-[20%]">
      <div className="flex my-4 text-2xl xl:text-4xl xl:mt-3 xl:mb-5">
        버디즈 모집을 시작해볼까요?
      </div>
      <div className="flex flex-col items-center text-gray-600 xl:text-lg xl:mb-10">
        <p>{buddy?.buddy_nickname}님과 딱 맞는</p>
        <p>버디즈와 추억을 만들어보세요!</p>
      </div>
    </div>
  );
}
