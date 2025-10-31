import Image from "next/image";
import React from "react";

type SearchInputProps = {
  value: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onKeyDown,
  onChange,
}) => {
  return (
    <div className="relative box-border flex xl:w-[300px]">
      <input
        type="text"
        value={value}
        placeholder="검색어를 입력하세요"
        className="w-full rounded-2xl bg-grayscale-color-85 py-1.5 pl-10 xl:w-[300px]"
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <div className="-translate-y-1/2 absolute top-[19px] left-3 transform xl:left-3">
        <Image
          src="/svg/HomeSearch.svg"
          alt="Search"
          width={20}
          height={20}
          className="h-[20px] w-[20px]"
        />
      </div>
    </div>
  );
};
export default SearchInput;
