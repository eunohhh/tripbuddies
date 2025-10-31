import Link from "next/link";

type LinkButtonProps = {
  href: string;
};

function LinkButton({ href }: LinkButtonProps) {
  return (
    <Link href={href}>
      <span className="w-1/2 text-right text-blue-500">{">"}</span>
    </Link>
  );
}

export default LinkButton;
