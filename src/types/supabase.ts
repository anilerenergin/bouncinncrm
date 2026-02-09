export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          is_system_message: boolean
          sender_id: string
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          is_system_message?: boolean
          sender_id: string
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          is_system_message?: boolean
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_participants: {
        Row: {
          chat_id: string
          is_initiator: boolean | null
          is_muted: boolean | null
          joined_at: string
          last_read_at: string
          role: Database["public"]["Enums"]["chat_role"] | null
          user_id: string
        }
        Insert: {
          chat_id: string
          is_initiator?: boolean | null
          is_muted?: boolean | null
          joined_at?: string
          last_read_at?: string
          role?: Database["public"]["Enums"]["chat_role"] | null
          user_id: string
        }
        Update: {
          chat_id?: string
          is_initiator?: boolean | null
          is_muted?: boolean | null
          joined_at?: string
          last_read_at?: string
          role?: Database["public"]["Enums"]["chat_role"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_participants_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          name: string | null
          status: Database["public"]["Enums"]["chat_room_status"]
          type: Database["public"]["Enums"]["chat_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string | null
          status?: Database["public"]["Enums"]["chat_room_status"]
          type?: Database["public"]["Enums"]["chat_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string | null
          status?: Database["public"]["Enums"]["chat_room_status"]
          type?: Database["public"]["Enums"]["chat_type"]
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_name: string
          company_type: Database["public"]["Enums"]["company_type"]
          created_at: string
          id: string
        }
        Insert: {
          company_name: string
          company_type: Database["public"]["Enums"]["company_type"]
          created_at?: string
          id?: string
        }
        Update: {
          company_name?: string
          company_type?: Database["public"]["Enums"]["company_type"]
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      event_checkins: {
        Row: {
          checked_in_at: string
          event_id: string
          user_id: string
        }
        Insert: {
          checked_in_at?: string
          event_id: string
          user_id: string
        }
        Update: {
          checked_in_at?: string
          event_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_checkins_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_favorites: {
        Row: {
          event_id: string
          favorited_at: string
          user_id: string
        }
        Insert: {
          event_id: string
          favorited_at?: string
          user_id: string
        }
        Update: {
          event_id?: string
          favorited_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_favorites_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_tags: {
        Row: {
          event_id: string
          tag_id: number
        }
        Insert: {
          event_id: string
          tag_id: number
        }
        Update: {
          event_id?: string
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_tags_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          about: string | null
          address: string | null
          checkin_count: number | null
          company_id: string | null
          cover_photo: string | null
          created_at: string
          ends_at: string | null
          id: string
          latitude: number | null
          longitude: number | null
          prefers_groups: boolean | null
          starts_at: string
          ticket_url: string | null
          title: string
          updated_at: string
          venue_id: string | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          checkin_count?: number | null
          company_id?: string | null
          cover_photo?: string | null
          created_at?: string
          ends_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          prefers_groups?: boolean | null
          starts_at: string
          ticket_url?: string | null
          title: string
          updated_at?: string
          venue_id?: string | null
        }
        Update: {
          about?: string | null
          address?: string | null
          checkin_count?: number | null
          company_id?: string | null
          cover_photo?: string | null
          created_at?: string
          ends_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          prefers_groups?: boolean | null
          starts_at?: string
          ticket_url?: string | null
          title?: string
          updated_at?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      genders: {
        Row: {
          code: string
          id: number
          name: Json
        }
        Insert: {
          code: string
          id?: number
          name: Json
        }
        Update: {
          code?: string
          id?: number
          name?: Json
        }
        Relationships: []
      }
      guest_list_members: {
        Row: {
          added_at: string
          guest_request_id: string
          user_id: string
        }
        Insert: {
          added_at?: string
          guest_request_id: string
          user_id: string
        }
        Update: {
          added_at?: string
          guest_request_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_guest_request"
            columns: ["guest_request_id"]
            isOneToOne: false
            referencedRelation: "guest_list_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guest_list_members_guest_request_id_fkey"
            columns: ["guest_request_id"]
            isOneToOne: false
            referencedRelation: "guest_list_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      guest_list_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          available_until: string | null
          created_at: string
          event_id: string | null
          guest_type: Database["public"]["Enums"]["guest_type"]
          guests: string[] | null
          id: string
          requested_by: string
          status: Database["public"]["Enums"]["guest_status"]
          updated_at: string
          venue_id: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          available_until?: string | null
          created_at?: string
          event_id?: string | null
          guest_type?: Database["public"]["Enums"]["guest_type"]
          guests?: string[] | null
          id?: string
          requested_by: string
          status?: Database["public"]["Enums"]["guest_status"]
          updated_at?: string
          venue_id?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          available_until?: string | null
          created_at?: string
          event_id?: string | null
          guest_type?: Database["public"]["Enums"]["guest_type"]
          guests?: string[] | null
          id?: string
          requested_by?: string
          status?: Database["public"]["Enums"]["guest_status"]
          updated_at?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guest_list_requests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guest_list_requests_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      home_carousel: {
        Row: {
          carousel_index: number
          created_at: string | null
          deep_link: string | null
          end_time: string
          event_id: string | null
          id: string
          image_url: string | null
          sponsored_ends: string
          sponsored_title: string
          start_time: string
          status: string
          type: string
          venue_id: string | null
        }
        Insert: {
          carousel_index?: number
          created_at?: string | null
          deep_link?: string | null
          end_time: string
          event_id?: string | null
          id?: string
          image_url?: string | null
          sponsored_ends: string
          sponsored_title: string
          start_time: string
          status: string
          type: string
          venue_id?: string | null
        }
        Update: {
          carousel_index?: number
          created_at?: string | null
          deep_link?: string | null
          end_time?: string
          event_id?: string | null
          id?: string
          image_url?: string | null
          sponsored_ends?: string
          sponsored_title?: string
          start_time?: string
          status?: string
          type?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "home_carousel_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "home_carousel_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          chat_room_id: string
          created_at: string
          id: string
          status: Database["public"]["Enums"]["match_status"]
          user1_id: string
          user2_id: string
        }
        Insert: {
          chat_room_id: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["match_status"]
          user1_id: string
          user2_id: string
        }
        Update: {
          chat_room_id?: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["match_status"]
          user1_id?: string
          user2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_chat_room_id_fkey"
            columns: ["chat_room_id"]
            isOneToOne: true
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string
          event_venue_notifications: boolean
          match_notifications: boolean
          message_notifications: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_venue_notifications?: boolean
          match_notifications?: boolean
          message_notifications?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_venue_notifications?: boolean
          match_notifications?: boolean
          message_notifications?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          deeplink: string | null
          id: string
          message: string
          metadata: Json | null
          receiver_id: string
          sender_id: string | null
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deeplink?: string | null
          id?: string
          message: string
          metadata?: Json | null
          receiver_id: string
          sender_id?: string | null
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deeplink?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          receiver_id?: string
          sender_id?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          company_id: string
          created_at: string
          description: string | null
          event_id: string | null
          id: string
          promotion_type: Database["public"]["Enums"]["promotion_type"]
          title: string
          valid_until: string | null
          venue_id: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          description?: string | null
          event_id?: string | null
          id?: string
          promotion_type?: Database["public"]["Enums"]["promotion_type"]
          title: string
          valid_until?: string | null
          venue_id?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string | null
          event_id?: string | null
          id?: string
          promotion_type?: Database["public"]["Enums"]["promotion_type"]
          title?: string
          valid_until?: string | null
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promotions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotions_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      remote_configs: {
        Row: {
          created_at: string | null
          id: number
          value: Json
        }
        Insert: {
          created_at?: string | null
          id?: never
          value: Json
        }
        Update: {
          created_at?: string | null
          id?: never
          value?: Json
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          details: string | null
          id: string
          reason: Database["public"]["Enums"]["report_reason"]
          reported_id: string
          reporter_id: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          reason: Database["public"]["Enums"]["report_reason"]
          reported_id: string
          reporter_id: string
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          reason?: Database["public"]["Enums"]["report_reason"]
          reported_id?: string
          reporter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_reported_id_fkey"
            columns: ["reported_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reports_reported_id_fkey"
            columns: ["reported_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          can_use_match_filters: boolean
          created_at: string
          daily_like_limit: number
          id: string
          max_check_ins: number
          max_subscriptions: number
          name: Database["public"]["Enums"]["subscription_tier"]
          weekly_super_like_count: number
          weekly_swipe_message_count: number
        }
        Insert: {
          can_use_match_filters?: boolean
          created_at?: string
          daily_like_limit?: number
          id?: string
          max_check_ins?: number
          max_subscriptions?: number
          name: Database["public"]["Enums"]["subscription_tier"]
          weekly_super_like_count?: number
          weekly_swipe_message_count?: number
        }
        Update: {
          can_use_match_filters?: boolean
          created_at?: string
          daily_like_limit?: number
          id?: string
          max_check_ins?: number
          max_subscriptions?: number
          name?: Database["public"]["Enums"]["subscription_tier"]
          weekly_super_like_count?: number
          weekly_swipe_message_count?: number
        }
        Relationships: []
      }
      tags: {
        Row: {
          code: string
          id: number
          name: Json
        }
        Insert: {
          code: string
          id?: number
          name: Json
        }
        Update: {
          code?: string
          id?: number
          name?: Json
        }
        Relationships: []
      }
      user_blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_blocks_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_blocks_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_blocks_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_blocks_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interactions: {
        Row: {
          actor_id: string
          created_at: string
          id: string
          message: string | null
          target_id: string
          type: Database["public"]["Enums"]["interaction_type"]
        }
        Insert: {
          actor_id: string
          created_at?: string
          id?: string
          message?: string | null
          target_id: string
          type: Database["public"]["Enums"]["interaction_type"]
        }
        Update: {
          actor_id?: string
          created_at?: string
          id?: string
          message?: string | null
          target_id?: string
          type?: Database["public"]["Enums"]["interaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "user_interactions_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_interactions_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interactions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_interactions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_inventory: {
        Row: {
          ad_hoc_likes_count: number
          super_likes_count: number
          swipe_messages_count: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ad_hoc_likes_count?: number
          super_likes_count?: number
          swipe_messages_count?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ad_hoc_likes_count?: number
          super_likes_count?: number
          swipe_messages_count?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_inventory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_inventory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferred_genders: {
        Row: {
          gender_id: number
          user_id: string
        }
        Insert: {
          gender_id: number
          user_id: string
        }
        Update: {
          gender_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferred_genders_gender_id_fkey"
            columns: ["gender_id"]
            isOneToOne: false
            referencedRelation: "genders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_preferred_genders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_preferred_genders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_promotions: {
        Row: {
          claimed_at: string
          id: string
          promotion_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          claimed_at?: string
          id?: string
          promotion_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          claimed_at?: string
          id?: string
          promotion_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_promotions_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tags: {
        Row: {
          tag_id: number
          user_id: string
        }
        Insert: {
          tag_id: number
          user_id: string
        }
        Update: {
          tag_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_usage: {
        Row: {
          active_check_ins_count: number
          active_subscriptions_count: number
          daily_likes_used: number
          last_daily_reset: string | null
          last_weekly_reset: string | null
          updated_at: string | null
          user_id: string
          weekly_super_likes_used: number
          weekly_swipe_messages_used: number
        }
        Insert: {
          active_check_ins_count?: number
          active_subscriptions_count?: number
          daily_likes_used?: number
          last_daily_reset?: string | null
          last_weekly_reset?: string | null
          updated_at?: string | null
          user_id: string
          weekly_super_likes_used?: number
          weekly_swipe_messages_used?: number
        }
        Update: {
          active_check_ins_count?: number
          active_subscriptions_count?: number
          daily_likes_used?: number
          last_daily_reset?: string | null
          last_weekly_reset?: string | null
          updated_at?: string | null
          user_id?: string
          weekly_super_likes_used?: number
          weekly_swipe_messages_used?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_remaining_limits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          account_tier: Database["public"]["Enums"]["subscription_tier"]
          bio: string | null
          created_at: string
          dob: string | null
          first_name: string | null
          gender_id: number | null
          id: string
          language: string | null
          last_name: string | null
          photo_urls: string[] | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["user_status"]
          theme_mode: Database["public"]["Enums"]["user_theme"] | null
          username: string | null
        }
        Insert: {
          account_tier?: Database["public"]["Enums"]["subscription_tier"]
          bio?: string | null
          created_at?: string
          dob?: string | null
          first_name?: string | null
          gender_id?: number | null
          id: string
          language?: string | null
          last_name?: string | null
          photo_urls?: string[] | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          theme_mode?: Database["public"]["Enums"]["user_theme"] | null
          username?: string | null
        }
        Update: {
          account_tier?: Database["public"]["Enums"]["subscription_tier"]
          bio?: string | null
          created_at?: string
          dob?: string | null
          first_name?: string | null
          gender_id?: number | null
          id?: string
          language?: string | null
          last_name?: string | null
          photo_urls?: string[] | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          theme_mode?: Database["public"]["Enums"]["user_theme"] | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_gender_id_fkey"
            columns: ["gender_id"]
            isOneToOne: false
            referencedRelation: "genders"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_favorites: {
        Row: {
          favorited_at: string
          user_id: string
          venue_id: string
        }
        Insert: {
          favorited_at?: string
          user_id: string
          venue_id: string
        }
        Update: {
          favorited_at?: string
          user_id?: string
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_favorites_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_subscriptions: {
        Row: {
          subscribed_at: string
          user_id: string
          venue_id: string
        }
        Insert: {
          subscribed_at?: string
          user_id: string
          venue_id: string
        }
        Update: {
          subscribed_at?: string
          user_id?: string
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_subscriptions_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_tags: {
        Row: {
          tag_id: number
          venue_id: string
        }
        Insert: {
          tag_id: number
          venue_id: string
        }
        Update: {
          tag_id?: number
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_tags_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          address: string | null
          company_id: string | null
          cover_photo: string | null
          created_at: string
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          opening_hours: Json | null
          prefers_groups: boolean | null
          status: string | null
          subscription_count: number | null
          updated_at: string
          venue_type: Database["public"]["Enums"]["venue_type"] | null
        }
        Insert: {
          address?: string | null
          company_id?: string | null
          cover_photo?: string | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          opening_hours?: Json | null
          prefers_groups?: boolean | null
          status?: string | null
          subscription_count?: number | null
          updated_at?: string
          venue_type?: Database["public"]["Enums"]["venue_type"] | null
        }
        Update: {
          address?: string | null
          company_id?: string | null
          cover_photo?: string | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          opening_hours?: Json | null
          prefers_groups?: boolean | null
          status?: string | null
          subscription_count?: number | null
          updated_at?: string
          venue_type?: Database["public"]["Enums"]["venue_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "venues_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_remaining_limits: {
        Row: {
          account_tier: Database["public"]["Enums"]["subscription_tier"] | null
          active_check_ins_count: number | null
          active_subscriptions_count: number | null
          daily_like_limit: number | null
          daily_likes_used: number | null
          extra_daily_likes: number | null
          extra_super_likes: number | null
          extra_swipe_messages: number | null
          max_check_ins: number | null
          max_subscriptions: number | null
          remaining_check_ins: number | null
          remaining_daily_likes: number | null
          remaining_subscriptions: number | null
          remaining_weekly_super_likes: number | null
          remaining_weekly_swipe_messages: number | null
          user_id: string | null
          weekly_super_like_count: number | null
          weekly_super_likes_used: number | null
          weekly_swipe_message_count: number | null
          weekly_swipe_messages_used: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      accept_pending_chat: { Args: { p_chat_id: string }; Returns: Json }
      check_email_exists: { Args: { email_input: string }; Returns: boolean }
      check_username_exists: {
        Args: { username_input: string }
        Returns: boolean
      }
      create_group_chat: {
        Args: { image_url: string; name: string }
        Returns: string
      }
      delete_mutual_interactions: {
        Args: { p_user1_id: string; p_user2_id: string }
        Returns: undefined
      }
      earth: { Args: never; Returns: number }
      get_social_feed:
        | {
            Args: {
              p_event_ids: string[]
              p_exclude_user_id: string
              p_limit: number
              p_offset: number
              p_venue_ids: string[]
            }
            Returns: {
              age: number
              bio: string
              first_name: string
              last_name: string
              location_name: string
              location_type: string
              photo_urls: string[]
              tags: string[]
              user_id: string
              username: string
            }[]
          }
        | {
            Args: {
              p_event_ids: string[]
              p_exclude_user_id: string
              p_gender_code?: string
              p_limit: number
              p_max_age?: number
              p_min_age?: number
              p_offset: number
              p_venue_ids: string[]
              p_vibes?: string[]
            }
            Returns: {
              age: number
              bio: string
              first_name: string
              last_name: string
              location_name: string
              location_type: string
              photo_urls: string[]
              tags: string[]
              user_id: string
              username: string
            }[]
          }
      handle_interaction: {
        Args: {
          p_message?: string
          p_target_id: string
          p_type: Database["public"]["Enums"]["interaction_type"]
        }
        Returns: Json
      }
      is_chat_member: { Args: { p_chat_id: string }; Returns: boolean }
      is_member_of_chat: { Args: { _chat_id: string }; Returns: boolean }
      is_user_blocked: { Args: { p_user_id: string }; Returns: boolean }
      join_group: { Args: { chat_id: string }; Returns: boolean }
      reject_pending_chat: { Args: { p_chat_id: string }; Returns: Json }
    }
    Enums: {
      chat_role: "participant" | "admin"
      chat_room_status: "active" | "deleted"
      chat_type: "direct" | "group" | "match" | "pending_message"
      company_type: "organization" | "venue"
      guest_status:
        | "approved"
        | "pending"
        | "cancelled_by_venue"
        | "cancelled_by_user"
        | "cancelled"
      guest_type: "promoter" | "request"
      interaction_type: "like" | "pass" | "superlike"
      match_status: "active" | "unmatched" | "blocked"
      promotion_type: "drink" | "entry" | "discount" | "other"
      report_reason: "spam" | "harassment" | "inappropriate" | "fake" | "other"
      subscription_tier: "normal" | "premium"
      user_role: "user" | "evenn_admin"
      user_status: "active" | "deleted" | "banned"
      user_theme: "light" | "dark" | "system"
      venue_type: "bar" | "nightclub" | "beachclub" | "hall"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      chat_role: ["participant", "admin"],
      chat_room_status: ["active", "deleted"],
      chat_type: ["direct", "group", "match", "pending_message"],
      company_type: ["organization", "venue"],
      guest_status: [
        "approved",
        "pending",
        "cancelled_by_venue",
        "cancelled_by_user",
        "cancelled",
      ],
      guest_type: ["promoter", "request"],
      interaction_type: ["like", "pass", "superlike"],
      match_status: ["active", "unmatched", "blocked"],
      promotion_type: ["drink", "entry", "discount", "other"],
      report_reason: ["spam", "harassment", "inappropriate", "fake", "other"],
      subscription_tier: ["normal", "premium"],
      user_role: ["user", "evenn_admin"],
      user_status: ["active", "deleted", "banned"],
      user_theme: ["light", "dark", "system"],
      venue_type: ["bar", "nightclub", "beachclub", "hall"],
    },
  },
} as const
