import { Tables } from './supabase';

export type Buddy = Tables<'buddies'>;

export type PartialBuddy = Partial<Buddy>;

export type LogInData = {
  email: string;
  password: string;
};

export type ErrorResponse = {
  error: string;
};
