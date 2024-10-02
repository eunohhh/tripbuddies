'use client';

import PreferTheme from '@/components/atoms/common/PreferTheme';
import { buddyThemes, tripThemes } from '@/data/themes';
import { AllBuddyTheme, AllTripTheme, BuddyTheme, TripTheme } from '@/types/Themes.types';
import handleChipClick from '@/utils/common/handleChipClick';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';

type UsePreferThemeProps = {
  mode: 'trip' | 'buddy';
  isLabel?: boolean;
};
// setSelectedTheme를 props로 내려받고 싶어서 추가.
export const usePreferTheme = ({
  mode,
  isLabel = false,
}: UsePreferThemeProps): [
  React.FC<{
    className?: string;
    setSelectedTheme?: React.Dispatch<React.SetStateAction<string[]>>;
  }>,
  (TripTheme | BuddyTheme)[],
] => {
  const themeRef = useRef<AllTripTheme[] | AllBuddyTheme[]>(
    mode === 'trip' ? [...tripThemes] : [...buddyThemes],
  );
  const [selectedTheme, setSelectedTheme] = useState<(TripTheme | BuddyTheme)[]>([]);

  const handleThemeChange = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const mutableThemes = themeRef.current?.map((theme) => theme.ko);
    handleChipClick(target, mutableThemes, selectedTheme, setSelectedTheme);
  };

  const PreferThemeToRender = ({
    className,
    setSelectedTheme: externalSetSelectedTheme,
  }: {
    className?: string;
    setSelectedTheme?: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    useEffect(() => {
      if (externalSetSelectedTheme) {
        if (selectedTheme.length > 0) {
          externalSetSelectedTheme(selectedTheme);
        }
      }
    }, [externalSetSelectedTheme]);

    return (
      <PreferTheme
        selectedTheme={selectedTheme}
        handleThemeChange={handleThemeChange}
        themes={themeRef.current}
        label={!isLabel ? null : mode === 'trip' ? '여행 테마' : '버디즈 성향'}
        className={className}
      />
    );
  };

  return [PreferThemeToRender, selectedTheme];
};
