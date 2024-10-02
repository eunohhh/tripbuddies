import { Buddy } from './Auth.types';
import { Tables } from './supabase';

export type Story = Tables<'stories'>;

export type StoryWithBuddies = Story & {
  buddies: Buddy;
};

export type StoryWithBuddiesAndLikes = StoryWithBuddies & {
  likes: StoryLikes[];
};

export type PartialStory = Partial<Story>;

export type StoryData = FormData;

export type StoryOverlay = {
  text: string;
  textColor: string;
  position: {
    x: number;
    y: number;
  };
  filter?: StoryFilter;
};

export type StoryFilter = {
  name: string;
  className: string;
};

export type StoryLikes = Tables<'storylikes'>;

export type PartialStoryLikes = Partial<StoryLikes>;

export type StoryLikesData = {
  story_id: string;
  buddy_id: string;
  isLiked: boolean;
};
