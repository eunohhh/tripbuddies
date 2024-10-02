'use client';

import MascotImage from '@/components/atoms/common/MascotImage';
import Paragraph from '@/components/atoms/common/Paragraph';
import Title from '@/components/atoms/common/Title';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import React, { useRef } from 'react';

type OnBoardingDividerProps = {
  mode: 'welcome' | 'middle' | 'end';
  name: string;
};

const OnBoardingDivider: React.FC<OnBoardingDividerProps> = ({ mode, name }) => {
  const titleRef = useRef<string>(
    mode === 'welcome'
      ? `${name}님\n 반가워요!`
      : mode === 'middle'
        ? `거의 다 왔어요!`
        : '테스트 완료!',
  );

  const paragraphRef = useRef<string>(
    mode === 'welcome'
      ? `간단한 테스트로 ${name}님에게\n딱 맞는 여정을 추천해드릴게요.`
      : mode === 'middle'
        ? `${name}님과 딱 맞는 여정을 찾고 있어요.`
        : '이제 트립버디즈와 함께\n즐거운 여행을 시작해 볼까요?',
  );

  const imgIntentRef = useRef<'main' | 'blue' | 'happy'>(
    mode === 'welcome' ? 'main' : mode === 'middle' ? 'blue' : 'happy',
  );

  return (
    <OnBoardingWrapper>
      <Title className="text-xl">{titleRef.current}</Title>
      <Paragraph className="text-center">{paragraphRef.current}</Paragraph>
      <MascotImage intent={imgIntentRef.current} />
    </OnBoardingWrapper>
  );
};

export default OnBoardingDivider;
