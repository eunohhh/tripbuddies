"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchPageTitle from "@/components/atoms/search/SearchPageTitle";
import DateSearch from "@/components/organisms/search/DateSearch";

export default function DateSearchPage() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 날짜, 다음날 가져오기
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => {
    const startDateParam = searchParams.get("startDate") || "";
    const endDateParam = searchParams.get("endDate") || "";
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
    <div className="bg-white p-5 pt-8 xl:grid xl:grid-cols-3 xl:gap-4">
      <div className="xl:col-span-1">
        <SearchPageTitle
          title="언제 떠나시나요?"
          description="버디즈와 함께 여행하고 싶은 날짜를 선택해주세요."
        />
      </div>
      <div className="xl:col-span-2">
        <DateSearch setDateChange={handleDateChange} />
        <button
          type="button"
          className="mx-auto mt-40 flex h-12 w-full items-center justify-center rounded-2xl bg-main-color px-28 font-semibold text-white text-xl transition-colors duration-200 ease-in-out active:bg-gray-300 xl:mt-8 xl:w-[348px]"
          onClick={handleSelectClick}
        >
          선택하기
        </button>
      </div>
    </div>
  );
}
