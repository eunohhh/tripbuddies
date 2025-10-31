import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/atoms/common/SearchBar";

const HomePageSearchBar = () => {
  const today = new Date();

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const formatDate = (date: Date): string => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  const formattedToday = formatDate(today);
  const formattedNextWeek = formatDate(nextWeek);
  return (
    <div className="mt-4 flex w-full items-center justify-between">
      <SearchBar />
      <Link href="/search/location">
        <div className="hidden h-9 w-[300px] items-center rounded-3xl bg-gray-200 px-3 [@media(min-width:1280px)]:flex">
          <Image src="/svg/Place.svg" alt="Place" width={20} height={20} />
          <div className="bg-transparent px-2 text-xs">
            지역, 국가를 찾아보세요
          </div>
        </div>
      </Link>
      <Link href="/search/date">
        <div className="hidden h-9 w-[300px] items-center rounded-3xl bg-gray-200 px-3 [@media(min-width:1280px)]:flex">
          <Image src="/svg/Date.svg" alt="Place" width={20} height={20} />
          <div className="bg-transparent px-2 text-xs">
            {`${formattedToday} ~ ${formattedNextWeek}`}
          </div>
        </div>
      </Link>
      <Link href="/search">
        <button
          type="button"
          className="hidden h-9 w-[114px] cursor-pointer items-center justify-center rounded-[8px] bg-main-color text-white text-xs [@media(min-width:1280px)]:flex"
        >
          검색하기
        </button>
      </Link>
    </div>
  );
};

export default HomePageSearchBar;
