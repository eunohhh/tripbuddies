'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import { useAuth } from '@/hooks';
import { useStoryMutation } from '@/hooks/queries';
import { StoryData, StoryFilter, StoryOverlay } from '@/types/Story.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DraggableInput from './DraggableInput';

type StoryWriteTextProps = {
  imageFile: File;
  selectedMedia: string;
  texts: StoryOverlay[];
  setTexts: React.Dispatch<React.SetStateAction<StoryOverlay[]>>;
  selectedFilter: StoryFilter;
};

const StoryWriteText: React.FC<StoryWriteTextProps> = ({
  imageFile,
  selectedMedia,
  texts,
  setTexts,
  selectedFilter,
}) => {
  const router = useRouter();
  const { buddy } = useAuth();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { mutateAsync, isPending, error } = useStoryMutation();

  const handleSaveButtonClick = async () => {
    // console.log('save', texts);

    if (!buddy) router.push('/login');
    if (!imageFile) return;
    if (!texts.length) return;

    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('texts', JSON.stringify(texts));

    const payload: StoryData = formData;
    const data = await mutateAsync(payload);

    // console.log(data);
    showAlert('success', '스토리 생성이 완료되었습니다.', {
      onConfirm: () => {
        router.push(`/stories/${data?.story_id}`);
      },
    });
  };

  return (
    <section className="relative flex flex-col gap-4 w-full h-[calc(100dvh-57px-54px)] max-h-dvh overflow-hidden aspect-auto xl:min-w-[320px] xl:max-w-[430px] xl:mx-auto bg-gray-600">
      {isPending && <DefaultLoader />}
      {error && <div className="z-10 text-white font-bold">스토리 생성중 오류가 발생했습니다.</div>}

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 rounded-lg z-10"></div>
      <Image
        src={selectedMedia}
        alt="my-story-background"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        onLoad={() => setIsLoaded(true)}
        className={clsx(
          'object-contain',
          isLoaded ? 'opacity-100' : 'opacity-0',
          selectedFilter.className,
        )}
      />
      <DraggableInput texts={texts} setTexts={setTexts} selectedFilter={selectedFilter} />
      <button
        className="absolute bg-main-color text-white px-2 py-1 rounded-md top-0 right-0 z-10"
        onClick={handleSaveButtonClick}
      >
        업로드
      </button>
    </section>
  );
};

export default StoryWriteText;
