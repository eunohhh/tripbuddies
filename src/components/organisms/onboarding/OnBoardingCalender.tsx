'use client';
import Title from '@/components/atoms/common/Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import { Calendar, CalendarDate } from '@nextui-org/calendar';
import { useEffect, useRef, useState } from 'react';

type OnBoardingCalenderProps = {
  calenderValue: CalendarDate;
  setCalenderValue: (value: CalendarDate) => void;
};

const OnBoardingCalender = ({ calenderValue, setCalenderValue }: OnBoardingCalenderProps) => {
  const calenderRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleCalenderChange = (isExpanded: boolean) => {
    setIsExpanded(isExpanded);
  };

  useEffect(() => {
    if (calenderRef.current) {
      const selected = calenderRef.current.querySelector('td[data-selected="true"]');

      if (selected) (selected as HTMLElement).style.backgroundColor = '#ffb806';

      const rows = calenderRef.current.querySelectorAll('tr[data-slot="grid-body-row"]');
      rows.forEach((row) => {
        const firstChild = row.firstElementChild;
        if (firstChild) {
          const disabled = firstChild.getAttribute('aria-disabled');
          if (!disabled) {
            (firstChild.children[0].children[0] as HTMLElement).style.color = 'red';
          }
        }
      });
    }
  }, [isExpanded]);

  useEffect(() => {
    const onboardingWrapper = document.getElementById('onboarding-wrapper');

    const handleClick = (e: Event) => {
      const target = e.target as Element;
      const isSame = target.closest('[data-slot="picker-wrapper"]');
      const isSelected = target.closest('[data-selected="true"]');

      const button = calenderRef.current?.querySelector('button[data-slot="header"]');
      const pickerWrapper = calenderRef.current?.querySelector('[data-slot="picker-wrapper"]');

      if (!isSame && !isSelected && button && pickerWrapper) {
        (button as HTMLElement)?.click();
      }
    };

    onboardingWrapper?.addEventListener('click', handleClick);

    return () => {
      onboardingWrapper?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <OnBoardingWrapper>
      <Title className="text-2xl text-left py-1" align="left">
        생일을 입력해 주세요
      </Title>
      {/* <Paragraph className="text-left">{`입력해주세요`}</Paragraph> */}
      <OnBoardingInnerWrapper>
        <Calendar
          aria-label="Date (Show Month and Year Picker Controlled)"
          className="w-[90%] flex justify-center items-center bg-white"
          showMonthAndYearPickers
          classNames={{
            gridBody: 'bg-white w-full',
            gridBodyRow: 'gap-3',
            gridHeaderRow: 'gap-3',
            content: 'w-[337px]',
            headerWrapper: 'after:-z-50',
            header: 'z-0',
            pickerWrapper: 'z-0',
            pickerHighlight: 'bg-main-color',
            cellButton: [
              // default text color
              'text-black',
              // selected case
              'data-[selected=true]:bg-main-color',
              'data-[selected=true]:text-white',
              // hover case
              'data-[hover=true]:bg-main-color',
              'data-[hover=true]:text-white',
              // selected and hover case
              'data-[selected=true]:data-[hover=true]:bg-main-color',
              'data-[selected=true]:data-[hover=true]:text-white',
            ],
          }}
          ref={calenderRef}
          value={calenderValue}
          onHeaderExpandedChange={handleCalenderChange}
          onChange={setCalenderValue}
        />
      </OnBoardingInnerWrapper>
    </OnBoardingWrapper>
  );
};

export default OnBoardingCalender;
