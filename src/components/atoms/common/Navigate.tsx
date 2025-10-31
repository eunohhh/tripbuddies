"use client";

import { twMerge } from "tailwind-merge";
import NavigateBefore from "../../../../public/svg/navigate_before.svg";
import NavigateNext from "../../../../public/svg/navigate_next.svg";

type NavigateProps = {
  mode: "before" | "after";
  onClick: () => void;
  className?: string;
};

const Navigate: React.FC<NavigateProps> = ({ mode, onClick, className }) => {
  return (
    <div
      className={twMerge(
        "absolute z-[99] flex h-9 w-9 items-center justify-center text-black hover:text-primary-color-400",
        mode === "before"
          ? "-left-[15px] -translate-y-[50%] top-[60%]"
          : "-right-[15px] -translate-y-[50%] top-[60%]",
        className,
      )}
    >
      <button
        type="button"
        className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-md"
        onClick={onClick}
      >
        {mode === "before" ? <NavigateBefore /> : <NavigateNext />}
      </button>
    </div>
  );
};

export default Navigate;
