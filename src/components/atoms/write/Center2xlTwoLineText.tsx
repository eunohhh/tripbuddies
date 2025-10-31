type Center2xlTwoLineTextProps = {
  firstText: string;
  secondText: string;
  className?: string;
};

export default function Center2xlTwoLineText({
  firstText,
  secondText,
  className,
}: Center2xlTwoLineTextProps) {
  return (
    <div className={className}>
      <p className="mt-4 text-center font-bold text-2xl xl:mt-8 xl:text-4xl">
        {firstText}
      </p>
      <p className="mt-2 text-center font-bold text-2xl xl:mt-8 xl:text-4xl">
        {secondText}
      </p>
    </div>
  );
}
