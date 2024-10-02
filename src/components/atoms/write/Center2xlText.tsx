type Center2xlTextProps = {
  text: string;
};

export default function Center2xlText({ text }: Center2xlTextProps) {
  return (
    <div>
      <p className="text-2xl mt-8 xl:text-4xl xl:mt-8 font-bold text-center">{text}</p>
    </div>
  );
}
