export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      buddies: {
        Row: {
          buddy_birth: string | null;
          buddy_created_at: string;
          buddy_email: string;
          buddy_follower_counts: number;
          buddy_following_counts: number;
          buddy_id: string;
          buddy_introduction: string | null;
          buddy_isOnBoarding: boolean;
          buddy_isPro: boolean;
          buddy_login_id: string | null;
          buddy_mbti: string | null;
          buddy_nickname: string;
          buddy_preferred_buddy1: string | null;
          buddy_preferred_buddy2: string | null;
          buddy_preferred_buddy3: string | null;
          buddy_preferred_theme1: string | null;
          buddy_preferred_theme2: string | null;
          buddy_preferred_theme3: string | null;
          buddy_profile_pic: string | null;
          buddy_region: string | null;
          buddy_sex: string | null;
          buddy_temperature: number;
        };
        Insert: {
          buddy_birth?: string | null;
          buddy_created_at?: string;
          buddy_email: string;
          buddy_follower_counts?: number;
          buddy_following_counts?: number;
          buddy_id: string;
          buddy_introduction?: string | null;
          buddy_isOnBoarding?: boolean;
          buddy_isPro?: boolean;
          buddy_login_id?: string | null;
          buddy_mbti?: string | null;
          buddy_nickname: string;
          buddy_preferred_buddy1?: string | null;
          buddy_preferred_buddy2?: string | null;
          buddy_preferred_buddy3?: string | null;
          buddy_preferred_theme1?: string | null;
          buddy_preferred_theme2?: string | null;
          buddy_preferred_theme3?: string | null;
          buddy_profile_pic?: string | null;
          buddy_region?: string | null;
          buddy_sex?: string | null;
          buddy_temperature?: number;
        };
        Update: {
          buddy_birth?: string | null;
          buddy_created_at?: string;
          buddy_email?: string;
          buddy_follower_counts?: number;
          buddy_following_counts?: number;
          buddy_id?: string;
          buddy_introduction?: string | null;
          buddy_isOnBoarding?: boolean;
          buddy_isPro?: boolean;
          buddy_login_id?: string | null;
          buddy_mbti?: string | null;
          buddy_nickname?: string;
          buddy_preferred_buddy1?: string | null;
          buddy_preferred_buddy2?: string | null;
          buddy_preferred_buddy3?: string | null;
          buddy_preferred_theme1?: string | null;
          buddy_preferred_theme2?: string | null;
          buddy_preferred_theme3?: string | null;
          buddy_profile_pic?: string | null;
          buddy_region?: string | null;
          buddy_sex?: string | null;
          buddy_temperature?: number;
        };
        Relationships: [];
      };
      contract: {
        Row: {
          contract_buddy_id: string;
          contract_created_at: string;
          contract_end_date: string;
          contract_id: string;
          contract_isLeader: boolean;
          contract_isPending: boolean;
          contract_isValidate: boolean;
          contract_last_message_read: string | null;
          contract_start_date: string;
          contract_trip_id: string;
          contract_validate_date: string | null;
        };
        Insert: {
          contract_buddy_id: string;
          contract_created_at?: string;
          contract_end_date: string;
          contract_id?: string;
          contract_isLeader: boolean;
          contract_isPending?: boolean;
          contract_isValidate: boolean;
          contract_last_message_read?: string | null;
          contract_start_date: string;
          contract_trip_id: string;
          contract_validate_date?: string | null;
        };
        Update: {
          contract_buddy_id?: string;
          contract_created_at?: string;
          contract_end_date?: string;
          contract_id?: string;
          contract_isLeader?: boolean;
          contract_isPending?: boolean;
          contract_isValidate?: boolean;
          contract_last_message_read?: string | null;
          contract_start_date?: string;
          contract_trip_id?: string;
          contract_validate_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'contract_contract_buddy_id_foreign';
            columns: ['contract_buddy_id'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
          {
            foreignKeyName: 'contract_contract_last_message_read_fkey';
            columns: ['contract_last_message_read'];
            isOneToOne: false;
            referencedRelation: 'messages';
            referencedColumns: ['message_id'];
          },
          {
            foreignKeyName: 'contract_contract_trip_id_foreign';
            columns: ['contract_trip_id'];
            isOneToOne: false;
            referencedRelation: 'trips';
            referencedColumns: ['trip_id'];
          },
        ];
      };
      follow: {
        Row: {
          follow_created_at: string;
          follow_follower_id: string;
          follow_following_id: string;
          follow_id: string;
        };
        Insert: {
          follow_created_at?: string;
          follow_follower_id: string;
          follow_following_id: string;
          follow_id?: string;
        };
        Update: {
          follow_created_at?: string;
          follow_follower_id?: string;
          follow_following_id?: string;
          follow_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'follow_follow_follower_id_foreign';
            columns: ['follow_follower_id'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
          {
            foreignKeyName: 'follow_follow_following_id_fkey';
            columns: ['follow_following_id'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
        ];
      };
      messages: {
        Row: {
          message_content: string;
          message_created_at: string;
          message_id: string;
          message_sender_id: string;
          message_trip_id: string;
          message_type: string;
        };
        Insert: {
          message_content: string;
          message_created_at?: string;
          message_id?: string;
          message_sender_id: string;
          message_trip_id: string;
          message_type?: string;
        };
        Update: {
          message_content?: string;
          message_created_at?: string;
          message_id?: string;
          message_sender_id?: string;
          message_trip_id?: string;
          message_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_message_sender_id_fkey';
            columns: ['message_sender_id'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
          {
            foreignKeyName: 'messages_message_trip_id_fkey';
            columns: ['message_trip_id'];
            isOneToOne: false;
            referencedRelation: 'trips';
            referencedColumns: ['trip_id'];
          },
        ];
      };
      notifications: {
        Row: {
          notification_content: string;
          notification_created_at: string;
          notification_id: string;
          notification_isRead: boolean;
          notification_origin_id: string | null;
          notification_receiver: string;
          notification_sender: string;
          notification_type: string;
        };
        Insert: {
          notification_content: string;
          notification_created_at?: string;
          notification_id?: string;
          notification_isRead?: boolean;
          notification_origin_id?: string | null;
          notification_receiver: string;
          notification_sender: string;
          notification_type: string;
        };
        Update: {
          notification_content?: string;
          notification_created_at?: string;
          notification_id?: string;
          notification_isRead?: boolean;
          notification_origin_id?: string | null;
          notification_receiver?: string;
          notification_sender?: string;
          notification_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notifications_notification_receiver_fkey';
            columns: ['notification_receiver'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
          {
            foreignKeyName: 'notifications_notification_sender_fkey';
            columns: ['notification_sender'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
        ];
      };
      payments: {
        Row: {
          payment_approved_at: string;
          payment_buddy_id: string;
          payment_currency: string;
          payment_id: string;
          payment_status: string;
          payment_totalAmount: number;
        };
        Insert: {
          payment_approved_at: string;
          payment_buddy_id: string;
          payment_currency: string;
          payment_id: string;
          payment_status: string;
          payment_totalAmount: number;
        };
        Update: {
          payment_approved_at?: string;
          payment_buddy_id?: string;
          payment_currency?: string;
          payment_id?: string;
          payment_status?: string;
          payment_totalAmount?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'payments_payment_buddy_id_foreign';
            columns: ['payment_buddy_id'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
        ];
      };
      stories: {
        Row: {
          story_created_at: string;
          story_created_by: string;
          story_id: string;
          story_likes_counts: number;
          story_media: string;
          story_overlay: Json;
        };
        Insert: {
          story_created_at?: string;
          story_created_by?: string;
          story_id?: string;
          story_likes_counts?: number;
          story_media: string;
          story_overlay: Json;
        };
        Update: {
          story_created_at?: string;
          story_created_by?: string;
          story_id?: string;
          story_likes_counts?: number;
          story_media?: string;
          story_overlay?: Json;
        };
        Relationships: [
          {
            foreignKeyName: 'stories_story_created_by_foreign';
            columns: ['story_created_by'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
        ];
      };
      storylikes: {
        Row: {
          storylikes_buddy_id: string;
          storylikes_created_at: string;
          storylikes_id: string;
          storylikes_story_id: string;
        };
        Insert: {
          storylikes_buddy_id: string;
          storylikes_created_at?: string;
          storylikes_id?: string;
          storylikes_story_id: string;
        };
        Update: {
          storylikes_buddy_id?: string;
          storylikes_created_at?: string;
          storylikes_id?: string;
          storylikes_story_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'storylikes_storylikes_buddy_id_foreign';
            columns: ['storylikes_buddy_id'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
          {
            foreignKeyName: 'storylikes_storylikes_story_id_foreign';
            columns: ['storylikes_story_id'];
            isOneToOne: false;
            referencedRelation: 'stories';
            referencedColumns: ['story_id'];
          },
        ];
      };
      tripbookmarks: {
        Row: {
          bookmark_buddy_id: string;
          bookmark_created_at: string;
          bookmark_id: string;
          bookmark_trip_id: string;
        };
        Insert: {
          bookmark_buddy_id: string;
          bookmark_created_at?: string;
          bookmark_id?: string;
          bookmark_trip_id: string;
        };
        Update: {
          bookmark_buddy_id?: string;
          bookmark_created_at?: string;
          bookmark_id?: string;
          bookmark_trip_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tripbookmarks_bookmark_buddy_id_foreign';
            columns: ['bookmark_buddy_id'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
          {
            foreignKeyName: 'tripbookmarks_bookmark_trip_id_foreign';
            columns: ['bookmark_trip_id'];
            isOneToOne: false;
            referencedRelation: 'trips';
            referencedColumns: ['trip_id'];
          },
        ];
      };
      trips: {
        Row: {
          trip_bookmarks_counts: number;
          trip_content: string;
          trip_created_at: string;
          trip_end_age: number;
          trip_end_date: string;
          trip_final_destination: string;
          trip_id: string;
          trip_isValidate: boolean;
          trip_master_id: string;
          trip_max_buddies_counts: number;
          trip_meet_location: string;
          trip_start_age: number;
          trip_start_date: string;
          trip_theme1: string;
          trip_theme2: string;
          trip_theme3: string;
          trip_thumbnail: string;
          trip_title: string;
          trip_wanted_buddies1: string;
          trip_wanted_buddies2: string;
          trip_wanted_buddies3: string;
          trip_wanted_sex: string;
        };
        Insert: {
          trip_bookmarks_counts?: number;
          trip_content: string;
          trip_created_at?: string;
          trip_end_age: number;
          trip_end_date: string;
          trip_final_destination: string;
          trip_id?: string;
          trip_isValidate?: boolean;
          trip_master_id?: string;
          trip_max_buddies_counts: number;
          trip_meet_location: string;
          trip_start_age: number;
          trip_start_date: string;
          trip_theme1: string;
          trip_theme2: string;
          trip_theme3: string;
          trip_thumbnail: string;
          trip_title: string;
          trip_wanted_buddies1: string;
          trip_wanted_buddies2: string;
          trip_wanted_buddies3: string;
          trip_wanted_sex: string;
        };
        Update: {
          trip_bookmarks_counts?: number;
          trip_content?: string;
          trip_created_at?: string;
          trip_end_age?: number;
          trip_end_date?: string;
          trip_final_destination?: string;
          trip_id?: string;
          trip_isValidate?: boolean;
          trip_master_id?: string;
          trip_max_buddies_counts?: number;
          trip_meet_location?: string;
          trip_start_age?: number;
          trip_start_date?: string;
          trip_theme1?: string;
          trip_theme2?: string;
          trip_theme3?: string;
          trip_thumbnail?: string;
          trip_title?: string;
          trip_wanted_buddies1?: string;
          trip_wanted_buddies2?: string;
          trip_wanted_buddies3?: string;
          trip_wanted_sex?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'trips_trip_master_id_fkey';
            columns: ['trip_master_id'];
            isOneToOne: false;
            referencedRelation: 'buddies';
            referencedColumns: ['buddy_id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
