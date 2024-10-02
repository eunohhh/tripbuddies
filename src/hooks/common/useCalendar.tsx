'use client';

import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { RangeCalendar } from '@nextui-org/calendar';
import { useCallback, useEffect, useRef, useState } from 'react';

// export default function useCalendar() {
//     const initialStartDate = today(getLocalTimeZone());
//     const initialEndDate = initialStartDate.add({ weeks: 1 });

export function useCalendar() {
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });
  const [startDateTimestamp, setStartDateTimestamp] = useState(
    today(getLocalTimeZone()).toString().split('T')[0],
  );
  const [endDateTimestamp, setEndDateTimestamp] = useState(
    today(getLocalTimeZone()).add({ weeks: 1 }).toString().split('T')[0],
  );

  const handleSelectCalendar = (value: { start: CalendarDate; end: CalendarDate }) => {
    setValue(value);
    // CalendarDate는 setHours 메서드를 지원하지 않으므로 Date 객체로 변환
    const startDate = new Date(value.start.toString());
    const endDate = new Date(value.end.toString());
    startDate.setHours(23, 59, 59, 999);
    endDate.setHours(23, 59, 59, 999);
    setStartDateTimestamp(startDate.toISOString().split('T')[0]);
    setEndDateTimestamp(endDate.toISOString().split('T')[0]);
  };

  function SelectCalendar() {
    const calenderRef = useRef<HTMLDivElement>(null);
    const [isChangeCount, setIsChangeCount] = useState(0);

    const handleSunday = useCallback(() => {
      if (!calenderRef.current) return;

      const rows = calenderRef.current.querySelectorAll('tr[data-slot="grid-body-row"]');

      rows?.forEach((row) => {
        const firstChild = row.firstElementChild;

        if (firstChild) {
          const disabled = firstChild.getAttribute('aria-disabled');
          const selected = firstChild.getAttribute('aria-selected');

          if (!disabled && selected === null) {
            (firstChild.children[0] as HTMLElement).style.color = 'red';
          }
        }
      });
    }, [calenderRef]);

    const handleOnFocusChange = () => {
      setIsChangeCount((prev) => prev + 1);
    };

    useEffect(() => {
      handleSunday();
    }, [handleSunday]);

    useEffect(() => {
      const calender = document.querySelector('tbody[data-slot="grid-body"]');
      const rows = calender?.querySelectorAll('tr[data-slot="grid-body-row"]');

      rows?.forEach((row) => {
        const firstChild = row.firstElementChild;
        if (firstChild) {
          const disabled = firstChild.getAttribute('aria-disabled');
          const selected = firstChild.getAttribute('aria-selected');

          if (!disabled && selected === null) {
            (firstChild.children[0] as HTMLElement).style.color = 'red';
          }
        }
      });
    }, [isChangeCount]);

    return (
      <div className="w-full flex justify-center mb-10 mt-10 flex-col gap-4 h-[90%] items-center xl:h-[90%]">
        <RangeCalendar
          id="calendar-custom"
          aria-label="Date (Controlled Focused Value)"
          value={value}
          onChange={handleSelectCalendar}
          onFocusChange={handleOnFocusChange}
          className="w-[90%] flex justify-center items-center xl:h-[90%] bg-white"
          ref={calenderRef}
          classNames={{
            gridBody: 'bg-white w-full',
            gridBodyRow: 'justify-between',
            gridHeader: 'justify-between',
            gridHeaderRow: 'justify-between px-0',
            content: 'w-[337px] xl:w-[500px] gap-5 flex flex-col justify-center items-center',
            headerWrapper: 'after:-z-50 w-full px-0',
            header: 'z-0',
            pickerWrapper: 'z-0',
            pickerHighlight: 'bg-main-color',
            cell: 'flex flex-col justify-center items-center',
            gridWrapper: 'flex flex-col justify-center items-center w-full xl:w-[500px]',
            base: 'flex flex-col justify-center items-center',
            cellButton: [
              // default text color
              'text-black',
              // selected case
              'data-[selected=true]:bg-primary-color-400',
              'data-[selected=true]:text-white',
              'data-[selection-start=true]:bg-primary-color-400',
              'data-[selection-start=true]:text-white',
              'data-[selection-end=true]:bg-primary-color-400',
              'data-[selection-end=true]:text-white',
              'data-[range-selection=true]:bg-primary-color-400',
              'data-[range-selection=true]:text-white',
              'data-[range-selection=true]:not([data-selection-start=true]):not([data-selection-end=true]):bg-primary-color-400',
              'data-[range-selection=true]:data-[selected=true]:before:bg-transparent',
              // hover case
              'data-[hover=true]:bg-main-color',
              'data-[hover=true]:text-white',
              // selected and hover case
              'data-[selected=true]:data-[hover=true]:bg-main-color',
              'data-[selected=true]:data-[hover=true]:text-white',
            ],
          }}
        />
      </div>
    );
  }

  return { SelectCalendar, startDateTimestamp, endDateTimestamp };
}
