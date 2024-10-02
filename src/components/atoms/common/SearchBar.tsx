import Image from 'next/image';
import Link from 'next/link';

const SearchBar = () => {
  return (
    <Link className="h-9 w-full [@media(min-width:1280px)]:w-[300px] " href="/search">
      <div className="h-9 rounded-3xl bg-gray-200 cursor-pointer flex items-center px-3">
        <Image
          src="/svg/HomeSearch.svg"
          alt="Search"
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
      </div>
    </Link>
  );
};

export default SearchBar;
