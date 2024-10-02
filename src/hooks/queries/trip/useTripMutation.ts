import { postTrip } from '@/api-services/trips';
import { QUERY_KEY_TRIP } from '@/constants/query.constants';
import { TripMutationData, TripWithContract } from '@/types/Trips.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useTripMutation() {
  const queryClient = useQueryClient();
  return useMutation<TripWithContract, Error, TripMutationData>({
    mutationFn: (newTripData) => postTrip(newTripData),
    onSuccess: (newTrip) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TRIP, newTrip.trip_id],
      });
    },
  });
}
