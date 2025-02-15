import TripDetail from '@/components/organisms/trips/TripDetail';

type TripEditPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const TripEditPage: React.FC<TripEditPageProps> = ({ params, searchParams }) => {
  const { id } = params;

  return <TripDetail id={id} mode="edit" />;
};

export default TripEditPage;
