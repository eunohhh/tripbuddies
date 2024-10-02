import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import React from 'react';
import SelectedResultRealtimeText from './SelectedResultRealtimeText';

type SelectDatePageProps = {
  SelectCalendar: React.FC;
  startDateTimestamp: string;
  endDateTimestamp: string;
};

export default function SelectDatePage({
  SelectCalendar,
  startDateTimestamp,
  endDateTimestamp,
}: SelectDatePageProps) {
  const title = '날짜를 선택해주세요';
  const subtitle = `여정 시작 날짜와 종료 날짜의 범위를 선택해주세요.`;
  return (
    <div className="flex flex-col xl:flex-row h-full">
      <div className="w-full xl:w-[40%]">
        <Left2xlBoldText className="xl:text-2xl" text={title} />
        <LeftSmGrayText text={subtitle} />
      </div>
      <div className="w-full h-full xl:w-[60%]">
        <div className="flex justify-center items-center h-[80%]">
          <SelectCalendar />
        </div>
        <div>
          {startDateTimestamp && endDateTimestamp ? (
            <SelectedResultRealtimeText
              selectedData={`${startDateTimestamp} ~ ${endDateTimestamp}`}
              firstLabel="선택하신 날짜는"
              secondLabel="입니다."
            />
          ) : (
            <SelectedResultRealtimeText firstLabel="날짜를 선택해주세요" />
          )}
        </div>
      </div>
    </div>
  );
}
