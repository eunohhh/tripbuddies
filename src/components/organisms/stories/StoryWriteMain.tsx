'use client';

import { StoryFilter, StoryOverlay } from '@/types/Story.types';
import React, { useEffect, useState } from 'react';
import StoryFilterImage from './StoryFilterImage';
import StorySelectMedia from './StorySelectMedia';
import StoryWriteText from './StoryWriteText';

const filterImage = [
  {
    name: 'basic',
    className: 'relative',
  },
  {
    name: 'sepia',
    className: 'sepia relative',
  },
  {
    name: 'saturate',
    className: 'saturate-200 relative',
  },
  {
    name: 'invert',
    className: 'invert relative',
  },
  {
    name: 'grayscale',
    className: 'grayscale relative',
  },
  {
    name: 'contrast',
    className: 'contrast-200 relative',
  },
];

const StoryWriteMain: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string>('');
  const [texts, setTexts] = useState<StoryOverlay[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<StoryFilter>({
    name: '',
    className: '',
  });

  const handleStep = (step: number) => {
    if (step === 0) {
      setImageFile(null);
      setSelectedMedia('');
    }
    setStep(step);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setSelectedMedia(URL.createObjectURL(file));
    }
  };

  const handleFilter = (filter: StoryFilter) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    if (!imageFile) return;
    handleStep(1);
  }, [imageFile]);

  useEffect(() => {
    document.documentElement.style.overscrollBehavior = 'none';
    return () => {
      document.documentElement.style.overscrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      {step === 0 && <StorySelectMedia handleFileChange={handleFileChange} />}
      {step === 1 && (
        <StoryFilterImage
          handleStep={handleStep}
          selectedMedia={selectedMedia}
          filterImage={filterImage}
          selectedFilter={selectedFilter}
          handleFilter={handleFilter}
        />
      )}

      {step === 2 && imageFile && (
        <StoryWriteText
          imageFile={imageFile}
          selectedMedia={selectedMedia}
          texts={texts}
          setTexts={setTexts}
          selectedFilter={selectedFilter}
        />
      )}
    </>
  );
};

export default StoryWriteMain;
