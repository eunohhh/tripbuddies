type LeftXsmGrayTextProps = {
  text: string;
};

export default function LeftXsmGrayText({ text }: LeftXsmGrayTextProps) {
  return (
    <div>
      <p className="ml-2 text-gray-500 text-xs xl:ml-2 xl:text-l">{text}</p>
    </div>
  );
}
