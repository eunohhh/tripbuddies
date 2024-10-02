import { Tables } from './supabase';

export type Message = Tables<'messages'>;

export type ContractData = {
  contract_id: string;
  contract_trip_id: string;
  trip_title: string;
  contract_buddies_profiles: string[];
  last_message_content?: string;
  last_message_time?: string;
  contract_last_message_read?: string;
  unread_count?: number;
  validate_date?: string;
};
