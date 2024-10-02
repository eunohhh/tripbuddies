'use client';
import clsx from 'clsx';
import { FormEvent, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type OnBoardingInnerWrapperProps = PropsWithChildren<{
  align?: 'start' | 'end' | 'center';
  className?: string;
}>;

const OnBoardingInnerWrapper = ({
  children,
  className,
  align = 'center',
}: OnBoardingInnerWrapperProps) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const nextButton = document.getElementById('onboarding-next-button');
    if (nextButton) {
      nextButton.click();
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(
        clsx('flex flex-col gap-4 w-full h-[90%] items-center xl:h-[90%]', {
          'justify-start': align === 'start',
          'justify-end': align === 'end',
          'justify-center xl:justify-start': align === 'center',
        }),
        className,
      )}
    >
      {children}
    </form>
  );
};

export default OnBoardingInnerWrapper;
