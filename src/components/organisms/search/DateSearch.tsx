'use client';

import { useCalendar } from '@/hooks';
import React from 'react';
import SelectedResultRealtimeText from '../write/SelectedResultRealtimeText';

type DateSearchSectionProps = {
  setDateChange: (start: string, end: string) => void;
};

const DateSearchSection: React.FC<DateSearchSectionProps> = ({ setDateChange }) => {
  const { SelectCalendar, startDateTimestamp, endDateTimestamp } = useCalendar();

  React.useEffect(() => {
    if (startDateTimestamp && endDateTimestamp) {
      setDateChange(startDateTimestamp, endDateTimestamp);
    }
  }, [startDateTimestamp, endDateTimestamp, setDateChange]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[date.getDay()];
    return `${date.getFullYear().toString().slice(-2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}(${dayOfWeek})`;
  };

  return (
    <section>
      <div className="flex justify-center">
        <SelectCalendar />
      </div>
      <div>
        {startDateTimestamp && endDateTimestamp ? (
          <SelectedResultRealtimeText
            selectedData={`${formatDate(new Date(startDateTimestamp))} ~ ${formatDate(new Date(endDateTimestamp))}`}
            firstLabel="선택하신 날짜는"
            secondLabel="입니다."
          />
        ) : (
          <SelectedResultRealtimeText firstLabel="날짜를 선택해주세요" />
        )}
      </div>
    </section>
  );
};

export default DateSearchSection;
