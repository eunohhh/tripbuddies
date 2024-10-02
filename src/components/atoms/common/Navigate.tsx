'use client';

import { twMerge } from 'tailwind-merge';
import NavigateBefore from '../../../../public/svg/navigate_before.svg';
import NavigateNext from '../../../../public/svg/navigate_next.svg';

type NavigateProps = {
  mode: 'before' | 'after';
  onClick: () => void;
  className?: string;
};

const Navigate: React.FC<NavigateProps> = ({ mode, onClick, className }) => {
  return (
    <div
      className={twMerge(
        'absolute flex items-center justify-center w-9 h-9 text-black hover:text-primary-color-400 z-[99]',
        mode === 'before'
          ? '-left-[15px] top-[60%] -translate-y-[50%]'
          : '-right-[15px] top-[60%] -translate-y-[50%]',
        className,
      )}
    >
      <button
        className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-md"
        onClick={onClick}
      >
        {mode === 'before' ? <NavigateBefore /> : <NavigateNext />}
      </button>
    </div>
  );
};

export default Navigate;
