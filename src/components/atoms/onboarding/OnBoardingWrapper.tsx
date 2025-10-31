import { PropsWithChildren } from "react";

const OnBoardingWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      id="onboarding-wrapper"
      className="flex h-full w-full flex-col items-center justify-center"
    >
      {children}
    </div>
  );
};

export default OnBoardingWrapper;
