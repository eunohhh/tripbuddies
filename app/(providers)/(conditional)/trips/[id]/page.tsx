import Loading from "@app/loading";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type React from "react";
import { Suspense } from "react";
import { getTrip } from "@/api-services/trips";
import TripDetail from "@/components/organisms/trips/TripDetail";
import { QUERY_KEY_TRIP } from "@/constants/query.constants";

type TripDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const TripsDetailPage: React.FC<TripDetailPageProps> = async ({
  params,
  searchParams,
}) => {
  const { id } = await params;

  // console.log('id', id);

  const queryClient = new QueryClient();
  if (id) {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEY_TRIP, id],
      queryFn: () => getTrip(id),
      staleTime: 1000 * 60 * 5,
    });
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <TripDetail id={id} mode="detail" />
      </HydrationBoundary>
    </Suspense>
  );
};

export default TripsDetailPage;
