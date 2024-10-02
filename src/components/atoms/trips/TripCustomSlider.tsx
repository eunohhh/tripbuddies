import clsx from 'clsx';
import React from 'react';

type TripCustomSliderProps = {
  counts: number;
};

const TripCustomSlider: React.FC<TripCustomSliderProps> = ({ counts }) => {
  return (
    <div className="relative w-full max-w-lg h-4 flex justify-center items-center gap-2">
      <div className="relative w-full h-full flex justify-center items-center">
        <div
          className={clsx('relative h-2/3 bg-gray-600 rounded-lg rounded-r-none', {
            'w-[100%]': counts === 4,
            'w-[75%]': counts === 3,
            'w-[50%]': counts === 2,
            'w-[25%]': counts === 1,
          })}
          id="progress-bar"
        ></div>
        <div
          className={clsx('relative h-2/3 bg-gray-300 rounded-lg rounded-l-none', {
            'w-[75%]': counts === 1,
            'w-[50%]': counts === 2,
            'w-[25%]': counts === 3,
            'w-[0%]': counts === 4,
          })}
          id="remaining-bar"
        ></div>
        <div
          className={clsx('absolute top-0 h-full w-4 bg-gray-400 rounded-sm', {
            'left-[100%]': counts === 4,
            'left-[75%]': counts === 3,
            'left-[50%]': counts === 2,
            'left-[25%]': counts === 1,
          })}
          id="thumb"
        ></div>
      </div>
      <span>{`${counts}/4`}</span>
    </div>
  );
};

export default TripCustomSlider;
