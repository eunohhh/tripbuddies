"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

type AddButtonSmallProps = {
  isBig?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AddButtonSmall: React.FC<AddButtonSmallProps> = ({
  onClick = () => {},
  isBig = false,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e);
    if (!isBig) router.push("/write/story");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        "absolute right-0 bottom-0 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-white",
        isBig ? "h-[20px] w-[20px]" : "",
      )}
    >
      <Image
        src="/svg/add.svg"
        alt="add"
        width={isBig ? 20 : 10}
        height={isBig ? 20 : 10}
        className="object-contain"
      />
    </button>
  );
};

export default AddButtonSmall;
