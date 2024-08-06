import Input from '@/components/atoms/common/Input';
import Title from '@/components/atoms/common/Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import React, { forwardRef } from 'react';

type OnBoardingInputProps = {
    mode: 'age' | 'nickname' | 'introduction';
    ref: React.Ref<HTMLInputElement>;
};

const OnBoardingInput = forwardRef(({ mode }: OnBoardingInputProps, ref) => {
    const text =
        mode === 'introduction'
            ? '소개를 입력해주세요'
            : `${mode === 'age' ? '나이를' : '이름을'} 입력해주세요`;

    return (
        <OnBoardingWrapper>
            {mode === 'nickname' && (
                <Title className="text-2xl py-4">안녕하세요!</Title>
            )}{' '}
            <OnBoardingInnerWrapper align="start">
                <Title align="left">{text}</Title>
                <Input
                    type={mode === 'age' ? 'number' : 'text'}
                    placeholder={mode === 'age' ? '나이' : '이름'}
                    name={mode === 'age' ? 'age' : 'nickname'}
                    className="w-[90%] h-[80px] border-none bg-gray-200"
                    ref={ref as React.LegacyRef<HTMLInputElement>}
                />
            </OnBoardingInnerWrapper>
        </OnBoardingWrapper>
    );
});

OnBoardingInput.displayName = 'OnBoardingInput';

export default OnBoardingInput;
