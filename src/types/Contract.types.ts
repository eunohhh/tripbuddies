import { Tables } from "./supabase";
import { Trip, TripWithContract } from "./Trips.types";

export type Contract = Tables<"contract">;

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
