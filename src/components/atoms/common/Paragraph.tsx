import clsx from 'clsx';
import React from 'react';

type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center">
      <p className={clsx(`text-gray-500 w-full whitespace-pre-wrap px-3`, className)}>{children}</p>
    </div>
  );
};

export default Paragraph;
