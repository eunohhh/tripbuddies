import type React from "react";

type FilterProps = {
  className?: string;
};

export const Filter: React.FC<FilterProps> = ({ className }) => {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 3.33325L9 3.33325M9 3.33325C9 4.43782 9.89543 5.33325 11 5.33325C12.1046 5.33325 13 4.43782 13 3.33325C13 2.22868 12.1046 1.33325 11 1.33325C9.89543 1.33325 9 2.22868 9 3.33325ZM5 8.66659L13 8.66659M5 8.66659C5 9.77115 4.10457 10.6666 3 10.6666C1.89543 10.6666 1 9.77115 1 8.66659C1 7.56202 1.89543 6.66659 3 6.66659C4.10457 6.66659 5 7.56202 5 8.66659Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
