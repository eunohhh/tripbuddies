'use client';

import { TripWithContract } from '@/types/Trips.types';
import { filterAndSortTrips, filterAndSortTripsBuddies } from '@/utils/search/filterAndSortTrips';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export type Filters = {
  searchInput: string | null;
  startDateTimestamp: string | null;
  endDateTimestamp: string | null;
  thirdLevelLocation: string | null;
  selectedGender: string | null;
  startAge: number | null;
  endAge: number | null;
  selectedMeetingPlace: string | null;
  selectedThemes: string[] | null;
  selectedBuddyThemes: string[] | null;
};

export const applyFilters = (trips: TripWithContract[], filters: Filters) => {
  let filteredItems = [...trips];

  // console.log('filteredItems', filteredItems);
  // console.log('filters', filters);

  // 검색어
  if (filters.searchInput && filters.searchInput.trim() !== '' && filters.searchInput !== 'null') {
    filteredItems = filteredItems.filter(
      (item: TripWithContract) =>
        item.trip_title.toLowerCase().includes(filters.searchInput?.toLowerCase() || '') ||
        item.trip_content.toLowerCase().includes(filters.searchInput?.toLowerCase() || ''),
    );
  }

  // 날짜
  if (
    filters.startDateTimestamp &&
    filters.endDateTimestamp &&
    filters.startDateTimestamp !== 'null' &&
    filters.endDateTimestamp !== 'null'
  ) {
    const startDate = new Date(filters.startDateTimestamp);
    const endDate = new Date(filters.endDateTimestamp);

    filteredItems = filteredItems.filter((item: TripWithContract) => {
      const tripStartDate = new Date(item.trip_start_date);
      const TripEndDate = new Date(item.trip_end_date);

      return tripStartDate <= endDate && TripEndDate >= startDate;
    });
  }

  // 장소
  if (filters.thirdLevelLocation && filters.thirdLevelLocation !== 'null') {
    filteredItems = filteredItems.filter((item: TripWithContract) =>
      item.trip_final_destination.includes(filters.thirdLevelLocation as string),
    );
  }

  // 성별
  if (filters.selectedGender && filters.selectedGender !== 'null') {
    filteredItems = filteredItems.filter(
      (item: TripWithContract) => item.trip_wanted_sex === filters.selectedGender,
    );
  }

  // 만남 장소
  if (filters.selectedMeetingPlace && filters.selectedMeetingPlace !== 'null') {
    filteredItems = filteredItems.filter(
      (item: TripWithContract) => item.trip_meet_location === filters.selectedMeetingPlace,
    );
  }

  // 나이
  if (
    filters.startAge !== null &&
    filters.endAge !== null &&
    filters.startAge !== 20 &&
    filters.endAge !== 70
  ) {
    filteredItems = filteredItems.filter(
      (item: TripWithContract) =>
        item.trip_start_age >= filters.startAge! && item.trip_end_age <= filters.endAge!,
    );
  }

  // 여정 테마
  if (
    filters.selectedThemes &&
    filters.selectedThemes.length > 0 &&
    filters.selectedThemes.some((theme) => theme !== 'null' && theme !== '')
  ) {
    filteredItems = filterAndSortTrips(filteredItems, filters.selectedThemes);
  }

  // 버디즈 성향
  if (
    filters.selectedBuddyThemes &&
    filters.selectedBuddyThemes.length > 0 &&
    filters.selectedBuddyThemes.some((theme) => theme !== 'null' && theme !== '')
  ) {
    filteredItems = filterAndSortTripsBuddies(filteredItems, filters.selectedBuddyThemes);
  }

  return filteredItems;
};

export function useFilteredTrips(initialFilters: Filters) {
  const [resultItems, setResultItems] = useState<TripWithContract[]>([]);
  const [allItems, setAllItems] = useState<TripWithContract[]>([]);
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    const fetchFilteredTrips = async () => {
      const { data, error } = await supabase.from('trips').select(
        // '*, contract:contract!contract_contract_trip_id_foreign (*)',
        '*, contract (*)',
      );
      if (error) {
        console.error('Fetch Error:', error.message);
        return;
      }

      const allData = data as TripWithContract[];

      const filteredItems = applyFilters(allData, initialFilters);

      setResultItems(filteredItems.length === 0 ? allData : filteredItems);
      setAllItems(allData);
      setShowAllItems(filteredItems.length === 0);
    };
    fetchFilteredTrips();
  }, [initialFilters]);

  // console.log('z', initialFilters);
  return { resultItems, allItems, showAllItems };
}
