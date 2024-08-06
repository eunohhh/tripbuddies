'use client';

import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import { useAuth } from '@/hooks/auth';
import useNextButton from '@/hooks/useFunnelNextStep';
import usePreferTheme from '@/hooks/usePreferTheme';
import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import OnBoardingDivider from './OnBoardingDivider';
import OnBoardingSelectGender from './OnBoardingSelectGender';
import OnBoardingInput from './OnBoardingInput';
import OnBoardingSelectLocationMbti from './OnBoardingSelectLocationMbti';
import OnBoardingSelectPrefer from './OnBoardingSelectPrefer';
import useSelectRegion from '@/hooks/useSelectRegion';
import { useRouter, useSearchParams } from 'next/navigation';
import { onBoardingValidation } from '@/utils/onboarding/onBoardingValidation';
import { Buddy, PartialBuddy } from '@/types/Auth.types';
import { getBirthDate } from '@/utils/common/getBirthDate';
import OnBoardingCalender from './OnBoardingCalender';
import { CalendarDate, parseDate } from '@internationalized/date';
import { getAgeFromBirthDate } from '@/utils/common/getAgeFromBirthDate';
import useUpdateBuddyMutation from '@/hooks/queries/useUpdateBuddyMutation';
import OnBoardingProfileImage from './OnBoardingProfileImage';
import DefaultLoader from '@/components/atoms/common/defaultLoader';

const buttonText = [
    '다음',
    '테스트시작하기',
    '다음',
    '다음',
    '다음',
    '다음',
    '다음',
    '다음',
    '다음',
    '다음',
    '다음',
    '트립버디즈 시작하기',
];

