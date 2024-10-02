'use client';

import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type WriteTripProps = {
  tripTitle: string;
  tripContent: string;
  tripImage: string;
  tripImageFile: File | null;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const WriteTrip: React.FC<WriteTripProps> = ({
  tripTitle,
  tripContent,
  tripImage,
  tripImageFile,
  handleTitleChange,
  handleContentChange,
  handleImageChange,
}) => {
  const isMini = window.innerHeight < 659;
  return (
    <div className="relative px-2 flex flex-col xl:flex-row">
      <div className="mb-5 w-full xl:w-[40%] pb-2">
        <Left2xlBoldText text="모집 글을 작성해봐요!" />
        <p className="hidden xl:block text-gray-500 text-sm whitespace-pre-wrap">
          내용이 구체적일 수록 원하는 버디즈와 <br />
          매칭될 확률이 높아져요
        </p>
      </div>

      <form className="relative w-full xl:w-[60%]">
        <div className="flex items-center">
          <label className="block mb-1 text-sm font-medium text-gray-700 mr-2">대표 이미지</label>
          <label className="flex items-center justify-center w-20 h-20 bg-gray-200 border border-gray-300 rounded mr-2 cursor-pointer">
            <Image src="/svg/Gallery.svg" alt="Gallery Icon" width={32} height={32} />
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
          {tripImage && (
            <Image
              src={tripImage}
              width={100}
              height={100}
              alt="tripImage"
              className="w-20 h-20 object-cover rounded-lg"
            />
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            value={tripTitle}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요."
            maxLength={20}
            className="w-full px-3 py-2 bg-[#E8E8E8] border border-[#E8E8E8] rounded-xl"
          />
          <span className="block text-right text-sm text-gray-500">{`${tripTitle.length}/20`}</span>
        </div>
        <div className="relative mt-0">
          <label className="block mb-1 text-sm font-medium text-gray-700">글 내용</label>
          <textarea
            value={tripContent}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요."
            className={twMerge(
              'w-full h-72 px-3 py-2 bg-[#E8E8E8] border border-[#E8E8E8] rounded-xl resize-none xl:h-96',
              isMini && 'h-44',
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default WriteTrip;
