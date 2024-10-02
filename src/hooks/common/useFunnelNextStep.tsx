'use client';

import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { useCallback, useState } from 'react';

type UseNextButtonProps = {
  initialStep?: number;
  limit: number;
  buttonText: string;
  disabled?: boolean;
  validateStep?: () => boolean | Promise<boolean | 'no-image'>;
};

export const useNextButton = ({
  initialStep = 0,
  limit,
  buttonText,
  disabled = false,
  validateStep,
}: UseNextButtonProps) => {
  const [step, setStep] = useState(initialStep);

  const handleNext = useCallback(async () => {
    if (disabled) return;
    if (validateStep) {
      const isValid = await validateStep();
      if (!isValid) return false; // 유효성 검사 실패 시 스텝 증가 안 함
      if (isValid === 'no-image') {
        showAlert('caution', '이미지를 선택하지 않으셨습니다. AI이미지로 자동생성 하시겠습니까?', {
          onConfirm: () => {
            setStep((prevStep) => prevStep + 1);
          },
          onCancel: () => {
            return;
          },
        });
        return 'no-image';
      }
    }
    return true;
  }, [validateStep, disabled]);

  const NextButton = ({
    className,
    onClick,
    disabled = false,
    ...props
  }: {
    className: string;
    onClick?: () => void;
    disabled?: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      onClick={async (e) => {
        e.preventDefault();
        const isValid = await handleNext();
        if (!isValid) {
          return;
        } else if (isValid === 'no-image') {
          if (onClick) onClick();
        } else {
          if (step < limit) setStep((prevStep) => prevStep + 1);
          if (onClick) onClick();
        }
      }}
      className={className}
      disabled={disabled}
      {...props}
    >
      {buttonText}
    </button>
  );

  return { NextButton, step, setStep };
};
