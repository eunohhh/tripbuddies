import { twMerge } from 'tailwind-merge';

type Left2xlBoldTextProps = {
  text: string;
  className?: string;
};

export default function Left2xlBoldText({ text, className }: Left2xlBoldTextProps) {
  return (
    <div>
      {/* <p className={twMerge('text-2xl mt-2 ml-2 xl:mt-8 font-bold', className)}>{text}</p> */}
      <p className={twMerge('text-2xl mt-2 xl:mt-8 font-bold', className)}>{text}</p>
    </div>
  );
}
