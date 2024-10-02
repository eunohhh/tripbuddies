import locationData from '@/data/location';
import { SecondLevel, ThirdLevel } from '@/types/Location.types';

const getIsOverseas = (final_destination: string): boolean => {
  const [continent, country] = final_destination.split(' ') as unknown as [
    SecondLevel['name']['ko'],
    ThirdLevel['name'],
  ];

  const isOverseas = locationData[1].subLocations.find((sub) => sub.name.ko === continent);

  return !!isOverseas;
};

export default getIsOverseas;
