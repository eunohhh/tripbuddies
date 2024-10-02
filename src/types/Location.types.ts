import locationData from '@/data/location';

type LocationName = {
  ko: string;
  en: string;
};

type SubLocation = {
  name: string;
};

type NestedSubLocation = {
  name: LocationName;
  subLocations: SubLocation[];
};

type LocationData = {
  name: LocationName;
  subLocations: (NestedSubLocation | SubLocation)[];
};

// Todo : 이 부분 추가로 공부할 것
type ExtractSecondLevelNames<T extends { subLocations?: readonly any[] }> =
  T['subLocations'] extends readonly (infer U)[]
    ? U extends { name: { ko: infer V } }
      ? V
      : never
    : never;

export type SecondLevelNames = ExtractSecondLevelNames<(typeof locationData)[number]>;

type LocationDataType = typeof locationData;

export type ThirdLevelNames =
  LocationDataType[number]['subLocations'][number]['subLocations'][number]['name'];

export type ThirdLevel = LocationDataType[number]['subLocations'][number]['subLocations'][number];

export type SecondLevel = LocationDataType[number]['subLocations'][number];

export type SelectRegionPageProps = {
  isMini?: boolean;
  states: {
    firstLevelLocation: string;
    secondLevelLocation: string | null;
    thirdLevelLocation: string | null;
    selectedSecondLevelLocations: ThirdLevel[];
    secondLevelLocations: SecondLevel[];
  };
  actions: {
    handleLocationTypeClick: (isKoreaSelected: boolean) => void;
    handleChipClick: (name: string) => void;
    handleThirdLevelClick: (locName: string) => void;
  };
};
