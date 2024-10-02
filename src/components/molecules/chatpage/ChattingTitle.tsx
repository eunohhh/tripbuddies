'use client';

import { Trip } from '@/types/Trips.types';
import convertDateToStringWithWeekDay from '@/utils/common/convertDateToStringWithWeekDay';
import supabase from '@/utils/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type ChattingTitleProps = {
  id: string;
};

const ChattingTitle: React.FC<ChattingTitleProps> = ({ id }) => {
  const [tripData, setTripData] = useState<Trip | null>(null);
  const [contractCount, setContractCount] = useState<number>(0);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const { data, error } = await supabase.from('trips').select('*').eq('trip_id', id).single();

        if (error) {
          throw error;
        }

        setTripData(data);
        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    };

    const fetchContractCount = async () => {
      try {
        const { count, error } = await supabase
          .from('contract')
          .select('contract_id', { count: 'exact' })
          .eq('contract_trip_id', id)
          .eq('contract_isValidate', true);

        if (error) {
          throw error;
        }

        setContractCount(count || 0);
      } catch (error) {}
    };

    fetchTripData();
    fetchContractCount();
  }, [id]);
  return (
    <section className="relative border-y-[1px] h-[57px] bg-white">
      <div className="border-gray-200 px-6 h-full">
        <div className="h-full flex items-center">
          <Link
            href={`/trips/${id}`}
            className="w-[40px] h-[40px] xl:w-auto xl:h-[40px] xl:min-w-[40px] flex justify-center overflow-hidden"
          >
            {tripData?.trip_thumbnail ? (
              <Image
                src={tripData.trip_thumbnail}
                width={40}
                height={40}
                alt="Trip Thumbnail"
                className="object-cover xl:w-auto xl:h-full"
              />
            ) : (
              <div className="w-[40px] h-[40px] bg-gray-200"></div>
            )}
          </Link>

          <div className="px-3 flex flex-col justify-between">
            <p className="text-[16px] font-semibold text-grayscale-color-700">
              {tripData?.trip_title}
            </p>
            <div className=" text-[14px] font-medium text-grayscale-color-600 flex gap-6">
              <span>{tripData?.trip_final_destination}</span>
              <span>
                {tripData?.trip_start_date
                  ? convertDateToStringWithWeekDay(new Date(tripData.trip_start_date))
                  : null}
              </span>
              <span className="text-grayscale-color-500">{`${contractCount}/${tripData?.trip_max_buddies_counts}명`}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChattingTitle;
