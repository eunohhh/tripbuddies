"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import DefaultLoader from "@/components/atoms/common/DefaultLoader";
import LikesButton from "@/components/atoms/stories/LikesButton";
import { Close } from "@/components/icons/Close";
import { useAuth, useTapScroll } from "@/hooks";
import {
  useDeleteStoryMutation,
  useSpecificStoryQuery,
  useStoryLikesQuery,
} from "@/hooks/queries";
import { StoryOverlay, StoryWithBuddies } from "@/types/Story.types";
import { showAlert } from "@/utils/ui/openCustomAlert";

type StoryDetailProps = {
  id: string;
  stories: StoryWithBuddies[];
};

const StoryDetail: React.FC<StoryDetailProps> = ({ id, stories }) => {
  const { buddy } = useAuth();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    data: queryStories,
    isPending,
    error: selectedStoriesError,
  } = useSpecificStoryQuery(id);

  const {
    mutate: deleteStory,
    isPending: isDeleting,
    error: deleteStoryError,
  } = useDeleteStoryMutation();

  const [selectedIndex, setSelectedIndex] = useState<number>(
    stories.findIndex((story) => story.story_id === id),
  );

  useTapScroll({ refs: [scrollRef] });

  const [selectedStory, setSelectedStory] = useState<StoryWithBuddies>(
    queryStories ? queryStories[selectedIndex] : stories[0],
  );

  const { data: likes, isPending: isLikesPending } = useStoryLikesQuery({
    id: selectedStory.story_id,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNextBefore = (e: MouseEvent<HTMLDivElement>) => {
    const next = e.currentTarget.dataset.next;
    if (next === "before") {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else {
      if (selectedIndex < stories.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    }
  };

  const handleSelectStory = (story: StoryWithBuddies, index: number) => {
    setSelectedStory(story);
    setSelectedIndex(index);
    router.push(`/stories/${story.story_id}`);
  };

  const handleDeleteStory = () => {
    deleteStory(selectedStory.story_id);
    if (!isDeleting && !isPending) {
      showAlert("success", "스토리가 삭제되었습니다.");
    }
  };

  useEffect(() => {
    if (selectedStoriesError || deleteStoryError) {
      showAlert("error", "스토리를 불러오는데 실패했습니다.");
    }
  }, [selectedStoriesError, deleteStoryError]);

  useEffect(() => {
    if (queryStories) {
      setSelectedStory(queryStories[selectedIndex]);
    }
    if (scrollRef.current) {
      const selectedButton = scrollRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [queryStories, selectedIndex]);

  useEffect(() => {
    router.push(`/stories/${selectedStory.story_id}`);
  }, [selectedStory, router]);

  useEffect(() => {
    if (isLikesPending || isDeleting || isPending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLikesPending, isDeleting, isPending]);

  const storyOverlay = selectedStory?.story_overlay as StoryOverlay[];

  // if (isLoading) return <DefaultLoader />;

  return (
    <section className="relative aspect-auto h-[calc(100dvh-57px-54px)] w-full overflow-hidden bg-gray-800 xl:mx-auto xl:h-[calc(100dvh-100px)] xl:w-[430px]">
      {isLoading && <DefaultLoader />}
      <div className="absolute top-0 left-0 z-20 flex h-full w-full flex-row">
        <div
          data-next="before"
          className="relative h-full w-1/2 cursor-pointer"
          onClick={handleNextBefore}
        ></div>
        <div
          data-next="next"
          className="relative h-full w-1/2 cursor-pointer"
          onClick={handleNextBefore}
        ></div>
      </div>

      <div className="absolute top-4 right-1 z-[99] flex w-full flex-row justify-end gap-2">
        <button type="button" className="relative focus:outline-none">
          {likes && (
            <LikesButton
              storyId={selectedStory.story_id}
              likesCount={likes.length}
              likes={likes}
            />
          )}
        </button>
        {buddy?.buddy_id === selectedStory.story_created_by ? (
          <button
            type="button"
            className="relative"
            onClick={handleDeleteStory}
          >
            <Close className="cursor-pointer fill-white" />
          </button>
        ) : null}
      </div>

      <div
        className="-translate-x-1/2 scrollbar-hidden absolute top-1 left-1/2 z-30 flex w-full flex-row justify-center gap-1 overflow-x-auto"
        ref={scrollRef}
      >
        {(queryStories ? queryStories : stories).map((story, idx) => (
          <button
            type="button"
            className={twMerge(
              "relative h-2 min-w-10 cursor-pointer rounded-lg bg-gray-200",
              idx === selectedIndex ? "bg-primary-color-200" : "",
            )}
            key={story.story_id}
            onClick={() => handleSelectStory(story, idx)}
          ></button>
        ))}
      </div>

      {stories.map((story, idx) => (
        <Image
          key={story.story_id}
          src={story.story_media}
          alt="my-story-background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className={twMerge(
            "hidden object-contain",
            storyOverlay[idx]?.filter?.className,
            selectedIndex === idx ? "block" : "",
          )}
        />
      ))}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        {storyOverlay.map((overlay, idx) => (
          <p
            key={overlay.text + idx}
            className={twMerge(
              "absolute h-auto w-auto font-bold",
              overlay.textColor,
            )}
            style={{
              top: `${overlay.position.y}px`,
              left: `${overlay.position.x}px`,
              transform: `translate(${overlay.position.x}px, ${overlay.position.y}px)`,
            }}
          >
            {overlay.text}
          </p>
        ))}
      </div>
    </section>
  );
};

export default StoryDetail;
