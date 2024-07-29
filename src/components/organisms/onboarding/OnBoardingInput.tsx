import Input from '@/components/atoms/common/O_Input';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingButtonWrapper from '@/components/atoms/onboarding/OnBoardingButtonWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import React, { forwardRef } from 'react';

type OnBoardingInputProps = {
    mode: 'age' | 'nickname';
    ref: React.Ref<HTMLInputElement>;
};

const OnBoardingInput = forwardRef(({ mode }: OnBoardingInputProps, ref) => {
    return (
        <OnBoardingWrapper>
            <Title>{`${mode === 'age' ? '나이' : '닉네임'}을 입력해주세요`}</Title>
            <OnBoardingButtonWrapper>
                <Input
                    type="text"
                    placeholder={mode === 'age' ? '나이' : '닉네임'}
                    name={mode === 'age' ? 'age' : 'nickname'}
                    className="w-[90%] h-[80px]"
                    ref={ref as React.LegacyRef<HTMLInputElement>}
                />
            </OnBoardingButtonWrapper>
        </OnBoardingWrapper>
    );
});

OnBoardingInput.displayName = 'OnBoardingInput';

export default OnBoardingInput;
