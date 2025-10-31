import {
  Contract,
  PartialContract,
  TripsAndContracts,
} from "@/types/Contract.types";
import fetchWrapper from "@/utils/api/fetchWrapper";

export async function getContract(
  isBuddy: boolean,
  id: string | undefined,
): Promise<TripsAndContracts | null> {
  if (!id) return null;
  const url = isBuddy
    ? `/api/contract/buddy/${id}`
    : `/api/contract/trip/${id}`;
  const data = await fetchWrapper<TripsAndContracts>(url, {
    method: "GET",
    // cache: 'no-store',
  });
  return data;
}

export async function postContract(payload: PartialContract) {
  const url = `/api/contract`;
  const data = await fetchWrapper<Contract>(url, {
    method: "POST",
    // cache: 'no-store',
    body: JSON.stringify(payload),
  });
  return data;
}
