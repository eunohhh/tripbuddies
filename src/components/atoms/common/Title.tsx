import clsx from 'clsx';
import React from 'react';

type TitleProps = {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
};

const Title: React.FC<TitleProps> = ({ children, className, align = 'center' }) => {
  return (
    <div
      className={clsx(
        'flex flex-col w-[90%] py-1 px-3 relative h-[10%] items-center justify-center',
        {
          'items-start': align === 'left',
          'items-end': align === 'right',
          'items-center': align === 'center',
        },
      )}
    >
      <h2 className={clsx('text-black font-bold whitespace-pre-wrap text-center', className)}>
        {children}
      </h2>
    </div>
  );
};

export default Title;
