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
      <p className="text-2xl mt-4 xl:text-4xl xl:mt-8 font-bold text-center">{firstText}</p>
      <p className="text-2xl mt-2 xl:text-4xl xl:mt-8 font-bold text-center">{secondText}</p>
    </div>
  );
}
