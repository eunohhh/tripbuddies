'use client';

import SelectedResultRealtimeText from '@/components/organisms/write/SelectedResultRealtimeText';
import { ThirdLevel } from '@/types/Location.types';
import { usePathname } from 'next/navigation';
import React, { memo } from 'react';
import { twMerge } from 'tailwind-merge';

type ThirdLevelSectionProps = {
  selectedSecondLevelLocations: ThirdLevel[];
  // setThirdLevelLocation: (loc: string) => void;
  thirdLevelLocation?: string | null;
  secondLevelLocation: string | null;
  handleClick: (loc: string) => void;
};

//h-[80%]
const ThirdLevelSection: React.FC<ThirdLevelSectionProps> = memo(
  ({ selectedSecondLevelLocations, secondLevelLocation, handleClick, thirdLevelLocation = '' }) => {
    const pathname = usePathname();

    return (
      <>
        <section
          id="third-level-section"
          className={twMerge(
            'relative h-[74%] overflow-y-auto xl:h-[53vh] xl:grid xl:grid-cols-2 xl:content-start',
            pathname === '/search' && 'h-[300px]',
            pathname === '/write' && 'h-[39vh]',
            pathname.startsWith('/edit') && 'h-[70%] xl:h-[450px]',
            pathname.startsWith('/onboarding') && 'h-[44vh] xl:h-[44vh]',
            !secondLevelLocation && 'hidden xl:flex xl:min-h-[50vh] xl:h-[50vh]',
          )}
        >
          {selectedSecondLevelLocations.map((loc) => (
            <div
              key={loc.name}
              className={twMerge(
                'flex mx-2 border-b cursor-pointer hover:bg-main-color items-center xl:mx-0 xl:border-none xl:hover:bg-transparent',
                thirdLevelLocation === loc.name &&
                  'bg-main-color xl:bg-transparent xl:text-primary-color-400',
              )}
              onClick={() => handleClick(loc.name)}
            >
              <div
                className={twMerge(
                  'text-sm text-gray-500 xl:text-base flex items-center p-1.5 xl:hover:text-primary-color-400',
                  thirdLevelLocation === loc.name && 'xl:text-primary-color-400',
                )}
              >
                <div>
                  <p className="font-bold">{loc.name}</p>
                  <p>{secondLevelLocation}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="relative h-[6%] flex items-center justify-center xl:h-[10%] xl:pt-3">
          {thirdLevelLocation && (
            <SelectedResultRealtimeText
              selectedData={thirdLevelLocation}
              firstLabel="선택한 지역은"
              secondLabel="입니다."
              isMini={innerHeight && innerHeight < 659}
            />
          )}
        </section>
      </>
    );
  },
);

ThirdLevelSection.displayName = 'ThirdLevelSection';

export default ThirdLevelSection;
