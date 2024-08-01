import { Tables } from './supabase';

export type Story = Tables<'stories'>;

export type PartialStory = Partial<Story>;

export type StoryData = FormData;
