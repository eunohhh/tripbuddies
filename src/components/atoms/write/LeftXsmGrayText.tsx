type LeftXsmGrayTextProps = {
  text: string;
};

export default function LeftXsmGrayText({ text }: LeftXsmGrayTextProps) {
  return (
    <div>
      <p className="text-xs ml-2 xl:ml-2 xl:text-l text-gray-500">{text}</p>
    </div>
  );
}
