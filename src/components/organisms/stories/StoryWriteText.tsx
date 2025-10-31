"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DefaultLoader from "@/components/atoms/common/DefaultLoader";
import { useAuth } from "@/hooks";
import { useStoryMutation } from "@/hooks/queries";
import { StoryData, StoryFilter, StoryOverlay } from "@/types/Story.types";
import { showAlert } from "@/utils/ui/openCustomAlert";
import DraggableInput from "./DraggableInput";

type StoryWriteTextProps = {
  imageFile: File;
  selectedMedia: string;
  texts: StoryOverlay[];
  setTexts: React.Dispatch<React.SetStateAction<StoryOverlay[]>>;
  selectedFilter: StoryFilter;
};

const StoryWriteText: React.FC<StoryWriteTextProps> = ({
  imageFile,
  selectedMedia,
  texts,
  setTexts,
  selectedFilter,
}) => {
  const router = useRouter();
  const { buddy } = useAuth();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { mutateAsync, isPending, error } = useStoryMutation();

  const handleSaveButtonClick = async () => {
    // console.log('save', texts);

    if (!buddy) router.push("/login");
    if (!imageFile) return;
    if (!texts.length) return;

    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("texts", JSON.stringify(texts));

    const payload: StoryData = formData;
    const data = await mutateAsync(payload);

    // console.log(data);
    showAlert("success", "스토리 생성이 완료되었습니다.", {
      onConfirm: () => {
        router.push(`/stories/${data?.story_id}`);
      },
    });
  };

  return (
    <section className="relative flex aspect-auto h-[calc(100dvh-57px-54px)] max-h-dvh w-full flex-col gap-4 overflow-hidden bg-gray-600 xl:mx-auto xl:min-w-[320px] xl:max-w-[430px]">
      {isPending && <DefaultLoader />}
      {error && (
        <div className="z-10 font-bold text-white">
          스토리 생성중 오류가 발생했습니다.
        </div>
      )}

      <div className="absolute top-0 left-0 z-10 h-full w-full rounded-lg bg-gradient-to-b from-transparent to-black/80"></div>
      <Image
        src={selectedMedia}
        alt="my-story-background"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        onLoad={() => setIsLoaded(true)}
        className={clsx(
          "object-contain",
          isLoaded ? "opacity-100" : "opacity-0",
          selectedFilter.className,
        )}
      />
      <DraggableInput
        texts={texts}
        setTexts={setTexts}
        selectedFilter={selectedFilter}
      />
      <button
        type="button"
        className="absolute top-0 right-0 z-10 rounded-md bg-main-color px-2 py-1 text-white"
        onClick={handleSaveButtonClick}
      >
        업로드
      </button>
    </section>
  );
};

export default StoryWriteText;
