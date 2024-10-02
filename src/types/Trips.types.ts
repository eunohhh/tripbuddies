import { Contract } from './Contract.types';
import { Tables } from './supabase';
import { BuddyTheme, TripTheme } from './Themes.types';

export type Trip = Tables<'trips'>;

export type PartialTrip = Partial<Trip>;

export type TripWithContract = Trip & {
  // contract: Contract |Contract[];
  contract: Contract[];
};

export type TripInfiniteQueryResponse = {
  trips: TripWithContract[];
  allTrips?: TripWithContract[][];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export type BookMark = Tables<'tripbookmarks'>;

export type PartialBookMark = Partial<BookMark>;

export type BookMarkRequest = PartialBookMark & {
  is_bookmarked: boolean;
};

export type CalendarData = {
  startDateTimestamp: string;
  endDateTimestamp: string;
};

export type TripThemeData = {
  meetPlace: string;
  selectedTripThemes: (TripTheme | BuddyTheme)[];
};

export type BuddyThemeData = {
  wantedSex: string;
  startAge: number;
  endAge: number;
  selectedWantedBuddies: (TripTheme | BuddyTheme)[];
};

export type TripEditTextData = {
  tripTitle: string;
  tripContent: string;
};

export type TripMutationData = {
  newTrip: FormData;
  id: string;
  mode: 'new' | 'patch';
};
