'use client';

import { showAlert } from '@/utils/ui/openCustomAlert';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function FollowHeartButton({
  followingId,
  followerId,
  onClick,
}: {
  followingId: string;
  followerId: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const pathname = usePathname();
  const [hasRank, setHasRank] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isOwnCard, setIsOwnCard] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // URL 경로에서 rank가 있는지 확인
    setHasRank(pathname.includes('rank'));
  }, [pathname]);

  useEffect(() => {
    if (hasRank) {
      // 기존 팔로우 여부 검사
      const checkFollowStatus: () => Promise<void> = async () => {
        const res = await fetch(
          `/api/buddyProfile/follow?followingId=${followingId}&followerId=${followerId}`,
        );
        const data = await res.json();
        setIsFollowing(data.originFollow?.length > 0);
      };
      const checkOwnCard: () => void = () => {
        if (followingId === followerId) {
          setIsOwnCard(true);
        }
      };

      checkFollowStatus();
      checkOwnCard();
    }
  }, [followingId, followerId, hasRank]);

  const handleFollowToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e);

    setIsButtonDisabled(true);
    setClickCount((prev) => prev + 1);
    if (clickTimeout) clearTimeout(clickTimeout);
    setClickTimeout(setTimeout(() => setClickCount(0), 5000));
    if (clickCount >= 4) {
      showAlert('caution', '너무 많이 클릭했습니다! 잠시 후 다시 시도해주세요.');
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 10000);
      setClickCount(0);
    }

    if (isFollowing) {
      await fetch(`/api/buddyProfile/follow?followingId=${followingId}&followerId=${followerId}`, {
        method: 'DELETE',
      });
    } else {
      await fetch(`/api/buddyProfile/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          followingId,
          followerId,
        }),
      });
    }

    setIsFollowing(!isFollowing);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };

  return (
    <>
      {hasRank && !isOwnCard && (
        <button
          className="absolute top-0 right-0 text-xl mr-2 mt-1"
          onClick={handleFollowToggle}
          disabled={isButtonDisabled}
        >
          <span className={isFollowing ? 'text-main-color' : ''}>{isFollowing ? '♥' : '♡'}</span>
        </button>
      )}
    </>
  );
}

export default FollowHeartButton;
