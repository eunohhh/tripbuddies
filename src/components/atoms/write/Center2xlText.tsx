type Center2xlTextProps = {
  text: string;
};

export default function Center2xlText({ text }: Center2xlTextProps) {
  return (
    <div>
      <p className="mt-8 text-center font-bold text-2xl xl:mt-8 xl:text-4xl">
        {text}
      </p>
    </div>
  );
}
