'use client';

import Input from '@/components/atoms/common/Input';
import isMobile from '@/utils/common/isMobile';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect, useRef, useState } from 'react';

type StorySelectMediaProps = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StorySelectMedia: React.FC<StorySelectMediaProps> = ({ handleFileChange }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      if (isMobile()) {
        setText('업로드/촬영하기');
      } else {
        setText('업로드');
      }
    };

    let debounceTimer: NodeJS.Timeout;

    const debouncedHandleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleResize();
        router.refresh();
      }, 200); // 200ms 후에 마지막 resize 이벤트가 발생한 경우에만 새로고침
    };

    handleResize(); // 초기 렌더링 시 크기 확인
    window.addEventListener('resize', debouncedHandleResize); // 창 크기 변경 시 handleResize 호출

    return () => {
      window.removeEventListener('resize', debouncedHandleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [router]);

  return (
    <section className="relative flex flex-col gap-4 w-full h-[calc(100dvh-57px-54px)] max-h-dvh overflow-hidden aspect-auto">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 z-10"></div>

      <form
        className="z-10 w-full flex justify-center items-center h-full top-0 left-0"
        ref={formRef}
      >
        <Input
          type="file"
          accept="image/*"
          intent={false}
          ref={inputRef}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="text-sm text-white bg-main-color px-4 py-2 rounded-lg relative font-bold"
          onClick={handleButtonClick}
        >
          {text}
        </button>
      </form>
    </section>
  );
};

export default StorySelectMedia;
