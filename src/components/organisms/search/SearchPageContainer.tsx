'use client';

import SearchPageTitle from '@/components/atoms/search/SearchPageTitle';
import TopButton from '@/components/atoms/search/TopButton';
import SelectAgesRange from '@/components/atoms/write/SelectAgesRange';
import GenderChipGroup from '@/components/molecules/search/GenderChipGroup';
import MeetingPlaceChipGroup from '@/components/molecules/search/MeetingPlaceChipGroup';
import SearchBars from '@/components/molecules/search/SearchBars';
import SearchResult from '@/components/molecules/search/SearchResult';
import { usePreferTheme, useSelectRegion } from '@/hooks';
import { applyFilters, Filters } from '@/hooks/SearchPage/useFilterSearchOption';
import { TripInfiniteQueryResponse, TripWithContract } from '@/types/Trips.types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

export type ThemeAction =
  | { type: 'SET_TRIP_THEMES'; payload: string[] }
  | { type: 'SET_BUDDY_THEMES'; payload: string[] }
  | { type: 'RESET_THEMES' };

type ThemeState = {
  selectedTripThemes: string[];
  selectedBuddyThemes: string[];
};

// 빈 배열로 초기화
const initialState: ThemeState = {
  selectedTripThemes: [],
  selectedBuddyThemes: [],
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_TRIP_THEMES':
      // selectedThemes 업데이트
      return { ...state, selectedTripThemes: action.payload };
    case 'SET_BUDDY_THEMES':
      // selectedThemes 업데이트
      return { ...state, selectedBuddyThemes: action.payload };
    case 'RESET_THEMES':
      return initialState;
    default:
      throw new Error('action type?: ${action.type}');
  }
}
export default function SearchPageContainer({
  initialTrips,
}: {
  initialTrips: TripInfiniteQueryResponse;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>('');

  const [startDateTimestamp, setStartDateTimestamp] = useState<string>('');
  const [endDateTimestamp, setEndDateTimestamp] = useState<string>('');

  const {
    actions: { handleThirdLevelClick },
    states: { thirdLevelLocation },
  } = useSelectRegion();

  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const [startAge, setStartAge] = useState<number>(20);
  const [endAge, setEndAge] = useState<number>(70);

  const [selectedMeetingPlace, setSelectedMeetingPlace] = useState<string | null>(null);

  const [state, dispatch] = useReducer<React.Reducer<ThemeState, ThemeAction>>(
    themeReducer,
    initialState,
  );

  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [visibleFirstItems, setVisibleFirstItems] = useState(8);
  const [visibleSecondItems, setVisibleSecondItems] = useState(6);
  const [isXL, setIsXL] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<TripWithContract[]>([]);
  const [filteredAllItems, setFilteredAllItems] = useState<TripWithContract[]>([]);

  const [PreferTripTheme, selectedTripPreferTheme] = usePreferTheme({
    mode: 'trip',
  });
  const [PreferBuddyTheme, selectedBuddyPreferTheme] = usePreferTheme({
    mode: 'buddy',
  });

  const [filters, setFilters] = useState<Filters>({
    searchInput,
    startDateTimestamp,
    endDateTimestamp,
    thirdLevelLocation,
    selectedGender,
    startAge,
    endAge,
    selectedMeetingPlace,
    selectedThemes: state.selectedTripThemes,
    selectedBuddyThemes: state.selectedBuddyThemes,
  });

  const resultRef = useRef<HTMLDivElement>(null);

  const resetThemes = () => {
    dispatch({ type: 'RESET_THEMES' });
  };

  const setSelectedThemes = (
    value: string[],
    type: 'SET_TRIP_THEMES' | 'SET_BUDDY_THEMES' | 'RESET_THEMES',
  ) => {
    dispatch({
      type,
      payload: value,
    });
  };

  // const { resultItems: filteredItems, allItems: filteredAllItems } =
  //     useFilteredTrips(filters);

  const handleShowResult = useCallback(() => setShowResult(true), []);

  // enter 누르면 검색 결과 보여주기
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setShowResult(true);
        handleShowResult();
      }
    },
    [handleShowResult],
  );

  const loadMoreFirstItems = () => {
    setVisibleFirstItems((prev) => prev + 8);
  };

  const loadMoreSecondItems = () => {
    setVisibleSecondItems((prev) => prev + 6);
  };

  const visibleItems = () => {
    if (showResult) {
      if (isXL) {
        return filteredItems.slice(0, visibleFirstItems);
      } else {
        return filteredItems;
      }
    }
    return [];
  };

  useEffect(() => {
    if (showResult === true && resultRef.current) {
      const offset = 80;
      // console.log('top ========>', top);
      setTimeout(() => {
        let top = 0;
        if (resultRef.current) {
          top = resultRef.current.getBoundingClientRect().top + window.scrollY - offset;
        }
        window.scrollTo({ top, behavior: 'smooth' });
      }, 400);
    }
  }, [showResult]); // showResult가 true가 될 때 스크롤 작업 수행

  useEffect(() => {
    const handleResize = () => {
      const xl = window.matchMedia('(min-width: 1280px').matches;
      setIsXL(xl);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (initialTrips) {
      const allData = initialTrips.trips;
      const filteredItems = applyFilters(allData, filters);
      // setFilteredItems(
      //     filteredItems.length === 0 ? allData : filteredItems,
      // );
      setFilteredItems(filteredItems);
      setFilteredAllItems(allData);
    }
    router.push(
      `/search?searchInput=${filters.searchInput}&startDate=${filters.startDateTimestamp}&endDate=${filters.endDateTimestamp}&location=${filters.thirdLevelLocation}&gender=${filters.selectedGender}&startAge=${filters.startAge}&endAge=${filters.endAge}&meetingPlace=${filters.selectedMeetingPlace}&themes=${filters.selectedThemes}&buddyThemes=${filters.selectedBuddyThemes}`,
    );
  }, [router, filters, initialTrips]);

  useLayoutEffect(() => {
    const searchInput = searchParams.get('searchInput');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const gender = searchParams.get('gender');
    const startAge = searchParams.get('startAge');
    const endAge = searchParams.get('endAge');
    const meetingPlace = searchParams.get('meetingPlace');
    const location = searchParams.get('location');
    const themes = searchParams.getAll('themes');
    const buddyThemes = searchParams.getAll('buddyThemes');

    const newFilters: Filters = {
      searchInput,
      startDateTimestamp: startDate,
      endDateTimestamp: endDate,
      selectedGender: gender,
      startAge: Number(startAge) || 20,
      endAge: Number(endAge) || 70,
      selectedMeetingPlace: meetingPlace,
      thirdLevelLocation: location,
      selectedThemes: themes,
      selectedBuddyThemes: buddyThemes,
    };

    if (newFilters) setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    setSelectedThemes(selectedTripPreferTheme, 'SET_TRIP_THEMES');
  }, [selectedTripPreferTheme]);

  useEffect(() => {
    setSelectedThemes(selectedBuddyPreferTheme, 'SET_BUDDY_THEMES');
  }, [selectedBuddyPreferTheme]);

  useEffect(() => {
    if (searchInput) {
      setFilters((prev) => ({ ...prev, searchInput }));
    }
  }, [searchInput]);

  return (
    <div className="p-5 xl:p-0 xl:py-5 bg-white">
      <SearchBars
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        startDateTimestamp={startDateTimestamp}
        setStartDateTimestamp={setStartDateTimestamp}
        endDateTimestamp={endDateTimestamp}
        setEndDateTimestamp={setEndDateTimestamp}
        thirdLevelLocation={thirdLevelLocation}
        setThirdLevelLocation={handleThirdLevelClick}
        handleShowResult={handleShowResult}
        handleKeyDown={handleKeyDown}
      />
      <div className="my-10">
        <GenderChipGroup selectedGender={selectedGender} setSelectedGender={setSelectedGender} />
      </div>
      <div className="my-10">
        <SearchPageTitle title="나이" description="" />
        <SelectAgesRange
          startAge={startAge}
          endAge={endAge}
          handleStartAge={setStartAge}
          handleEndAge={setEndAge}
        />
      </div>

      <div className="my-10">
        <MeetingPlaceChipGroup
          selectedMeetingPlace={selectedMeetingPlace}
          setSelectedMeetingPlace={setSelectedMeetingPlace}
        />
      </div>

      <div className="my-10">
        <SearchPageTitle title="여정 테마" description="3가지를 선택해주세요." />
        <PreferTripTheme className="text-[14px]" />
      </div>
      <div className="my-10">
        <SearchPageTitle title="버디즈 성향" description="3가지를 선택해주세요." />
        <PreferBuddyTheme className="text-[14px]" />
      </div>

      <button
        id="result-section"
        className="flex justify-center items-center mx-auto w-full xl:max-w-[348px] px-28 h-12 rounded-2xl bg-main-color font-semibold text-white text-xl mb-5 xl:mb-10 transition-colors duration-200 ease-in-out active:bg-gray-300 whitespace-nowrap"
        onClick={() => {
          setShowResult(true);
          handleShowResult();
        }}
      >
        검색 결과 보기
      </button>

      {showResult !== null && (
        <div ref={resultRef}>
          <SearchResult
            items={visibleItems()}
            allTrips={filteredAllItems}
            visibleFirstItems={visibleFirstItems}
            visibleSecondItems={visibleSecondItems}
            loadMoreFirstItems={loadMoreFirstItems}
            loadMoreSecondItems={loadMoreSecondItems}
            isXL={isXL}
          />
        </div>
      )}

      <TopButton setShowResult={setShowResult} />
    </div>
  );
}
