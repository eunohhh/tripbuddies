import type React from "react";

type MyPageIconProps = {
  className?: string;
};

export const MyPageIcon: React.FC<MyPageIconProps> = ({ className }) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M26.25 15.5C26.25 17.8212 25.547 19.9781 24.3424 21.7696C22.3225 24.7736 18.892 26.75 15 26.75C11.108 26.75 7.67753 24.7736 5.65761 21.7696C4.45296 19.9781 3.75 17.8212 3.75 15.5C3.75 9.2868 8.7868 4.25 15 4.25C21.2132 4.25 26.25 9.2868 26.25 15.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.5 11.75C17.5 13.1307 16.3807 14.25 15 14.25C13.6193 14.25 12.5 13.1307 12.5 11.75C12.5 10.3693 13.6193 9.25 15 9.25C16.3807 9.25 17.5 10.3693 17.5 11.75Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M18.7497 19.25H11.2497C8.98502 19.25 7.07199 20.7556 6.45703 22.8205C8.5203 25.226 11.582 26.75 14.9997 26.75C18.4174 26.75 21.4791 25.226 23.5424 22.8205C22.9274 20.7556 21.0144 19.25 18.7497 19.25Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};
