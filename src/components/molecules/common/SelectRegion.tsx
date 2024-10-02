import LocationList from '@/components/atoms/write/LocationList';
import LocationToggleButton from '@/components/atoms/write/LocationToggleButton';
import { SecondLevel, ThirdLevel } from '@/types/Location.types';
import React, { forwardRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ThirdLevelSection from '../onboarding/ThirdLevelSection';

type SelectRegionProps = {
  actions: {
    handleLocationTypeClick: (isKoreaSelected: boolean) => void;
    handleChipClick: (name: string) => void;
    handleThirdLevelClick: (locName: string) => void;
  };
  states: {
    firstLevelLocation: string;
    secondLevelLocation: string | null;
    selectedSecondLevelLocations: ThirdLevel[];
    thirdLevelLocation: string | null;
    secondLevelLocations: SecondLevel[];
  };
  className?: string;
} & React.RefAttributes<HTMLElement>;

const SelectRegions = forwardRef<HTMLElement, SelectRegionProps>(
  (
    {
      actions: { handleLocationTypeClick, handleChipClick, handleThirdLevelClick },
      states: {
        firstLevelLocation,
        secondLevelLocation,
        thirdLevelLocation,
        selectedSecondLevelLocations,
        secondLevelLocations,
      },
      className,
    },
    ref,
  ) => {
    const [innerHeight, setInnerHeight] = useState<number | null>(null);

    useEffect(() => {
      setInnerHeight(window.innerHeight);
    }, []);

    return (
      <div className={twMerge('relative', className)}>
        {/* 국내/해외 스위치 버튼 */}
        <section className="relative h-[10%] xl:pb-6">
          <LocationToggleButton
            firstLabel="국내"
            secondLabel="해외"
            isKoreaSelected={firstLevelLocation === '한국'}
            onKoreaClick={() => handleLocationTypeClick(true)}
            onGlobalClick={() => handleLocationTypeClick(false)}
          />
        </section>

        {/* 도시/대륙 선택 */}
        <section
          className={twMerge(
            'overflow-x-scroll scrollbar-hidden flex gap-[10px] xl:h-[10%] xl:pb-6 items-center',
            innerHeight && innerHeight < 659 && 'h-[42px]',
          )}
          ref={ref}
        >
          <LocationList
            locations={secondLevelLocations}
            selectedLocationName={secondLevelLocation || ''}
            onChipClick={handleChipClick}
            isMini={innerHeight && innerHeight < 659}
          />
        </section>

        {/* 선택한 지역 렌더링 */}
        {/* Todo: vh말고 px이 안 먹힘 - 퍼센트로 해결 추후 수정요망 */}
        <ThirdLevelSection
          selectedSecondLevelLocations={selectedSecondLevelLocations}
          handleClick={handleThirdLevelClick}
          secondLevelLocation={secondLevelLocation}
          thirdLevelLocation={thirdLevelLocation}
        />
      </div>
    );
  },
);

SelectRegions.displayName = 'SelectRegion';
export default SelectRegions;
