import clsx from "clsx";
import React from "react";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
};

const Title: React.FC<TitleProps> = ({
  children,
  className,
  align = "center",
}) => {
  return (
    <div
      className={clsx(
        "relative flex h-[10%] w-[90%] flex-col items-center justify-center px-3 py-1",
        {
          "items-start": align === "left",
          "items-end": align === "right",
          "items-center": align === "center",
        },
      )}
    >
      <h2
        className={clsx(
          "whitespace-pre-wrap text-center font-bold text-black",
          className,
        )}
      >
        {children}
      </h2>
    </div>
  );
};

export default Title;
