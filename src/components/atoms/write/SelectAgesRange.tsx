"use client";

import React from "react";
import { getTrackBackground, Range } from "react-range";

type SelectAgesRangeProps = {
  startAge: number;
  endAge: number;
  handleStartAge: (value: number) => void;
  handleEndAge: (value: number) => void;
};

const SelectAgesRange: React.FC<SelectAgesRangeProps> = ({
  startAge,
  endAge,
  handleStartAge,
  handleEndAge,
}) => {
  const STEP = 1;
  const MIN = 20;
  const MAX = 70;

  const values = [startAge, endAge];

  const handleChange = (values: number[]) => {
    handleStartAge(values[0]);
    handleEndAge(values[1]);
  };

  return (
    <div className="mt-4 flex w-full flex-col justify-center">
      <div className="relative mt-2 flex w-full justify-between xl:w-[537px] xl:justify-normal">
        <input
          type="number"
          value={startAge}
          onChange={(e) => handleStartAge(Number(e.target.value))}
          className="w-full items-center rounded-full bg-grayscale-color-85 px-4 py-1 text-right xl:py-2"
        />
        <span className="mx-2 text-lg"> ~ </span>
        <input
          type="number"
          value={endAge}
          onChange={(e) => handleEndAge(Number(e.target.value))}
          className="w-full items-center rounded-full bg-grayscale-color-85 px-4 py-1 text-right xl:py-2"
        />
      </div>
      <div className="relative my-3 mt-5 w-full px-2 xl:w-1/2">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 w-full rounded-full bg-gray-200"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#fca311", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged, index }) => (
            <div
              {...props}
              key={index}
              className={`h-4 w-4 rounded-full bg-main-color ${isDragged ? "shadow-lg" : ""}`}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SelectAgesRange;
