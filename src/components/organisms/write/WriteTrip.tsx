"use client";

import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import Left2xlBoldText from "@/components/atoms/write/Left2xlText";

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
    <div className="relative flex flex-col px-2 xl:flex-row">
      <div className="mb-5 w-full pb-2 xl:w-[40%]">
        <Left2xlBoldText text="모집 글을 작성해봐요!" />
        <p className="hidden whitespace-pre-wrap text-gray-500 text-sm xl:block">
          내용이 구체적일 수록 원하는 버디즈와 <br />
          매칭될 확률이 높아져요
        </p>
      </div>

      <form className="relative w-full xl:w-[60%]">
        <div className="flex items-center">
          <label
            htmlFor="tripImage"
            className="mr-2 mb-1 block font-medium text-gray-700 text-sm"
          >
            대표 이미지
          </label>
          <label className="mr-2 flex h-20 w-20 cursor-pointer items-center justify-center rounded border border-gray-300 bg-gray-200">
            <Image
              src="/svg/Gallery.svg"
              alt="Gallery Icon"
              width={32}
              height={32}
            />
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {tripImage && (
            <Image
              src={tripImage}
              width={100}
              height={100}
              alt="tripImage"
              className="h-20 w-20 rounded-lg object-cover"
            />
          )}
        </div>
        <div>
          <label
            htmlFor="tripTitle"
            className="mb-1 block font-medium text-gray-700 text-sm"
          >
            제목
          </label>
          <input
            type="text"
            value={tripTitle}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요."
            maxLength={20}
            className="w-full rounded-xl border border-[#E8E8E8] bg-[#E8E8E8] px-3 py-2"
          />
          <span className="block text-right text-gray-500 text-sm">{`${tripTitle.length}/20`}</span>
        </div>
        <div className="relative mt-0">
          <label
            htmlFor="tripContent"
            className="mb-1 block font-medium text-gray-700 text-sm"
          >
            글 내용
          </label>
          <textarea
            value={tripContent}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요."
            className={twMerge(
              "h-72 w-full resize-none rounded-xl border border-[#E8E8E8] bg-[#E8E8E8] px-3 py-2 xl:h-96",
              isMini && "h-44",
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default WriteTrip;
