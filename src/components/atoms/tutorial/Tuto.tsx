import React from 'react';
// import DefaultLoader from '../common/DefaultLoader';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type TutoProps = {
  step: number;
};

const content = [
  {
    src: '/images/tutorial_01.webp',
    alt: '첫 번째 튜토리얼 페이지에서 사용되는 이미지',
    title: <>각자의 성향대로 즐기는 여행!</>,
    description: <>트립버디즈가 나에 대해 알아가는 맞춤형 온보딩!</>,
  },
  {
    src: '/images/tutorial_02.webp',
    alt: '두 번째 튜토리얼 페이지에서 사용되는 이미지',
    title: (
      <>
        맞춤 추천으로 나에게 맞는
        <br />
        버디즈와 함께!
      </>
    ),
    description: <>평소 여행 스타일, 유형을 통한 맞춤형 추천 서비스!</>,
  },
  {
    src: '/images/tutorial_03.webp',
    alt: '세 번째 튜토리얼 페이지에서 사용되는 이미지',
    title: <>채팅을 통한 버디즈와 편리한 소통!</>,
    description: <>여정 계획, 맛집 공유 등 다양한 대화를 나눠봐요!</>,
  },
  {
    src: '/images/tutorial_04.webp',
    alt: '네 번째 튜토리얼 페이지에서 사용되는 이미지',
    title: (
      <>
        버디즈 프로필을 통해
        <br />
        수락 여부 결정!
      </>
    ),
    description: <>나와 딱 맞는 버디즈를 직접 골라 여정을 함께해요!</>,
  },
  {
    src: '/images/tutorial_05.webp',
    alt: '다섯 번째 튜토리얼 페이지에서 사용되는 이미지',
    title: (
      <>
        트립 버디즈와 함께
        <br />
        즐거운 여정을 시작해요!
      </>
    ),
  },
  // 필요한 만큼 추가
];

const Tuto: React.FC<TutoProps> = ({ step }) => {
  return (
    <div className="relative h-full bg-white pt-[8px]">
      {/* {!isImageLoaded && <DefaultLoader />} */}
      <div className="relative h-[18%] flex flex-col justify-start items-center xl:h-[23%]">
        <h1 className="text-center font-bold text-2xl md:text-3xl ">{content[step].title}</h1>
        <p className="text-center text-lg md:text-xl text-gray-600 mb-2 xl:mb-4">
          {content[step].description}
        </p>
      </div>
      <div className="relative flex justify-center items-start h-[80%] xl:h-[76%]">
        <div className="relative w-[324px] h-full aspect-auto">
          {content.map((item, idx) => (
            <Image
              key={idx}
              src={item.src}
              alt={content[step].alt}
              fill
              priority
              sizes="(max-width: 768px) 100%, (max-width: 1200px) 30%, 33%"
              className={twMerge(
                'object-contain min-h-[324px] max-h-[426] w-[100%] hidden',
                step === idx ? 'block' : '',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tuto;
