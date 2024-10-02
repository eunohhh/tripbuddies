import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import ArrowRight from '../../../../public/svg/ArrowRight.svg';

type HomePageTitleProps = {
  title: string;
  buttonText: string;
  description: string;
  href: string;
  className?: string;
};

const HomePageTitle: React.FC<HomePageTitleProps> = ({
  title,
  buttonText,
  description,
  href,
  className,
}) => {
  return (
    <div className={twMerge('mb-4 mt-12', className)}>
      <div className="flex justify-between">
        <p className="text-grayscale-color-800 text-[22px] font-extrabold">{title}</p>
        <Link
          href={href}
          className="text-grayscale-color-700 text-[14px] font-medium flex justiy-end items-center"
        >
          <span>{buttonText}</span>
          <ArrowRight />
        </Link>
      </div>

      <p className="text-grayscale-color-700 text-[16px] font-medium">{description}</p>
    </div>
  );
};

export default HomePageTitle;
