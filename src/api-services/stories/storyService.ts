import {
  Story,
  StoryData,
  StoryLikes,
  StoryLikesData,
  StoryWithBuddies,
  StoryWithBuddiesAndLikes,
} from "@/types/Story.types";
import fetchWrapper from "@/utils/api/fetchWrapper";

export async function postStory(payload: StoryData): Promise<Story> {
  const url = `/api/stories`;
  const data = await fetchWrapper<Story>(url, {
    method: "POST",
    body: payload,
  });
  return data;
}

export async function getStories(): Promise<StoryWithBuddiesAndLikes[]> {
  const url = `/api/stories`;
  const data = await fetchWrapper<StoryWithBuddiesAndLikes[]>(url, {
    method: "GET",
    cache: "no-store",
  });
  return data;
}

export async function getStory(id: string): Promise<StoryWithBuddies> {
  const url = `/api/stories/${id}`;
  const data = await fetchWrapper<StoryWithBuddies>(url, {
    method: "GET",
    cache: "no-store",
  });
  return data;
}

export async function deleteStory(id: string): Promise<void> {
  const url = `/api/stories/${id}`;
  await fetchWrapper<void>(url, {
    method: "DELETE",
  });
}

export async function getSpecificStory(
  id: string,
): Promise<StoryWithBuddies[]> {
  const url = `/api/stories/${id}`;
  const data = await fetchWrapper<StoryWithBuddies[]>(url, {
    method: "GET",
    // cache: 'no-store',
  });
  return data;
}

export async function postStoryLikes(
  payload: StoryLikesData,
): Promise<StoryLikes[]> {
  const { story_id } = payload;
  const url = `/api/likes/${story_id}`;
  const data = await fetchWrapper<StoryLikes[]>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return data;
}

export async function getStoryLikes(story_id: string) {
  const url = `/api/likes/${story_id}`;
  const data = await fetchWrapper<StoryLikes[]>(url, {
    method: "GET",
    cache: "no-store",
  });
  return data;
}
