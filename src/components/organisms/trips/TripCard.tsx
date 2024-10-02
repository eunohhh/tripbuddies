'use client';

import Chip from '@/components/atoms/common/Chip';
import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import TripStartDate from '@/components/atoms/trips/TripStartDate';
import TripTimeSinceUpload from '@/components/atoms/trips/TripTimeSinceUpload';
import {
  QUERY_KEY_CONTRACT,
  QUERY_KEY_MY_BOOKMARKS,
  QUERY_KEY_TRIP,
  QUERY_KEY_TRIP_INFINITE,
  QUERY_KEY_TRIPS,
} from '@/constants/query.constants';
import { useModal } from '@/contexts/modal.context';
import { useAuth, useSelectBuddyCounts } from '@/hooks';
import {
  useBookMarkMutation,
  useBookMarkQuery,
  useBuddyQueries,
  useContractMutation,
} from '@/hooks/queries';
import { Contract, PartialContract } from '@/types/Contract.types';
import { SelectRegionPageProps } from '@/types/Location.types';
import {
  BookMarkRequest,
  BuddyThemeData,
  CalendarData,
  PartialTrip,
  TripThemeData,
  TripWithContract,
} from '@/types/Trips.types';
import getIsOverseas from '@/utils/common/getIsOverseas';
import remainDays from '@/utils/common/getRemainDays';
import remainDaysNumber from '@/utils/common/getRemainDaysNumber';
import supabase from '@/utils/supabase/client';
import { deleteTrip } from '@/utils/trips/deleteTrip';
import { leaveTrip } from '@/utils/trips/leaveTrip';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Calendar_month from '../../../../public/svg/Calendar_month.svg';
import Distance from '../../../../public/svg/Distance.svg';
import Groups from '../../../../public/svg/Groups.svg';
import TripEditSelectDate from '../../molecules/trips/TripEditSelectDate';
import TripEditSelectGenderBuddyTheme from '../../molecules/trips/TripEditSelectGenderBuddyTheme';
import TripEditSelectRegion from '../../molecules/trips/TripEditSelectRegion';
import TripEditText from '../../molecules/trips/TripEditText';
import TripEditTripTheme from '../../molecules/trips/TripEditTripTheme';

type TripCardProps = {
  trip: TripWithContract;
  mode?: 'card' | 'detail' | 'list';
  queries?: ReturnType<typeof useBuddyQueries>;
  isEdit?: boolean;
  handleTripDataChange?: (data: PartialTrip) => void;
  handleTripTitleChange?: (data: { tripTitle: string; tripContent: string }) => void;
  tripTitleContent?: {
    tripTitle: string;
    tripContent: string;
  };
};

