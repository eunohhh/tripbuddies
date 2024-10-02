import React from 'react';
import { twMerge } from 'tailwind-merge';

type TripStartDateProps = {
  startDate: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const TripStartDate: React.FC<TripStartDateProps> = ({
  startDate,
  className,
  onClick = () => {},
}) => {
  return (
    <span className={twMerge('realative', className)} onClick={onClick}>
      {new Date(startDate).toLocaleDateString('ko-KR', {
        month: 'numeric', // 월 숫자로 표시
        day: 'numeric', // 일 숫자로 표시
        weekday: 'short', // 요일을 짧은 형식으로 표시 (e.g., 'Mon', 'Tue')
      })}
    </span>
  );
};

export default TripStartDate;
