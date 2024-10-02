import Input from '@/components/atoms/common/Input';
import Title from '@/components/atoms/common/Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import AddButtonSmall from '@/components/atoms/stories/AddButtonSmall';
import { Buddy } from '@/types/Auth.types';
import Image from 'next/image';
import React, { forwardRef } from 'react';

type OnBoardingInputProps = {
  buddy: Buddy;
  selectedMedia: string;
  setSelectedFile: (file: File | null) => void;
  mode?: 'onboarding' | 'edit';
};

const OnBoardingProfileImage = forwardRef<HTMLElement, Omit<OnBoardingInputProps, 'ref'>>(
  ({ buddy, selectedMedia, setSelectedFile, mode = 'onboarding' }, ref) => {
    const handleAddButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (ref && typeof ref === 'object' && 'current' in ref) {
        (ref.current as HTMLInputElement).click();
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setSelectedFile(file);
    };
    return (
      <OnBoardingWrapper>
        <OnBoardingInnerWrapper align="start">
          {mode === 'onboarding' && <Title align="left">프로필 이미지를 선택해주세요</Title>}

          <div className="relative rounded-full border-4 border-main-color h-[100px] w-[100px] z-10 aspect-auto">
            <Image
              src={selectedMedia || buddy?.buddy_profile_pic || '/images/mascot_happy.webp'}
              alt="profile"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-full w-[100px] h-[100px] object-contain"
            />
            <AddButtonSmall onClick={handleAddButtonClick} isBig />
          </div>

          <Input
            type="file"
            accept="image/*"
            intent={false}
            name="profile_image"
            onChange={handleFileChange}
            className="w-[90%] h-[80px] border-none bg-gray-200"
            ref={ref as React.LegacyRef<HTMLInputElement>}
          />
        </OnBoardingInnerWrapper>
      </OnBoardingWrapper>
    );
  },
);

OnBoardingProfileImage.displayName = 'OnBoardingProfileImage';

export default OnBoardingProfileImage;
