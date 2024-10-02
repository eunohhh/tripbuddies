import { PropsWithChildren } from 'react';

const OnBoardingWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      id="onboarding-wrapper"
      className="flex flex-col items-center justify-center w-full h-full"
    >
      {children}
    </div>
  );
};

export default OnBoardingWrapper;
