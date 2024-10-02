'use client';
import locationData from '@/data/location';
import { SecondLevel, ThirdLevel } from '@/types/Location.types';
import { useEffect, useRef, useState } from 'react';
import { useTapScroll } from './useTapScroll';

export function useSelectRegion() {
  // Todo: 이거 클로저 패턴임 추가 학습요
  // finalSelectedLocation은 최종 선택한 지역 이름으로 초기화 됨.
  const [thirdLevelLocation, setThirdLevelLocation] = useState<string>('');
  // Todo: useState 말고 string으로 해도 될 듯
  // selectedLocationName은 국내의 경우는 선택한 도, 해외의 경우 선택한 대륙 하나만 초기화 됨. (예) 경상남도, 오세아니아
  const [secondLevelLocation, setSecondLevelLocation] = useState<string | null>(null);
  // firstLevelLocation은 '한국', '해외'로 초기화 됨.
  const [firstLevelLocation, setFirstLevelLocation] = useState<string>('한국');

  // secondLevelLocation은 국내의 경우 도, 해외의 경우 대륙 이름들이 열로 초기화 됨.
  const [secondLevelLocations, setSecondLevelLocations] = useState<SecondLevel[]>([]);
  // selectedSecondLevelLocations는 국내는 도, 해외는 대륙을 선택한 경우 해당 대륙에 포함된 나라, 도시들이 배열로 초기화 됨.
  const [selectedSecondLevelLocations, setSelectedSecondLevelLocations] = useState<ThirdLevel[]>(
    [],
  );

  const buddiesRef = useRef<HTMLDivElement>(null);
  useTapScroll({ refs: [buddiesRef] });

  const scrollPositionRef = useRef(0);

  // 국내/해외 선택 처리 : 1단계
  const handleLocationTypeClick = (isKoreaSelected: boolean) => {
    setFirstLevelLocation(isKoreaSelected ? '한국' : '해외');
    setSecondLevelLocation(null);
    setSelectedSecondLevelLocations([]);
  };

  const handleThirdLevelClick = (locName: string) => {
    const section = document.getElementById('third-level-section');
    if (section) {
      scrollPositionRef.current = section.scrollTop;
      setThirdLevelLocation(locName);
    }
  };

  // 칩 클릭 처리 : 2단계 (시도, 대륙 선택 시 도시, 국가명 렌더링)
  const handleChipClick = (name: string) => {
    setSecondLevelLocation(name);
    const secondLevel = [...locationData[firstLevelLocation === '한국' ? 0 : 1].subLocations];
    const thirdLevel =
      secondLevel.find((subLocation) => subLocation.name.ko === name)?.subLocations || [];
    setSelectedSecondLevelLocations(thirdLevel as ThirdLevel[]);
  };

  useEffect(() => {
    const selectedLocationData = locationData[firstLevelLocation === '한국' ? 0 : 1];

    if (selectedLocationData) {
      setSecondLevelLocations([...selectedLocationData.subLocations]);
    } else {
      setSecondLevelLocations([]);
    }
  }, [firstLevelLocation]);

  useEffect(() => {
    const section = document.getElementById('third-level-section');

    if (section) {
      section.scrollTop = scrollPositionRef.current;
    }
  }, []);

  return {
    actions: {
      handleLocationTypeClick,
      handleChipClick,
      handleThirdLevelClick,
      setThirdLevelLocation,
    },
    states: {
      firstLevelLocation,
      secondLevelLocation,
      thirdLevelLocation,
      secondLevelLocations,
      selectedSecondLevelLocations,
    },
  };
}
