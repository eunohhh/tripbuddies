'use client';

import { useEffect, useState } from 'react';
import { useSelectRegion } from '../common/useSelectRegion';

// 검색어
export function useSearchInput(searchParams: URLSearchParams) {
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const input = searchParams.get('searchInput') || '';
    setSearchInput(input);
  }, [searchParams]);
  return { searchInput, setSearchInput };
}

// 날짜
export function useDateRange(searchParams: URLSearchParams) {
  const [startDateTimestamp, setStartDateTimestamp] = useState<string>('');
  const [endDateTimestamp, setEndDateTimestamp] = useState<string>('');

  // 쿼리 파라미터로 date 가져오기
  useEffect(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    if (startDate && endDate) {
      setStartDateTimestamp(startDate);
      setEndDateTimestamp(endDate);
    }
  }, [searchParams]);

  return {
    startDateTimestamp,
    setStartDateTimestamp,
    endDateTimestamp,
    setEndDateTimestamp,
  };
}

// 여정 장소
export function useLocationSelection(searchParams: URLSearchParams) {
  const {
    actions: { handleThirdLevelClick },
    states: { thirdLevelLocation },
  } = useSelectRegion();

  useEffect(() => {
    const location = searchParams.get('location') || null;

    if (location) {
      handleThirdLevelClick(location);
    }
  }, [searchParams, handleThirdLevelClick]);

  return { thirdLevelLocation, handleThirdLevelClick };
}

// 성별
export function useGenderSelection() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  return { selectedGender, setSelectedGender };
}

// 나이
export function useAgeRange() {
  const [startAge, setStartAge] = useState<number>(20);
  const [endAge, setEndAge] = useState<number>(70);
  return { startAge, setStartAge, endAge, setEndAge };
}

// 만남 장소
export function useMeetingPlaceSelection() {
  const [selectedMeetingPlace, setSelectedMeetingPlace] = useState<string | null>(null);
  return { selectedMeetingPlace, setSelectedMeetingPlace };
}
