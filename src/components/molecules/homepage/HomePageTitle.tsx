import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import ArrowRight from "../../../../public/svg/ArrowRight.svg";

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
    <div className={twMerge("mt-12 mb-4", className)}>
      <div className="flex justify-between">
        <p className="font-extrabold text-[22px] text-grayscale-color-800">
          {title}
        </p>
        <Link
          href={href}
          className="justiy-end flex items-center font-medium text-[14px] text-grayscale-color-700"
        >
          <span>{buttonText}</span>
          <ArrowRight />
        </Link>
      </div>

      <p className="font-medium text-[16px] text-grayscale-color-700">
        {description}
      </p>
    </div>
  );
};

export default HomePageTitle;