const TripCard: React.FC<TripCardProps> = ({
  trip,
  mode = 'list',
  queries,
  isEdit = false,
  handleTripDataChange = () => {},
  handleTripTitleChange = () => {},
  tripTitleContent,
}) => {
  const { buddy } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const selectRegionRef = useRef<Partial<SelectRegionPageProps>>(null);
  const selectDateRef = useRef<CalendarData>(null);
  const selectTripThemeRef = useRef<TripThemeData>(null);
  const selectGenderBuddyThemeRef = useRef<BuddyThemeData>(null);

  const {
    data: bookMark,
    isPending: isBookMarkPending,
    error: bookMarkError,
  } = useBookMarkQuery(mode, {
    bookmark_trip_id: trip.trip_id,
    bookmark_buddy_id: buddy?.buddy_id || '',
  });

  const {
    mutate: createContract,
    isPending: isContractMutationPending,
    error: contractMutationError,
    isSuccess: isContractMutationSuccess,
  } = useContractMutation();

  const {
    mutate: createBookMark,
    isPending: isBookMarkMutationPending,
    error: bookMarkMutationError,
  } = useBookMarkMutation();

  const { buddyCounts, SelectBuddyCounts } = useSelectBuddyCounts({
    initialCounts: trip.trip_max_buddies_counts,
  });

  const modal = useModal();

  const handleCreateContract = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const mode = e.currentTarget.dataset.mode;
    if (!buddy) {
      return showAlert('caution', '먼저 로그인 해주세요.', {
        onConfirm: () => {
          router.push('/login');
        },
      });
    }

    if (participantButtonText === '나가기') {
      return handleLeave();
    }

    if (mode === '참여하기') {
      const newContract: PartialContract = {
        contract_trip_id: trip.trip_id,
        contract_buddy_id: buddy.buddy_id,
        contract_isPending: true,
      };
      createContract(newContract);
    }

    if (mode === '수정하기') {
      return router.push(`/edit/trips/${trip.trip_id}/`);
    }

    if (mode === '수정완료') {
      const tripData: PartialTrip = {
        trip_id: trip.trip_id,
        trip_master_id: buddy.buddy_id,
        trip_max_buddies_counts: buddyCounts ?? trip.trip_max_buddies_counts,
        trip_start_date: selectDateRef.current?.startDateTimestamp ?? trip.trip_start_date,
        trip_end_date: selectDateRef.current?.endDateTimestamp ?? trip.trip_end_date,
        trip_final_destination:
          selectRegionRef.current?.states?.secondLevelLocation &&
          selectRegionRef.current?.states?.thirdLevelLocation
            ? `${selectRegionRef.current?.states?.secondLevelLocation} ${selectRegionRef.current?.states?.thirdLevelLocation}`
            : trip.trip_final_destination,
        trip_meet_location: selectTripThemeRef.current?.meetPlace ?? trip.trip_meet_location,
        trip_theme1: selectTripThemeRef.current?.selectedTripThemes[0] ?? trip.trip_theme1,
        trip_theme2: selectTripThemeRef.current?.selectedTripThemes[1] ?? trip.trip_theme2,
        trip_theme3: selectTripThemeRef.current?.selectedTripThemes[2] ?? trip.trip_theme3,
        trip_wanted_buddies1:
          selectGenderBuddyThemeRef.current?.selectedWantedBuddies[0] ?? trip.trip_wanted_buddies1,
        trip_wanted_buddies2:
          selectGenderBuddyThemeRef.current?.selectedWantedBuddies[1] ?? trip.trip_wanted_buddies2,
        trip_wanted_buddies3:
          selectGenderBuddyThemeRef.current?.selectedWantedBuddies[2] ?? trip.trip_wanted_buddies3,
        trip_wanted_sex: selectGenderBuddyThemeRef.current?.wantedSex ?? trip.trip_wanted_sex,
        trip_start_age: selectGenderBuddyThemeRef.current?.startAge ?? trip.trip_start_age,
        trip_end_age: selectGenderBuddyThemeRef.current?.endAge ?? trip.trip_end_age,
        trip_thumbnail: trip.trip_thumbnail,
      };

      handleTripDataChange(tripData);
      return showAlert('success', '수정이 완료되었습니다.');
    }
  };

  const handleDelete = async () => {
    if (trip && buddy) {
      showAlert('caution', '정말로 삭제하시겠습니까?', {
        onConfirm: async () => {
          const response = await deleteTrip(trip.trip_id, buddy.buddy_id);
          if (response && response.status === 200) {
            // console.log('response ====>', response);
            // queryClient.invalidateQueries({
            //     queryKey: [QUERY_KEY_TRIP, trip.trip_id],
            // });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_TRIP_INFINITE],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_TRIPS],
            });
            router.push('/trips');
          }
        },
      });
      // showAlert('success', '삭제되었습니다.', {
      //     onConfirm: () => router.push('/trips'),
      // });
    } else {
      showAlert('error', '오류가 발생했습니다.');
    }
  };

  const handleLeave = async () => {
    if (trip && buddy) {
      showAlert(
        'caution',
        '정말로 나가시겠습니까? 여정에서 나가면 채팅에서도 나가지며 채팅 기록은 삭제되지 않습니다.',
        {
          onConfirm: async () => {
            const response = await leaveTrip(trip.trip_id, buddy.buddy_id);
            if (response && response.status === 200) {
              showAlert('success', '여정에서 나가셨습니다.', {
                onConfirm: () => {
                  queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY_TRIP, trip.trip_id],
                  });
                  queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY_TRIP_INFINITE],
                  });
                  queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY_TRIPS],
                  });
                  router.push(`/trips/${trip.trip_id}`);
                },
              });
            }
          },
          isConfirm: true,
        },
      );
    } else {
      showAlert('error', '오류가 발생했습니다.');
    }
  };

  const handleCreateBookMark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const mode = e.currentTarget.dataset.mode;
    if (!buddy) {
      return showAlert('caution', '먼저 로그인 해주세요.', {
        onConfirm: () => {
          router.push('/login');
        },
      });
    }
    if (mode === '찜하기' || mode === '찜하기취소') {
      const newBookMark: BookMarkRequest = {
        bookmark_trip_id: trip.trip_id,
        bookmark_buddy_id: buddy.buddy_id,
        is_bookmarked: bookMark ? true : false,
      };

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_MY_BOOKMARKS, buddy.buddy_id],
      });

      createBookMark(newBookMark);
      if (bookMark) {
        return showAlert('success', '찜하기 취소가 완료되었습니다.');
      } else {
        return showAlert('success', '찜하기가 완료되었습니다.');
      }
    }
    if (mode === '삭제하기') {
      return handleDelete();
    }
  };

  const handleChipClickWhenIsEdit = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!isEdit) return;
    const mode = e.currentTarget.dataset.mode;
    if (mode === 'trip_theme') {
      return modal.openModal({
        component: () => <TripEditTripTheme ref={selectTripThemeRef} />,
      });
    } else if (mode === 'trip_wanted_sex') {
      return modal.openModal({
        component: () => <TripEditSelectGenderBuddyTheme ref={selectGenderBuddyThemeRef} />,
      });
    }
  };

  const handleClickDestination = () => {
    if (isEdit)
      return modal.openModal({
        component: () => <TripEditSelectRegion ref={selectRegionRef} />,
      });
  };

  const handleClickStartDate = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (isEdit)
      return modal.openModal({
        component: () => <TripEditSelectDate ref={selectDateRef} />,
      });
  };

  const handleClickTripTitle = () => {
    if (isEdit)
      return modal.openModal({
        component: () => <TripEditText handleTripTitleChange={handleTripTitleChange} trip={trip} />,
      });
  };

  const bookmarkButtonText = useMemo(() => {
    if (trip.trip_master_id === buddy?.buddy_id) {
      return '삭제하기';
    }
    return bookMark ? '찜하기취소' : '찜하기';
  }, [bookMark, trip, buddy]);

  const participantButtonText = useMemo(() => {
    if (trip.trip_master_id === buddy?.buddy_id) {
      if (!isEdit) {
        return '수정하기';
      } else {
        return '수정완료';
      }
    }
    const isBuddyParticipating = trip.contract?.find(
      (contract) => contract.contract_buddy_id === buddy?.buddy_id,
    );
    if (isBuddyParticipating && isBuddyParticipating.contract_isPending) {
      return '대기중';
    } else if (isBuddyParticipating && !isBuddyParticipating.contract_isPending) {
      return '나가기';
    }
    return '참여하기';
  }, [trip, buddy, isEdit]);

  useEffect(() => {
    if (contractMutationError || bookMarkError || bookMarkMutationError) {
      const message =
        contractMutationError?.message || bookMarkError?.message || bookMarkMutationError?.message;
      showAlert('error', message || '오류가 발생했습니다.');
    }
  }, [
    contractMutationError,
    // contractError,
    bookMarkError,
    bookMarkMutationError,
  ]);

  useEffect(() => {
    if (isContractMutationSuccess) {
      showAlert('success', '버디장에게 참여 요청이 전달되었습니다.');
    }
  }, [isContractMutationSuccess]);

  useEffect(() => {
    const contractSubscription = supabase
      .channel('schema-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contract',
        },
        (payload) => {
          // 이벤트 타입에 따라 필터링
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_CONTRACT, trip.trip_id],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_TRIP, trip.trip_id],
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(contractSubscription);
    };
  }, [trip.trip_id, queryClient]);

  return (
    <>
      {isContractMutationPending && <DefaultLoader />}
      {isBookMarkMutationPending && <DefaultLoader />}
      <div
        className={clsx(
          'bg-white box-border shadow-md',
          mode === 'detail' && 'h-fit p-4 xl:w-[60%] shadow-none',
          mode === 'list' && 'w-[90%] h-fit rounded-lg xl:w-full',
          mode === 'card' && 'h-[215px] min-h-[215px] rounded-lg min-w-[211px] xl:min-w-[252px]',
        )}
      >
        <div
          className={clsx(
            'relative bg-white p-2 rounded-lg box-border h-[84%] w-full xl:py-0 xl:px-2',
            mode === 'detail' && 'bg-white rounded-none',
            mode === 'list' && 'bg-gray-200 rounded-b-none',
            mode === 'card' && 'rounded-b-none',
          )}
        >
          <div className="flex flex-col gap-4 xl:pb-3">
            <div className="flex flex-col gap-5 xl:gap-3">
              <div className="flex flex-row gap-2 justify-between">
                {mode === 'card' && (
                  <>
                    <div className="flex flex-row gap-1 min-h-[22px]">
                      {getIsOverseas(trip.trip_final_destination) ? (
                        <Chip selected={false} intent="rounded">
                          해외
                        </Chip>
                      ) : (
                        <Chip selected={false} intent="rounded_yellow">
                          국내
                        </Chip>
                      )}
                      {remainDaysNumber(trip.trip_start_date) <= 20 && (
                        <Chip selected={false} intent="rounded_blue">
                          HOT
                        </Chip>
                      )}
                    </div>

                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-md leading-none text-[16px]">
                        {`${remainDays(trip.trip_start_date)}`}
                      </span>
                      <span className="text-xs leading-none text-[14px]">
                        {new Date(trip.trip_start_date).toLocaleDateString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {mode === 'card' && (
                  <h2 className="text-[18px] font-bold leading-none pt-1">
                    {trip.trip_final_destination}
                  </h2>
                )}
                {!isEdit ? (
                  <h3
                    className={clsx(
                      'text-[16px] font-bold leading-none text-ellipsis overflow-hidden whitespace-nowrap xl:font-semibold xl:pb-6',
                      mode === 'list' && 'text-black text-xl',
                      mode === 'card' && 'text-gray-600',
                    )}
                  >
                    {trip.trip_title}
                  </h3>
                ) : (
                  <button
                    className="text-lg font-bold leading-none text-ellipsis overflow-hidden whitespace-nowrap animate-pulse text-left"
                    onClick={handleClickTripTitle}
                  >
                    {tripTitleContent?.tripTitle ?? trip.trip_title}
                  </button>
                )}
              </div>

              <div className="flex flex-row justify-between">
                <div className="flex gap-1">
                  <Chip
                    selected={false}
                    intent={isEdit ? 'square_white' : 'square'}
                    data-mode="trip_theme"
                    className={isEdit ? 'cursor-pointer animate-pulse' : ''}
                    onClick={handleChipClickWhenIsEdit}
                  >
                    {selectTripThemeRef.current?.selectedTripThemes[0] ?? trip.trip_theme1}
                  </Chip>
                  <Chip
                    selected={false}
                    intent="square_white"
                    data-mode="trip_theme"
                    className={isEdit ? 'cursor-pointer animate-pulse' : ''}
                    onClick={handleChipClickWhenIsEdit}
                  >
                    {selectTripThemeRef.current?.selectedTripThemes[1] ?? trip.trip_theme2}
                  </Chip>
                  <Chip
                    selected={false}
                    intent="square_white"
                    data-mode="trip_theme"
                    className={isEdit ? 'cursor-pointer animate-pulse' : ''}
                    onClick={handleChipClickWhenIsEdit}
                  >
                    {selectTripThemeRef.current?.selectedTripThemes[2] ?? trip.trip_theme3}
                  </Chip>
                  <Chip
                    selected={false}
                    intent="square_white"
                    data-mode="trip_wanted_sex"
                    className={isEdit ? 'cursor-pointer animate-pulse' : ''}
                    onClick={handleChipClickWhenIsEdit}
                  >
                    {selectGenderBuddyThemeRef.current?.wantedSex ?? trip.trip_wanted_sex}
                  </Chip>
                </div>

                {mode === 'detail' && <TripTimeSinceUpload time={trip.trip_created_at} />}
              </div>
            </div>

            {/** svg icons + text */}
            <div className={clsx('flex flex-col gap-1', mode === 'card' && 'hidden')}>
              <div className="flex gap-2 items-center">
                <Distance />
                <span
                  className={twMerge('relative', isEdit && 'cursor-pointer animate-pulse')}
                  onClick={handleClickDestination}
                >
                  {selectRegionRef.current?.states?.secondLevelLocation &&
                  selectRegionRef.current?.states?.thirdLevelLocation
                    ? `${selectRegionRef.current?.states?.secondLevelLocation} ${selectRegionRef.current?.states?.thirdLevelLocation}`
                    : trip.trip_final_destination}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <Calendar_month />
                <TripStartDate
                  startDate={selectDateRef.current?.startDateTimestamp ?? trip.trip_start_date}
                  className={isEdit ? 'cursor-pointer animate-pulse' : ''}
                  onClick={handleClickStartDate}
                />
              </div>

              {/** 추후 수정 필요 */}
              <div className="flex gap-2 items-center">
                <Groups />
                {!isEdit ? (
                  <span>{`${(trip.contract as Contract[]).length}/${trip.trip_max_buddies_counts}`}</span>
                ) : (
                  <SelectBuddyCounts
                    className="w-[18px] h-[18px] xl:w-[20px] xl:h-[20px]"
                    isEdit
                    initialValue={(trip.contract as Contract[]).length}
                  />
                )}
              </div>
            </div>

            {/** 추후 수정 필요 */}
            {mode === 'card' && (
              <div className="flex flex-col gap-1">
                <div className="flex flex-row">
                  <p className="text-[12px] leading-none">
                    {`신청 `}
                    <span className="text-gray-5000">{`${(trip.contract as Contract[]).length}`}</span>
                    <span className="text-gray-500">{`/${trip.trip_max_buddies_counts}`}</span>
                  </p>
                </div>
              </div>
            )}

            {mode === 'list' && <TripTimeSinceUpload time={trip.trip_created_at} />}

            {/** 프로필 이미지 원형 */}
            {mode === 'detail' && queries && (
              <div className="relative flex flex-row h-10">
                {queries.map((query, index) => (
                  <div
                    key={index}
                    className={twMerge(
                      'absolute w-10 h-10 bg-gray-100 border-2 border-white rounded-full bg-cover bg-center',
                      index === 1 && 'left-[24px]',
                      index === 2 && 'left-[48px]',
                      index === 3 && 'left-[72px]',
                    )}
                    style={{
                      backgroundImage: `url(${query.data?.buddy_profile_pic})`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className={clsx(
            'relative flex w-full text-white rounded-lg h-[16%]',
            mode === 'detail' && 'bg-white text-gray-950 rounded-none justify-center gap-2',
            mode === 'list' && 'justify-between',
            mode === 'card' && 'rounded-b-lg',
          )}
        >
          <button
            className={clsx(
              'p-2',
              mode === 'detail' &&
                'bg-white text-main-color border-main-color rounded-xl border w-[48%]',
              mode === 'card' && 'hidden',
              mode === 'list' &&
                'bg-white text-main-color border-main-color rounded-br-none rounded-bl-lg border w-1/2',
            )}
            onClick={handleCreateBookMark}
            disabled={isBookMarkMutationPending}
            data-mode={bookmarkButtonText}
          >
            {bookmarkButtonText}
          </button>

          <Link
            href={
              mode === 'card' || mode === 'list'
                ? `/trips/${trip.trip_id}`
                : `/chat/${trip.trip_id}`
            }
            className={clsx(
              'p-2 text-center',
              mode === 'detail' && 'hidden',
              mode === 'list' &&
                'w-1/2 bg-main-color text-white rounded-br-lg rounded-bl-none leading-none py-2.5',
              mode === 'card' &&
                'bg-main-color text-white font-bold rounded-t-none rounded-b-lg w-full',
            )}
            scroll={false}
          >
            <button className="flex justify-center items-center w-full h-full text-[14px]">
              상세보기
            </button>
          </Link>

          {mode === 'detail' && (
            <button
              className="flex justify-center items-center h-full bg-main-color text-white rounded-xl border border-main-color w-[48%] py-2.5"
              onClick={handleCreateContract}
              disabled={isContractMutationPending}
              data-mode={participantButtonText}
            >
              {participantButtonText}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TripCard;
