import TripDetail from "@/components/organisms/trips/TripDetail";

type TripEditPageProps = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const TripEditPage: React.FC<TripEditPageProps> = async ({
	params,
	searchParams,
}) => {
	const { id } = await params;

	return <TripDetail id={id} mode="edit" />;
};

export default TripEditPage;
