import clsx from "clsx";
import React from "react";

type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <p
        className={clsx(
          `w-full whitespace-pre-wrap px-3 text-gray-500`,
          className,
        )}
      >
        {children}
      </p>
    </div>
  );
};

export default Paragraph;
