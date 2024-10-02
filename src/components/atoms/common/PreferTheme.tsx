import { type AllBuddyTheme, type AllTripTheme } from '@/types/Themes.types';
import { MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import Chip from './Chip';

type PreferThemeProps = {
  selectedTheme: string[];
  handleThemeChange: (e: MouseEvent<HTMLSpanElement>) => void;
  themes: (AllTripTheme | AllBuddyTheme)[];
  label?: string | null;
  indicate?: boolean;
  className?: string;
};

const PreferTheme = ({
  selectedTheme,
  handleThemeChange,
  themes,
  label = '',
  indicate = false,
  className,
}: PreferThemeProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        {label && <label className="w-full">{label}</label>}
        {indicate && (
          <span
            className={twMerge('text-sm w-full text-gray-500', label ? 'text-right' : 'text-left')}
          >
            3가지를 선택해주세요
          </span>
        )}
      </div>

      <section className="gap-2 grid grid-cols-4">
        {themes.map((theme) => (
          <Chip
            key={theme.en}
            selected={selectedTheme.includes(theme.ko)}
            onClick={handleThemeChange}
            intent="onBoarding"
            className={className}
          >
            {theme.ko}
          </Chip>
        ))}
      </section>
    </>
  );
};

export default PreferTheme;

// <section className="flex-wrap gap-2 grid grid-cols-3">
