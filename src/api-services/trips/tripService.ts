import {
  BookMark,
  BookMarkRequest,
  PartialBookMark,
  TripInfiniteQueryResponse,
  TripWithContract,
} from '@/types/Trips.types';
import fetchWrapper from '@/utils/api/fetchWrapper';

export async function getTrips(): Promise<TripInfiniteQueryResponse> {
  const url = `/api/trips?page=null`;
  try {
    const data = await fetchWrapper<TripInfiniteQueryResponse>(url, {
      method: 'GET',
      cache: 'no-store',
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getInfiniteTrips({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<TripInfiniteQueryResponse> {
  const url = `/api/trips?page=${pageParam}`;
  try {
    const data = await fetchWrapper<TripInfiniteQueryResponse>(url, {
      method: 'GET',
      cache: 'no-store',
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getTrip(id: string | null): Promise<TripWithContract> {
  if (!id) throw new Error('id is required');
  const url = `/api/trips/${id}`;
  try {
    const data = await fetchWrapper<TripWithContract>(url, {
      method: 'GET',
      cache: 'no-store',
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function postBookMark(bookmark: BookMarkRequest): Promise<BookMark> {
  const url = `/api/trips/bookmark`;
  try {
    const data = await fetchWrapper<BookMark>(url, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getBookMark(bookmark: PartialBookMark): Promise<BookMark | null> {
  const url = `/api/trips/bookmark?bookmark_buddy_id=${bookmark.bookmark_buddy_id}&bookmark_trip_id=${bookmark.bookmark_trip_id}`;
  try {
    const data = await fetchWrapper<BookMark | null>(url, {
      method: 'GET',
      cache: 'no-store',
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getAllBookmarks(clickedBuddyId: string): Promise<BookMark | null> {
  const url = `/api/trips/bookmarks?bookmark_buddy_id=${clickedBuddyId}`;
  try {
    const data = await fetchWrapper<BookMark | null>(url, {
      method: 'GET',
      cache: 'no-store',
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function postTrip({
  newTrip,
  id,
  mode,
}: {
  newTrip: FormData;
  id: string;
  mode: 'new' | 'patch';
}): Promise<TripWithContract> {
  const url = `/api/write`;
  try {
    const data = await fetchWrapper<TripWithContract>(url, {
      method: 'POST',
      body: newTrip,
      headers: {
        user: id,
        mode: mode,
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}
