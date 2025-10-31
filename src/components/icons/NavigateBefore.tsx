import type React from "react";

type NavigateBeforeProps = {
  className?: string;
};

export const NavigateBefore: React.FC<NavigateBeforeProps> = ({
  className,
}) => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 13L1 7L7 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
