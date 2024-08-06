'use client';

import React, { useState } from 'react';
import DraggableInput from './DraggableInput';
import Image from 'next/image';
import useLockBodyScroll from '@/hooks/common/useLockBodyScroll';
import clsx from 'clsx';
import useStoryMutation from '@/hooks/queries/useStoryMutation';
import { StoryData } from '@/types/Story.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';

type StoryWriteTextProps = {
    imageFile: File;
    selectedMedia: string;
};

const StoryWriteText: React.FC<StoryWriteTextProps> = ({
    imageFile,
    selectedMedia,
}) => {
    const router = useRouter();
    const { buddy } = useAuth();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [texts, setTexts] = useState<
        { text: string; position: { x: number; y: number } }[]
    >([]);
    const { isLocked } = useLockBodyScroll(true);

    const { mutateAsync, isPending, error } = useStoryMutation();

    const handleSaveButtonClick = async () => {
        console.log('save');

        if (!buddy) router.push('/login');
        if (!imageFile) return;
        if (!texts.length) return;

        const formData = new FormData();
        formData.append('imageFile', imageFile);
        formData.append('texts', JSON.stringify(texts));

        const payload: StoryData = formData;
        const data = await mutateAsync(payload);

        console.log(data);
        showAlert('success', '스토리 생성이 완료되었습니다.', {
            onConfirm: () => {
                router.push(
                    `/stories/${buddy?.buddy_nickname}?id=${data?.story_id}`,
                );
            },
        });
    };

    // 이미지 스토리지에 쓰기
    // 데이터 테이블에 쓰기
    // 스토리 생성 완료 후 리다이렉트

    return (
        <section
            className={clsx(
                'relative flex flex-col gap-4 w-full h-dvh max-h-dvh overflow-hidden aspect-auto bg-gray-600',
                !isLocked && 'hidden',
            )}
        >
            {isPending && (
                <div className="z-10 text-white font-bold">
                    스토리 생성중...
                </div>
            )}
            {error && (
                <div className="z-10 text-white font-bold">
                    스토리 생성중 오류가 발생했습니다.
                </div>
            )}

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
                )}
            />
            <DraggableInput texts={texts} setTexts={setTexts} />
            <button
                className="absolute bg-main-color text-white px-2 pt-0.5 pb-1.5 rounded-md top-0 right-0 z-10 leading-none"
                onClick={handleSaveButtonClick}
            >
                save
            </button>
        </section>
    );
};

export default StoryWriteText;
