import Image from 'next/image';
import React from 'react';

type SearchInputProps = {
  value: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onKeyDown, onChange }) => {
  return (
    <div className="flex xl:w-[300px] relative box-border">
      <input
        type="text"
        value={value}
        placeholder="검색어를 입력하세요"
        className="w-full xl:w-[300px] bg-grayscale-color-85 py-1.5 pl-10 rounded-2xl"
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <div className="absolute left-3 top-[19px] transform -translate-y-1/2 xl:left-3">
        <Image
          src="/svg/HomeSearch.svg"
          alt="Search"
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
      </div>
    </div>
  );
};
export default SearchInput;
