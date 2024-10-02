'use client';

import { QUERY_KEY_STORIES } from '@/constants/query.constants';
import { useAuth } from '@/hooks';
import { useStoryLikesMutation } from '@/hooks/queries';
import { StoryLikes } from '@/types/Story.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

type LikesButtonProps = {
  storyId: string;
  likesCount: number;
  mode?: 'card' | 'detail';
  likes: StoryLikes[];
};

const LikesButton: React.FC<LikesButtonProps> = ({
  storyId,
  likesCount,
  mode = 'detail',
  likes,
}) => {
  const { buddy } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: likesMutate, isPending: isPosting } = useStoryLikesMutation(storyId);

  // const { data: likes, isPending: isLikesPending } = useStoryLikesQuery({
  //     id: storyId,
  // });

  const [isLiked, setIsLiked] = useState<boolean>(
    likes?.find((like) => like.storylikes_buddy_id === buddy?.buddy_id) ? true : false,
  );

  const isOptimisticUpdate = useMemo(
    () => (likes?.find((like) => like.storylikes_buddy_id === buddy?.buddy_id) ? true : false),
    [likes, buddy],
  );

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    // const isLikedDataSet = e.currentTarget.dataset.isliked;
    if (!buddy) {
      showAlert('caution', '로그인이 필요합니다.', {
        onConfirm: () => router.push('/login'),
      });
    } else {
      // setLikesCount(prev =>
      //     isLikedDataSet === 'liked' ? prev - 1 : prev + 1,
      // );
    }

    if (isLiked && buddy) {
      likesMutate({
        buddy_id: buddy.buddy_id,
        isLiked: true,
        story_id: storyId,
      });
    } else if (buddy) {
      likesMutate({
        buddy_id: buddy.buddy_id,
        isLiked: false,
        story_id: storyId,
      });
    }
  };

  useEffect(() => {
    if (likes && buddy) {
      const isLiked = likes.find((like) => like.storylikes_buddy_id === buddy.buddy_id);
      setIsLiked(isLiked ? true : false);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STORIES],
      });
      // setLikesCount(likes.length);
    }
  }, [likes, buddy, queryClient]);

  // useEffect(() => {
  //     if (isSuccess) console.log('isSuccess');
  // }, [isSuccess]);

  // if (isLikesPending) return null;

  return (
    <div
      className={twMerge(
        'flex flex-row items-center gap-1',
        mode === 'card' ? 'text-xs' : 'text-md',
      )}
    >
      {isOptimisticUpdate ? (
        <FaHeart data-isliked="liked" className="cursor-pointer fill-white" onClick={handleClick} />
      ) : (
        <FaRegHeart
          data-isliked="unliked"
          className="cursor-pointer fill-white"
          onClick={handleClick}
        />
      )}
      <span className="text-white">{likesCount.toLocaleString()}</span>
    </div>
  );
};

export default LikesButton;
