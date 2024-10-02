import Chip from '@/components/atoms/common/Chip';
import SearchPageTitle from '@/components/atoms/search/SearchPageTitle';
import { Gender } from '@/types/Gender.types';
import React from 'react';

const genderOptions: Gender[] = ['여성', '남성', '성별무관'];

type GenderSelectionProps = {
  selectedGender: string | null;
  setSelectedGender: (gender: string | null) => void;
};

const GenderSelection: React.FC<GenderSelectionProps> = ({ selectedGender, setSelectedGender }) => {
  const handleGenderClick = async (gender: string) => {
    const isSelected = selectedGender === gender;
    const newSelectedGender = isSelected ? null : gender;

    setSelectedGender(newSelectedGender);
  };

  return (
    <>
      <SearchPageTitle title="성별" description="" />
      <div className="grid grid-cols-3 gap-2 xl:w-3/4">
        {genderOptions.map((gender) => (
          <Chip
            key={gender}
            intent="natural"
            selected={selectedGender === gender}
            onClick={() => handleGenderClick(gender)}
            className="text-[14px]"
          >
            {gender}
          </Chip>
        ))}
      </div>
    </>
  );
};

export default GenderSelection;
