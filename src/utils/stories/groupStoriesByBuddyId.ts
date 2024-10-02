import { StoryWithBuddiesAndLikes } from '@/types/Story.types';

// 유틸리티 함수 정의
function groupStoriesByBuddyId(
  stories: StoryWithBuddiesAndLikes[],
): Record<string, StoryWithBuddiesAndLikes[]> {
  return stories.reduce<Record<string, StoryWithBuddiesAndLikes[]>>((acc, story) => {
    const buddyId = story.buddies.buddy_id;
    acc[buddyId] = acc[buddyId] || [];
    acc[buddyId].push(story);
    return acc;
  }, {});
}
export default groupStoriesByBuddyId;
