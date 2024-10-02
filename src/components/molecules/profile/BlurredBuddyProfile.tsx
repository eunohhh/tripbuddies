'use client';

import { useRouter } from 'next/navigation';

function BlurredBuddyProfile() {
  const router = useRouter();
  const moveToLogin = () => {
    router.push('/login');
  };
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <p className="text-lg font-semibold text-white mb-4 bg-black bg-opacity-50 rounded-lg p-2">
        로그인을 해야 버디 정보를 볼 수 있습니다.
      </p>
      <button className="text-white bg-main-color px-4 py-2 rounded-full" onClick={moveToLogin}>
        로그인 하러 가기
      </button>
    </div>
  );
}

export default BlurredBuddyProfile;
