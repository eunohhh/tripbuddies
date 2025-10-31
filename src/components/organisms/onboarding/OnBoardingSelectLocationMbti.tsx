"use client";
import { MouseEvent } from "react";
import Chip from "@/components/atoms/common/Chip";
import Title from "@/components/atoms/common/Title";
import OnBoardingInnerWrapper from "@/components/atoms/onboarding/OnBoardinginnerWrapper";
import OnBoardingWrapper from "@/components/atoms/onboarding/OnBoardingWrapper";
import SelectRegions from "@/components/molecules/common/SelectRegion";
import { mbtis } from "@/data/mbtis";
import { useSelectRegion } from "@/hooks";

type OnBoardingSelectLocationMbtiProps = {
  mode: "location" | "mbti";
  selected: string;
  isLabel?: boolean;
  handleChange?: (e: MouseEvent<HTMLSpanElement>) => void;
  states?: ReturnType<typeof useSelectRegion>["states"] | null;
  actions?: ReturnType<typeof useSelectRegion>["actions"] | null;
};

const OnBoardingSelectLocationMbti = ({
  mode,
  selected,
  handleChange = () => {},
  isLabel = false,
  states = null,
  actions = null,
}: OnBoardingSelectLocationMbtiProps) => {
  return (
    <OnBoardingWrapper>
      <Title>{`${mode === "location" ? "지역을" : "MBTI를"} 선택해주세요`}</Title>
      <OnBoardingInnerWrapper>
        {isLabel && (
          <label htmlFor={mode === "location" ? "location" : "mbti"}>
            {mode === "location" ? "지역" : "MBTI"}
          </label>
        )}
        {mode === "mbti" && (
          <section className="grid w-[90%] grid-cols-4 gap-2">
            {mbtis.map((mbti) => (
              <Chip
                key={mbti.mbti}
                selected={selected.includes(mbti.mbti)}
                intent="onBoarding"
                className="py-2.5"
                onClick={handleChange}
              >
                {mbti.mbti}
              </Chip>
            ))}
          </section>
        )}
        {mode === "location" && states && actions && (
          <section className="relative h-full w-[90%] xl:h-[80%]">
            <SelectRegions states={states} actions={actions} />
          </section>
        )}
      </OnBoardingInnerWrapper>
    </OnBoardingWrapper>
  );
};

export default OnBoardingSelectLocationMbti;

//h-[80%] overflow-y-auto
