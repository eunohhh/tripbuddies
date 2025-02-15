'use client';

import SearchPageTitle from '@/components/atoms/search/SearchPageTitle';
import DateSearch from '@/components/organisms/search/DateSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DateSearchPage() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 날짜, 다음날 가져오기
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => {
    const startDateParam = searchParams.get('startDate') || '';
    const endDateParam = searchParams.get('endDate') || '';
    setStartDate(startDateParam);
    setEndDate(endDateParam);
  }, [searchParams]);

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSelectClick = () => {
    // console.log('startDate', startDate);
    // console.log('endDate', endDate);
    if (startDate && endDate) {
      // const query = new URLSearchParams();
      router.push(`/search?startDate=${startDate}&endDate=${endDate}`);
      // query.set('startDate', startDate);
      // query.set('endDate', endDate);
      // router.push(`/search?${query.toString()}`);
    }
  };

  return (
    <div className="p-5 pt-8 xl:grid xl:grid-cols-3 xl:gap-4 bg-white">
      <div className="xl:col-span-1">
        <SearchPageTitle
          title="언제 떠나시나요?"
          description="버디즈와 함께 여행하고 싶은 날짜를 선택해주세요."
        />
      </div>
      <div className="xl:col-span-2">
        <DateSearch setDateChange={handleDateChange} />
        <button
          className="flex justify-center items-center mx-auto w-full px-28 h-12 rounded-2xl bg-main-color font-semibold text-white text-xl mt-40 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:w-[348px] xl:mt-8"
          onClick={handleSelectClick}
        >
          선택하기
        </button>
      </div>
    </div>
  );
}
