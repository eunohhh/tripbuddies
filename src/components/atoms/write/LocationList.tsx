import { SecondLevel } from '@/types/Location.types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Chip from '../common/Chip';

function LocationList({
  locations,
  selectedLocationName,
  onChipClick,
  isMini,
}: {
  locations: SecondLevel[];
  selectedLocationName: string;
  onChipClick: (name: string) => void;
  isMini?: boolean | null | 0;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 가로 스크롤이 생기는지  확인하는 로직
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        setIsScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [locations]);

  useEffect(() => {
    if (scrollRef.current) {
      const selectedButton = scrollRef.current.children[selectedIndex] as HTMLElement;
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [selectedIndex]);

  return (
    <>
      {/* 도/대륙 목록 */}
      <div
        className={twMerge(
          'flex flex-nowrap gap-2 py-3 whitespace-nowrap overflow-x-hidden scrollbar-hide',
          isMini && 'py-2',
        )}
        ref={scrollRef}
      >
        {locations.map((subLocation, index) => (
          <div key={subLocation.name.en} className="flex-none">
            <Chip
              selected={selectedLocationName === subLocation.name.ko}
              onClick={() => {
                onChipClick(subLocation.name.ko);
                setSelectedIndex(index);
              }}
              className={clsx('text-sm', isMini && 'text-xs')}
            >
              {subLocation.name.ko}
            </Chip>
          </div>
        ))}
      </div>

      {/* 스크롤 버튼 */}
      {/* {isScrollable && (
                <div className="flex justify-between">
                    <button
                        className="left-2 z-10"
                        onClick={() => {
                            scrollRef.current?.scrollBy({
                                left: -100,
                                behavior: 'smooth',
                            }); // 왼쪽으로 스크롤
                        }}
                    >
                        {'<'}
                    </button>
                    <button
                        className="right-2 z-10"
                        onClick={() => {
                            scrollRef.current?.scrollBy({
                                left: 100,
                                behavior: 'smooth',
                            }); // 오른쪽으로 스크롤
                        }}
                    >
                        {'>'}
                    </button>
                </div>
            )} */}
    </>
  );
}

export default LocationList;
