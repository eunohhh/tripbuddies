'use client';

import { type Gender } from '@/types/Gender.types';
import { type SecondLevelNames } from '@/types/Location.types';
import { type MBTI } from '@/types/Mbtis.types';
import { type MeetingPlace } from '@/types/MeetingPlace.types';
import { type BuddyTheme, type TripTheme } from '@/types/Themes.types';
import { tailwindMerge } from '@/utils/ui/tailwind_merge';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const chipVariants = cva(
  [
    'text-[12px]',
    'text-center',
    'border',
    'rounded-full',
    'px-2.5',
    'py-2.5',
    'transition-opacity',
    'whitespace-nowrap',
    'cursor-pointer',
    // 'leading-none',
  ],
  {
    variants: {
      intent: {
        natural: 'bg-gray-400 border-gray-400 text-gray-500',
        square: 'rounded-md px-1 py-[1px] text-[12px]',
        square_white: 'rounded-md px-1 py-[1px] text-[12px]',
        rounded: 'px-[6px] py-[1px] rounded-xl',
        rounded_blue: 'px-[6px] py-[1px] rounded-xl',
        rounded_yellow: 'px-[6px] py-[1px] rounded-xl',
        onBoarding: 'bg-gray-200 text-gray-500 border-gray-200 py-1 xl:py-2.5',
      },
      variant: {
        selected: 'bg-main-color border-main-color',
        unselected: 'bg-gray-400 border-gray-400',
      },
    },
    defaultVariants: {
      intent: 'natural',
      variant: 'unselected',
    },
    compoundVariants: [
      {
        intent: 'natural',
        variant: 'selected',
        className: 'bg-main-color text-white opacity-100 cursor-pointer',
      },
      {
        intent: 'natural',
        variant: 'unselected',
        className: 'bg-gray-200 text-gray-500 border-gray-200 opacity-100 cursor-pointer',
      },
      {
        intent: 'square',
        variant: 'unselected',
        className: 'text-white opacity-100 bg-gray-500 border-gray-500 cursor-auto',
      },
      {
        intent: 'square_white',
        variant: 'unselected',
        className: 'text-gray-500 opacity-100 bg-white border-gray-500 cursor-auto',
      },
      {
        intent: 'rounded',
        variant: 'unselected',
        className: 'text-[#516FE6] opacity-100 bg-white border-[#516FE6] cursor-auto',
      },
      {
        intent: 'rounded_yellow',
        variant: 'unselected',
        className:
          'text-primary-color-400 opacity-100 bg-white border-primary-color-400 cursor-auto',
      },
      {
        intent: 'rounded_blue',
        variant: 'unselected',
        className: 'text-white opacity-100 bg-[#516FE6] border-[#516FE6] cursor-auto',
      },
      {
        intent: 'onBoarding',
        variant: 'unselected',
        className: 'text-gray-500 bg-gray-200 border-gray-200 cursor-pointer',
      },
      {
        intent: 'onBoarding',
        variant: 'selected',
        className: 'text-white bg-main-color border-main-color cursor-pointer',
      },
    ],
  },
);

type ChipVariantsType = VariantProps<typeof chipVariants>;

type ChipProps = {
  children: SecondLevelNames | MBTI | TripTheme | BuddyTheme | Gender | MeetingPlace | string;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
} & ChipVariantsType &
  React.ComponentProps<'span'>;

function Chip({
  children,
  intent = 'natural',
  selected = false,
  onClick = () => {},
  className,
  ...props
}: ChipProps) {
  return (
    <span
      className={tailwindMerge(
        chipVariants({
          intent,
          variant: selected ? 'selected' : 'unselected',
        }),
        className,
      )}
      {...props}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

export default Chip;

// 'Seoul/Gyeonggi': 'bg-gray-500 border-gray-500 text-white',
// Gyeongsangnamdo: 'bg-red-5000 border-red-500 text-white',
// Gyeongsangbukdo: 'bg-yellow-500 border-yellow-500 text-white',
// Chungcheongnamdo: 'bg-violet-500 border-violet-500 text-white',
// Chungcheongbukdo: 'bg-red-400 border-red-400 text-white',
// Jeonlamdo: 'bg-yellow-400 border-yellow-400 text-white',
// Jeonrabukdo: 'bg-blue-400 border-blue-400 text-white',
// Gangwondo: 'bg-green-400 border-green-400 text-white',
// Jejudo: 'bg-purple-400 border-purple-400 text-white',

// Asia: 'bg-slate-500 border-slate-500 text-white',
// Europe: 'bg-fuchsia-500 border-fuchsia-500 text-white',
// Africa: 'bg-amber-500 border-amber-500 text-white',
// America: 'bg-lime-500 border-lime-500 text-white',
// Oceania: 'bg-sky-500 border-sky-500 text-white',

// plan: 'bg-slate-500 border-slate-500 text-white',
// improvise: 'bg-fuchsia-500 border-fuchsia-500 text-white',
// fast: 'bg-red-500 border-red-500 text-white',
// slow: 'bg-lime-500 border-lime-500 text-white',
// photo: 'bg-white border-black text-black',
// review: 'bg-black border-black text-white',
// clean: 'bg-pink-400 border-pink-400 text-white',
// natural: 'bg-green-600 border-green-600 text-white',
// 'cost-effective': 'bg-blue-600 border-blue-600 text-white',
// satisfaction: 'bg-amber-400 border-amber-400 text-white',

// city: 'bg-red-400 border-red-400 text-white',
// nature: 'bg-green-400 border-green-400 text-white',
// 'famous-food': 'bg-blue-500 border-blue-500 text-white',
// 'local-food': 'bg-fuchsia-500 border-fuchsia-500 text-white',
// healing: 'bg-lime-400 border-lime-400 text-white',
// activity: 'bg-orange-400 border-orange-400 text-white',
// shopping: 'bg-purple-400 border-purple-400 text-white',
// tour: 'bg-white border-black text-black',

// INTJ: 'bg-violet-700 border-violet-700 text-white',
// INTP: 'bg-violet-600 border-violet-600 text-white',
// ENTJ: 'bg-fuchsia-500 border-fuchsia-500 text-white',
// ENTP: 'bg-fuchsia-400 border-fuchsia-400 text-white',
// INFJ: 'bg-lime-500 border-lime-500 text-white',
// INFP: 'bg-lime-400 border-lime-400 text-white',
// ENFJ: 'bg-green-500 border-green-500 text-white',
// ENFP: 'bg-green-400 border-green-400 text-white',
// ISTJ: 'bg-sky-500 border-sky-500 text-white',
// ISFJ: 'bg-sky-400 border-sky-400 text-white',
// ESTJ: 'bg-blue-500 border-blue-500 text-white',
// ESFJ: 'bg-blue-400 border-blue-400 text-white',
// ISTP: 'bg-orange-500 border-orange-500 text-white',
// ISFP: 'bg-orange-400 border-orange-400 text-white',
// ESTP: 'bg-amber-500 border-amber-500 text-white',
// ESFP: 'bg-amber-400 border-amber-400 text-white',

// 남자만: 'bg-gray-400 border-gray-400 text-white',
// 여자만: 'bg-gray-400 border-gray-400 text-white',
// 상관없음: 'bg-gray-400 border-gray-400 text-white',

// 출발지: 'bg-indigo-500 border-indigo-500 text-white',
// 여행지: 'bg-teal-500 border-teal-500 text-white',
