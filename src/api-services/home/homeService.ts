import { BuddyTripStory } from "@/types/Home.type";
import fetchWrapper from "@/utils/api/fetchWrapper";

export async function getBuddyTripStory(mode: string) {
  const url = `/api/home?mode=${mode}`;
  const data = await fetchWrapper<BuddyTripStory>(url, {
    method: "GET",
    // cache: 'no-store',
  });
  return data;
}
