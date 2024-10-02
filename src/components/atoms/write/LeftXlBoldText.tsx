import { twMerge } from 'tailwind-merge';

type LeftXlBoldTextProps = {
  text: string;
  className?: string;
};

export default function LeftXlBoldText({ text, className }: LeftXlBoldTextProps) {
  return (
    <div>
      <p className={twMerge('text-xl mt-3 ml-2 xl:text-3xl xl:mt-8 xl:ml-2 font-bold', className)}>
        {text}
      </p>
    </div>
  );
}
