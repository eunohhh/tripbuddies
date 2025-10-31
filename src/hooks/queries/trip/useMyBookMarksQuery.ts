"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllBookmarks } from "@/api-services/trips";
import { QUERY_KEY_MY_BOOKMARKS } from "@/constants/query.constants";
import { TripWithContract } from "@/types/Trips.types";

export function useMyBookMarksQuery(clickedBuddyId: string) {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (clickedBuddyId) {
      setEnabled(true);
    }
  }, [clickedBuddyId]);

  return useQuery<TripWithContract[] | null, Error>({
    queryKey: [QUERY_KEY_MY_BOOKMARKS, clickedBuddyId],
    queryFn: () => getAllBookmarks(clickedBuddyId) as Promise<null>,
    enabled,
  });
}
