'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import HomePageRecommendBuddiesList from '../homepage/HomePageRecommendBuddiesList';
import {
    useBuddyQueries,
    useRecommendBuddiesQuery,
    useSpecificBuddyQuery,
    useTripMutation,
    useTripQuery,
} from '@/hooks/queries';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useRouter } from 'next/navigation';
import SelectImage from '../../../../public/svg/SelectImage.svg';
import { useTapScroll } from '@/hooks';
import Navigate from '@/components/atoms/common/Navigate';
import { useModal } from '@/contexts/modal.context';
import { PartialTrip } from '@/types/Trips.types';
import TripEditText from '@/components/molecules/trips/TripEditText';
import Input from '@/components/atoms/common/Input';
import HomePageTitle from '@/components/molecules/homepage/HomePageTitle';
import TripCard from './TripCard';

type TripDetailProps = {
    id: string;
    mode: 'edit' | 'detail';
};

const TripDetail: React.FC<TripDetailProps> = ({ id, mode }) => {
    const { data: trip, isPending, error: tripError } = useTripQuery(id);
    const [tripImage, setTripImage] = useState<string>(
        trip?.trip_thumbnail as string,
    ); // 옵티미스틱용
    const [tripData, setTripData] = useState<PartialTrip | null>(null);
    const [tripImageFile, setTripImageFile] = useState<File | null>(null); // 실제 업로드용
    const fileInputRef = useRef<HTMLInputElement>(null);
    const buddiesRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
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
        trip?.contract.map(contract => contract.contract_buddy_id) || [],
    );

    const {
        mutate: postTrip,
        isPending: postTripPending,
        error: postTripError,
    } = useTripMutation();

    const { createScrollLeft, createScrollRight } =
        useTapScroll({ refs: [buddiesRef] }) ?? {};

    const handleTripTitleChange = (data: {
        tripTitle: string;
        tripContent: string;
    }) => {
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
                <TripEditText handleTripTitleChange={handleTripTitleChange} />
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
        <div className="flex flex-col gap-2 bg-gray-100 h-full mb-20">
            {postTripPending && <DefaultLoader />}
            {/** 이미지 + 여행정보 묶음 영역 */}
            <div className="relative h-full flex flex-col">
                {/** 이미지 영역 */}
                <div className="h-[217px] w-full bg-gray-40 relative aspect-auto">
                    {mode === 'edit' && (
                        <div className="absolute h-full w-full top-0 right-0 bg-black/55 z-10 flex justify-center items-center">
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
                    <Image
                        src={tripImage}
                        alt="trip image"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 33vw"
                        className="object-cover xl:object-contain"
                    />
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

            {/** 글쓴이 정보 영역 */}
            <div className="flex items-center bg-white gap-2 h-[217px]">
                <BuddyProfile clickedBuddy={buddy} loading={false} />
            </div>

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
            <div className="relative z-10 bg-white">
                <HomePageTitle
                    title="추천 인기 버디즈"
                    buttonText="전체보기"
                    description="버디즈에게 가장 인기있는 버디즈예요!"
                    href="/profile/rank"
                    className="mb-2"
                />

                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={buddiesRef}
                >
                    <HomePageRecommendBuddiesList
                        buddies={recommendBuddies.buddies}
                    />
                </div>
                {createScrollLeft && createScrollRight && (
                    <>
                        <Navigate
                            mode="before"
                            onClick={createScrollLeft(buddiesRef)}
                            className="top-[71%]"
                        />
                        <Navigate
                            mode="after"
                            onClick={createScrollRight(buddiesRef)}
                            className="top-[71%]"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default TripDetail;
