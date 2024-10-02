import { Trip, TripWithContract } from './Trips.types';
import { Tables } from './supabase';

export type Contract = Tables<'contract'>;

export type PartialContract = Partial<Contract>;

export type ContractWithTrips = Contract & {
  trips: Trip;
};

export type ContractWithTripsWithContract = Contract & {
  trips: TripWithContract;
};

export type TripsAndContracts = {
  trips: Trip[];
  contracts: Contract[];
};

export type MyTripsAndContracts = {
  created: TripWithContract[];
  participated: TripWithContract[];
  bookmarked: TripWithContract[];
};
