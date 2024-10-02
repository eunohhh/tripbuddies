'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import Input from '@/components/atoms/common/Input';
import Navigate from '@/components/atoms/common/Navigate';
import HomePageTitle from '@/components/molecules/homepage/HomePageTitle';
import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import TripEditText from '@/components/molecules/trips/TripEditText';
import { useModal } from '@/contexts/modal.context';
import { useTapScroll } from '@/hooks';
import {
  useBuddyQueries,
  useRecommendBuddiesQuery,
  useSpecificBuddyQuery,
  useTripMutation,
  useTripQuery,
} from '@/hooks/queries';
import { PartialTrip, TripWithContract } from '@/types/Trips.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import SelectImage from '../../../../public/svg/SelectImage.svg';
import HomePageRecommendBuddiesList from '../homepage/HomePageRecommendBuddiesList';
import TripCard from './TripCard';

type TripDetailProps = {
  id: string;
  mode: 'edit' | 'detail';
};

const TripDetail: React.FC<TripDetailProps> = ({ id, mode }) => {
  const { data: trip, isPending, error: tripError } = useTripQuery(id);
  const [tripImage, setTripImage] = useState<string>(trip?.trip_thumbnail as string); // 옵티미스틱용
  const [tripData, setTripData] = useState<PartialTrip | null>(null);
  const [tripImageFile, setTripImageFile] = useState<File | null>(null); // 실제 업로드용
  const fileInputRef = useRef<HTMLInputElement>(null);
  const buddiesRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const modal = useModal();

  const [tripTitleContent, setTripTitleContent] = useState<{
    tripTitle: string;
    tripContent: string;
  }>({
    tripTitle: trip?.trip_title || '',
    tripContent: trip?.trip_content || '',
  });

  const {
    data: buddy,
    isPending: buddyPending,
    error: buddyError,
  } = useSpecificBuddyQuery(trip?.trip_master_id || '');

  const {
    data: recommendBuddies,
    isPending: recommendBuddiesPending,
    error: recommendBuddiesError,
  } = useRecommendBuddiesQuery();

  const queries = useBuddyQueries(
    trip?.contract
      .filter((contract) => contract.contract_isPending === false)
      .map((contract) => contract.contract_buddy_id) || [],
  );

  const { mutate: postTrip, isPending: postTripPending, error: postTripError } = useTripMutation();

  const { createScrollLeft, createScrollRight } = useTapScroll({ refs: [buddiesRef] }) ?? {};

  const handleTripTitleChange = (data: { tripTitle: string; tripContent: string }) => {
    setTripTitleContent(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setTripImage(objectUrl);
      setTripImageFile(file);
    }
  };

  const handleSvgButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleTextEditClick = () => {
    if (mode !== 'edit') return;
    return modal.openModal({
      component: () => (
        <TripEditText
          handleTripTitleChange={handleTripTitleChange}
          trip={trip as TripWithContract}
        />
      ),
    });
  };

  const handleTripDataChange = (data: PartialTrip) => setTripData(data);

  const handleWriteTrip = useCallback(async () => {
    const newTripData: PartialTrip = {
      ...tripData,
      trip_content: tripTitleContent.tripContent,
      trip_title: tripTitleContent.tripTitle,
    };
    const formData = new FormData();
    if (tripImageFile) {
      formData.append('trip_image', tripImageFile);
      formData.append('trip_json', JSON.stringify(newTripData));
    } else {
      formData.append('trip_json', JSON.stringify(newTripData));
    }
    postTrip({ newTrip: formData, id: id, mode: 'patch' });
    showAlert('success', '여정 수정이 완료되었습니다.', {
      onConfirm: () => {
        router.push(`/trips/${id}`);
      },
    });
  }, [tripData, tripTitleContent, tripImageFile, id, router, postTrip]);

  useEffect(() => {
    if (tripError || buddyError || recommendBuddiesError || postTripError) {
      showAlert(
        'error',
        tripError?.message ||
          buddyError?.message ||
          recommendBuddiesError?.message ||
          postTripError?.message ||
          '에러가 발생했습니다.',
        {
          onConfirm: () => {
            router.refresh();
          },
        },
      );
    }
  }, [tripError, buddyError, recommendBuddiesError, postTripError, router]);

  useEffect(() => {
    if (tripData) handleWriteTrip();
  }, [tripData, handleWriteTrip]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (pathname === `/trips/${id}`) {
      setTripImage(trip?.trip_thumbnail as string);
    }
  }, [pathname, id, trip]);
  // useEffect(() => {
  //     console.log('trip 변경될때 마다 ===>', trip);
  //     if (trip) setTripImage(trip.trip_thumbnail);
  // }, [trip]);

  // console.log(tripTitleContent.tripContent);
  // console.log(trip?.trip_content);

  if (isPending) return <DefaultLoader />;
  if (buddyPending) return <DefaultLoader />;
  if (recommendBuddiesPending) return <DefaultLoader />;
  if (!trip || !buddy || !recommendBuddies) return null;

  // 마스터 아이디로 유저 찾아오는 로직 추가할 것
  return (
    <div className="flex flex-col gap-2 bg-white h-full pb-20">
      {postTripPending && <DefaultLoader />}
      {/** 이미지 + 여행정보 묶음 영역 */}
      <div className="relative h-full flex flex-col xl:flex-row">
        {/** 이미지 영역 */}
        <div className="h-[217px] w-full bg-white xl:w-[40%] xl:min-h-[324px] flex justify-center items-center">
          {mode === 'edit' && (
            <div className="absolute h-[217px] xl:w-[40%] xl:min-h-[324px] w-full top-0 left-0 bg-black/55 z-10 flex justify-center items-center">
              <button className="bg-grayscale-color-500/70 rounded p-1">
                <Input
                  type="file"
                  accept="image/*"
                  intent={false}
                  name="trip_image"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
                <SelectImage
                  className="w-full h-full animate-pulse"
                  onClick={handleSvgButtonClick}
                />
              </button>
            </div>
          )}
          <div className="relative aspect-auto w-full h-full xl:w-[90%] xl:h-[90%] flex justify-center items-center">
            <Image
              src={tripImage}
              alt="trip image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover xl:object-contain"
            />
          </div>
        </div>
        {/** 여행 정보 영역 */}
        {queries.length > 0 && (
          <TripCard
            trip={trip}
            mode="detail"
            queries={queries}
            isEdit={mode === 'edit'}
            handleTripDataChange={handleTripDataChange}
            handleTripTitleChange={handleTripTitleChange}
            tripTitleContent={tripTitleContent}
          />
        )}
      </div>

      {mode === 'detail' && (
        <div className="w-full flex justify-center items-center h-[4px] py-6">
          <hr className="w-full xl:w-[85%] py-0.5 bg-grayscale-color-100/85 border-none mx-auto" />
        </div>
      )}

      {/** 글쓴이 정보 영역 */}
      <div className="flex items-center bg-white gap-2 h-[217px] xl:w-[90%] mx-auto">
        <BuddyProfile clickedBuddy={buddy} loading={false} />
      </div>

      {mode === 'detail' && (
        <div className="w-full flex justify-center items-center h-[4px] py-10">
          <hr className="w-full xl:w-[85%] py-0.5 bg-grayscale-color-100/85 border-none mx-auto" />
        </div>
      )}

      {/** 글 내용 */}
      <div className="flex flex-col bg-white gap-2 h-[217px] p-4">
        {mode === 'edit' && (
          <div className="flex justify-end h-4 items-center">
            <span
              className="text-grayscale-color-500 text-right flex justify-center"
              onClick={handleTextEditClick}
            >
              수정하기
            </span>
          </div>
        )}
        <p className="text-gray-950 text-center whitespace-pre-wrap h-full flex items-center justify-center">
          {tripTitleContent.tripContent ?? trip.trip_content}
        </p>
      </div>

      {/** 추천인기 버디즈 */}
      <div className="relative z-10 bg-white w-[90%] xl:px-5 xl:w-full mx-auto">
        <HomePageTitle
          title="추천 인기 버디즈"
          buttonText="전체보기"
          description="버디즈에게 가장 인기있는 버디즈예요!"
          href="/profile/rank"
          className="mb-2"
        />

        <div
          className="overflow-x-scroll scrollbar-hidden flex gap-[16px] min-h-[100px]"
          ref={buddiesRef}
        >
          <HomePageRecommendBuddiesList
            buddies={recommendBuddies.buddies}
            className="min-w-[243px] border-none shadow-md"
          />
        </div>
        {createScrollLeft && createScrollRight && (
          <>
            <Navigate mode="before" onClick={createScrollLeft(buddiesRef)} className="top-[70%]" />
            <Navigate mode="after" onClick={createScrollRight(buddiesRef)} className="top-[70%]" />
          </>
        )}
      </div>
    </div>
  );
};

export default TripDetail;
