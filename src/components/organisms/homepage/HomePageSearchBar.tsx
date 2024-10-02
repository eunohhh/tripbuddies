import SearchBar from '@/components/atoms/common/SearchBar';
import Image from 'next/image';
import Link from 'next/link';

const HomePageSearchBar = () => {
  const today = new Date();

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const formatDate = (date: Date): string => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  const formattedToday = formatDate(today);
  const formattedNextWeek = formatDate(nextWeek);
  return (
    <div className="w-full flex justify-between items-center mt-4">
      <SearchBar />
      <Link href="/search/location">
        <div className="h-9 w-[300px] rounded-3xl bg-gray-200 [@media(min-width:1280px)]:flex hidden items-center px-3">
          <Image src="/svg/Place.svg" alt="Place" width={20} height={20} />
          <div className="bg-transparent text-xs px-2">지역, 국가를 찾아보세요</div>
        </div>
      </Link>
      <Link href="/search/date">
        <div className="h-9 w-[300px] rounded-3xl bg-gray-200 [@media(min-width:1280px)]:flex hidden items-center px-3">
          <Image src="/svg/Date.svg" alt="Place" width={20} height={20} />
          <div className="bg-transparent text-xs px-2">
            {`${formattedToday} ~ ${formattedNextWeek}`}
          </div>
        </div>
      </Link>
      <Link href="/search">
        <button className="cursor-pointer bg-main-color h-9 w-[114px] rounded-[8px] text-white [@media(min-width:1280px)]:flex hidden items-center justify-center text-xs">
          검색하기
        </button>
      </Link>
    </div>
  );
};

export default HomePageSearchBar;