const OnBoarding: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { buddy } = useAuth();

    const nicknameRef = useRef<HTMLInputElement>(null);
    const introductionRef = useRef<HTMLInputElement>(null);
    const buddyInfoRef = useRef<PartialBuddy>({ buddy_id: buddy?.buddy_id });
    const profileImageRef = useRef<HTMLInputElement>(null);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedGender, setSelectedGender] = useState<string>('');
    const [selectedMbti, setSelectedMbti] = useState<string>('');
    const [stepToDisplay, setStepToDisplay] = useState<number>(0);
    const [calenderValue, setCalenderValue] = useState<CalendarDate>(
        parseDate(new Date().toISOString().split('T')[0]),
    );
    const [selectedMedia, setSelectedMedia] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { mutate, isPending, error } = useUpdateBuddyMutation();
    const [PreferBuddyTheme, selectedBuddyTheme] = usePreferTheme({
        mode: 'buddy',
    });
    const [PreferTripTheme, selectedTripTheme] = usePreferTheme({
        mode: 'trip',
    });
    const { SelectRegion, secondLevelLocation, thirdLevelLocation } =
        useSelectRegion();

    const { NextButton, step, setStep } = useNextButton({
        buttonText: buttonText[stepToDisplay],
        limit: 12,
    });

    const handleGenderButtonClick = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        const selectedGender = target.innerText;
        setSelectedGender(selectedGender);
    };

    const handleMbtiChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        setSelectedMbti(target.innerText);
    };

    const handleNextButtonClick = () => {
        if (!buddy) return showAlert('error', '로그인을 먼저 해주세요.');
        buddyInfoRef.current.buddy_id = buddy.buddy_id;
        // step 번호에 따라 유효성 검사 진행
        // 유효성 검사 진행 후 fetch 날리고 다음 단계로 이동
        if (step === 0) {
            const result = onBoardingValidation(
                nicknameRef.current?.value,
                step,
            );
            if (!result) return setStep(0);
            buddyInfoRef.current.buddy_nickname = nicknameRef.current?.value;
            mutate({ buddyInfo: buddyInfoRef.current });
        }
        if (step === 2) {
            const jsDate = calenderValue.toDate('UTC'); // 'UTC' 타임존으로 변환
            const isoString = jsDate.toISOString();
            const age = getAgeFromBirthDate(isoString);

            const result = onBoardingValidation(age, step);
            if (!result) return setStep(2);

            buddyInfoRef.current.buddy_birth = isoString;
            if (isEdit) mutate({ buddyInfo: buddyInfoRef.current });
        }
        if (step === 3) {
            const result = onBoardingValidation(selectedGender, step);
            if (!result) return setStep(3);
            buddyInfoRef.current.buddy_sex = selectedGender;
            if (isEdit) mutate({ buddyInfo: buddyInfoRef.current });
        }
        if (step === 4) {
            const result = onBoardingValidation(
                [secondLevelLocation, thirdLevelLocation],
                step,
            );
            if (!result) return setStep(4);
            buddyInfoRef.current.buddy_region = [
                secondLevelLocation,
                thirdLevelLocation,
            ].join(' ');
            if (isEdit) mutate({ buddyInfo: buddyInfoRef.current });
        }
        if (step === 5) {
            const result = onBoardingValidation(selectedMbti, step);
            if (!result) return setStep(5);
            buddyInfoRef.current.buddy_mbti = selectedMbti;
            if (isEdit) mutate({ buddyInfo: buddyInfoRef.current });
        }
        if (step === 7) {
            const result = onBoardingValidation(selectedBuddyTheme, step);
            if (!result) return setStep(7);
            buddyInfoRef.current.buddy_preferred_buddy1 = selectedBuddyTheme[0];
            buddyInfoRef.current.buddy_preferred_buddy2 = selectedBuddyTheme[1];
            buddyInfoRef.current.buddy_preferred_buddy3 = selectedBuddyTheme[2];
            if (isEdit) mutate({ buddyInfo: buddyInfoRef.current });
        }
        if (step === 8) {
            const result = onBoardingValidation(selectedTripTheme, step);
            if (!result) return setStep(8);
            buddyInfoRef.current.buddy_preferred_theme1 = selectedTripTheme[0];
            buddyInfoRef.current.buddy_preferred_theme2 = selectedTripTheme[1];
            buddyInfoRef.current.buddy_preferred_theme3 = selectedTripTheme[2];
            if (isEdit) mutate({ buddyInfo: buddyInfoRef.current });
        }
        if (step === 9) {
            const result = onBoardingValidation(
                introductionRef.current?.value,
                step,
            );
            if (!result) {
                if (introductionRef.current) introductionRef.current.value = '';
                return setStep(9);
            }
            buddyInfoRef.current.buddy_introduction =
                introductionRef.current?.value;
            if (isEdit) mutate({ buddyInfo: buddyInfoRef.current });
        }
        if (step === 10) {
            if (selectedFile) {
                const file = selectedFile;
                if (file && isEdit)
                    mutate({
                        buddyInfo: buddyInfoRef.current,
                        imageFile: file,
                    });
            } else {
                showAlert('error', '프로필 이미지를 선택해주세요.');
            }
        }
    };

    useEffect(() => {
        if (selectedFile) {
            const file = selectedFile;
            setSelectedMedia(URL.createObjectURL(file));
        }
    }, [selectedFile]);

    useEffect(() => {
        if (error) {
            if (error.message === '이미 존재하는 닉네임입니다.') setStep(0);
            return showAlert('error', error.message);
        }
    }, [error, setStep]);

    useEffect(() => {
        if (!buddy) {
            return showAlert('error', '로그인을 먼저 해주세요.', {
                onConfirm: () => router.push('/login'),
            });
        }
        // if (buddy.buddy_isOnBoarding)
        //     return showAlert('caution', '이미 온보딩을 완료하셨습니다.', {
        //         onConfirm: () => router.push('/'),
        //     });
        if (step <= 11) {
            if (isEdit) router.push(`/onboarding?funnel=${step}&mode=edit`);
            else router.push(`/onboarding?funnel=${step}`);
        }
        if (step > 11) {
            buddyInfoRef.current.buddy_isOnBoarding = true;
            // console.log('최종 버디즈 정보 =====>', buddyInfoRef.current);
            mutate({
                buddyInfo: buddyInfoRef.current,
                imageFile: selectedFile ? selectedFile : null,
            });
            router.push('/');
        }
        setStepToDisplay(step);
    }, [step, router, buddy, mutate, isEdit, selectedFile]);

    useEffect(() => {
        const funnel = searchParams.get('funnel');
        const mode = searchParams.get('mode');
        if (funnel) setStep(Number(funnel));
        if (mode === 'edit') setIsEdit(true);
    }, [searchParams, setStep]);

    return (
        <section className="w-full flex flex-col h-[calc(100dvh-57px-58px)] xl:w-[720px] xl:mx-auto xl:h-[calc(100dvh-100px)]">
            <div className="relative w-full h-full flex flex-col justify-center xl:justify-start">
                <ProgressIndicator
                    step={step}
                    counts={11}
                    className="relative h-[5%] pt-1 xl:pt-5 flex items-center xl:h-[3%]"
                />

                <div className="flex flex-col w-full h-[80%] xl:items-center flex-1">
                    {/** mutate 중에 로딩 띄우기 추후수정요망*/}
                    {isPending && (
                        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                            <DefaultLoader />
                        </div>
                    )}

                    {step === 0 && (
                        <OnBoardingInput mode="nickname" ref={nicknameRef} />
                    )}
                    {step === 1 && (
                        <OnBoardingDivider
                            mode="welcome"
                            name={nicknameRef.current?.value as string}
                        />
                    )}
                    {/* {step === 2 && <OnBoardingInput mode="age" ref={ageRef} />} */}
                    {step === 2 && (
                        <OnBoardingCalender
                            calenderValue={calenderValue}
                            setCalenderValue={setCalenderValue}
                        />
                    )}

                    {step === 3 && (
                        <OnBoardingSelectGender
                            handleClick={handleGenderButtonClick}
                        />
                    )}
                    {step === 4 && (
                        <OnBoardingSelectLocationMbti
                            mode="location"
                            selected={thirdLevelLocation}
                            SelectRegion={SelectRegion}
                        />
                    )}
                    {step === 5 && (
                        <OnBoardingSelectLocationMbti
                            mode="mbti"
                            selected={selectedMbti}
                            handleChange={handleMbtiChange}
                        />
                    )}
                    {step === 6 && (
                        <OnBoardingDivider
                            mode="middle"
                            name={nicknameRef.current?.value || ''}
                        />
                    )}
                    {step === 7 && (
                        <OnBoardingSelectPrefer
                            mode="buddy"
                            component={
                                <PreferBuddyTheme className="px-4 py-2.5" />
                            }
                        />
                    )}
                    {step === 8 && (
                        <OnBoardingSelectPrefer
                            mode="trip"
                            component={
                                <PreferTripTheme className="px-4 py-2.5" />
                            }
                        />
                    )}
                    {step === 9 && (
                        <OnBoardingInput
                            mode="introduction"
                            ref={introductionRef}
                        />
                    )}
                    {step === 10 && (
                        <OnBoardingProfileImage
                            buddy={buddy as Buddy}
                            ref={profileImageRef}
                            selectedMedia={selectedMedia}
                            setSelectedFile={setSelectedFile}
                        />
                    )}
                    {step === 11 && (
                        <OnBoardingDivider
                            mode="end"
                            name={nicknameRef.current?.value || ''}
                        />
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <NextButton
                        className="text-2xl bg-main-color font-bold py-2 px-4 mt-2 mb-2 rounded-2xl w-[90%] text-white"
                        onClick={handleNextButtonClick}
                    />
                </div>
            </div>
        </section>
    );
};

export default OnBoarding;
