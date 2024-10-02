import Chip from '@/components/atoms/common/Chip';
import SearchPageTitle from '@/components/atoms/search/SearchPageTitle';
import { MeetingPlace } from '@/types/MeetingPlace.types';
import React from 'react';

const meetingPlaceOptions: MeetingPlace[] = ['출발지', '여행지'];

type MeetingPlaceChipGroupProps = {
  selectedMeetingPlace: string | null;
  setSelectedMeetingPlace: (place: string | null) => void;
};

const MeetingPlaceChipGroup: React.FC<MeetingPlaceChipGroupProps> = ({
  selectedMeetingPlace,
  setSelectedMeetingPlace,
}) => {
  const handleMeetingPlaceClick = (place: string) => {
    const isSelected = selectedMeetingPlace === place;
    const newSelectedMeetingPlace = isSelected ? null : place;

    setSelectedMeetingPlace(newSelectedMeetingPlace);
  };

  return (
    <div className="mt-3 mb-5">
      <SearchPageTitle title="만남 장소" description="" />
      <div className="grid grid-cols-2 gap-2 xl:w-1/2">
        {meetingPlaceOptions.map((place) => (
          <Chip
            key={place}
            intent="natural"
            className="text-[14px]"
            selected={selectedMeetingPlace === place}
            onClick={(e) => {
              e.preventDefault();
              handleMeetingPlaceClick(place);
            }}
          >
            {place}
          </Chip>
        ))}
      </div>
    </div>
  );
};
export default MeetingPlaceChipGroup;
