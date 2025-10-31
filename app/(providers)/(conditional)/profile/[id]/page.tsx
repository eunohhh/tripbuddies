import Loading from "@app/loading";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { fetchFollowData } from "@/api-services/auth/client";
import Profile from "@/components/organisms/profile/Profile";
import {
	QUERY_KEY_BUDDY,
	QUERY_KEY_FOLLOW_COUNT,
} from "@/constants/query.constants";
import { fetchBuddyProfile } from "@/hooks/queries";

type ProfilePageProps = {
	params: Promise<{ id: string }>;
};

const ProfilePage: React.FC<ProfilePageProps> = async ({
	params,
}: ProfilePageProps) => {
	const { id } = await params;

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_BUDDY, id],
		queryFn: () => fetchBuddyProfile(id),
	});
	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_FOLLOW_COUNT, id],
		queryFn: () => fetchFollowData(id),
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<Suspense fallback={<Loading />}>
			<HydrationBoundary state={dehydratedState}>
				<Profile id={id} />
			</HydrationBoundary>
		</Suspense>
	);
};

export default ProfilePage;
