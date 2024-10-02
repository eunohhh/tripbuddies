import { Tables } from './supabase';

type Params = {
  id: string;
};

type ProfilePageProps = {
  params: Params;
};

type BuddyProfileProps = {
  id?: string;
  isLabel?: boolean;
  isTempText?: boolean;
};

type Notifications = Tables<'notifications'>;

export type { BuddyProfileProps, Notifications, Params, ProfilePageProps };
