"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Trip } from "@/types/Trips.types";
import convertDateToStringWithWeekDay from "@/utils/common/convertDateToStringWithWeekDay";
import supabase from "@/utils/supabase/client";

type ChattingTitleProps = {
  id: string;
};

const ChattingTitle: React.FC<ChattingTitleProps> = ({ id }) => {
  const [tripData, setTripData] = useState<Trip | null>(null);
  const [contractCount, setContractCount] = useState<number>(0);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const { data, error } = await supabase
          .from("trips")
          .select("*")
          .eq("trip_id", id)
          .single();

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
          .from("contract")
          .select("contract_id", { count: "exact" })
          .eq("contract_trip_id", id)
          .eq("contract_isValidate", true);

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
    <section className="relative h-[57px] border-y-[1px] bg-white">
      <div className="h-full border-gray-200 px-6">
        <div className="flex h-full items-center">
          <Link
            href={`/trips/${id}`}
            className="flex h-[40px] w-[40px] justify-center overflow-hidden xl:h-[40px] xl:w-auto xl:min-w-[40px]"
          >
            {tripData?.trip_thumbnail ? (
              <Image
                src={tripData.trip_thumbnail}
                width={40}
                height={40}
                alt="Trip Thumbnail"
                className="object-cover xl:h-full xl:w-auto"
              />
            ) : (
              <div className="h-[40px] w-[40px] bg-gray-200"></div>
            )}
          </Link>

          <div className="flex flex-col justify-between px-3">
            <p className="font-semibold text-[16px] text-grayscale-color-700">
              {tripData?.trip_title}
            </p>
            <div className="flex gap-6 font-medium text-[14px] text-grayscale-color-600">
              <span>{tripData?.trip_final_destination}</span>
              <span>
                {tripData?.trip_start_date
                  ? convertDateToStringWithWeekDay(
                      new Date(tripData.trip_start_date),
                    )
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
