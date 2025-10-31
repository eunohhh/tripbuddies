import { twMerge } from "tailwind-merge";

type LeftXlBoldTextProps = {
  text: string;
  className?: string;
};

export default function LeftXlBoldText({
  text,
  className,
}: LeftXlBoldTextProps) {
  return (
    <div>
      <p
        className={twMerge(
          "mt-3 ml-2 font-bold text-xl xl:mt-8 xl:ml-2 xl:text-3xl",
          className,
        )}
      >
        {text}
      </p>
    </div>
  );
}
