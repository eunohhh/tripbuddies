"use client";
import clsx from "clsx";
import { FormEvent, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type OnBoardingInnerWrapperProps = PropsWithChildren<{
  align?: "start" | "end" | "center";
  className?: string;
}>;

const OnBoardingInnerWrapper = ({
  children,
  className,
  align = "center",
}: OnBoardingInnerWrapperProps) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const nextButton = document.getElementById("onboarding-next-button");
    if (nextButton) {
      nextButton.click();
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(
        clsx("flex h-[90%] w-full flex-col items-center gap-4 xl:h-[90%]", {
          "justify-start": align === "start",
          "justify-end": align === "end",
          "justify-center xl:justify-start": align === "center",
        }),
        className,
      )}
    >
      {children}
    </form>
  );
};

export default OnBoardingInnerWrapper;
