type LeftSmGrayTextProps = {
  text: string;
};

export default function LeftSmGrayText({ text }: LeftSmGrayTextProps) {
  return (
    <div>
      <p className="ml-3 text-gray-500 text-sm xl:ml-2 xl:text-xl">{text}</p>
    </div>
  );
}
